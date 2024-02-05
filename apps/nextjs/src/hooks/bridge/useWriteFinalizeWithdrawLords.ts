"use client";

import { useCallback } from "react";
import { StarknetBridgeLords as L1_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeLords";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { tokens } from "@/constants/tokens";
import { useWriteContract } from "wagmi";

const FUNCTION = "withdraw";

export function useWriteFinalizeWithdrawLords() {
  const { writeContractAsync, ...writeReturn } = useWriteContract();

  // if (!l2Address) throw new Error("Missing L2 Address");

  const writeAsync = useCallback(
    async ({
      amount,
      l1Address,
    }: {
      amount: bigint;
      l1Address: `0x${string}`;
    }) => {
      console.log(l1Address, amount);

      return await writeContractAsync({
        address: tokens.L1.LORDS.bridgeAddress?.[
          SUPPORTED_L1_CHAIN_ID
        ] as `0x${string}`,
        abi: L1_BRIDGE_ABI,
        functionName: FUNCTION,
        args: [amount, l1Address],
      });
    },
    [writeContractAsync],
  );
  return { writeAsync, ...writeReturn };
}
