"use client";

import { useAccount as useStarknetAccount } from "@starknet-react/core";
import {
  useAccount as useEthereumAccount,
  useSwitchChain as useSwitchEthereumChain,
} from "wagmi";

import { EthereumLoginButton } from "../_components/wallet/EthereumLoginButton";
import { StarknetLoginButton } from "../_components/wallet/StarknetLoginButton";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    //chainId: starknetConnectorChainId,
    isConnected: isStarknetConnected,
  } = useStarknetAccount();

  const { chainId: ethereumChainId, isConnected: isEthereumConnected } =
    useEthereumAccount();
  const { chains: ethereumChains } = useSwitchEthereumChain();
  const isEthereumRightNetwork = ethereumChainId === ethereumChains[0].id;

  const fullyConnected =
    isStarknetConnected && isEthereumConnected && isEthereumRightNetwork; /*&&
    isStarknetRightNetwork;*/

  return (
    <>
      {fullyConnected ? (
        children
      ) : (
        <div className="flex max-w-[250px] flex-col gap-4">
          <span className="text-xl">Connect your wallets</span>
          {!isStarknetConnected && <StarknetLoginButton />}
          {!isEthereumConnected && <EthereumLoginButton />}
        </div>
      )}
    </>
  );
};
