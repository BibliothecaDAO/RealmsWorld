import { RESERVOIR_API_URL } from "@/constants/env";
import { reservoirLootCollectionSetId } from "@/constants/erc721Tokens";

export const getUser = async ({
  address,
  continuation,
}: {
  address: string;
  continuation: any;
}) => {
  try {
    const queryString = continuation ? `&continuation=${continuation}` : "";

    const url = `${RESERVOIR_API_URL}/users/${address}/tokens/v7?collectionsSetId=${reservoirLootCollectionSetId}&${queryString}&limit=24`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.RESERVOIR_API_KEY ?? "",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data: any = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
