import { ChainId } from "./Chains";

export enum StakingContracts {
  GALLEON = "galleon",
  CARRACK = "carrack",
  PAYMENT_POOL = "paymentpool",
  PAYMENT_POOL_V2 = "paymentpoolv2",
  VE_LORDS = "velords",
  REWARD_POOL = "rewardpool",
  LEGACY_REWARD = "legacyreward",
}

export const StakingAddresses: {
  readonly [key in StakingContracts]: Partial<{ [key in ChainId]: string }>;
} = {
  [StakingContracts.GALLEON]: {
    [ChainId.MAINNET]: "0x17963290db8c30552d0cfa2a6453ff20a28c31a2",
    [ChainId.SEPOLIA]: "0x7cb8c2a2e635b8518a3d8e6d70480583c85a7297",
  },
  [StakingContracts.CARRACK]: {
    [ChainId.MAINNET]: "0xcdFe3d7eBFA793675426F150E928CD395469cA53",
    [ChainId.SEPOLIA]: "",
  },
  [StakingContracts.PAYMENT_POOL]: {
    [ChainId.MAINNET]: "0x55A69A21C44B1922D3F96B961AE567C789c4399e",
    [ChainId.SEPOLIA]: "",
  },
  [StakingContracts.PAYMENT_POOL_V2]: {
    [ChainId.MAINNET]: "0x8428aad84594b6b78da13e773d902f5c44b93f17",
    [ChainId.SEPOLIA]: "",
  },
  [StakingContracts.VE_LORDS]: {
    [ChainId.SN_MAIN]: "",
    [ChainId.SN_SEPOLIA]:
      "0x38306182f5f04496efc0db2e533874d41c9ae298af9a42405218bf58f8e57d2",
  },
  [StakingContracts.REWARD_POOL]: {
    [ChainId.SN_MAIN]: "",
    [ChainId.SN_SEPOLIA]:
      "0x5d748db07d5d307a9ba2ada904209278eb50816cf238f8195dfbc266113a703",
  },
  [StakingContracts.LEGACY_REWARD]: {
    [ChainId.MAINNET]: "0x7Ad94e71308Bb65c6bc9dF35cc69Cc9f953D69E5",
    [ChainId.SEPOLIA]: "0x5C209C96733BA71Fb09772D22d12Fc6f8CB980cA",
    [ChainId.SN_MAIN]:
      "0x38862e1b15526eda31ed6fd26805c40748458db8e420cb3be3bc65c332c023b",
    [ChainId.SN_SEPOLIA]:
      "0x48c774a0f71120aeffcb520fa4a08e1659c17abb46a792ea1e1bbbcf5ef38f3",
  },
};
