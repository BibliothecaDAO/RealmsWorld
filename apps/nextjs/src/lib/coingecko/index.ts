import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";

import { ChainId } from "@realms-world/constants";

const COINGECKO_PLATFORM_ID: Record<number, string> = {
  [ChainId.MAINNET]: "ethereum",
  [ChainId.SEPOLIA]: "ethereum-sepolia",
};

export const getTokenPrices = async ({
  addresses,
  currency = "usd",
}: {
  addresses: string[];
  currency?: string;
}): Promise<Record<string, Record<string, number>>> => {
  const platformId = COINGECKO_PLATFORM_ID[SUPPORTED_L1_CHAIN_ID];
  if (!platformId) {
    return {};
  }
  return await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${addresses.join(
      ",",
    )}&vs_currencies=${currency}`,
    { next: { revalidate: 120 } },
  )    .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<Record<string, Record<string, number>>>;
  });
};

