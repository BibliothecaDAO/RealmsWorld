import type { Config } from "https://esm.sh/@apibara/indexer";
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
    targetUrl:
      "https://inn.gs/e/AAsyCjec-tEzHLvJ8m9f8t9_N2tnPNcpls5YA_CHKUD1hll64X9cw1Le4UbY2qp5IVyiPsNHMiG57V7-3701CQ",
    raw: true,
    header: ["x-inngest-env: LS-updates"],
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
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
}
