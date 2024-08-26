import type { Network } from "@/lib/network/types";
import type { NetworkID } from "@/types";
import type {
  BigNumberish
} from "starknet";
import {
  constants as starknetConstants,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
} from "starknet";

import { createApi } from "../common";
import { STARKNET_CONNECTORS } from "../common/constants";
import { createActions } from "./actions";
import { createProvider } from "./provider";

interface Metadata {
  name: string;
  chainId: string;
  baseChainId: number;
  baseNetworkId: NetworkID;
  rpcUrl: string;
  ethRpcUrl: string;
  explorerUrl: string;
  apiUrl: string;
}

export const METADATA: Partial<Record<NetworkID, Metadata>> = {
  sn: {
    name: "Starknet",
    chainId: starknetConstants.StarknetChainId.SN_MAIN,
    baseChainId: 1,
    baseNetworkId: "eth",
    rpcUrl: `https://starknet-mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    ethRpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    apiUrl: "https://api-1.snapshotx.xyz",
    explorerUrl: "https://starkscan.co",
  },
  "sn-sep": {
    name: "Starknet (Sepolia)",
    chainId: starknetConstants.StarknetChainId.SN_SEPOLIA,
    baseChainId: 11155111,
    baseNetworkId: "sep",
    rpcUrl: `https://starknet-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    ethRpcUrl: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`,
    apiUrl:
      import.meta.env.VITE_STARKNET_SEPOLIA_API as string ||
      "https://testnet-api-1.snapshotx.xyz",
    explorerUrl: "https://sepolia.starkscan.co",
  },
};

export function createStarknetNetwork(networkId: NetworkID): Network {
  const metadata = METADATA[networkId];
  if (!metadata) throw new Error(`Unsupported network ${networkId}`);

  const {
    name,
    chainId,
    baseChainId,
    baseNetworkId,
    rpcUrl,
    ethRpcUrl,
    apiUrl,
    explorerUrl,
  } = metadata;

  const provider = createProvider(rpcUrl);
  const api = createApi(apiUrl, networkId);

  const helpers = {
    waitForTransaction: (txId: BigNumberish) => {
      let retries = 0;

      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const timer = setInterval(async () => {
          let tx: Awaited<ReturnType<typeof provider.getTransactionReceipt>>;
          try {
            tx = await provider.getTransactionReceipt(txId);
            // e
          } catch (e) {
            console.error(e);
            if (retries > 20) {
              clearInterval(timer);
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
              reject();
            }

            retries++;

            return;
          }

          const successStates = [
            TransactionFinalityStatus.ACCEPTED_ON_L1,
            TransactionFinalityStatus.ACCEPTED_ON_L2,
          ];

          if (successStates.includes(tx.finality_status as TransactionFinalityStatus)) {
            clearInterval(timer);
            resolve(tx);
          }

          if (tx.execution_status === TransactionExecutionStatus.REVERTED) {
            clearInterval(timer);
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(tx);
          }
        }, 2000);
      });
    },
    getExplorerUrl: (id: string | number, type: string) => {
      let dataType: "tx" | "contract" | "token" = "tx";
      if (type === "token") dataType = "token";
      else if (["address", "contract", "strategy"].includes(type))
        dataType = "contract";

      return `${explorerUrl}/${dataType}/${id}`;
    },
  };

  return {
    name,
    avatar:
      "ipfs://bafkreihbjafyh7eud7r6e5743esaamifcttsvbspfwcrfoc5ykodjdi67m",
    currentUnit: "second",
    chainId,
    baseChainId,
    currentChainId: baseChainId,
    baseNetworkId,
    supportsSimulation: true,
    managerConnectors: STARKNET_CONNECTORS,
    //@ts-expect-error are extra helpers needed?
    actions: createActions(networkId, provider, helpers, {
      l1ChainId: baseChainId,
      ethUrl: ethRpcUrl,
    }),
    api,
    //@ts-expect-error are extra helpers needed?
    helpers,
  };
}
