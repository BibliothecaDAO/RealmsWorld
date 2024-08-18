import type { TokenMarketData } from "@/types/ark";
import type { ArkClient } from "./client";

export interface GetTokenApiResponse {
  data: TokenMarketData;
}

interface GetTokenMarketdataParams {
  client: ArkClient
  contractAddress: string
  tokenId: number
}

export async function getTokenMarketdata({ client, contractAddress, tokenId }: GetTokenMarketdataParams) {
  try {
    return await client.fetch(`/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId.toString()}/marketdata`)
  } catch (error) {
    console.error(error)
    return null;
  }
}
