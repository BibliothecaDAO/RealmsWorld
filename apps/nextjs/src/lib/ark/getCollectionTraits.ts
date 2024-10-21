import type { CollectionTraits } from "@/types/ark";
import { sortTraitsByCountAsc } from "./sortTraitsByCountAsc";

import type { ArkClient } from "./client";

interface GetCollectionParams {
  client: ArkClient;
  collectionAddress: string;
}

export interface CollectionTraitsApiResponse {
  data: CollectionTraits;
}

/*export interface PortfolioActivityApiResponse {
  count: number;
  data: PortfolioActivity[];
  next_page: number;
}

interface GetPortfolioActivityParams {
  client: ArkClient;
  walletAddress: string;
  page?: number;
  itemsPerPage?: number;
}*/

export async function getCollectionTraits({
  client,
  collectionAddress,
  /*page = 1,
  itemsPerPage = 10,*/
}: GetCollectionParams) {
  //const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`];

  try {
    const response = (await client.fetch(
      `/collections/${collectionAddress}/traits`,
    )) as CollectionTraitsApiResponse;
    if (!response.data) {
      console.error("Failed to fetch traits data");
      return {};
    }
    return sortTraitsByCountAsc(response.data);
  } catch (error) {
    throw new Error("failed to fetch collection traits : " + (error as string));
  }
}
