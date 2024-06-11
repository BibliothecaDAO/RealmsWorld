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

const WITHDRAw_REQUEST_INITIATED = eventKey("WithdrawRequestCompleted");
const DEPOSIT_REQUEST_HANDLED = eventKey("DepositRequestInitiated");

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("ERC721_BRIDGE_STARTING_BLOCK")),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: [
      {
        fromAddress: Deno.env.get("ERC721_BRIDGE_CONTRACT") as `0x${string}`,
        keys: [
          hash.getSelectorFromName("WithdrawRequestCompleted") as `0x${string}`,
        ],
        includeTransaction: true,
        includeReceipt: true,
      },
      {
        fromAddress: Deno.env.get("ERC721_BRIDGE_CONTRACT") as `0x${string}`,
        keys: [
          hash.getSelectorFromName("DepositRequestInitiated") as `0x${string}`,
        ],
        includeTransaction: true,
        includeReceipt: true,
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "erc721_bridge",
    entityMode: false,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, receipt }) => {
    const [hashLow, hashHigh, l1Account, l2Account, idsLength, ...ids] =
      event.data;
    const tokenIds = [];
    for (let i = 0; i < ids.length; i += 2) {
      tokenIds.push(
        uint256
          .uint256ToBN({
            low: ids[i],
            high: ids[i + 1],
          })
          .toString(),
      );
    }
    switch (event.keys[0]) {
      case WITHDRAw_REQUEST_INITIATED: {
        return {
          type: "WithdrawRequestCompleted",
          hash: uint256
            .uint256ToBN({
              low: hashLow,
              high: hashHigh,
            })
            .toString(),
          l1Account,
          l2Account,
          tokenIds: tokenIds,
          timestamp: header?.timestamp,
        };
      }
      case DEPOSIT_REQUEST_HANDLED: {
        return {
          type: "DepositRequestInitiated",
          hash: uint256
            .uint256ToBN({
              low: hashLow,
              high: hashHigh,
            })
            .toString(),
          l1Account,
          l2Account,
          tokenIds: tokenIds,
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
