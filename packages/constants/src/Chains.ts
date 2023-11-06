export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,

  SN_MAIN = "0x534e5f4d41494e",
  SN_GOERLI = "0x534e5f474f45524c49",
}

export const CHAIN_IDS_TO_NAMES = {
  [ChainId.MAINNET]: "mainnet",
  [ChainId.GOERLI]: "goerli",
  [ChainId.SN_MAIN]: "starknet_mainnet",
  [ChainId.SN_GOERLI]: "starknet_goerli",
} as const;

export const L1_CHAIN_IDS = [ChainId.MAINNET, ChainId.GOERLI] as const;
export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number];

export const L2_CHAIN_IDS = [ChainId.SN_MAIN, ChainId.SN_GOERLI] as const;
export type SupportedL2ChainId = (typeof L2_CHAIN_IDS)[number];
