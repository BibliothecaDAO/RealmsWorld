import { formatQueryString } from "@/utils/utils";

export const getCollections = async (contracts: { contract: string }[]) => {
  let queryParams;
  queryParams = formatQueryString(contracts);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESERVOIR_API}/collections/v5?${queryParams}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY || "",
          "Access-Control-Allow-Origin": "*",
        },
        next: { revalidate: 60 },
      },
    );
    const data: any = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
