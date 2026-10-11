import { expectedStarknetChain } from "@/utils/starknet-chain";
import { useAccount } from "@starknet-start/react";

/**
 * True when a wallet is connected on any chain other than the one this
 * deployment targets (`VITE_PUBLIC_CHAIN`).
 */
const useIsWrongNetwork = () => {
  const { address, chainId } = useAccount();

  const isWrongNetwork =
    !!address && chainId !== undefined && chainId !== expectedStarknetChain.id;

  return { isWrongNetwork };
};

export default useIsWrongNetwork;
