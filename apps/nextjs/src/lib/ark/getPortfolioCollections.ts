import type { PortfolioCollection } from "@/types/ark";

import type { ArkClient } from "./client";

export interface PortfolioCollectionApiResponse {
  collection_count: number;
  token_count: number;
  data: PortfolioCollection[];
  next_page: number | null;
}

interface GetPortfolioActivityParams {
  client: ArkClient;
  walletAddress: string;
  page?: number;
  itemsPerPage?: number;
}

export async function getPortfolioCollections({
  client,
  walletAddress,
  page = 1,
  itemsPerPage = 10,
}: GetPortfolioActivityParams): Promise<PortfolioCollectionApiResponse> {
  const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`];

  try {
    return await client.fetch(
      `/portfolio/${walletAddress}/collections?${queryParams.join("&")}`,
    );
  } catch (_) {
    return {
      data: [],
      next_page: null,
      collection_count: 0,
      token_count: 0,
    };
  }
}
