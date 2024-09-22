import type { TransactionType } from "@/constants/transactions";
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

interface TransactionState {
  newTransactionCount: number;
  transactions: Transaction[];
  addTx: (tx: Transaction) => void;
  finishedRealmsWithdrawalsProcessed: boolean;
  allTransacationsProcessed: boolean;
  updateAllTransacationsProcessed: () => void;
  updateFinishedRealmsWithdrawalsProcessed: () => void;
}

export const useTransactionManager = create<
  TransactionState,
  [["zustand/persist", TransactionState]]
>(
  persist(
    (set) => ({
      transactions: [],
      newTransactionCount: 0,
      finishedRealmsWithdrawalsProcessed: false,
      allTransacationsProcessed: false,
      addTx: (tx: Transaction) => {
        const paddedHash: string = isStarknetAddress(tx.hash)
          ? padAddress(tx.hash)
          : tx.hash;
        const updatedTransaction = {
          ...tx,
          hash: paddedHash,
        };

        return set((state) => ({
          transactions: [...state.transactions, updatedTransaction],
          newTransactionCount: state.newTransactionCount + 1,
          allTransacationsProcessed: false,
          finishedRealmsWithdrawalsProcessed:
            updatedTransaction.type == "Finalise Realms Withdrawal to L1"
              ? false
              : true,
        }));
      },
      updateFinishedRealmsWithdrawalsProcessed: () => {
        return set((state) => ({
          finishedRealmsWithdrawalsProcessed: true,
        }));
      },
      updateAllTransacationsProcessed: () => {
        return set((state) => ({
          allTransacationsProcessed: true,
          newTransactionCount: 0,
        }));
      },
    }),
    {
      name: "starknetTransactions", // unique name for localStorage key
      //storage: createJSONStorage(() => localStorage),
    },
  ),
);
