import type { Config } from "https://esm.sh/@apibara/indexer";
//import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import { formatUnits } from "https://esm.sh/viem";

import {
  marketplaceContractEvents,
  OrderActionType,
  whitelistedContracts,
} from "./utils.ts";

//TODO Better path for contract addresses

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("MARKET_STARTING_BLOCK")),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: marketplaceContractEvents,
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_erc721_market_events",
    entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, receipt }) => {
    const tokenId = Number(BigInt(event.data[1]));
    const collectionId = Number(BigInt(event.data[2]));
    const price = formatUnits(BigInt(event.data[3]).toString(), 18);
    const orderId = Number(BigInt(event.data[6]));
    const type = Number(BigInt(event.data[7]));

    switch (type) {
      case OrderActionType.Create:
        return {
          insert: {
            hash: receipt.transactionHash,
            token_key:
              whitelistedContracts[collectionId - 1].toLowerCase() +
              ":" +
              tokenId,
            token_id: tokenId,
            collection_id: collectionId,
            created_by: event.data[0],
            updated_at: header?.timestamp,
            price: price,
            expiration: Number(BigInt(event.data[4])),
            id: orderId,
            active: Boolean(BigInt(event.data[5])),
            status: "open",
          },
        };
      case OrderActionType.Edit:
        return {
          entity: {
            id: orderId,
          },
          update: {
            price: price, //
            updated_at: header?.timestamp,
          },
        };
      case OrderActionType.Cancel:
        return {
          entity: {
            id: orderId,
          },
          update: {
            active: Boolean(BigInt(event.data[5])),
            status: "cancelled",
            updated_at: header?.timestamp,
          },
        };
      case OrderActionType.Accept:
        return {
          entity: {
            id: orderId,
          },
          update: {
            finalize_hash: receipt.transactionHash,
            purchaser: receipt.events[0].data[0],
            active: Boolean(BigInt(event.data[5])),
            status: "filled",
            updated_at: header?.timestamp,
          },
        };
      default:
        console.warn("Unknown event", event.keys[0]);
        return [];
    }
  });
}
