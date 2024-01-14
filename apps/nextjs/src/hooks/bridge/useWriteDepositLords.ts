"use client";

import type { StarknetBridgeLords as L1_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeLords";
import type { L1WriteBaseParams } from "@/types/L1WriteBaseParams";
import type { Config } from "@wagmi/core";
import type { Hash } from "viem";
import type { UseWriteContractParameters } from "wagmi";
import type { WriteContractVariables } from "wagmi/query";
import { useEffect, useMemo, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { useContractWrite as useL2ContractWrite } from "@starknet-react/core";
import { parseEther } from "viem";
import {
  useAccount as useL1Account,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import type { SupportedL1ChainId } from "@realms-world/constants/src/Chains";

const FUNCTION = "deposit";

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
    withdrawalTxHash: Hash;
  };
} & { l2ChainId: SupportedL1ChainId };

export function useWriteDepositLords<config extends Config, context = unknown>(
  args: UseWriteContractParameters<config, context> = {},
) {
  const { address: addressL1 } = useL1Account();

  const l1BridgeAddress =
    tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[NETWORK_NAME]];
  const l2BridgeAddress =
    tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]];

  const { error, writeContractAsync, ...writeReturn } = useWriteContract(args);

  /*const {
    writeContractAsync: deposit,
    data: depositData,
    error: depositError,
  } = useWriteContract({
    address: l1BridgeAddress as `0x${string}`,
    abi: L1_BRIDGE_ABI,
    functionName: "deposit",
  });

  const {
    data: depositReceipt,
    isLoading,
    status: depositTxStatus,
    isSuccess: depositIsSuccess,
    isError: depostTxError,
  } = useWaitForTransactionReceipt({
    hash: depositData,
  });

  const { writeContractAsync: withdraw, error: withdrawError } =
    useWriteContract({
      address: l1BridgeAddress as `0x${string}`,
      abi: L1_BRIDGE_ABI,
      functionName: "withdraw",
    });
  const {
    data: withdrawReceipt,
    isSuccess: withdrawIsSuccess,
    isError: withdrawTxError,
  } = useWaitForTransactionReceipt({
    hash: depositData,
  });
***/
  const [amount, setAmount] = useState<string | null>();

  const calls = useMemo(() => {
    if (amount) {
      console.log(amount);
      const tx = {
        contractAddress: l2BridgeAddress as `0x${string}`,
        entrypoint: "initiate_withdrawal",
        calldata: [addressL1, parseEther(amount).toString(), 0],
      };
      return [tx];
    }
  }, [amount]);

  const { write, data: withdrawHash } = useL2ContractWrite({ calls });

  const initiateWithdraw = (amount: string) => {
    setAmount(amount);
  };
  useEffect(() => {
    if (calls?.length) {
      write();
      setAmount(null);
    }
  }, [calls]);

  return {
    calls,
    deposit,
    depositData,
    depositIsSuccess,
    error: depositError || depostTxError,
    depositTxStatus,
    depositReceipt,
    //depositEth,
    withdraw,
    withdrawError,
    withdrawReceipt,
    withdrawIsSuccess,
    initiateWithdraw,
    withdrawHash,
  };
}
