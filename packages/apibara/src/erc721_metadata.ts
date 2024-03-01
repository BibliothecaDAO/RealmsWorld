import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Webhook } from "https://esm.sh/@apibara/indexer/sink/webhook";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { uint256 } from "https://esm.sh/starknet";

import { erc721ContractEvents } from "./utils.ts";

export const config: Config<Starknet, Webhook> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("ERC721_STARTING_BLOCK")),
  network: "starknet",
  filter: {
    header: {
      weak: true,
    },
    events: erc721ContractEvents,
  },
  sinkType: "webhook",
  sinkOptions: {
    targetUrl: "https://inn.gs/e/" + Deno.env.get("INNGEST_EVENT_KEY"), //"http://localhost:8288/e/local",
    raw: true,
    header: [
      Deno.env.get("INNGEST_ENV") == "production"
        ? "test: test"
        : "x-inngest-env: " + Deno.env.get("INNGEST_ENV"),
    ],
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
  if (event.data) {
    const from = BigInt(event.data[0]);
    if (from !== 0n) {
      return [];
    }
    const tokenId = uint256
      .uint256ToBN({ low: event.data[2], high: event.data[3] })
      .toString();
    return [
      {
        name: "nft/mint",
        data: {
          contract_address: event.fromAddress,
          tokenId,
        },
      },
    ];
  } else if (event.keys?.length) {
    const from = BigInt(event.keys[1]);
    if (from !== 0n) {
      return [];
    }
    const tokenId = uint256
      .uint256ToBN({ low: event.keys[3], high: event.keys[4] })
      .toString();

    //if (tokenId == 6) {
    return [
      {
        name: "nft/mint",
        data: {
          contract_address: event.fromAddress,
          tokenId,
        },
      },
    ];
    //}
  }
}
