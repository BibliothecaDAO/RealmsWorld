import { timeStamp } from "console";
import type { Transaction } from "@/stores/useTransasctionManager";
import type { RealmsWithdrawal, RealmsWithdrawalEvent } from "@/types/subgraph";
import { useEffect, useMemo } from "react";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  BridgeTransactionType,
  TransactionType,
} from "@/constants/transactions";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import { api } from "@/trpc/react";
import { useAccount as useStarknetAccount } from "@starknet-react/core";
import { useAccount } from "wagmi";

import type { RouterInputs, RouterOutputs } from "@realms-world/api";
import { ChainId } from "@realms-world/constants";
import { padAddress } from "@realms-world/utils";

export interface CombinedTransaction
  extends Transaction,
    Partial<RealmsWithdrawal> {
  tokenIds?: string[];
}

export const useTransactions = () => {
  const transactionState = useStore(useTransactionManager, (state) => state);
  const transactions = transactionState?.transactions;
  const allTransactionsProcessed = transactionState?.allTransacationsProcessed;
  const finishedRealmsWithdrawalsProcessed =
    transactionState?.finishedRealmsWithdrawalsProcessed;

  const { address } = useAccount();
  const { address: l2Address } = useStarknetAccount();

  // grabs all pending realm withdrawals
  const { data: pendingWithdrawals } = usePendingRealmsWithdrawals(
    { address },
    allTransactionsProcessed,
  );

  // finds all of the finishedWithdrawals
  const finishedWithdrawals = pendingWithdrawals?.map((withdrawal) => {
    if (withdrawal.withdrawalEvents[0]?.status === "FINISHED") {
      return withdrawal;
    }
  });

  // executes if the user does not have all of their finished transactions already stored in local storage.
  // or if user has a finished transaction that is not yet in localstorage
  if (!finishedRealmsWithdrawalsProcessed) {
    console.log(finishedWithdrawals);
    finishedWithdrawals?.forEach((withdrawal, i) => {
      let finishedTransaction: Transaction = {
        status: "complete",
        type: TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM,
        chainId: SUPPORTED_L2_CHAIN_ID,
        hash: withdrawal?.withdrawalEvents[0]?.finishedTxHash || "",
        timestamp: new Date(Number(withdrawal?.createdTimestamp ?? 0n) * 1000),
      };
      if (!transactions?.includes(finishedTransaction)) {
        transactionState?.addTx(finishedTransaction);
      }
      if (i === finishedWithdrawals?.length - 1) {
        transactionState?.updateFinishedRealmsWithdrawalsProcessed();
      }
    });
  }

  const filters: RouterInputs["erc721Bridge"]["all"] = useMemo(
    () => ({
      l1Account: padAddress(address),
      l2Account: padAddress(l2Address),
    }),
    [address, l2Address],
  );
  const { data: l2BridgeTransactions } = api.erc721Bridge.all.useQuery(
    filters,
    {
      refetchInterval: allTransactionsProcessed === false ? 20000 : false,
      enabled: !!address || !!l2Address,
    },
  );

  const l2TransactionsMap = useMemo(() => {
    const map = new Map<
      bigint,
      NonNullable<RouterOutputs["erc721Bridge"]["all"]>[number] & {
        withdrawalEvents?: RealmsWithdrawalEvent[];
        chainId: ChainId;
      }
    >(
      l2BridgeTransactions?.map((tx) => [
        BigInt(tx.req_hash ?? ""),
        {
          ...tx,
          type: BridgeTransactionType[
            tx.type as keyof typeof BridgeTransactionType
          ],
          chainId: !tx.hash ? SUPPORTED_L1_CHAIN_ID : SUPPORTED_L2_CHAIN_ID,
        },
      ]),
    );

    pendingWithdrawals?.forEach((withdrawal) => {
      console.log(map);
      if (withdrawal.req_hash) {
        const matchingTransaction = map.get(withdrawal.req_hash);
        if (matchingTransaction) {
          matchingTransaction.withdrawalEvents = withdrawal.withdrawalEvents;
          matchingTransaction.type =
            TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM;
          matchingTransaction.chainId = SUPPORTED_L1_CHAIN_ID;
        } else {
          map.set(BigInt(withdrawal.req_hash), {
            ...withdrawal,
            chainId: SUPPORTED_L1_CHAIN_ID,
            req_hash: withdrawal.req_hash.toString(),
            hash:
              withdrawal.withdrawalEvents[0]?.finishedTxHash ??
              withdrawal.withdrawalEvents[0]?.createdTxHash,
            l1Account: padAddress(address),
            l2Account: padAddress(l2Address),
            timestamp: new Date(
              Number(withdrawal.createdTimestamp ?? 0n) * 1000,
            ),
            withdrawalEvents: withdrawal.withdrawalEvents,
            type: TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM,
            _cursor: 0,
            tokenIds:
              withdrawal.withdrawalEvents[0]?.tokenIds.map((id) =>
                id.toString(),
              ) ?? [],
          });
        }
      }
    });

    return map;
  }, [l2BridgeTransactions, pendingWithdrawals, address]);

  const combinedTransactions: CombinedTransaction[] = useMemo(() => {
    const transactionsMap = new Map<string, CombinedTransaction>();

    const transactionsArray = Array.from(l2TransactionsMap.values()).map(
      (tx) => ({
        ...tx,
        req_hash: tx.req_hash ? BigInt(tx.req_hash) : undefined,
      }),
    );
    // Add transactions to the map, deduplicating by hash

    transactionsArray.forEach((tx) => {
      if (tx.hash && !transactionsMap.has(tx.hash)) {
        transactionsMap.set(tx.hash, tx);
      }
    });

    // Add any additional transactions that might not be in the l2TransactionsMap
    if (transactions?.length) {
      transactions.forEach((tx) => {
        if (tx.hash && !transactionsMap.has(tx.hash)) {
          transactionsMap.set(tx.hash, tx);
        }
      });
    }

    // Convert the map back to an array
    const deduplicatedArray = Array.from(transactionsMap.values());

    // Sort the transactions by timestamp
    deduplicatedArray.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });

    return deduplicatedArray;
  }, [l2TransactionsMap, transactions]);

  useEffect(() => {
    if (allTransactionsProcessed === false) {
      transactionState?.updateAllTransacationsProcessed();
    }
  }, [allTransactionsProcessed, transactionState, combinedTransactions]);

  return {
    transactions: combinedTransactions,
  };
};
