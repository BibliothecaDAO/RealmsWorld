/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { useState, useEffect, useCallback } from 'react';
import { formatUnits } from 'viem';
import type { GetBalancesResponse } from '@/lib/alchemy';
import { getBalances } from '@/lib/alchemy';
import { getTokenPrices } from '@/lib/coingecko';


const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple';
const COINGECKO_PARAMS = '&vs_currencies=usd&include_24hr_change=true';

export function useBalances(address: string) {
  const [tokens, setTokens] = useState<GetBalancesResponse>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const getCoins = useCallback(async (
    contractAddresses: string[]
  ): Promise<Record<string, any>> => {

    const tokenData = await getTokenPrices({addresses: contractAddresses, currency: 'USD'})
    return {
      ['0x0000000000000000000000000000000000000000']: {price: 0},
      ...tokenData
    };
  }, []);

  const fetchCoinPrices = useCallback(async (
    tokensWithBalance: GetBalancesResponse
  ): Promise<Record<string, any>> => {

    const contractAddresses = tokensWithBalance
      .filter(asset => asset.contractAddress !== '0x0000000000000000000000000000000000000000')
      .map(token => token.contractAddress);

    return getCoins(contractAddresses);
  }, [getCoins]);

  const loadBalances = useCallback(async () => {
    try {
      setLoading(true);
      setTokens([]);
      //const baseToken = CHAIN_CURRENCIES[networkId];
      const data = await getBalances(address);
        console.log(data)
      const tokensWithBalance = data.filter(
        asset =>
          formatUnits(BigInt(asset.tokenBalance), asset.decimals) !== '0.0' ||
          asset.symbol === 'ETH'
      );


      const coins = await fetchCoinPrices(
        tokensWithBalance
      );
        console.log(coins)
      const mappedTokens = tokensWithBalance.map(asset => {
        const coinData = coins[asset.contractAddress];
        if (!coinData) return asset;

        const price = coinData.usd || 0;
        const change = coinData.usd_24h_change || 0;
        const value =
          parseFloat(formatUnits(asset.tokenBalance, asset.decimals)) * price;

        return {
          ...asset,
          price,
          change,
          value
        };
      });

      setTokens(mappedTokens);
      setLoaded(true);
    } catch (error) {
      console.error('Error loading balances:', error);
    } finally {
      setLoading(false);
    }
  }, [address, fetchCoinPrices]);

  useEffect(() => {
    loadBalances();
  }, [loadBalances]);

  return { loading, loaded, tokens };
}