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
    entityMode: false,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, receipt }) => {
    const collectionId = Number(BigInt(event.data[1]));
    const tokenId = Number(BigInt(event.data[0]));
    return {
      hash: receipt.transactionHash,
      token_key:
        whitelistedContracts[collectionId - 1].toLowerCase() + ":" + tokenId,
      token_id: tokenId,
      collection_id: collectionId,
      price: Number(formatUnits(BigInt(event.data[2]), 18)),
      expiration: Number(BigInt(event.data[3])),
      active: Number(BigInt(event.data[4])),
    };
  });
}
