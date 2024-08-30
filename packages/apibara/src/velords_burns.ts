import type { Config } from "https://esm.sh/@apibara/indexer";
//import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
//import type { Webhook } from "https://esm.sh/@apibara/indexer/sink/webhook";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import { hash, uint256 } from "https://esm.sh/starknet";
import { formatUnits } from "https://esm.sh/viem@1.2.7";

function eventKey(name: string) {
  const h = BigInt(hash.getSelectorFromName(name));
  return `0x${h.toString(16).padStart(64, "0")}`;
}

const REWARD_RECEIVED = eventKey("RewardReceived");

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("VELORDS_STARTING_BLOCK")),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: [
      {
        fromAddress: Deno.env.get("REWARDS_POOL_CONTRACT") as `0x${string}`,
        keys: [hash.getSelectorFromName("RewardReceived") as `0x${string}`],
        includeReceipt: false,
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "velords_burns",
    entityMode: false,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, transaction }) => {
    const transactionHash = transaction.meta.hash;
    const [amountLow, amountHigh] = event.data;
    const amountRaw = uint256.uint256ToBN({ low: amountLow, high: amountHigh });
    const amount = formatUnits(amountRaw, 18);
    switch (event.keys[0]) {
      case REWARD_RECEIVED: {
        return {
          hash: transactionHash,
          sender: event.keys[0],
          amount: amount,
          timestamp: header?.timestamp,
        };
      }
      default: {
        console.warn("Unknown event", event.keys[0]);
        return {};
      }
    }
  });
}
