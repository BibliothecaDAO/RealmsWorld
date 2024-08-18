import type { AccountSearchResult, CollectionSearchResult } from "@/types/ark";
import type { ArkClient } from "./client";

interface CollectionSearchApiResponse {
  data: {
    collections: CollectionSearchResult[];
    accounts: AccountSearchResult[];
  };
}
interface GetCollectionSearchParams {
  client: ArkClient;
  query: string;
}

export async function getCollectionSearch({ client, query }: GetCollectionSearchParams): Promise<CollectionSearchApiResponse> {
  const queryParams = [`q=${query}`];

  try {
    return await client.fetch(`/collections/search?${queryParams.join("&")}`);
  } catch (error) {
    console.error(error)
    return {
      data: { collections: [], accounts: [] },
    } as CollectionSearchApiResponse;
  }
}
