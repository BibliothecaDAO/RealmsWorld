import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
import type { Webhook } from "https://esm.sh/@apibara/indexer/sink/webhook";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { hash, uint256 } from "https://esm.sh/starknet";

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("BEASTS_STARTING_BLOCK")),
  network: "starknet",
  filter: {
    header: {
      weak: true,
    },
    events: [
      {
        fromAddress: Deno.env.get("BEASTS_CONTRACT") as `0x${string}`,
        keys: [hash.getSelectorFromName("Transfer") as `0x${string}`],
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_beasts",
  },
};

export default function transform({ header, events }: Block) {
  return events.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
  const from = BigInt(event.data[0]);
  if (from !== 0n) {
    return [];
  }
  const token_id = parseInt(
    uint256.uint256ToBN({ low: event.data[2], high: event.data[3] }),
  );

  return {
    token_id,
    owner: event.data[1],
  };
}
