import { inngest } from "./client.ts";
import { shortString } from "https://esm.sh/starknet";
import sql from './db.ts'
import { Client } from "https://esm.sh/ts-postgres";

export const fetchMetadata = inngest.createFunction(
    { name: "fetchMetadata" },
    { event: "nft/mint" },
    async ({ event, step }) => {
        // ⚡ Use `step.run` to asynchronously run a that may fail. Inngest will
        // automatically retry it if it fails.
        const metadataUrl = await step.run("Fetch token URL", () => {
            // Here we could fetch the metadata URL from the node using an RPC call.
            return `https://starknet-goerli.infura.io/v3/badbe99a05ad427a9ddbbed9e002caf6`
        });

        const metadata = await step.run("Fetch metadata", async () => {
            const response = await fetch(metadataUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method: "starknet_call",
                    params: [
                        {
                            contract_address: "0x06fe9215a0f193431f30043e612d921b62331946529ebf5f258949a4b34aa799",
                            entry_point_selector: "0x12a7823b0c6bee58f8c694888f32f862c6584caa8afa0242de046d298ba684d",
                            calldata: [
                                '0x' + event.data.tokenId.toString(), "0x0"
                            ]
                        },
                        "pending"
                    ],
                    id: 0
                })
            });
            return await response.json();
        });


        if (metadata.error) {
            console.log(metadata.error)
            await step.sleep("10s");
            throw new Error("Failed to fetch item from Infura API");
        }

        const value: any = [];
        for (let i = 2; i < metadata.result.length; i++) {
            const result = shortString.decodeShortString(metadata.result[i]);
            value.push(result);
        }
        const json = value.join('').replace('"0%200"%20', '') // //.replace('""', '"\'').replace('"%20', '\' ') // tokenID 96+ still not indexing
        const { image, attributes } = JSON.parse(json)

        const flattenedAttributes: { [key: string]: string } = {};

        for (const attribute of attributes) {
            flattenedAttributes[attribute.trait_type] = attribute.value;
        }

        const dbRes = await step.run("Insert Beast Metadata to Mongo", async () => {
            const client = new Client({ host: 'localhost', password: 'postgres', database: 'postgres', port: 5432, user: 'postgres' });
            await client.connect();
            const query = await client.query(
                "update beasts set image = $1 where token_id = $2",
                [image, event.data.tokenId.toString()]
            );

            /*const beasts = db.collection("beasts");
            const insertId = await beasts.updateOne(
                { tokenId: event.data.tokenId.toString() },
                {
                    $set: {
                        image,
                        ...flattenedAttributes
                    }
                });*/

            await client.end();

            return query

        })
        return {
            event,
            body: flattenedAttributes,
            res: dbRes
        }
    },
);