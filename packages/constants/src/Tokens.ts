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
    "Ethereum",
  ),
  [ChainId.SN_SEPOLIA]: new Token(
    ChainId.SN_SEPOLIA,
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    18,
    "ETH",
    "Ether",
  ),
};
export const STRK: Record<number | string, Token> = {
  [ChainId.SN_MAIN]: new Token(
    ChainId.SN_MAIN,
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    18,
    "STRK",
    "Starknet Token",
  ),
  [ChainId.SN_SEPOLIA]: new Token(
    ChainId.SN_SEPOLIA,
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    18,
    "STRK",
    "Starknet Token",
  ),
};
export const USDC: Record<number | string, Token> = {
  [ChainId.SN_MAIN]: new Token(
    ChainId.SN_MAIN,
    "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    6,
    "USDC",
    "USD Coin",
  ),
  [ChainId.SN_SEPOLIA]: new Token(
    ChainId.SN_SEPOLIA,
    "0x053b40a647cedfca6ca84f542a0fe36736031905a9639a7f19a3c1e66bfd5080",
    6,
    "USDC",
    "USD Coin",
  ),
};
export const LORDS: Partial<Record<ChainId, Token>> = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
    18,
    "LORDS",
    "Lords",
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    "0x9f091D72A7E9677272A502fb6b3e8A7755F50224",
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
export const SUPPORTED_TOKENS: { [chainId in ChainId]: Token[] } = {
  [ChainId.SN_MAIN]: [
    LORDS[ChainId.SN_MAIN],
    USDC[ChainId.SN_MAIN],
    ETH[ChainId.SN_MAIN],
    STRK[ChainId.SN_MAIN],
  ].filter((token) => token !== undefined),
  [ChainId.SN_SEPOLIA]: [
    LORDS[ChainId.SN_SEPOLIA],
    USDC[ChainId.SN_SEPOLIA],
    ETH[ChainId.SN_SEPOLIA],
    STRK[ChainId.SN_SEPOLIA],
  ].filter((token) => token !== undefined),
  [ChainId.MAINNET]: [LORDS[ChainId.MAINNET]].filter(
    (token) => token !== undefined,
  ),
  [ChainId.SEPOLIA]: [LORDS[ChainId.SEPOLIA]].filter(
    (token) => token !== undefined,
  ),
  [ChainId.MISSISSIPPI_TESTNET]: [],
  [ChainId.REALMS_L3]: [],
  [ChainId.SLOT_TESTNET]: [],
  [ChainId.SN_DEVNET]: [],
};

export const LORDS_BRIDGE_ADDRESS: Record<number | string, string> = {
  [ChainId.MAINNET]: "0x023A2aAc5d0fa69E3243994672822BA43E34E5C9",
  [ChainId.SEPOLIA]: "0x6406465603487eE0Ad7A813b2bB6B0DFfB8f6aa7",
  [ChainId.SN_MAIN]:
    "0x7c76a71952ce3acd1f953fd2a3fda8564408b821ff367041c89f44526076633",
  [ChainId.SN_SEPOLIA]:
    "0x042331a29c53f6084f08964cbd83b94c1a141e6d14009052d55b03793b21d5b3",
};

export function getStarknetNativeCurrency(chainId: number | string) {
  return ETH[chainId];
}
