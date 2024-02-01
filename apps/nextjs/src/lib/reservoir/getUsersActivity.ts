import { RESERVOIR_API_URL } from "@/constants/env";
import { reservoirLootCollectionSetId } from "@/constants/erc721Tokens";

export const getUsersActivity = async ({ address }: { address: string }) => {
  try {
    const url = `${RESERVOIR_API_URL}/users/activity/v6?users=${address}&collectionsSetId=${reservoirLootCollectionSetId}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.RESERVOIR_API_KEY ?? "",
        "Access-Control-Allow-Origin": "*",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    return error;
  }
};
