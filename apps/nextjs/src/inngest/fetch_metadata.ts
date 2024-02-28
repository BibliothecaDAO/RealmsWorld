/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  hash,
  shortString,
  uint256,
} from "starknet";

import type { SQL } from "@realms-world/db";
import { Collections, getCollectionAddresses } from "@realms-world/constants";
import { and, db, eq, inArray, schema, sql } from "@realms-world/db";

//import blobertABI from "../abi/L2/Blobert.json";
//import { Client } from "https://esm.sh/ts-postgres";

import { inngest } from "./client";

function eventKey(name: string) {
  const h = BigInt(hash.getSelectorFromName(name));
  return `0x${h.toString(16).padStart(64, "0")}`;
}

export const tokenURI = eventKey("tokenURI");
export const token_uri = eventKey("token_uri");
export const svg_image = eventKey("svg_image");

export const fetchMetadata = inngest.createFunction(
  {
    name: "fetchMetadata",
    id: "fetchMeta",
    concurrency: {
      limit: 3,
    },
    retries: 1,
  },
  { event: "nft/mint" },
  async ({ event, step }) => {
    const providerUrl = `https://starknet-${!process.env.NEXT_PUBLIC_IS_TESTNET || process.env.NEXT_PUBLIC_IS_TESTNET == "false" ? "mainnet" : "sepolia"}.blastapi.io/${process.env.NEXT_PUBLIC_BLAST_API}`;/* `https://starknet-mainnet.blastapi.io/${process.env.NEXT_PUBLIC_BLAST_API}`;*/
    /*const provider = new RpcProvider({
      nodeUrl: providerUrl,
    });*/
    const tokenId = uint256.bnToUint256(BigInt(event.data.tokenId.toString()));

    const metadata = await step.run("Fetch metadata", async () => {
      const response = await fetch(providerUrl, {
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
                /*"0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",*/ event
                  .data.contract_address,
              entry_point_selector: getCollectionAddresses(Collections.BEASTS)[
                SUPPORTED_L2_CHAIN_ID
              ] == event
              .data.contract_address
                ? tokenURI
                : token_uri, // Token URI
              calldata: [tokenId.low, tokenId.high],
            },
            "pending",
          ],
          id: 0,
        }),
      });
      return await response.json();
    });
    let svgImage: any = {};

    if (metadata.error) {
      if (
        event.data.contract_address ==
        getCollectionAddresses(Collections.BLOBERT)[SUPPORTED_L2_CHAIN_ID]!
      ) {
        console.log("fetch svg image");
        const response = await fetch(providerUrl, {
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
                  /*"0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",*/ event
                    .data.contract_address,
                entry_point_selector: svg_image, // Token URI
                calldata: [tokenId.low, tokenId.high],
              },
              "pending",
            ],
            id: 0,
          }),
        });
        const responseJson = await response.json();
        svgImage = responseJson;
      } else {
        console.log(metadata.error);
        await step.sleep("fetch sleep", "20s");
        throw new Error("Failed to fetch item from Blast API");
      }
    }
    const value: any = [];
    let jsonString: string;
    let parsedJson: any = {};
    const flattenedAttributes: Record<string, string> = {};

    if (
      event.data.contract_address ==
      getCollectionAddresses(Collections.BLOBERT)[SUPPORTED_L2_CHAIN_ID]!
    ) {

      const metaFetched = svgImage.result ?? metadata.result;

      if (svgImage.result) {
        for (let i = 1; i < metaFetched.length - 1; i++) {
          value.push(shortString.decodeShortString(metaFetched[i]));
        }
        parsedJson.image = "data:image/svg+xml;utf8," + value.join("");
      } else {
        metadata.result.forEach((result: any) => {
          value.push(shortString.decodeShortString(result));
        });
        value.push(metaFetched.pending_word);
        jsonString = atob(value.join("").substring(29));
        if (jsonString.endsWith('Ó')) {
          jsonString = jsonString.slice(0, -1);
      }
        parsedJson = JSON.parse(jsonString);
      }
      parsedJson.attributes = parsedJson.attributes?.map((attribute: any) => {
        if (attribute.trait) {
          return {
            trait_type: attribute.trait,
            value: attribute.value,
          };
        }
      });
      if (metadata.result && parsedJson.attributes?.[0] == undefined) {
        parsedJson.attributes = [
          { trait_type: "Honorary", value: parsedJson.name },
        ];
      }
      //console.log(flattenedAttributes);

      /*const blobertContract = new Contract(
        blobertABI,
        "0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1", //event.data.contract_address,
        provider,
      );

      const traitsResponse = await blobertContract.traits(tokenId);
      console.log(traitsResponse);

      if (traitsResponse.variant.Custom != undefined) {
        parsedJson.attributes.push({
          trait_type: "Honorary",
          value: traitsResponse.variant.Custom,
        });
      } else {
        for (const [key, value] of Object.entries(
          traitsResponse.variant.Regular,
        )) {
          parsedJson.attributes.push({
            trait_type: Object.keys(value)[0],
            value: value[Object.keys(value)[0]],
          });
        }
      }*/
    } else {
      for (let i = 2; i < metadata.result.length; i++) {
        const result = shortString.decodeShortString(metadata.result[i]);
        value.push(result);
      }
      jsonString = value.join("");

      // eslint-disable-next-line no-control-regex
      const regex = new RegExp("\\u0015", "g");
      jsonString = jsonString
        .replace(
          /"name":"(.*?)",/g,
          (match: any, name: any) => `"name":"${name.replaceAll('"', '\\"')}",`,
        )
        .replace(regex, "");
      //}
      parsedJson = JSON.parse(jsonString);
      if (parsedJson.attributes) {
        for (const attribute of parsedJson.attributes) {
          flattenedAttributes[attribute.trait_type] = attribute.value;
        }
      }
    }

    const dbRes = await step.run(
      "Insert Token Metadata to Postgres",
      async () => {
        const tokenKey = event.data.contract_address + ":" + event.data.tokenId;
        const query: { updatedId: string }[] = await db
          .update(schema.erc721Tokens)
          .set({
            image: parsedJson.image,
            name: parsedJson.name,
            //metadata: { attributes: parsedJson.attributes },
          })
          .where(
            and(eq(schema.erc721Tokens.id, tokenKey), sql`upper_inf(_cursor)`),
          )
          .returning({ updatedId: schema.erc721Tokens.id });

        let attributeKeyResult: { updatedId: number | null }[] = [];
        let attributesResult: { id: number | null }[] = [];
        let tokenAttributeResult: { key: string | null }[] = [];
        const attributesCountMap: Record<number, { tokenCount: number }> = {};
        const addedTokenAttributes = [];
        const tokenAttributeCounter = [];
        const attributeKeyQuery = await db
          .select({
            id: schema.erc721AttributeKeys.id,
            key: schema.erc721AttributeKeys.key,
            attributeCount: schema.erc721AttributeKeys.attributeCount,
          })
          .from(schema.erc721AttributeKeys)
          .where(
            eq(
              schema.erc721AttributeKeys.collectionId,
              event.data.contract_address,
            ),
          );

        /*const attributeKeysIdsMap = attributeKeyQuery.map((a) => ({
          [a.key ?? "-"]: { id: a.id },
        }));*/

        const attributeKeysIdsMap = attributeKeyQuery.reduce(
          (acc, a) => {
            acc[a.key] = { id: a.id, attributeCount: a.attributeCount };
            return acc;
          },
          {} as Record<string, { id: number; attributeCount: number }>,
        );

        if (parsedJson.attributes) {
          for (const attribute of parsedJson.attributes) {
            //Insert new AttributeKey
            if (
              !Object.keys(attributeKeysIdsMap).includes(attribute.trait_type)
            ) {
              attributeKeyResult = await db
                .insert(schema.erc721AttributeKeys)
                .values({
                  key: attribute.trait_type,
                  kind: typeof attribute.value,
                  collectionId: event.data.contract_address,
                })
                .onConflictDoNothing()
                .returning({ updatedId: schema.erc721AttributeKeys.id });

              //Add new Attribute Keys to IdMap
              if (attributeKeyResult[0]?.updatedId) {
                attributeKeysIdsMap[attribute.trait_type] = {
                  id: attributeKeyResult[0]?.updatedId,
                  attributeCount: 0,
                };
              }
            }
            const attributeKey = attributeKeysIdsMap[attribute.trait_type];
            if (attributeKey?.id) {
              //Fetch Existing Attribute for attribute Key + value
              const attributesQuery = await db
                .select({
                  id: schema.erc721Attributes.id,
                  tokenCount: schema.erc721Attributes.tokenCount,
                })
                .from(schema.erc721Attributes)
                .where(
                  and(
                    eq(schema.erc721Attributes.attributeKeyId, attributeKey.id),
                    eq(schema.erc721Attributes.value, attribute.value),
                  ),
                );

              // Add queried Atttributes to counts map
              if (attributesQuery[0]?.id) {
                attributesCountMap[attributesQuery[0].id] = {
                  tokenCount: attributesQuery[0].tokenCount ?? 0,
                };
              }

              // Insert Attribute if doesnt Exist
              if (!attributesQuery[0]?.id) {
                attributesResult = await db
                  .insert(schema.erc721Attributes)
                  .values({
                    kind: typeof attribute.value,
                    key: attribute.trait_type,
                    value: attribute.value,
                    collectionId: event.data.contract_address,
                    attributeKeyId: attributeKey.id, //
                  })
                  .onConflictDoNothing()
                  .returning({ id: schema.erc721Attributes.id });

                //Update count of attribute keys
                await db
                  .update(schema.erc721AttributeKeys)
                  .set({
                    attributeCount: attributeKey?.attributeCount + 1,
                  })
                  .where(eq(schema.erc721AttributeKeys.id, attributeKey.id))
                  .returning({ updatedId: schema.erc721AttributeKeys.id });

                // Add to attributes count map

                if (attributesResult[0]?.id) {
                  attributesCountMap[attributesResult[0]?.id] = {
                    tokenCount: 0,
                  };
                }
              }
              // Insert Token
              addedTokenAttributes.push({
                token_key: tokenKey,
                key: attribute.trait_type,
                value: attribute.value,
                collectionId: event.data.contract_address,
                attributeId: attributesResult[0]?.id ?? attributesQuery[0]?.id,
              });
            }
          }

          tokenAttributeResult = await db
            .insert(schema.erc721TokenAttributes)
            .values(addedTokenAttributes)
            .onConflictDoNothing()
            .returning({
              key: schema.erc721TokenAttributes.key,
              value: schema.erc721TokenAttributes.value,
              attributeId: schema.erc721TokenAttributes.attributeId,
            });

          if (tokenAttributeResult[0]?.key && attributesResult[0]?.id) {
            tokenAttributeCounter.push({
              id: attributesResult[0].id,
              count: 1,
            });
          }
          if (Object.keys(attributesCountMap)) {
            const sqlChunks: SQL[] = [];
            const ids: number[] = [];
            sqlChunks.push(sql`(case`);
            for (const key in attributesCountMap) {
              sqlChunks.push(
                sql.raw(
                  `when id = ${key} then ${
                    (attributesCountMap[key]?.tokenCount ?? 0) + 1
                  }`,
                ),
              );
              ids.push(parseInt(key));
            }
            sqlChunks.push(sql`end)`);
            const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));
            await db
              .update(schema.erc721Attributes)
              .set({ tokenCount: finalSql })
              .where(inArray(schema.erc721Attributes.id, ids));
          }
        }
        return {
          token: query[0]?.updatedId,
          attributeKey: attributeKeyResult[0]?.updatedId,
          //tokenAttribute: tokenAttributeQuery[0]?.updatedId,
        };
      },
    );
    if (!dbRes) {
      await step.sleep("fetch sleep", "30s");
      throw new Error("Failed to update item in Postgres");
    }
    return NextResponse.json({
      event,
      body: dbRes,
      res: dbRes,
    });
  },
);
