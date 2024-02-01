import { RESERVOIR_API_URL } from "@/constants/env";
import { formatQueryString } from "@/utils/utils";

export const getActivity = async ({
  collection,
  query,
}: {
  collection: string;
  query: any;
}) => {
  try {
    const res = await fetch(
      `${RESERVOIR_API_URL}/collections/activity/v5?collection=${collection}&${formatQueryString(
        query.types,
        "types",
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY ?? "",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    const data: any = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
