import { hash, uint256 } from "https://esm.sh/starknet";
import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Starknet, Block, BlockHeader, EventWithTransaction } from "https://esm.sh/@apibara/indexer/starknet";
import type { Webhook } from "https://esm.sh/@apibara/indexer/sink/webhook";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Mongo } from "https://esm.sh/@apibara/indexer/sink/mongo";

export const config: Config<Starknet, Mongo> = {
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
    sinkType: "mongo",
    sinkOptions: {
        database: "mongo_goerli",
        collectionName: "beasts",
        entityMode: true,
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

    return [{
        entity: { tokenId },
        update: {
            $set: {
                tokenId,
                owner: event.data[1]
            },
        },
    }];
}