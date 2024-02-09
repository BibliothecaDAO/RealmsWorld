"use client";

import { ERC20 as L1_ERC20_ABI } from "@/abi/L1/ERC20";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { isEth } from "@/utils/utils";
import {
  useAccount as useL1Account,
  useWriteContract as useL1ContractWrite,
  useReadContract,
} from "wagmi";

import { LORDS, LORDS_BRIDGE_ADDRESS } from "@realms-world/constants";

export const useTokenContractAPI = (
  symbol: "LORDS" | "ETH",
  spender?: boolean | string,
) => {
  /*const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[network]] as `0x${string}`
    const l1LordsAddress = tokens.L1.LORDS.tokenAddress?.[ChainType.L1[network]]
    const l2BridgeAddress = tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[network]]
    const l2LordsAddress = tokens.L2.LORDS.tokenAddress?.[ChainType.L2[network]]*/

  const { address: l1Account } = useL1Account();

  const l1ERC20Contract = {
    address: isEth(symbol)
      ? "0x0000000000000000"
      : (LORDS[SUPPORTED_L1_CHAIN_ID]?.address as `0x${string}`),
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
        ? LORDS_BRIDGE_ADDRESS[SUPPORTED_L1_CHAIN_ID]
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
