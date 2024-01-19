"use client";

import { ERC20 as L1_ERC20_ABI } from "@/abi/L1/ERC20";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { isEth } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
import {
  useAccount as useL1Account,
  useWriteContract as useL1ContractWrite,
  useReadContract,
} from "wagmi";

export const useTokenContractAPI = (
  symbol: "LORDS" | "ETH",
  spender?: boolean | string,
) => {
  /*const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[network]] as `0x${string}`
    const l1LordsAddress = tokens.L1.LORDS.tokenAddress?.[ChainType.L1[network]]
    const l2BridgeAddress = tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[network]]
    const l2LordsAddress = tokens.L2.LORDS.tokenAddress?.[ChainType.L2[network]]*/

  const l1Token = tokens.L1[symbol];
  const l2Token = tokens.L2[symbol];

  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useL2Account();

  const l1ERC20Contract = {
    address: isEth(symbol)
      ? "0x0000000000000000"
      : (l1Token.tokenAddress[ChainType.L1[NETWORK_NAME]] as `0x${string}`),
    abi: L1_ERC20_ABI,
  };

  const {
    writeContractAsync: approve,
    data: approveHash,
    isPending: approveWriteLoading,
  } = useL1ContractWrite();

  const { data: allowance /*, isError, isLoading */ } = useReadContract({
    ...l1ERC20Contract,
    functionName: "allowance",
    args: [
      l1Account!,
      (spender == true
        ? l1Token.bridgeAddress[ChainType.L1[NETWORK_NAME]]
        : spender) as `0x${string}`,
    ],
    //enabled: !!(l1Account && spender),
  });
  return {
    l1ERC20Contract,
    approve,
    approveWriteLoading,
    approveHash,
    allowance,
  };
};
