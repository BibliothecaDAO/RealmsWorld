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

import { Button } from "@realms-world/ui";

import { WrongNetworkModal } from "../_components/modal/WrongNetworkModal";

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
        <div>
          Not connected
          {data?.toString()}
          <Button onClick={() => request()}>Request chain</Button>
          {isStarknetConnected && !isStarknetRightNetwork && !isPending && (
            <WrongNetworkModal />
          )}
        </div>
      )}
    </>
  );
};
