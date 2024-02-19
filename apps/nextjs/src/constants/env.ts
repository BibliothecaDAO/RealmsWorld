/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from "@starkware-industries/commons-js-utils";

import { ChainId } from "@realms-world/constants";

export const ETHERSCAN_URL = process.env.NEXT_PUBLIC_ETHERSCAN_URL;
export const ETHERSCAN_TX_URL = (tx: any) =>
  evaluate(`${ETHERSCAN_URL}/tx/{{tx}}`, { tx });
export const ETHERSCAN_ACCOUNT_URL = (address: any) =>
  evaluate(`${ETHERSCAN_URL}/address/{{address}}`, { address });
export const VOYAGER_URL = process.env.NEXT_PUBLIC_VOYAGER_URL;
export const VOYAGER_TX_URL = (tx: any) =>
  evaluate(`${VOYAGER_URL}/tx/{{tx}}`, { tx });
export const VOYAGER_ACCOUNT_URL = (contract: any) =>
  evaluate(`${VOYAGER_URL}/contract/{{contract}}`, { contract });
export const STARKSCAN_URL = process.env.NEXT_PUBLIC_STARKSCAN_URL;
export const STARKSCAN_TX_URL = (tx: any) =>
  evaluate(`${STARKSCAN_URL}/tx/{{tx}}`, { tx });
export const STARKSCAN_ETH_TX_URL = (tx: any) =>
  evaluate(`${STARKSCAN_URL}/eth-tx/{{tx}}`, { tx });
export const STARKSCAN_ACCOUNT_URL = (contract: any) =>
  evaluate(`${STARKSCAN_URL}/contract/{{contract}}`, { contract });

export const GET_TRANSFERS_ENDPOINT = process.env.NEXT_PUBLIC_SUBGRAPH_NAME;
export const GET_L2_APIBARA_ENDPOINT = process.env.NEXT_PUBLIC_APIBARA_HANDLE;

export const NETWORK_NAME =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "SEPOLIA" : "MAIN";
export const RESERVOIR_API_URL =
  process.env.NEXT_PUBLIC_RESERVOIR_API ??
  `https://api${
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "-sepolia" : ""
  }.reservoir.tools`;

export const SUPPORTED_L1_CHAIN_ID =
  process.env.NEXT_PUBLIC_IS_TESTNET == "true"
    ? ChainId.SEPOLIA
    : ChainId.MAINNET;

export const SUPPORTED_L2_CHAIN_ID =
  SUPPORTED_L1_CHAIN_ID === ChainId.SEPOLIA
    ? ChainId.SN_SEPOLIA
    : ChainId.SN_MAIN;
