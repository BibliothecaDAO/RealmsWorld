"use client";

import { useCallback } from "react";
import { StarknetBridgeRealms as L1_REALMS_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeRealms";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useWriteContract } from "wagmi";

import { REALMS_BRIDGE_ADDRESS } from "@realms-world/constants";

const FUNCTION = "withdrawTokens";

export function useWriteFinalizeWithdrawRealms() {
  const { writeContractAsync, data, ...writeReturn } = useWriteContract();

  // if (!l2Address) throw new Error("Missing L2 Address");

  const writeAsync = useCallback(
    async ({
      tokenIds,
      l1Address,
    }: {
      tokenIds: string[];
      l1Address: `0x${string}`;
    }) => {
      console.log(l1Address, tokenIds);
      const parsedTokenIds = tokenIds.map((id) => BigInt(id));

      return await writeContractAsync({
        address: REALMS_BRIDGE_ADDRESS[SUPPORTED_L1_CHAIN_ID] as `0x${string}`,
        abi: L1_REALMS_BRIDGE_ABI,
        functionName: FUNCTION,
        args: [parsedTokenIds, l1Address],
      });
    },
    [writeContractAsync],
  );
  return { writeAsync, data, ...writeReturn };
}
