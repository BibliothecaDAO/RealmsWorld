import type { paths } from "@reservoir0x/reservoir-sdk";
import { RESERVOIR_API_URL, SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { env } from "@/env";

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

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.NEXT_PUBLIC_RESERVOIR_API_KEY,
        "Access-Control-Allow-Origin": "*",
      },
      next: { revalidate: 10 },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (e) {
    throw new Error("User Tokens not found" + (e as string));
  }
};
