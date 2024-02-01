"use client";

import type { L1WriteBaseParams } from "@/types/L1WriteBaseParams";
import type { Config } from "@wagmi/core";
import type { ContractFunctionArgs, WriteContractReturnType } from "viem";
import type { WriteContractVariables } from "wagmi/query";
import { StarknetBridgeLords as L1_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeLords";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { tokens } from "@/constants/tokens";
import { useAccount as useL1Account, useWriteContract } from "wagmi";

import type { SupportedL1ChainId } from "@realms-world/constants/src/Chains";

const FUNCTION = "withdraw";

export type WriteDepositLordsParameters<
  config extends Config,
  chainId extends SupportedL1ChainId,
> = L1WriteBaseParams<
  typeof L1_BRIDGE_ABI,
  typeof FUNCTION,
  config,
  chainId
> & {
  args: {
    amount: number;
    l2Address: string;
  };
} & { l2ChainId: number };

export function useWriteFinalizeWithdrawLords<
  config extends Config,
  context = unknown,
>(
  {
    args,

    ...rest
  }: {
    args: {
      amount: number;
      l2Address: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rest: any;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
): Promise<WriteContractReturnType> {
  const { writeContractAsync } = useWriteContract();
  const { address: l1Address } = useL1Account();

  const writeDepost = writeContractAsync(
    {
      chainId: 1,
      address: tokens.L1.LORDS.bridgeAddress?.[
        SUPPORTED_L1_CHAIN_ID
      ] as `0x${string}`,
      abi: L1_BRIDGE_ABI,
      functionName: FUNCTION,
      args: [args.amount, args.l2Address, BigInt(1)],
      account: l1Address,
      ...rest,
    } as unknown as WriteContractVariables<
      typeof L1_BRIDGE_ABI,
      typeof FUNCTION,
      ContractFunctionArgs<typeof L1_BRIDGE_ABI, "nonpayable", typeof FUNCTION>,
      config,
      config["chains"][number]["id"]
    >,
    options,
  );

  return writeDepost;
}
