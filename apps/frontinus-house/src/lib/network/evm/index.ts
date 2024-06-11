import networks from "@/data/networks.json";
import { Network } from "@/lib/network/types";
import { getProvider } from "@/lib/provider";
import { NetworkID } from "@/types";

import { createApi } from "../common";
import { EVM_CONNECTORS } from "../common/constants";
import { createActions } from "./actions";

type Metadata = {
  name: string;
  ticker?: string;
  chainId: number;
  currentChainId?: number;
  apiUrl: string;
  avatar: string;
  blockTime: number;
};

// shared for both ETH mainnet and ARB1
const ETH_MAINNET_BLOCK_TIME = 12.09;

export const METADATA: Record<string, Metadata> = {
  eth: {
    name: "Ethereum",
    chainId: 1,
    apiUrl: "https://api.studio.thegraph.com/query/23545/sx/version/latest",
    avatar:
      "ipfs://bafkreid7ndxh6y2ljw2jhbisodiyrhcy2udvnwqgon5wgells3kh4si5z4",
    blockTime: ETH_MAINNET_BLOCK_TIME,
  },
  sep: {
    name: "Ethereum Sepolia",
    chainId: 11155111,
    apiUrl:
      import.meta.env.VITE_EVM_SEPOLIA_API ??
      "https://api.studio.thegraph.com/query/23545/sx-sepolia/version/latest",
    avatar:
      "ipfs://bafkreid7ndxh6y2ljw2jhbisodiyrhcy2udvnwqgon5wgells3kh4si5z4",
    blockTime: 13.2816,
  },
};

export function createEvmNetwork(networkId: NetworkID): Network {
  const { name, chainId, currentChainId, apiUrl, avatar } = METADATA[
    networkId
  ] as Metadata;

  const provider = getProvider(chainId);
  const api = createApi(apiUrl, networkId, {
    highlightApiUrl: import.meta.env.VITE_HIGHLIGHT_URL,
  });
  const helpers = {
    waitForTransaction: (txId: string) => provider.waitForTransaction(txId),
    getExplorerUrl: (id: any, type: string) => {
      let dataType: "tx" | "address" | "token" = "tx";
      if (type === "token") dataType = "token";
      else if (["address", "contract", "strategy"].includes(type))
        dataType = "address";
      //@ts-expect-error json
      return `${networks[chainId].explorer}/${dataType}/${id}`;
    },
  };

  return {
    name,
    avatar,
    currentUnit: "block",
    chainId,
    baseChainId: chainId,
    currentChainId: currentChainId ?? chainId,
    supportsSimulation: ["eth", "sep"].includes(networkId),
    managerConnectors: EVM_CONNECTORS,
    //@ts-expect-error incorrect helpers TODO
    actions: createActions(provider, helpers, chainId),
    api,
    //@ts-expect-error incorrect helpers TODO
    helpers,
  };
}
