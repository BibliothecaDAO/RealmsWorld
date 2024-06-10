import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { uint256 } from "https://esm.sh/starknet";
import { formatUnits } from "https://esm.sh/viem";

import {
  erc721ContractEvents,
  marketplaceContractEvents,
  ORDER_EVENT,
  OrderActionType,
  TRANSFER_EVENT,
  whitelistedContracts,
} from "./utils.ts";

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("ERC721_STARTING_BLOCK")),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: [...erc721ContractEvents],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "erc721_tokens",
    entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
  const isMainnet =
    Deno.env.get("STREAM_URL") == "https://mainnet.starknet.a5a.ch";
  const isData = event.data != undefined;

  const from = BigInt(isData ? event.data[0] : event.keys[1]);
  const token_id = parseInt(
    uint256
      .uint256ToBN({
        low: isData ? event.data[2] : event.keys[3],
        high: isData ? event.data[3] : event.keys[4],
      })
      .toString(),
  );
  const owner = isData ? event.data[1] : event.keys[2];

  if (from == 0n) {
    return {
      insert: {
        id: event.fromAddress + ":" + token_id,
        contract_address: event.fromAddress,
        token_id,
        minter: owner,
        owner: owner,
      },
    };
  } else {
    console.log(event.fromAddress);
    return {
      entity: {
        id: event.fromAddress + ":" + token_id,
      },
      update: {
        owner: owner,
        price: null,
        expiration: null,
      },
    };
  }

  //Refactor to market indexer once apibara multi-table indexers availble
}
