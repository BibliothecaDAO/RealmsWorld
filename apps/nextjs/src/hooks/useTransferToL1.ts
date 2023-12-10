"use client";

import { useCallback, useEffect, useState } from "react";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import {
  ActionType,
  CompleteTransferToL1Steps,
  stepOf,
  TransferError,
  TransferStep,
  TransferToL1Steps,
} from "@/constants/transferSteps";
import { useBridgeContract } from "@/hooks/useBridgeContract";
import {
  useContractWrite,
  useAccount as useL2Account,
  useWaitForTransaction,
} from "@starknet-react/core";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";

import { useTransfer } from "./useTransfer";
import { useTransferProgress } from "./useTransferProgress";

export const useTransferToL1 = () => {
  const { initiateWithdraw, withdrawHash } = useBridgeContract();
  const { address: l1Account } = useAccount();
  const { address: l2Account, connector } = useL2Account();
  const { data } = useWaitForTransaction({
    hash: withdrawHash?.transaction_hash,
    watch: true,
  });
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
  }, [withdrawHash]);

  const { handleProgress, handleData, handleError } =
    useTransfer(TransferToL1Steps);
  const progressOptions = useTransferProgress();

  return useCallback(
    async (amount: string) => {
      try {
        console.log("TransferToL1 called");

        handleProgress(
          progressOptions.waitForConfirm(
            connector?.id || "",
            stepOf(TransferStep.CONFIRM_TX, TransferToL1Steps),
          ),
        );

        console.log("Calling initiate withdraw");

        initiateWithdraw(amount);

        if (withdrawHash?.transaction_hash) {
          const transferData = {
            type: ActionType.TRANSFER_TO_L1,
            sender: l2Account,
            recipient: l1Account,
            name: "Lords",
            symbol: "LORDS",
            amount,
            l2hash: withdrawHash?.transaction_hash,
          };
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
      initiateWithdraw,
      l1Account,
      l2Account,
      handleData,
      handleError,
      handleProgress,
      progressOptions,
    ],
  );
};

export const useCompleteTransferToL1 = () => {
  const { withdraw, withdrawIsSuccess, withdrawReceipt, withdrawError } =
    useBridgeContract();
  const { address: l1Account, connector } = useAccount();
  const { handleProgress, handleData, handleError } = useTransfer(
    CompleteTransferToL1Steps,
  );
  const progressOptions = useTransferProgress();
  const { refetch } = useTransferLog(true);
  const [transfer, setTransfer] = useState({});

  const onWithdrawal = (event: any) => {
    console.log("Withdrawal event dispatched", event, transfer);
    const { transactionHash: l1hash } = event;
    const transferData = { ...transfer, l1hash };
    handleData(transferData);
    refetch();
  };

  useEffect(() => {
    if (withdrawIsSuccess) {
      onWithdrawal(withdrawReceipt);
    }
  }, [withdrawIsSuccess]);

  return useCallback(
    async (transfer: any) => {
      setTransfer(transfer);
      const { symbol, withdrawalEvents, l2hash } = transfer;
      console.log(transfer);
      const onTransactionHash = (error: any, transactionHash: string) => {
        if (!error) {
          console.log("Tx signed", { transactionHash });
          handleProgress(
            progressOptions.withdraw(
              withdrawalEvents[0].amount,
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
            connector?.name || "",
            stepOf(TransferStep.CONFIRM_TX, CompleteTransferToL1Steps),
          ),
        );
        console.log("Calling withdraw", withdrawalEvents.amount);
        const { hash } = await withdraw({
          args: [withdrawalEvents[0].amount, l1Account!],
        });
        onTransactionHash(withdrawError, hash);
        //onWithdrawal(receipt.events[EventName.L1.LOG_WITHDRAWAL]);
      } catch (ex: any) {
        console.error(ex?.message, ex);
        handleError(progressOptions.error(TransferError.TRANSACTION_ERROR, ex));
      }
    },
    [
      handleProgress,
      progressOptions,
      connector?.name,
      withdraw,
      l1Account,
      withdrawError,
      handleError,
    ],
  );
};
