import type { TransactionType } from "@/constants/transactions";
import type { RealmsWithdrawal, RealmsWithdrawalEvent } from "@/types/subgraph";
import { isStarknetAddress } from "@/utils/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ChainId } from "@realms-world/constants";
import { padAddress } from "@realms-world/utils";

export interface Transaction {
  status?: "pending" | "complete" | "failed" | "requiresAction";
  type: TransactionType;
  chainId?: ChainId;
  hash: string;
  timestamp: Date | string;
}
export interface CombinedTransaction
  extends Transaction,
    Partial<RealmsWithdrawal> {
  tokenIds?: string[];
}

export interface TransactionState {
  newTransactionCount: number;
  transactions: Transaction[];
  combinedTransactions: CombinedTransaction[];
  allTransactionsProcessed: boolean;
  addTx: (tx: Transaction) => void;
  resetTransacationCount: () => void;
  updateCombinedTransactions: (
    combinedTransactions: CombinedTransaction[],
  ) => void;
}

export const useTransactionManager = create<
  TransactionState,
  [["zustand/persist", TransactionState]]
>(
  persist(
    (set) => ({
      transactions: [],
      combinedTransactions: [],
      newTransactionCount: 0,
      allTransactionsProcessed: false,
      addTx: (tx: Transaction) => {
        const paddedHash: string = isStarknetAddress(tx.hash)
          ? padAddress(tx.hash)
          : tx.hash;
        const updatedTransaction = {
          ...tx,
          hash: paddedHash,
        };

        return set((state) => ({
          allTransactionsProcessed: false,
          transactions: [...state.transactions, updatedTransaction],
          newTransactionCount: state.newTransactionCount + 1,
        }));
      },
      resetTransacationCount: () => {
        return set((state) => ({
          allTransactionsProcessed: true,
          newTransactionCount: 0,
        }));
      },
      updateCombinedTransactions: (combinedTransactions) => {
        return set((state) => ({
          combinedTransactions: combinedTransactions,
        }));
      },
    }),
    {
      name: "starknetTransactions",
    },
  ),
);
