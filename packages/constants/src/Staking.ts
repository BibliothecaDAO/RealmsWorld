import { ChainId } from "./Chains";

export enum StakingContracts {
  GALLEON = "galleon",
  CARRACK = "carrack",
  PAYMENT_POOL = "paymentpool",
  PAYMENT_POOL_V2 = "paymentpoolv2",
  VE_LORDS = "velords",
  REWARD_POOL = "rewardpool",
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
      "0x29dc004a77c981b425628d36997e4534a100c2c324a0caa00e8e198ca23ce8",
  },
  [StakingContracts.REWARD_POOL]: {
    [ChainId.SN_MAIN]: "",
    [ChainId.SN_SEPOLIA]:
      "0x33b412ab2a9bf3a4e0b701b7760f29e7f6137d8e28acc9c51daf12b8a9902bc",
  },
};
