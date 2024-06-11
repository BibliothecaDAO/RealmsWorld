import { RESERVOIR_API_URL } from "@/constants/env";
import { env } from "@/env";

export const getOwnersDistribution = async ({
  collection,
}: {
  collection: string;
}) => {
  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/collections/${collection}/owners-distribution/v1`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.NEXT_PUBLIC_RESERVOIR_API_KEY,
          "Access-Control-Allow-Origin": "*",
        },
        next: { revalidate: 1000 },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    return error;
  }
};
