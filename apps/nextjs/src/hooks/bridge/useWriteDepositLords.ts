import { useCallback } from "react";
import { StarknetBridgeLords as L1_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeLords";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { tokens } from "@/constants/tokens";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useWriteContract } from "wagmi";

const FUNCTION = "deposit";

export function useWriteDepositLords({ amount }: { amount: bigint }) {
  const { error, writeContractAsync, ...writeReturn } = useWriteContract();
  const { address: l2Address } = useL2Account();

  if (!l2Address) throw new Error("Missing L2 Address");

  const writeDepostAsync = useCallback(async () => {
    return await writeContractAsync({
      address: tokens.L1.LORDS.bridgeAddress?.[
        SUPPORTED_L1_CHAIN_ID
      ] as `0x${string}`,
      abi: L1_BRIDGE_ABI,
      functionName: FUNCTION,
      args: [amount, BigInt(l2Address), BigInt(1)],
    });
  }, [amount, l2Address, writeContractAsync]);
  return { writeDepostAsync, ...writeReturn };
}
