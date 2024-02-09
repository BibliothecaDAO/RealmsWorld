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

export const ETH: Record<number | string, Token> = {
  [ChainId.SN_MAIN]: new Token(
    ChainId.SN_MAIN,
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    18,
    "ETH",
    "Ether",
  ),
  [ChainId.SN_SEPOLIA]: new Token(
    ChainId.SN_SEPOLIA,
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    18,
    "ETH",
    "Ether",
  ),
};
export const LORDS: Record<number | string, Token> = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
    18,
    "LORDS",
    "Lords",
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
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
  [ChainId.SN_SEPOLIA]: new Token(
    ChainId.SN_SEPOLIA,
    "0x019c92fa87f4d5e3be25c3dd6a284f30282a07e87cd782f5fd387b82c8142017",
    18,
    "LORDS",
    "Lords",
  ),
};

export const LORDS_BRIDGE_ADDRESS: Record<number | string, string> = {
  [ChainId.MAINNET]: "0x023A2aAc5d0fa69E3243994672822BA43E34E5C9",
  [ChainId.SEPOLIA]: "0x6406465603487eE0Ad7A813b2bB6B0DFfB8f6aa7",
  [ChainId.SN_MAIN]:
    "0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82",
  [ChainId.SN_SEPOLIA]:
    "0x042331a29c53f6084f08964cbd83b94c1a141e6d14009052d55b03793b21d5b3",
};

export function getStarknetNativeCurrency(chainId: number | string) {
  switch (chainId) {
    case ChainId.SN_SEPOLIA:
      return ETH_SN_SEPOLIA;
    case ChainId.SN_MAIN:
      return ETH_SN_MAIN;
    default:
      throw new Error("Not Starknet");
  }
}
