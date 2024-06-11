import type { paths } from "@reservoir0x/reservoir-sdk";
import { RESERVOIR_API_URL } from "@/constants/env";
import { env } from "@/env";
import { formatQueryString } from "@/utils/utils";

export const getCollections = async (
  contracts: { contract: string }[],
): Promise<paths["/collections/v5"]["get"]["responses"]["200"]["schema"]> => {
  const queryParams = formatQueryString(contracts);

  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/collections/v5?${queryParams}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.NEXT_PUBLIC_RESERVOIR_API_KEY,
          "Access-Control-Allow-Origin": "*",
        },
        next: { revalidate: 60 },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    throw new Error("Collection not found");
  }
};
