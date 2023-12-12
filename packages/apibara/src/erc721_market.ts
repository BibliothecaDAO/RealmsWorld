import type { Config } from "https://esm.sh/@apibara/indexer";
//import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import { hash, num } from "https://esm.sh/starknet";
import { formatUnits } from "https://esm.sh/viem";

import { whitelistedContracts } from "./utils.ts";

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
    events: [
      {
        fromAddress: Deno.env.get("MARKET_CONTRACT") as `0x${string}`,
        keys: [hash.getSelectorFromName("OrderEvent") as `0x${string}`],
        includeTransaction: false,
        includeReceipt: true,
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_erc721_market",
    entityMode: true,
  },
};

enum ActionType {
  Create = 0,
  Edit = 1,
  Cancel = 2,
  Accept = 3,
}

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, receipt }) => {
    const tokenId = Number(BigInt(event.data[1]));
    const collectionId = Number(BigInt(event.data[2]));
    const price = formatUnits(BigInt(event.data[3]).toString(), 18);
    const orderId = Number(BigInt(event.data[6]));
    const type = Number(BigInt(event.data[7]));

    switch (type) {
      case ActionType.Create:
        return {
          insert: {
            hash: receipt.transactionHash,
            token_key:
              whitelistedContracts[collectionId].toLowerCase() + ":" + tokenId,
            token_id: tokenId,
            collection_id: collectionId,
            created_by: event.data[0],
            price: price,
            expiration: Number(BigInt(event.data[4])),
            id: orderId,
            active: Boolean(BigInt(event.data[5])),
          },
        };
      case ActionType.Edit:
        return {
          entity: {
            id: orderId,
          },
          update: {
            price: price, //
          },
        };
      case ActionType.Cancel:
        return {
          entity: {
            id: orderId,
          },
          update: {
            active: Boolean(BigInt(event.data[5])),
          },
        };
      case ActionType.Accept:
        return {
          entity: {
            id: orderId,
          },
          update: {
            active: Boolean(BigInt(event.data[5])),
          },
        };
      default:
        console.warn("Unknown event", event.keys[0]);
        return [];
    }
  });
}
