import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
//import type { Webhook } from "https://esm.sh/@apibara/indexer/sink/webhook";
import type { Block, Starknet } from "https://esm.sh/@apibara/indexer/starknet";
import { hash, uint256 } from "https://esm.sh/starknet";
import { formatUnits } from "https://esm.sh/viem@1.4";

import { whitelistedContracts } from "./utils.ts";

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
        fromAddress: whitelistedContracts[4] as `0x${string}`,
        keys: [hash.getSelectorFromName("RewardClaimed") as `0x${string}`],
        includeReceipt: false,
      },
    ],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "lords_rewards",
    entityMode: false,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap(({ event, transaction }) => {
    const [amountLow, amountHigh] = event.data;
    const recipient = event.keys[0];
    const amountRaw = uint256.uint256ToBN({ low: amountLow, high: amountHigh });
    const amount = formatUnits(amountRaw, 18);
    const transactionHash = transaction.meta.hash;
    return {
      hash: transactionHash,
      recipient,
      amount: +amount,
      timestamp: header?.timestamp,
    };
  });
}
