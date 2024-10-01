import type { TokenActivity } from "@/types/ark";

import type { ArkClient } from "./client";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

export interface GetTokenActivityApiResponse {
  data: TokenActivity;
}

interface GetTokenActivityParams {
  client: ArkClient;
  contractAddress: string;
  tokenId: number;
  page?: number;
  itemsPerPage?: number;
}

export async function getTokenActivity({
  client,
  contractAddress,
  tokenId,
  page = 1,
  itemsPerPage = 10,
}: GetTokenActivityParams): Promise<GetTokenActivityApiResponse> {
  try {
    const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`];
    return await client.fetch(
      `/tokens/${contractAddress}/${SUPPORTED_L2_CHAIN_ID}/${tokenId.toString()}/activity?${queryParams.join("&")}`,
    );
  } catch (error) {
    throw new Error("failed to fetch token activity : " + (error as string));
  }
}
