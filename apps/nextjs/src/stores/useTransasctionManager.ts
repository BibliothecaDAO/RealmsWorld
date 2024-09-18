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
  transactions: Transaction[];
  addTx: (tx: Transaction) => void;
  allTransacationsProcessed: boolean;
  updateAllTransacationsProcessed: () => void;
}

export const useTransactionManager = create<
  TransactionState,
  [["zustand/persist", TransactionState]]
>(
  persist(
    (set) => ({
      transactions: [],
      allTransacationsProcessed: false,
      addTx: (tx: Transaction) => {
        console.log(tx);
        const paddedHash: string = isStarknetAddress(tx.hash)
          ? padAddress(tx.hash)
          : tx.hash;
        const updatedTransaction = {
          ...tx,
          hash: paddedHash,
          transactionDataFetched: true,
        };
        return set((state) => ({
          transactions: [...state.transactions, updatedTransaction],
        }));
      },
      updateAllTransacationsProcessed: () => {
        return set((state) => ({
          allTransacationsProcessed: (state.allTransacationsProcessed = true),
        }));
      },
    }),
    {
      name: "starknetTransactions", // unique name for localStorage key
      //storage: createJSONStorage(() => localStorage),
    },
  ),
);
