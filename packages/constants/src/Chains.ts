export enum ChainId {
  MAINNET = 1,
  SEPOLIA = 11155111,
  MISSISSIPPI_TESTNET = 33784,

  SN_MAIN = "0x534e5f4d41494e",
  SN_SEPOLIA = "0x534e5f5345504f4c4941",

  REALMS_L3 = "420",

  SLOT_TESTNET = 555, // TODO: update with the real value
}

export const CHAIN_IDS_TO_NAMES = {
  [ChainId.MAINNET]: "Ethereum",
  [ChainId.SEPOLIA]: "Sepolia",
  [ChainId.MISSISSIPPI_TESTNET]: "Mississippi Testnet",
  [ChainId.SN_MAIN]: "Starknet Mainnet",
  [ChainId.SN_SEPOLIA]: "Starknet Sepolia",
  [ChainId.SLOT_TESTNET]: "Slot Testnet",
  [ChainId.REALMS_L3]: "Realms L3",
} as const;

export const L1_CHAIN_IDS = [ChainId.MAINNET, ChainId.SEPOLIA] as const;
export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number];

export const L2_CHAIN_IDS = [ChainId.SN_MAIN, ChainId.SN_SEPOLIA] as const;
export type SupportedL2ChainId = (typeof L2_CHAIN_IDS)[number];
