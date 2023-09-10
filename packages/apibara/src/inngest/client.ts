import { EventSchemas, Inngest } from "https://esm.sh/inngest";
import postgres from "https://esm.sh/postgres";


// Connecting to a Local Database
export const sql = postgres('postgres://postgres:postgres@postgres:5432/postgres')

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

