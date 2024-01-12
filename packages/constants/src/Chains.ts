export enum ChainId {
  MAINNET = 1,
  SEPOLIA = 11155111,
  MISSISSIPPI_TESTNET = 33784,

  SN_MAIN = "0x534e5f4d41494e",
  SN_SEPOLIA = "0x534e5f5345504f4c4941",

  SLOT_TESTNET = 555, // TODO: update with the real value
}

export const CHAIN_IDS_TO_NAMES = {
  [ChainId.MAINNET]: "mainnet",
  [ChainId.SEPOLIA]: "sepolia",
  [ChainId.MISSISSIPPI_TESTNET]: "Mississippi Testnet",
  [ChainId.SN_MAIN]: "starknet_mainnet",
  [ChainId.SN_SEPOLIA]: "starknet_sepolia",
  [ChainId.SLOT_TESTNET]: "Slot Testnet",
} as const;

export const L1_CHAIN_IDS = [ChainId.MAINNET, ChainId.SEPOLIA] as const;
export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number];

export const L2_CHAIN_IDS = [ChainId.SN_MAIN, ChainId.SN_SEPOLIA] as const;
export type SupportedL2ChainId = (typeof L2_CHAIN_IDS)[number];
