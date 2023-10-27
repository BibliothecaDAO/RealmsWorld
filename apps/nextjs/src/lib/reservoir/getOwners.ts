import { RESERVOIR_API_URL } from "@/constants/env";

export const getOwners = async ({ collection }: { collection: string }) => {
  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/owners/v2?contract=${collection}&limit=50`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY || "",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    const data: any = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
