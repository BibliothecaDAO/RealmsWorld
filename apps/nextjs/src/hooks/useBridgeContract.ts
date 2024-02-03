/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type { Call } from "starknet";
import { useEffect, useMemo, useState } from "react";
import L2BridgeABI from "@/abi/L2/LordsBridge.json";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import {
  useContract,
  useContractWrite as useL2ContractWrite,
} from "@starknet-react/core";
import { parseEther } from "viem";
import {
  useAccount as useL1Account,
  useWriteContract as useL1ContractWrite,
  useWaitForTransactionReceipt,
} from "wagmi";

export const useBridgeContract = () => {
  const { address: addressL1 } = useL1Account();

  const l2BridgeAddress =
    tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]];
  const { contract } = useContract({
    abi: L2BridgeABI,
    address: l2BridgeAddress as `0x${string}`,
  });

  const {
    writeContractAsync: deposit,
    data: depositData,
    error: depositError,
  } = useL1ContractWrite();
  const {
    data: depositReceipt,

    status: depositTxStatus,
    isSuccess: depositIsSuccess,
  } = useWaitForTransactionReceipt({
    hash: depositData,
  });

  const { writeContractAsync: withdraw, error: withdrawError } =
    useL1ContractWrite();
  const { data: withdrawReceipt, isSuccess: withdrawIsSuccess } =
    useWaitForTransactionReceipt({
      hash: depositData,
    });

  const [amount, setAmount] = useState<string | null>();

  const calls: Call[] = useMemo(() => {
    if (!amount || !addressL1) return [];
    return [
      contract?.populateTransaction.initiate_withdrawal!(addressL1, {
        low: parseEther(amount),
        high: 0,
      }),
    ];

    /*const tx = {
      contractAddress: l2BridgeAddress as `0x${string}`,
      entrypoint: "initiate_withdrawal",
      calldata: [addressL1, parseEther(amount).toString(), 0],
    };
    return [tx];*/
  }, [addressL1, amount, contract?.populateTransaction.initiate_withdrawal]);

  const { write, data: withdrawHash } = useL2ContractWrite({ calls });

  const initiateWithdraw = (amount: string) => {
    setAmount(amount);
  };
  useEffect(() => {
    if (calls?.length) {
      write();
      setAmount(null);
    }
  }, [calls, write]);

  return {
    calls,
    initiateWithdraw,
    withdrawHash,
    withdraw,
    withdrawIsSuccess,
    withdrawReceipt,
    withdrawError,
    deposit,
    depositIsSuccess,
    depositError,
    depositTxStatus,
    depositReceipt,
  };
};
