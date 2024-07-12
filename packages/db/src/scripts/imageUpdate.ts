import { and, eq, isNull, sql } from "drizzle-orm";
import { hash, shortString, uint256 } from "starknet";

import {
  ChainId,
  Collections,
  getCollectionAddresses,
} from "@realms-world/constants";

import { db } from "../client";
import { erc721MarketEvents, erc721Tokens } from "../schema";

function eventKey(name: string) {
  const h = BigInt(hash.getSelectorFromName(name));
  return `0x${h.toString(16).padStart(64, "0")}`;
}

async function updateTokensImage() {
  const providerUrl = `https://starknet-${process.env.NEXT_PUBLIC_IS_TESTNET == "false" ? "mainnet" : "sepolia"}.blastapi.io/${process.env.NEXT_PUBLIC_BLAST_API}`; /* `https://starknet-mainnet.blastapi.io/${process.env.NEXT_PUBLIC_BLAST_API}`;*/
  const tokenURI = eventKey("tokenURI");
  const token_uri = eventKey("token_uri");
  const svg_image = eventKey("svg_image");

  const tokens = await db.query.erc721Tokens.findMany({
    where: and(isNull(erc721Tokens.image), sql`upper_inf(_cursor)`),
  });

  for (const token of tokens) {
    //if (token.expiration && token.expiration < now) {
    // Token's current price is expired, search for new lowest non-expired price
    const tokenId = uint256.bnToUint256(BigInt(token.token_id));
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
            contract_address: token.contract_address,
            entry_point_selector:
              getCollectionAddresses(Collections.BEASTS)?.[ChainId.MAINNET] ==
              token.contract_address
                ? tokenURI
                : token_uri, // Token URI
            calldata: [tokenId.low, tokenId.high],
          },
          "pending",
        ],
        id: 0,
      }),
    });
    const metadata = await response.json();

    if (metadata) {
      const value: any = [];
      let jsonString: string;
      let parsedJson: any = {};
      metadata.result.forEach((result: any) => {
        value.push(shortString.decodeShortString(result));
      });
      if (metadata.pending_word) {
        value.push(metadata.pending_word);
      }
      // Join the array elements, skipping the first and last elements
      jsonString = value.slice(1, -1).join("").replace(/0+$/, "");

      // Remove the "data:application/json;base64," prefix
      jsonString = jsonString.substring(29);
      // Decode the base64 string
      jsonString = atob(jsonString);
      // Remove the trailing character if it exists
      if (jsonString.endsWith("Ó")) {
        jsonString = jsonString.slice(0, -1);
      }

      parsedJson = JSON.parse(jsonString);
      console.log(parsedJson.name);

      await db
        .update(erc721Tokens)
        .set({ image: parsedJson.image, name: parsedJson.name })
        .where(and(eq(erc721Tokens.id, token.id), sql`upper_inf(_cursor)`));
    } else {
      console.log("no metadata");
    }
    //}
  }
}

updateTokensImage().catch(console.error);
