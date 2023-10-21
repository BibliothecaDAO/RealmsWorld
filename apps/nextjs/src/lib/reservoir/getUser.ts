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

    const url = `${process.env.NEXT_PUBLIC_RESERVOIR_API}/users/${address}/tokens/v7?collectionsSetId=${reservoirLootCollectionSetId}&${queryString}&limit=24`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.RESERVOIR_API_KEY || "",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data: any = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
