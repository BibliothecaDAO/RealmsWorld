import { NetworkID } from "app/types";
import { ChainId } from "@realms-world/constants";

type Metadata = {
  name: string;
  chainId: ChainId;
  baseChainId: number;
  //baseNetworkId: NetworkID;
  rpcUrl: string;
  ethRpcUrl: string;
  explorerUrl: string;
  apiUrl: string;
};

export const METADATA: Partial<Record<NetworkID, Metadata>> = {
  sn: {
    name: "Starknet",
    chainId: ChainId.SN_MAIN,
    baseChainId: 1,
    //baseNetworkId: "eth",
    rpcUrl: `https://starknet-mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    ethRpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    apiUrl: "https://api.snapshot.box",
    explorerUrl: "https://starkscan.co",
  },
  "sn-sep": {
    name: "Starknet Sepolia",
    chainId: ChainId.SN_SEPOLIA,
    baseChainId: 11155111,
    //baseNetworkId: "sep",
    rpcUrl: `https://starknet-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    ethRpcUrl: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    apiUrl:
      import.meta.env.VITE_STARKNET_SEPOLIA_API ??
      "https://testnet-api.snapshot.box",
    explorerUrl: "https://sepolia.starkscan.co",
  },
};
