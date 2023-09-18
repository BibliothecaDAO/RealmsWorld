import { shortString } from "starknet";

//import { Client } from "https://esm.sh/ts-postgres";

import { inngest } from "./client";
import client from "./db";

export const fetchMetadata = inngest.createFunction(
  { name: "fetchMetadata" },
  { event: "nft/mint" },
  async ({ event, step }) => {
    // ⚡ Use `step.run` to asynchronously run a that may fail. Inngest will
    // automatically retry it if it fails.
    const metadataUrl = await step.run("Fetch token URL", () => {
      // Here we could fetch the metadata URL from the node using an RPC call.
      return `https://starknet-goerli.infura.io/v3/badbe99a05ad427a9ddbbed9e002caf6`;
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
              contract_address:
                "0x0712825f3ce0bedfdbcb31b2de044ad209163265a10cf11c64573741a4b588d2",
              entry_point_selector:
                "0x12a7823b0c6bee58f8c694888f32f862c6584caa8afa0242de046d298ba684d", // Transfer
              calldata: ["0x" + event.data.tokenId.toString(), "0x0"],
            },
            "pending",
          ],
          id: 0,
        }),
      });
      return await response.json();
    });

    if (metadata.error) {
      console.log(metadata.error);
      await step.sleep("10s");
      throw new Error("Failed to fetch item from Infura API");
    }

    const value: any = [];
    for (let i = 2; i < metadata.result.length; i++) {
      let result = shortString.decodeShortString(metadata.result[i]);
      value.push(result);
    }

    const jsonString = value.join("");
    const regex = new RegExp("\\u0015", "g");
    const modifiedJsonString = jsonString
      .replace(
        /"name":"(.*?)"\,/g,
        (match, name) => `"name":"${name.replaceAll('"', '\\"')}",`,
      )
      .replace(regex, "");

    const parsedJson = JSON.parse(modifiedJsonString);
    const flattenedAttributes: { [key: string]: string } = {};

    for (const attribute of parsedJson.attributes) {
      flattenedAttributes[attribute.trait_type] = attribute.value;
    }

    /* PGHOST='ep-frosty-sea-90384545.us-east-2.aws.neon.tech'
  PGDATABASE='neondb'
  PGUSER='RedBeardEth'
  PGPASSWORD='1mbJAUqlo5NS'
  ENDPOINT_ID='ep-frosty-sea-90384545'*/

    const dbRes = await step.run("Insert Beast Metadata to Mongo", async () => {
      const query = await client(
        "update rw_beasts set image = $1, metadata = $2, name=$3 where token_id = $4",
        [
          parsedJson.image,
          flattenedAttributes,
          parsedJson.name,
          event.data.tokenId,
        ],
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

      return query;
    });
    return {
      event,
      body: flattenedAttributes,
      res: dbRes,
    };
  },
);
