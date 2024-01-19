"use client";

import type { L1WriteBaseParams } from "@/types/L1WriteBaseParams";
import type { Config } from "@wagmi/core";
import type { ContractFunctionArgs, Hash, WriteContractReturnType } from "viem";
import type {
  UseWriteContractParameters,
  UseWriteContractReturnType,
} from "wagmi";
import type { WriteContractVariables } from "wagmi/query";
import { useEffect, useMemo, useState } from "react";
import { StarknetBridgeLords as L1_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeLords";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { useContractWrite as useL2ContractWrite } from "@starknet-react/core";
import { parseEther } from "viem";
import {
  useConfig,
  useAccount as useL1Account,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

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
    l2ChainId,
    ...rest
  }: {
    args: {
      amount: number;
      l2Address: string;
    };
    l2ChainId: number;
    rest: any;
  },
  options: any,
): Promise<WriteContractReturnType> {
  const l1BridgeAddress =
    tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[NETWORK_NAME]];
  const l2BridgeAddress =
    tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]];

  const { error, writeContractAsync, ...writeReturn } = useWriteContract();
  const { address: l1Address } = useL1Account();

  const writeDepost = writeContractAsync(
    {
      chainId: 1,
      address: tokens.L1.LORDS.bridgeAddress?.[
        ChainType.L1[NETWORK_NAME]
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
