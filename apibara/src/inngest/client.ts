import { EventSchemas, Inngest } from "https://esm.sh/inngest";
import {
    Bson,
    MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const client = new MongoClient();

// Connecting to a Local Database
await client.connect("mongodb://apibara:apibara@127.0.0.1:27017");

type Events = {
    "nft/mint": {
        data: {
            address: string;
            tokenId: string;
        };
    };
}
export const inngest = new Inngest({
    name: "Beasts ERC721",
    eventKey: "local",
    schemas: new EventSchemas().fromRecord<Events>(),
});

export const db = client.database("mongo_goerli");
