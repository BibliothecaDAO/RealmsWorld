import axios from 'axios';
import { ChainId } from '@realms-world/constants';
import { SUPPORTED_L1_CHAIN_ID } from '@/constants/env';

const COINGECKO_PLATFORM_ID: Record<number, string> = {
    [ChainId.MAINNET]: 'ethereum',
    [ChainId.SEPOLIA]: 'ethereum-sepolia'

}

export const getTokenPrices = async ({
  addresses,
  currency = 'usd',
}: {
  addresses: string[];
  currency: string;
}): Promise<Record<string, Record<string, number>>> => {
  const platformId = COINGECKO_PLATFORM_ID[SUPPORTED_L1_CHAIN_ID];
  if (!platformId) {
    return {};
  }

  const priceResponce = await axios.get(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${addresses.concat(
      ','
    )}&vs_currencies=${currency}`
  );

  return priceResponce.data as Record<string, Record<string, number>>;
};

export const getCoinPrices = async ({
  coingeckoIds,
  currency = 'usd',
}: {
  coingeckoIds: string[];
  currency: string;
}): Promise<Record<string, Record<string, number>>> => {
  const priceResponce = await axios.get(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds.concat(
      ','
    )}&vs_currencies=${currency}`
  );

  return priceResponce.data as Record<string, Record<string, number>>;
};