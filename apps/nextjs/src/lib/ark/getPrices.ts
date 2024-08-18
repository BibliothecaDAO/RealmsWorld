import type { PricesResult } from "@/types/ark";
import { Mobula } from "mobula-sdk";

const mobula = new Mobula({
  apiKeyAuth: process.env.NEXT_PUBLIC_MOBULA_API_KEY,
});

export async function getPrices(): Promise<PricesResult> {
  try {
    const response = await mobula.fetchMultipleAssetMarketData({
      assets: "ethereum,starknet",
    });
    return {
      // TODO: add lords price
      ethereum: {
        price: response.multiDataResponse.data.ethereum?.price as number,
      },
      starknet: {
        price: response.multiDataResponse.data.starknet?.price as number,
      },
    };
  } catch (_) {
    return {
      ethereum: { price: 0 },
      starknet: { price: 0 },
    }
  }
}
