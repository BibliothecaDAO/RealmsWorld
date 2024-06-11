export interface BalanceData { contractAddress: string; tokenBalance: string }
export interface Metadata {
  decimals: number;
  name: string;
  symbol: string;
}
export type Token = BalanceData &
  Metadata & {
    price: number;
    value: number;
    change: number;
  };

export interface GetTokenBalancesResponse {
  address: string;
  tokenBalances: BalanceData[];
}

export type GetTokensMetadataResponse = Metadata[];

export type GetBalancesResponse = Token[];