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
from indexer.utils import (check_exists_int, encode_int_as_bytes, from_uint256, to_decimal)
# Print apibara logs
root_logger = logging.getLogger("apibara")
# change to `logging.DEBUG` to print more information
root_logger.setLevel(logging.INFO)
root_logger.addHandler(logging.StreamHandler())

l2_bridge_address = felt.from_hex(
    "0x7bd1560465935885b3e8930f51194fa9289b2ff35daf4b553672f1aa5993296"
)

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

        # Return initial configuration of the indexer.
        return IndexerConfiguration(
            filter=filter,
            starting_cursor=starknet_cursor(self.config.STARTING_BLOCK),
            finality=DataFinality.DATA_STATUS_ACCEPTED,
        )

    async def handle_data(self, info: Info, data: Block):
        # Handle one block of data
        print('handling data')
        for event_with_tx in data.events:
            tx_hash = felt.to_hex(event_with_tx.transaction.meta.hash)
            event = event_with_tx.event
            event_name = self.event_map[felt.to_int(event.keys[0])]

            await {
                "DepositHandled": self.handle_deposit,
                "WithdrawalInitiated": self.handle_withdraw
            }[event_name](info, data, tx_hash, event.data)


    async def handle_invalidate(self, _info: Info, _cursor: Cursor):
        raise ValueError("data must be finalized")

    async def handle_deposit(self, info: Info, block: Block,  tx_hash: str, data):
        deposit = await info.storage.find_one(
            "deposits", {"hash": tx_hash}
        )
        if deposit is not None:
            return deposit
        print(f"{type(data[0])}")
        deposit_doc = {
            "hash": tx_hash,
            "recipient": felt.to_hex(data[0]),
            "amount": felt.to_int(data[1])
        }
        await info.storage.insert_one("deposits", deposit_doc)
        print("- deposit]", deposit_doc["recipient"], "->", deposit_doc["amount"])


    async def handle_withdraw(self, info: Info, block: Block,  tx_hash: str, data):
        withdraw = await info.storage.find_one(
            "withdraws", {"hash": tx_hash}
        )
        if withdraw is not None:
            return withdraw
        
        withdraw_doc = {
            "hash": tx_hash,
            "recipient": felt.to_hex(data[0]),
            "amount": felt.to_int(data[1])
        }
        await info.storage.insert_one("withdraws", withdraw_doc)

        print("- withdraw]", withdraw_doc["recipient"], "->", withdraw_doc["amount"])

async def run_indexer(server_url=None, mongo_url=None, restart=None, dna_token=None, network=None, bridge=None, start_block=None):
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

    config = Config(network, bridge, start_block)

    # ctx can be accessed by the callbacks in `info`.
    if server_url == "localhost:7171" or server_url == StreamAddress.StarkNet.Goerli:
        ctx = {"network": "starknet-testnet"}
    else:
        ctx = {"network": "starknet-mainnet"}

    await runner.run(LordsBridgeIndexer(config), ctx=ctx)
