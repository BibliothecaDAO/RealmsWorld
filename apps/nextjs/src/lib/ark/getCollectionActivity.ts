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
  page: number
  itemsPerPage?: number
}

export async function getCollectionActivity({ client, page, collectionAddress, itemsPerPage = 10 }: GetCollectionActivityParams) {
  try {
    const queryParams = [`items_per_page=${itemsPerPage}`];

    if (page !== undefined) {
      queryParams.push(`page=${page}`);
    }

    return await client.fetch(`/collections/${collectionAddress}/activity?${queryParams.join("&")}`);

  } catch (error) {
    throw new Error("failed to fetch collection activity : " + error)
  }
}
