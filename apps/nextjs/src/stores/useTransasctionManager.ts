import type { TransactionType } from "@/constants/transactions";
import type { RealmsWithdrawalEvent } from "@/types/subgraph";
import { isStarknetAddress } from "@/utils/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ChainId } from "@realms-world/constants";
import { padAddress } from "@realms-world/utils";

export interface Transaction {
  status: "pending" | "complete" | "failed" | "requiresAction";
  type: TransactionType;
  chainId: ChainId;
  hash: string;
  withdrawalEvents?: RealmsWithdrawalEvent[];
}

interface TransactionState {
  transactions: Transaction[];
  addTx: (tx: Transaction) => void;
}

export const useTransactionManager = create<
  TransactionState,
  [["zustand/persist", TransactionState]]
>(
  persist(
    (set) => ({
      transactions: [],
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
        }));
      },
    }),
    {
      name: "starknetTransactions", // unique name for localStorage key
      //storage: createJSONStorage(() => localStorage),
    },
  ),
);
