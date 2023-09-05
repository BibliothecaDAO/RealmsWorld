import logging

from apibara.indexer import IndexerRunner, IndexerRunnerConfiguration, Info
from starknet_py.contract import ContractFunction
from apibara.indexer.indexer import IndexerConfiguration
from apibara.protocol.proto.stream_pb2 import Cursor, DataFinality
from apibara.starknet import EventFilter, Filter, StarkNetIndexer, felt
from apibara.starknet.cursor import starknet_cursor
from apibara.starknet.proto.starknet_pb2 import Block
from indexer.config import Config
from apibara.protocol import StreamAddress
from apibara.starknet.proto.types_pb2 import FieldElement
from typing import List
from indexer.utils import (
    check_exists_int, encode_int_as_bytes, from_uint256, to_decimal)
from bson import Decimal128
from indexer.erc721 import (ERC721Contract, TransferEvent,
                            bytes_to_int, decode_transfer_event,
                            hex_to_bytes, int_to_bytes)
# Print apibara logs
root_logger = logging.getLogger("apibara")
# change to `logging.DEBUG` to print more information
root_logger.setLevel(logging.INFO)
root_logger.addHandler(logging.StreamHandler())

# `Transfer` selector.
# You can get this value either with starknet.py's `ContractFunction.get_selector`
# or from starkscan.
depositHandled_key = felt.from_hex(
    "0x374396cb322ab5ffd35ddb8627514609289d22c07d039ead5327782f61bb833"
)
withdrawInitiated_key = felt.from_hex(
    "0x2c26aa375d99b68ba668f48f6fb43193aa51220460e9da669eff1fd58995345"
)


