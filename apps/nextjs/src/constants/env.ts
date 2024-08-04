import { env } from "@/env";
import { evaluate } from "@starkware-industries/commons-js-utils";

import { ChainId } from "@realms-world/constants";

export const ETHERSCAN_URL = env.NEXT_PUBLIC_ETHERSCAN_URL;
export const ETHERSCAN_TX_URL = (tx: string) =>
  evaluate(`${ETHERSCAN_URL}/tx/{{tx}}`, { tx });
export const ETHERSCAN_ACCOUNT_URL = (address: string) =>
  evaluate(`${ETHERSCAN_URL}/address/{{address}}`, { address });
export const VOYAGER_URL = env.NEXT_PUBLIC_VOYAGER_URL;
export const VOYAGER_TX_URL = (tx: string) =>
  evaluate(`${VOYAGER_URL}/tx/{{tx}}`, { tx });
export const VOYAGER_ACCOUNT_URL = (contract: string) =>
  evaluate(`${VOYAGER_URL}/contract/{{contract}}`, { contract });
export const STARKSCAN_URL = env.NEXT_PUBLIC_STARKSCAN_URL;
export const STARKSCAN_TX_URL = (tx: string) =>
  evaluate(`${STARKSCAN_URL}/tx/{{tx}}`, { tx });
export const STARKSCAN_ETH_TX_URL = (tx: string) =>
  evaluate(`${STARKSCAN_URL}/eth-tx/{{tx}}`, { tx });
export const STARKSCAN_ACCOUNT_URL = (contract: string) =>
  evaluate(`${STARKSCAN_URL}/contract/{{contract}}`, { contract });

export const GET_TRANSFERS_ENDPOINT = env.NEXT_PUBLIC_SUBGRAPH_NAME;
export const GET_L2_APIBARA_ENDPOINT = env.NEXT_PUBLIC_APIBARA_HANDLE;

export const NETWORK_NAME =
  env.NEXT_PUBLIC_IS_TESTNET === "true" ? "SEPOLIA" : "MAIN";
export const RESERVOIR_API_URL = `https://api${
  env.NEXT_PUBLIC_IS_TESTNET === "true" ? "-sepolia" : ""
}.reservoir.tools`;

export const SUPPORTED_L1_CHAIN_ID =
  env.NEXT_PUBLIC_IS_TESTNET == "true" ? ChainId.SEPOLIA : ChainId.MAINNET;

export const SUPPORTED_L2_CHAIN_ID =
  SUPPORTED_L1_CHAIN_ID === ChainId.SEPOLIA
    ? ChainId.SN_SEPOLIA
    : ChainId.SN_MAIN;
