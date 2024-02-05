/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useEffect, useState } from "react";
import { StarknetBridgeLords as L1_BRIDGE_ABI } from "@/abi/L1/StarknetBridgeLords";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import {
  ActionType,
  TransferStep,
  TransferToL2Steps,
} from "@/constants/transferSteps";
import { useAccount as useL2Account } from "@starknet-react/core";
import { formatEther, parseEther, parseUnits } from "viem";
import {
  useAccount as useL1Account,
  useWaitForTransactionReceipt,
} from "wagmi";

import { useBridgeContract } from "./bridge/useBridgeContract";
import { useTokenContractAPI } from "./useTokenContract";
import { useTransfer } from "./useTransfer";
import { useTransferProgress } from "./useTransferProgress";

export const TransferError = {
  TRANSACTION_ERROR: 0,
  MAX_TOTAL_BALANCE_ERROR: 1,
};

export const stepOf = (step: any, steps: any) => {
  return steps.indexOf(step);
};

export const useTransferToL2 = () => {
  const [amount, setAmount] = useState("");
  //onst [trackInitiated, trackSuccess, trackError, trackReject] = useTransferToL2Tracking();
  const { deposit, depositIsSuccess, depositError, depositReceipt } =
    useBridgeContract();

  const { allowance, approve, approveHash, l1ERC20Contract } =
    useTokenContractAPI("LORDS", true);
  const { isSuccess: approveIsSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { address: l1Account, connector } = useL1Account();
  const { address: l2Account } = useL2Account();
  const { handleProgress, handleData, handleError } =
    useTransfer(TransferToL2Steps);
  const progressOptions = useTransferProgress();

  const { refetch } = useTransferLog();

  const l1BridgeAddress = tokens.L1.LORDS.bridgeAddress?.[
    ChainType.L1[NETWORK_NAME]
  ] as `0x${string}`;

  const onTransactionHash = (
    error: any,
    transactionHash: string,
    amount: string,
  ) => {
    if (!error) {
      console.log("Tx signed", { transactionHash, amount });
      handleProgress(
        progressOptions.deposit(
          amount,
          "Lords",
          stepOf(TransferStep.DEPOSIT, TransferToL2Steps),
        ),
      );
    }
  };

  const onDeposit = async (event: any) => {
    console.log("Deposit event dispatched", event);
    //trackSuccess(event.transactionHash);
    const transferData = {
      type: ActionType.TRANSFER_TO_L2,
      sender: l1Account,
      recipient: l2Account,
      l1hash: event.transactionHash,
      name: "Lords",
      symbol: "LORDS",
      amount: amount.toString(),
      event,
    };
    await refetch();
    handleData(transferData);
  };
  useEffect(() => {
    if (depositError) {
      handleError(
        progressOptions.error(TransferError.TRANSACTION_ERROR, depositError),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositError]);

  const sendDeposit = useCallback(async (amount: string) => {
    handleProgress(
      progressOptions.waitForConfirm(
        connector?.name ?? "Wallet",
        stepOf(TransferStep.CONFIRM_TX, TransferToL2Steps),
      ),
    );
    const hash = await deposit({
      address: l1BridgeAddress,
      abi: L1_BRIDGE_ABI,
      functionName: "deposit",
      args: [parseUnits(amount, 18), BigInt(l2Account ?? "0x"), BigInt(1)],
      value: parseEther("0.000000000001"),
    });
    onTransactionHash(depositError, hash, amount);
  }, []);

  useEffect(() => {
    if (approveIsSuccess) {
      void sendDeposit(amount);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveIsSuccess]);

  useEffect(() => {
    if (depositIsSuccess) {
      void onDeposit(depositReceipt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositIsSuccess]);

  return useCallback(
    async (amount: string) => {
      setAmount(amount);
      try {
        console.log("TransferToL2 called");

        console.log("Token needs approval");
        handleProgress(
          progressOptions.approval(
            "Lords",
            stepOf(TransferStep.APPROVE, TransferToL2Steps),
          ),
        );
        console.log("Current allow value", allowance?.toString());
        if (Number(formatEther(allowance ?? BigInt(0))) < Number(amount)) {
          console.log(
            "Allow value is smaller then amount, sending approve tx...",
            { amount, l1BridgeAddress },
          );
          await approve({
            ...l1ERC20Contract,
            functionName: "approve",
            args: [l1BridgeAddress, parseEther(amount)],
          });
        }
        if (allowance && Number(formatEther(allowance)) >= Number(amount)) {
          console.log("Calling deposit");
          await sendDeposit(amount);
        }
      } catch (ex: any) {
        //trackError(ex);
        console.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      handleProgress,
      progressOptions,
      allowance,
      l1BridgeAddress,
      approve,
      l1ERC20Contract,
      sendDeposit,
      handleError,
    ],
  );
};
