import type { Token } from "@/types/ark";

import type { ArkClient } from "./client";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

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
      `/tokens/${contractAddress}/${SUPPORTED_L2_CHAIN_ID}/${tokenId.toString()}`,
    )
  } catch (error) {
    console.error(error);
    return null;
  }
}
