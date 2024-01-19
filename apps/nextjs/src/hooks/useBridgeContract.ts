"use client";

import { useEffect, useMemo, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { useContractWrite as useL2ContractWrite } from "@starknet-react/core";
import { parseEther } from "viem";
import {
  useAccount as useL1Account,
  useWriteContract as useL1ContractWrite,
  useWaitForTransactionReceipt,
} from "wagmi";

export const useBridgeContract = () => {
  const { address: addressL1 } = useL1Account();

  const l1BridgeAddress =
    tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[NETWORK_NAME]];
  const l2BridgeAddress =
    tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]];

  const {
    writeContractAsync: deposit,
    data: depositData,
    error: depositError,
  } = useL1ContractWrite();
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
    useL1ContractWrite();
  const {
    data: withdrawReceipt,
    isSuccess: withdrawIsSuccess,
    isError: withdrawTxError,
  } = useWaitForTransactionReceipt({
    hash: depositData,
  });

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