class LordsBridgeIndexer(StarkNetIndexer):
    def __init__(self, config):
        super().__init__()
        self.config = config

    def indexer_id(self) -> str:
        return f"lords-bridge-indexer-{self.config.network}"

    def initial_configuration(self) -> Filter:
        filter = Filter().with_header(weak=True)
        self.event_map = dict()

        def add_filter(contract, event):
            selector = ContractFunction.get_selector(event)
            self.event_map[selector] = event
            filter.add_event(
                EventFilter()
                .with_from_address(felt.from_hex(contract))
                .with_keys([felt.from_int(selector)])
            )

        # Lords Bridge contract
        for starknet_id_event in [
            "WithdrawalInitiated",
            "DepositHandled",
        ]:
            add_filter(self.config.BRIDGE_CONTRACT, starknet_id_event)

        # LS Beasts contract
        for starknet_id_event in [
            "Transfer",
        ]:
            add_filter(self.config.BEASTS_CONTRACT, starknet_id_event)

        # Return initial configuration of the indexer.
        return IndexerConfiguration(
            filter=filter,
            starting_cursor=starknet_cursor(self.config.STARTING_BLOCK),
            finality=DataFinality.DATA_STATUS_ACCEPTED,
        )

    async def handle_data(self, info: Info, data: Block):
        print('handle data')
        # Handle one block of data
        for event_with_tx in data.events:
            tx_hash = felt.to_hex(event_with_tx.transaction.meta.hash)
            event = event_with_tx.event
            event_name = self.event_map[felt.to_int(event.keys[0])]
            receipt = event_with_tx.receipt
            await {
                "DepositHandled": self.handle_bridge_deposit,
                "WithdrawalInitiated": self.handle_bridge_withdraw,
                "Transfer": self.handle_beasts_transfer
            }[event_name](info, data, tx_hash, receipt, event.data)

    async def handle_invalidate(self, _info: Info, _cursor: Cursor):
        raise ValueError("data must be finalized")

    async def handle_bridge_deposit(self, info: Info, block: Block, tx_hash: str, receipt,  data):
        deposit = await info.storage.find_one(
            "l2deposits", {"hash": tx_hash}
        )
        if deposit is not None:
            return deposit

        value = to_decimal(felt.to_int(data[1]), 18)
        deposit_doc = {
            "hash": tx_hash,
            "l2Recipient": felt.to_hex(data[0]),
            "amount": Decimal128(value),
            "timestamp": block.header.timestamp.ToDatetime(),
        }
        await info.storage.insert_one("l2deposits", deposit_doc)
        print("- deposit]",
              deposit_doc["l2Recipient"], "->", deposit_doc["amount"])

    async def handle_bridge_withdraw(self, info: Info, block: Block, tx_hash: str, receipt, data):
        withdraw = await info.storage.find_one(
            "l2withdrawals", {"hash": tx_hash}
        )
        if withdraw is not None:
            return withdraw

        value = to_decimal(felt.to_int(data[1]), 18)
        withdraw_doc = {
            "hash": tx_hash,
            "l1Recipient": felt.to_hex(data[0]),
            "l2Sender": felt.to_hex(receipt.events[0].data[0]),
            "amount": Decimal128(value),
            "timestamp": block.header.timestamp.ToDatetime(),
        }
        await info.storage.insert_one("l2withdrawals", withdraw_doc)

        print("- withdraw]", withdraw_doc["l2Sender"], "->",
              withdraw_doc["l1Recipient"], withdraw_doc["amount"])

    async def handle_beasts_transfer(self, info: Info, block: Block, tx_hash: str, receipt, data):
        print("-handle beast transfer")
        try:
            transfer = decode_transfer_event(data)
            print(transfer)
            if transfer is None:
                return
        except:
            return

        # contract = self._contract_storage.get(self.config.BEASTS_CONTRACT)
        # if contract is None:
        #     erc721 = ERC721Contract(
        #         info.rpc_client, self.config.BEASTS_CONTRACT)
        #     if await erc721.is_erc721(transfer.token_id):
        #         # get name and symbol
        #         name = await erc721.name()
        #         contract = {"type": "erc721", "name": name}
        #         self._contract_storage.set(
        #             self.config.BEASTS_CONTRACT, contract)
        #     else:
        #         contract = {"type": "other"}
        #         self._contract_storage.set(
        #             self.config.BEASTS_CONTRACT, contract)

        # if contract["type"] != "erc721":
        #     return

        # Now we know we have an ERC-721.
        # Invalidate old token information
        token = await info.storage.find_one_and_update(
            "beasts",
            {
                "contract_address": self.config.BEASTS_CONTRACT,
                "token_id": transfer.token_id,
                "_chain.valid_to": None,
            },
            {"$set": {"_chain.valid_to": block.header.block_number}},
            # return_document=pymongo.ReturnDocument.BEFORE,
        )

        if token is None:
            # insert metadata that will be fetched by the metadata
            # fetchers
            await info.storage.insert_one(
                "beast_metadata",
                {
                    "contract_address": self.config.BEASTS_CONTRACT,
                    "token_id": transfer.token_id,
                    "status": "missing",
                    "_chain.valid_to": None,
                }
            )

            before_owners = []
        else:
            before_owners = token["owners"]

        from_as_bytes = transfer.from_address
        to_as_bytes = transfer.to_address

        after_owners = [
            addr
            for addr in before_owners
            if addr != transfer.from_address
            and addr != transfer.to_address
        ] + [to_as_bytes]

        print(after_owners)

        # Store updated token information
        await info.storage.insert_one(
            "beasts",
            {
                "contract_address": self.config.BEASTS_CONTRACT,
                "token_id": transfer.token_id,
                "updated_at": block.header.timestamp.ToDatetime(),
                "owners": after_owners,
                "_chain": {"valid_from": block.header.block_number, "valid_to": None},
            }
        )

        await info.storage.insert_one(
            "beast_transfers",
            {
                "contract_address": self.config.BEASTS_CONTRACT,
                "token_id": transfer.token_id,
                "from": from_as_bytes,
                "to": to_as_bytes,
                "created_at": block.header.timestamp.ToDatetime(),
                "_chain": {"valid_from": block.header.block_number, "valid_to": None},
            }
        )

        print("- beast transfer")


async def run_indexer(server_url=None, mongo_url=None, restart=None, dna_token=None, network=None, bridge=None, beasts721=None, start_block=None):

    runner = IndexerRunner(
        config=IndexerRunnerConfiguration(
            stream_url=server_url,
            storage_url=mongo_url,
            token=dna_token,
        ),
        reset_state=restart,
        client_options=[
            ('grpc.max_receive_message_length', 100 * 1024 * 1024)
        ]
    )

    config = Config(network, bridge, beasts721, start_block)

    # ctx can be accessed by the callbacks in `info`.
    if server_url == "localhost:7171" or server_url == StreamAddress.StarkNet.Goerli:
        ctx = {"network": "starknet-testnet"}
    else:
        ctx = {"network": "starknet-mainnet"}
    print('indexer running')
    await runner.run(LordsBridgeIndexer(config), ctx=ctx)
