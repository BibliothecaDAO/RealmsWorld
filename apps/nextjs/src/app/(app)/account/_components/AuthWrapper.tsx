"use client";

import { useAccount as useStarknetAccount } from "@starknet-react/core";
import { useAccount as useEthereumAccount } from "wagmi";
import { StarknetAccountLogin } from "./StarknetAccountLogin";
import { EthereumAccountLogin } from "./EthereumAccountLogin";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isConnected: isStarknetConnected } = useStarknetAccount();
  const { isConnected: isEthereumConnected } = useEthereumAccount();

  const isFullyConnected = isStarknetConnected && isEthereumConnected;
  const isPartiallyConnected = isStarknetConnected || isEthereumConnected;

  return (
    <>
      {isPartiallyConnected ? (
        children
      ) : (
        <div className="mx-12 mt-12 flex max-w-[1000px] flex-col gap-4">
          <span className="mb-2 font-sans text-2xl tracking-widest">
            Connect a wallet
          </span>
          <div className="grid w-full gap-8 sm:grid-cols-2">
            <StarknetAccountLogin />
            <EthereumAccountLogin />
          </div>
        </div>
      )}
    </>
  );
};
