import type { TokenActivity } from "@/types/ark";

import type { ArkClient } from "./client";

export interface GetTokenActivityApiResponse {
  data: Token;
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
      `/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId.toString()}/activity?${queryParams.join("&")}`,
    );
  } catch (error) {
    throw new Error("failed to fetch token activity : " + (error as string));
  }
}
