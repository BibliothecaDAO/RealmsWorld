import type { PortfolioActivity } from "@/types/ark";
import type { ArkClient } from "./client"


export interface PortfolioActivityApiResponse {
  count: number;
  data: PortfolioActivity[];
  next_page: number;
}

interface GetPortfolioActivityParams {
  client: ArkClient
  walletAddress: string
  page?: number
  itemsPerPage?: number
}

export async function getPortfolioActivity({ client, walletAddress, page = 1, itemsPerPage = 10 }: GetPortfolioActivityParams): Promise<PortfolioActivityApiResponse> {
  const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`];

  try {
    return await client.fetch(`/portfolio/${walletAddress}/activity?${queryParams.join("&")}`);
  } catch (error) {
    throw new Error("failed to fetch portfolio activity : " + (error as string))
  }
}
