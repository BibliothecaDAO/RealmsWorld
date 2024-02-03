import { RESERVOIR_API_URL } from "@/constants/env";

export const getAttributes = async ({ collection }: { collection: string }) => {
  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/collections/${collection}/attributes/all/v3`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY ?? "",
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
