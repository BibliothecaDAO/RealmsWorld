/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import {
  CompleteTransferToL1Steps,
  stepOf,
  TransferError,
  TransferStep,
} from "@/constants/transferSteps";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

import { useWriteFinalizeWithdrawLords } from "./bridge/useWriteFinalizeWithdrawLords";
import { useTransfer } from "./useTransfer";
import { useTransferProgress } from "./useTransferProgress";

/*export const useTransferToL1 = ({ amount }) => {
  const { writeAsync, withdrawHash } = useWriteInitiateWithdrawLords({
    amount,
  });
  const { address: l1Account } = useAccount();
  const { address: l2Account, connector } = useL2Account();
  const { handleProgress, handleData, handleError } =
    useTransfer(TransferToL1Steps);
  useEffect(() => {
    if (withdrawHash) {
      console.log("Done", { hash: withdrawHash?.transaction_hash });
      handleData({
        type: ActionType.TRANSFER_TO_L1,
        sender: l2Account,
        recipient: l1Account,
        name: "Lords",
        symbol: "LORDS",
        amount: 420,
        l2hash: withdrawHash?.transaction_hash,
      });
    }
  }, [handleData, l1Account, l2Account, withdrawHash]);

  const progressOptions = useTransferProgress();

  return useCallback(
    async (amount: string) => {
      try {
        console.log("TransferToL1 called");

        handleProgress(
          progressOptions.waitForConfirm(
            connector?.id ?? "",
            stepOf(TransferStep.CONFIRM_TX, TransferToL1Steps),
          ),
        );

        console.log("Calling initiate withdraw");

        await writeAsync();

        if (withdrawHash?.transaction_hash) {
          console.log("Tx hash received", {
            hash: withdrawHash?.transaction_hash,
          });
          handleProgress(
            progressOptions.initiateWithdraw(
              parseInt(amount),
              "LORDS",
              stepOf(TransferStep.INITIATE_WITHDRAW, TransferToL1Steps),
            ),
          );
          console.log("Waiting for tx to be received on L2");
        }
      } catch (ex: any) {
        console.error(ex.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      handleProgress,
      progressOptions,
      connector?.id,
      initiateWithdraw,
      withdrawHash?.transaction_hash,
      handleError,
    ],
  );
};*/
export const useCompleteTransferToL1 = () => {
  const { address: l1Address, connector } = useAccount();

  const { writeAsync, data } = useWriteFinalizeWithdrawLords();

  const { handleProgress, handleData, handleError } = useTransfer(
    CompleteTransferToL1Steps,
  );
  const progressOptions = useTransferProgress();
  const { refetch } = useTransferLog(true);
  const [transfer, setTransfer] = useState({});

  const onWithdrawal = (event: { blockHash: string }) => {
    console.log("Withdrawal event dispatched", event, transfer);
    const transferData = { ...transfer, l1hash: event?.blockHash };
    handleData(transferData);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
  };
  const { isSuccess: withdrawIsSuccess, data: withdrawReceipt } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  useEffect(() => {
    if (withdrawIsSuccess) {
      onWithdrawal(withdrawReceipt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawIsSuccess]);

  return useCallback(
    async (transfer: {
      symbol: string;
      withdrawalEvents: { amount: number }[];
    }) => {
      setTransfer(transfer);
      const { symbol, withdrawalEvents } = transfer;
      console.log(transfer);
      const onTransactionHash = (error: any, transactionHash: string) => {
        if (!error) {
          console.log("Tx signed", { transactionHash });
          handleProgress(
            progressOptions.withdraw(
              withdrawalEvents[0]?.amount ?? 0,
              symbol,
              stepOf(TransferStep.WITHDRAW, CompleteTransferToL1Steps),
            ),
          );
        }
      };

      try {
        console.log("CompleteTransferToL1 called");
        handleProgress(
          progressOptions.waitForConfirm(
            connector?.name ?? "",
            stepOf(TransferStep.CONFIRM_TX, CompleteTransferToL1Steps),
          ),
        );
        console.log("Calling withdraw", withdrawalEvents[0]?.amount);
        if (!l1Address) return "L1 Address not defined";
        const hash = await writeAsync({
          amount: BigInt(withdrawalEvents[0]?.amount ?? 0),
          l1Address,
        });
        onTransactionHash(null, hash);

        //onWithdrawal(receipt.events[EventName.L1.LOG_WITHDRAWAL]);
      } catch (ex: any) {
        console.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR));
      }
    },
    [
      handleProgress,
      progressOptions,
      connector?.name,
      writeAsync,
      l1Address,
      handleError,
    ],
  );
};
