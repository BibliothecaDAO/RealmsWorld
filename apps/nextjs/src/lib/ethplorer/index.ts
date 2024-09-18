/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//import { ETH_CONTRACT } from '@/helpers/constants';
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { env } from "env";

import type {
  GetBalancesResponse,
  GetTokenBalancesResponse,
  GetTokensMetadataResponse,
} from "./types";

export * from "./types";

const NETWORKS = {
  1: "eth-mainnet",
  11155111: "eth-sepolia",
};

function getApiUrl() {
  const network = NETWORKS[SUPPORTED_L1_CHAIN_ID];

  return `https://${network}.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API}`;
}

export async function request(method: string, params: any[]) {
  const res = await fetch(getApiUrl(), {
    method: "POST",
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method,
      params,
    }),
  });

  const { result } = await res.json();

  return result;
}

export async function batchRequest(
  requests: { method: string; params: any[] }[],
) {
  const res = await fetch(getApiUrl(), {
    method: "POST",
    body: JSON.stringify(
      requests.map((request, i) => ({
        id: i,
        jsonrpc: "2.0",
        method: request.method,
        params: request.params,
      })),
    ),
  });

  const response = await res.json();

  return response.map((entry: { result: any }) => entry.result);
}

/**
 * Gets Ethereum balance as hex encoded string.
 * @param address Ethereum address to fetch ETH balance for
 * @param networkId Network ID
 * @returns Hex encoded ETH balance
 */
export async function getBalance(address: string): Promise<string> {
  return request("eth_getBalance", [address]);
}

/**
 * Gets ERC20 balances of tokens that provided address interacted with.
 * Response might include 0 balances.
 * @param address Ethereum address to fetch token balances for
 * @param networkId Network ID
 * @returns Token balances
 */
export async function getTokenBalances(
  address: string,
): Promise<GetTokenBalancesResponse> {
  return request("alchemy_getTokenBalances", [address]);
}

/**
 * Gets ERC20 tokens metadata (name, symbol, decimals, logo).
 * @param addresses Array of ERC20 tokens addresses
 * @param networkId Network ID
 * @returns Array of token metadata
 */
export async function getTokensMetadata(
  addresses: string[],
): Promise<GetTokensMetadataResponse> {
  return batchRequest(
    addresses.map((address) => ({
      method: "alchemy_getTokenMetadata",
      params: [address],
    })),
  );
}

/**
 * Gets Ethereum and ERC20 balances including metadata for tokens.
 * @param address Ethereum address to fetch balances for
 * @param networkId Network ID
 * @returns Array of balances
 */
export async function getBalances(
  address: string,
  //baseToken?: { name: string; symbol: string; logo?: string }
): Promise<GetBalancesResponse> {
  if (!address) {
    return [
      {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
        contractAddress: "0x0000000000000000000000000000000000000000",
        tokenBalance: "0x0",
        price: 0,
        value: 0,
        change: 0,
      },
    ];
  }

  const [ethBalance, { tokenBalances }] = await Promise.all([
    getBalance(address),
    getTokenBalances(address),
  ]);

  const contractAddresses = tokenBalances.map(
    (balance) => balance.contractAddress,
  );
  const metadata = await getTokensMetadata(contractAddresses);

  return [
    {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      contractAddress: "0x0000000000000000000000000000000000000000",
      tokenBalance: ethBalance,
      price: 0,
      value: 0,
      change: 0,
    },
    ...tokenBalances
      .map((balance, i) => ({
        ...balance,
        ...metadata[i],
        price: 0,
        value: 0,
        change: 0,
        decimals: metadata[i]?.decimals ?? 18, // Ensure decimals is always a number
        name: metadata[i]?.name ?? "", // Ensure name is always a string
        symbol: metadata[i]?.symbol ?? "", // Ensure symbol is always a string
      }))
      .filter((token) => token.symbol && !token.symbol.includes(".")),
  ];
}
