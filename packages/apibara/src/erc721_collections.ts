import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { formatUnits } from "https://esm.sh/viem";

import {
  marketplaceContractEvents,
  marketplaceWhiteListEvents,
  ORDER_EVENT,
  OrderActionType,
  WHITELIST_EVENT,
} from "./utils.ts";

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("MARKET_STARTING_BLOCK")),
  authToken: Deno.env.get("AUTH_TOKEN"),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: [...marketplaceWhiteListEvents, ...marketplaceContractEvents],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_erc721_collections",
    entityMode: true,
  },
};
export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
  switch (event.keys[0]) {
    case WHITELIST_EVENT: {
      const collection = event.data[0];
      return {
        insert: {
          id: collection,
          marketplaceId: Number(BigInt(event.data[1])),
        },
      };
    }
    case ORDER_EVENT: {
      const type = Number(BigInt(event.data[7]));
      switch (type) {
        case OrderActionType.Accept:
          return {
            entity: {
              id: Number(BigInt(event.data[2])),
            },
            update: {
              allTimeVolume: formatUnits(BigInt(event.data[3]).toString(), 18), // need way to increment
            },
          };
      }
    }
  }
}
