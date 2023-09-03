import { ChainType } from '@starkware-industries/commons-js-enums';
import { evaluate } from '@starkware-industries/commons-js-utils';


export const SUPPORTED_L1_CHAIN_ID = Number(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID);
export const SUPPORTED_L2_CHAIN_ID =
    SUPPORTED_L1_CHAIN_ID === ChainType.L1.GOERLI ? ChainType.L2.GOERLI : ChainType.L2.MAIN;
export const STARKNET_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STARKNET_CONTRACT_ADDRESS;
export const ETHERSCAN_URL = process.env.NEXT_PUBLIC_ETHERSCAN_URL;
export const ETHERSCAN_TX_URL = (tx: any) => evaluate(`${ETHERSCAN_URL}/tx/{{tx}}`, { tx });
export const ETHERSCAN_ACCOUNT_URL = (address: any) =>
    evaluate(`${ETHERSCAN_URL}/address/{{address}}`, { address });
export const VOYAGER_URL = process.env.NEXT_PUBLIC_VOYAGER_URL;
export const VOYAGER_TX_URL = (tx: any) => evaluate(`${VOYAGER_URL}/tx/{{tx}}`, { tx });
export const VOYAGER_ACCOUNT_URL = (contract: any) =>
    evaluate(`${VOYAGER_URL}/contract/{{contract}}`, { contract });
export const STARKSCAN_URL = process.env.NEXT_PUBLIC_STARKSCAN_URL;
export const STARKSCAN_TX_URL = (tx: any) => evaluate(`${STARKSCAN_URL}/tx/{{tx}}`, { tx });
export const STARKSCAN_ETH_TX_URL = (tx: any) => evaluate(`${STARKSCAN_URL}/eth-tx/{{tx}}`, { tx });
export const STARKSCAN_ACCOUNT_URL = (contract: any) =>
    evaluate(`${STARKSCAN_URL}/contract/{{contract}}`, { contract });
export const LOCAL_STORAGE_ACCEPT_TERMS_KEY = process.env.NEXT_PUBLIC_LOCAL_STORAGE_ACCEPT_TERMS;
export const GET_TRANSFERS_ENDPOINT = process.env.NEXT_PUBLIC_SUBGRAPH_NAME
export const GET_L2_APIBARA_ENDPOINT = process.env.NEXT_PUBLIC_APIBARA_HANDLE

export const NETWORK_NAME = process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
