import type { TokenOffer } from "@/types/ark";

import type { ArkClient } from "./client";

export interface GetTokenOffersApiResponse {
  data: TokenOffer[];
  count: number;
  next_page: number;
}

interface GetTokenOffersParams {
  client: ArkClient;
  contractAddress: string;
  tokenId: number;
  page?: number;
  itemsPerPage?: number;
}

export async function getTokenOffers({
  client,
  contractAddress,
  tokenId,
  page = 1,
  itemsPerPage = 10,
}: GetTokenOffersParams): Promise<GetTokenOffersApiResponse> {
  try {
    const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`];
    return await client.fetch(
      `/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId.toString()}/offers?${queryParams.join("&")}`,
    );
  } catch (error) {
    throw new Error("failed to fetch token offers : " + (error as string));
  }
}
