import type { SupportedL1ChainId, SupportedL2ChainId } from "./Chains";
import { ChainId } from "./Chains";

export enum NetworkType {
  L1,
  L2,
}
interface BaseChainInfo {
  readonly networkType: NetworkType;
  readonly bridge?: string;
  readonly explorer: string;
  readonly label: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
}
interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1;
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2;
  readonly bridge: string;
}

type ChainInfoMap = Readonly<Record<number, L1ChainInfo | L2ChainInfo>> & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo };

const CHAIN_INFO: ChainInfoMap = {
  [ChainId.MAINNET]: {
    networkType: NetworkType.L1,
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [ChainId.GOERLI]: {
    networkType: NetworkType.L1,
    explorer: "https://goerli.etherscan.io/",
    label: "Görli",
    nativeCurrency: { name: "Görli Ether", symbol: "görETH", decimals: 18 },
  },
  [ChainId.SN_MAIN]: {
    networkType: NetworkType.L2,
    bridge: "https://starkgate.starknet.io/",
    explorer: "https://sepolia.etherscan.io/",
    label: "Starknet",
    nativeCurrency: { name: "Ether", symbol: "sETH", decimals: 18 },
  },
  [ChainId.SN_GOERLI]: {
    networkType: NetworkType.L2,
    bridge: "https://goerli.starkgate.starknet.io/",
    explorer: "https://optimistic.etherscan.io/",
    label: "SN Görli",
    nativeCurrency: { name: "Görli Ether", symbol: "sNgETH", decimals: 18 },
  },
} as const;

export function getChainInfo(chainId: SupportedL1ChainId): L1ChainInfo;
export function getChainInfo(chainId: SupportedL2ChainId): L2ChainInfo;
export function getChainInfo(chainId: ChainId): L1ChainInfo | L2ChainInfo;
export function getChainInfo(
  chainId:
    | ChainId
    | SupportedL1ChainId
    | SupportedL2ChainId
    | number
    | undefined,
): L1ChainInfo | L2ChainInfo | undefined;

export function getChainInfo(chainId: any): any {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined;
  }
  return undefined;
}

const MAINNET_INFO = CHAIN_INFO[ChainId.MAINNET];
export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? MAINNET_INFO;
}
