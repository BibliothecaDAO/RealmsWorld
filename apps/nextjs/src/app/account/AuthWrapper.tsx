"use client";

import { useEffect } from "react";
import {
  useNetwork,
  useAccount as useStarknetAccount,
  useWalletRequest,
} from "@starknet-react/core";
import {
  useAccount as useEthereumAccount,
  useSwitchChain as useSwitchEthereumChain,
} from "wagmi";

import { WrongNetworkModal } from "../_components/modal/WrongNetworkModal";
import { EthereumLoginButton } from "../_components/wallet/EthereumLoginButton";
import { StarknetLoginButton } from "../_components/wallet/StarknetLoginButton";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    //chainId: starknetConnectorChainId,
    isConnected: isStarknetConnected,
    account,
  } = useStarknetAccount();
  const { request, data, isPending } = useWalletRequest({
    type: "wallet_requestChainId",
  });

  const { chain: starknetChain } = useNetwork();

  const { chainId: ethereumChainId, isConnected: isEthereumConnected } =
    useEthereumAccount();
  const { chains: ethereumChains } = useSwitchEthereumChain();
  const isEthereumRightNetwork = ethereumChainId === ethereumChains[0].id;

  const isStarknetRightNetwork =
    data !== undefined && BigInt(data) === starknetChain.id;

  const fullyConnected =
    isStarknetConnected &&
    isEthereumConnected &&
    isEthereumRightNetwork &&
    isStarknetRightNetwork;

  // TODO refactor back to default Chain Id when starknet-react supports
  useEffect(() => {
    if (account !== undefined) {
      request();
    }
  }, [account, request]);

  return (
    <>
      {fullyConnected ? (
        children
      ) : (
        <div className="flex max-w-[250px] flex-col gap-4">
          <span className="text-xl">Connect your wallets</span>
          {!isStarknetConnected && <StarknetLoginButton />}
          {!isEthereumConnected && <EthereumLoginButton />}
          {isStarknetConnected && !isStarknetRightNetwork && !isPending && (
            <WrongNetworkModal />
          )}
        </div>
      )}
    </>
  );
};
