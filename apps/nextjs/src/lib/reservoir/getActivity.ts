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
      `${
        process.env.NEXT_PUBLIC_RESERVOIR_API
      }/collections/activity/v5?collection=${collection}&${formatQueryString(
        query.types,
        "types",
      )}`,
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
    console.log(error);
    return error;
  }
};
