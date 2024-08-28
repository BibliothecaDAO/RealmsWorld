import type { Token } from "@/types/ark";

import type { ArkClient } from "./client";

export interface GetTokenApiResponse {
  data: Token;
}

interface GetTokenParams {
  client: ArkClient;
  contractAddress: string;
  tokenId: number;
}

export async function getToken({
  client,
  contractAddress,
  tokenId,
}: GetTokenParams) {
  try {
    return await client.fetch(
      `/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId.toString()}`,
    )
  } catch (error) {
    console.error(error);
    return null;
  }
}
