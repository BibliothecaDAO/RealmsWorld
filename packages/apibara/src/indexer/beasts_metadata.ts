import { hash, uint256 } from "https://esm.sh/starknet";
import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Starknet, Block, BlockHeader, EventWithTransaction } from "https://esm.sh/@apibara/indexer/starknet";
import type { Webhook } from "https://esm.sh/@apibara/indexer/sink/webhook";
import { FieldElement } from 'https://esm.sh/@apibara/starknet'
export const config: Config<Starknet, Webhook> = {
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
                keys: [hash.getSelectorFromName("Transfer") as `0x${string}`]
            },
        ],
    },
    sinkType: "webhook",
    sinkOptions: {
        targetUrl: "http://localhost:8288/e/local",
        raw: true,
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
    const tokenId = uint256.uint256ToBN({ low: event.data[2], high: event.data[3] }).toString();
    if (tokenId == "1") {
        return [{
            name: "nft/mint",
            data: {
                address: event.fromAddress,
                tokenId,
            },
        }];
    }
}