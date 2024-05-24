import "server-only";

import type { paths } from "@reservoir0x/reservoir-sdk";
import {
  RESERVOIR_API_URL,
  SUPPORTED_L1_CHAIN_ID,
  SUPPORTED_L2_CHAIN_ID,
} from "@/constants/env";
import { reservoirLootCollectionSetId } from "@/constants/erc721Tokens";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

export const getUser = async ({
  address,
  continuation,
}: {
  address: string;
  continuation?: string;
}): Promise<
  paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"]
> => {
  try {
    const queryString = continuation ? `&continuation=${continuation}` : "";
    const url = `${RESERVOIR_API_URL}/users/${address}/tokens/v10?collection=${getCollectionAddresses(Collections.REALMS)?.[SUPPORTED_L1_CHAIN_ID]?.toLowerCase()}${queryString}&limit=24`;

    //const url = `${RESERVOIR_API_URL}/users/${address}/tokens/v7?${queryString}&limit=24`;
    console.log(url);
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.RESERVOIR_API_KEY ?? "",
        "Access-Control-Allow-Origin": "*",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    throw new Error("User Tokens not found");
  }
};
