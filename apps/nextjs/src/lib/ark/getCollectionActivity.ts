import type { ArkClient } from "./client";
import type { CollectionActivity } from "@/types/ark"

export interface CollectionActivityApiResponse {
  count: number;
  data: CollectionActivity[];
  next_page: number;
}

interface GetCollectionActivityParams {
  client: ArkClient
  collectionAddress: string
  page?: number
  itemsPerPage?: number
}

export async function getCollectionActivity({ client, collectionAddress, page = 1, itemsPerPage = 10 }: GetCollectionActivityParams): Promise<CollectionActivityApiResponse> {
  try {
    const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`];

    return await client.fetch(`/collections/${collectionAddress}/activity?${queryParams.join("&")}`);

  } catch (error) {
    throw new Error("failed to fetch collection activity : " + (error as string))
  }
}
