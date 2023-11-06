import { ChainId } from "./Chains";

export enum Tokens {
  LORDS = "Lords",
}

class Token {
  public readonly decimals: number;
  public readonly symbol?: string;
  public readonly name?: string;
  public readonly chainId: ChainId;
  public readonly address: string;

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
  ) {
    this.chainId = chainId;
    this.address = address;
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
  }
}

export const ETH_SN_MAIN = new Token(
  ChainId.SN_MAIN,
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  18,
  "ETH",
  "Ether",
);
export const ETH_SN_GOERLI = new Token(
  ChainId.SN_GOERLI,
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  18,
  "ETH",
  "Ether",
);

export const LORDS: Record<number | string, Token> = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
    18,
    "LORDS",
    "Lords",
  ),
  [ChainId.GOERLI]: new Token(
    ChainId.GOERLI,
    "0x7543919933eef56f754daf6835fa97f6dfd785d8",
    18,
    "LORDS",
    "Lords",
  ),
  [ChainId.SN_MAIN]: new Token(
    ChainId.SN_MAIN,
    "0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
    18,
    "LORDS",
    "Lords",
  ),
  [ChainId.SN_GOERLI]: new Token(
    ChainId.SN_GOERLI,
    "0x0488c4091e5c57309f4acdce4f746898a82f50351d8c85278ad2e877c8c032bd",
    18,
    "LORDS",
    "Lords",
  ),
};

export const LORDS_BRIDGE_ADDRESS: Record<number | string, Token> = {};

export function getStarknetNativeCurrency(chainId: number | string) {
  switch (chainId) {
    case ChainId.SN_GOERLI:
      return ETH_SN_GOERLI;
    case ChainId.SN_MAIN:
      return ETH_SN_MAIN;
    default:
      throw new Error("Not Starknet");
  }
}
