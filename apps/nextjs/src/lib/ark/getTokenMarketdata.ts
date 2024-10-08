import type { TokenMarketData } from "@/types/ark";

import type { ArkClient } from "./client";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

export interface GetTokenApiResponse {
  data: TokenMarketData;
}

interface GetTokenMarketdataParams {
  client: ArkClient;
  contractAddress: string;
  tokenId: number;
}

export async function getTokenMarketdata({
  client,
  contractAddress,
  tokenId,
}: GetTokenMarketdataParams) {
  try {
    return await client.fetch(
      `/tokens/${contractAddress}/${SUPPORTED_L2_CHAIN_ID}/${tokenId.toString()}/marketdata`,
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
