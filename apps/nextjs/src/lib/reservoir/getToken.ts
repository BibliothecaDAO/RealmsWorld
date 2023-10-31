import { RESERVOIR_API_URL } from "@/constants/env";

function buildQueryString(queryObject: any) {
  const queryParams = Object.entries(queryObject)
    .map(([key, value]: any) => {
      if (typeof value === "object" && !Array.isArray(value.Resource)) {
        return Object.entries(value)
          .map(
            ([subKey, subValue]: any) =>
              `${encodeURIComponent(key)}[${encodeURIComponent(
                subKey,
              )}]=${encodeURIComponent(subValue)}`,
          )
          .join("&");
      } else if (Array.isArray(value.Resource)) {
        // If the value is an array, join its elements with '&'
        return value.Resource.map(
          (subValue: string | number | boolean) =>
            `${encodeURIComponent(key)}[${encodeURIComponent(
              "Resource",
            )}]=${encodeURIComponent(subValue)}`,
        ).join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&")
    .replace(/%2B/g, "+");

  return queryParams;
}

function cleanQuery(query: any) {
  const cleanQuery = { ...query };
  delete cleanQuery.id;
  delete cleanQuery.sortBy;
  delete cleanQuery.sortDirection;
  delete cleanQuery.collection;
  delete cleanQuery.includeAttributes;
  delete cleanQuery.includeQuantity;
  delete cleanQuery.tokens;
  return cleanQuery;
}

export const getToken = async ({
  collection,
  query,
}: {
  collection?: string;
  query: any;
}) => {
  if (collection) query.collection = collection;
  const queryString = buildQueryString({ attributes: cleanQuery(query) });

  const check = () => {
    const params: any = {};
    if (query.sortBy) {
      params.sortBy = query.sortBy;
    }
    if (query.sortDirection) {
      params.sortDirection = query.sortDirection;
    }
    if (query.includeAttributes) {
      params.includeAttributes = query.includeAttributes;
    }
    if (query.includeQuantity) {
      params.includeQuantity = query.includeQuantity;
    }
    if (query.tokens) {
      params.tokens = query.tokens;
    }
    if (query.collection) {
      params.collection = query.collection;
    }
    return new URLSearchParams(params);
  };
  try {
    /*console.log(
      `${
        RESERVOIR_API_URL
      }/tokens/v6?${queryString}&${check()}`,
    );*/
    const res = await fetch(
      `${RESERVOIR_API_URL}/tokens/v6?${queryString}&${check()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.RESERVOIR_API_KEY || "",
        },
        next: { revalidate: 60 },
      },
    );
    const data: any = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
