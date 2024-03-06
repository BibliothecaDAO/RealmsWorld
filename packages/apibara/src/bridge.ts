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

const WITHDRAWAL_INITIATED = eventKey("WithdrawalInitiated");
const DEPOSIT_HANDLED = eventKey("DepositHandled");

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("BRIDGE_STARTING_BLOCK")),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: [
      {
        fromAddress: Deno.env.get("BRIDGE_CONTRACT") as `0x${string}`,
        keys: [
          hash.getSelectorFromName("WithdrawalInitiated") as `0x${string}`,
        ],
        includeTransaction: true,
        includeReceipt: true,
      },
      {
        fromAddress: Deno.env.get("BRIDGE_CONTRACT") as `0x${string}`,
        keys: [hash.getSelectorFromName("DepositHandled") as `0x${string}`],
        includeTransaction: true,
        includeReceipt: true,
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_bridge",
    entityMode: false,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, receipt }) => {
    if (!event.keys[0]) return {};
    switch (event.keys[0]) {
      case WITHDRAWAL_INITIATED: {
        return {
          type: "WithdrawalInitiated",
          hash: receipt.transactionHash,
          l1Account: event.data[0],
          l2Account: receipt.events[0].data[0],
          amount: +formatUnits(
            uint256.uint256ToBN({ low: event.data[1], high: event.data[2] }),
            18,
          ),
          timestamp: header?.timestamp,
        };
      }
      case DEPOSIT_HANDLED: {
        return {
          type: "DepositHandled",
          hash: receipt.transactionHash,
          l2Account: event.data[0],
          amount: +formatUnits(
            uint256.uint256ToBN({ low: event.data[1], high: event.data[2] }),
            18,
          ),
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
