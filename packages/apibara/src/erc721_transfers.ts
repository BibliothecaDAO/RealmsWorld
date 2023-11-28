import type { Config } from "https://esm.sh/@apibara/indexer@0.2.2";
import type { Postgres } from "https://esm.sh/@apibara/indexer@0.2.2/sink/postgres";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { uint256 } from "https://esm.sh/starknet";

import { erc721ContractEvents } from "./utils.ts";

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("ERC721_STARTING_BLOCK")),
  network: "starknet",
  batchSize: 1,
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: erc721ContractEvents,
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_erc721_transfers",
    entityMode: false,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(
  _header: BlockHeader,
  { event, transaction }: EventWithTransaction,
) {
  const from = BigInt(event.data[0]);
  if (from == 0n) {
    return [];
  }
  const token_id = parseInt(
    uint256.uint256ToBN({ low: event.data[2], high: event.data[3] }).toString(),
  );

  return {
    id: transaction.meta.hash,
    token_key: event.fromAddress + ":" + token_id,
    contract_address: event.fromAddress,
    token_id,
    fromAddress: event.data[0],
    toAddress: event.data[1],
  };
}
