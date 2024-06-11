import { useMemo } from "react";
import ERC721ABI from "@/abi/L2/ERC721.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useAccount,
  useContractRead,
  useContractWrite,
} from "@starknet-react/core";

import {
  Collections,
  getCollectionAddresses,
  REALMS_BRIDGE_ADDRESS,
} from "@realms-world/constants";

import { useERC721Approval } from "../token/starknet/useERC721Approval";
import { useWriteInitiateWithdrawRealms } from "./useWriteInitiateWithdrawRealms";

export function useBridgeL2Realms({
  selectedTokenIds,
}: {
  selectedTokenIds: string[];
}) {
  const l2BridgeAddress = REALMS_BRIDGE_ADDRESS[SUPPORTED_L2_CHAIN_ID];
  const { address } = useAccount();
  const l2RealmsAddress = getCollectionAddresses(Collections.REALMS)?.[
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;

  const { data: isApprovedForAll } = useContractRead({
    abi: ERC721ABI,
    address: l2RealmsAddress,
    args: l2BridgeAddress ? [address ?? "0xtest", l2BridgeAddress] : [],
    functionName: "is_approved_for_all",
    watch: true,
  });

  const { calls: approveCall } = useERC721Approval({
    contractAddress: l2RealmsAddress,
    operator: l2BridgeAddress as `0x${string}`,
  });

  const { calls: depositCall } = useWriteInitiateWithdrawRealms({
    selectedTokenIds,
  });

  const depositCalls = useMemo(() => {
    if (!isApprovedForAll) {
      return [...approveCall, ...depositCall];
    }
    return [...depositCall];
  }, [approveCall, depositCall, isApprovedForAll]);

  const { writeAsync, ...writeReturn } = useContractWrite({
    calls: depositCalls,
  });

  return {
    isApprovedForAll,
    writeAsync,
    ...writeReturn,
  };
}
