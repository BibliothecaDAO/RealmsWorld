/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useEffect, useState } from "react";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
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

import { LORDS_BRIDGE_ADDRESS } from "@realms-world/constants";

import { useWriteDepositLords } from "./bridge/useWriteDepositLords";
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

  const { allowance, approve, approveHash, l1ERC20Contract } =
    useTokenContractAPI("LORDS", true);
  const { isSuccess: approveIsSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { address: l1Account, connector } = useL1Account();
  const { address: l2Address } = useL2Account();
  const { handleProgress, handleData, handleError } =
    useTransfer(TransferToL2Steps);
  const progressOptions = useTransferProgress();

  const { refetch } = useTransferLog();

  const l1BridgeAddress = LORDS_BRIDGE_ADDRESS[
    SUPPORTED_L1_CHAIN_ID
  ] as `0x${string}`;

  const onDeposit = async (event: any) => {
    console.log("Deposit event dispatched", event);
    //trackSuccess(event.transactionHash);
    const transferData = {
      type: ActionType.TRANSFER_TO_L2,
      sender: l1Account,
      recipient: l2Address,
      l1hash: event,
      name: "Lords",
      symbol: "LORDS",
      amount: amount.toString(),
      event,
    };
    await refetch();
    handleData(transferData);
  };
  const { writeAsync, error, ...writeReturn } = useWriteDepositLords({
    onSuccess: (data) => onDeposit(data),
  });

  useEffect(() => {
    if (error) {
      handleError(progressOptions.error(TransferError.TRANSACTION_ERROR));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeReturn.writeContract]);

  const sendDeposit = useCallback(
    async ({ amount, l2Address }: { amount: string; l2Address: string }) => {
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
      handleProgress(
        progressOptions.waitForConfirm(
          connector?.name ?? "Wallet",
          stepOf(TransferStep.CONFIRM_TX, TransferToL2Steps),
        ),
      );
      const hash = l2Address
        ? await writeAsync({
            amount: parseUnits(amount, 18),
            l2Address: l2Address,
          })
        : null;

      hash && onTransactionHash(error, hash, amount);
    },
    [connector?.name, handleProgress, progressOptions, writeAsync, error],
  );

  useEffect(() => {
    if (approveIsSuccess && l2Address) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      sendDeposit({ amount, l2Address });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveIsSuccess, l2Address]);

  /*useEffect(() => {
    if (writeReturn.isSuccess) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      onDeposit(writeReturn.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeReturn.isSuccess]);*/

  return useCallback(
    async ({ amount, l2Address }: { amount: string; l2Address: string }) => {
      try {
        setAmount(amount);
        console.log("TransferToL2 called");

        console.log("Token needs approval");
        handleProgress(
          progressOptions.approval(
            "Lords",
            stepOf(TransferStep.APPROVE, TransferToL2Steps),
          ),
        );
        console.log("Current allow value", formatEther(allowance ?? BigInt(0)));
        console.log(amount);
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
          await sendDeposit({ amount, l2Address });
        }
      } catch (ex: any) {
        //trackError(ex);
        console.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR));
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
