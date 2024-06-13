import type { TransactionType } from "@/constants/transactions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ChainId } from "@realms-world/constants";

interface TransactionState {
  transactions: Record<
    string,
    {
      status: "pending" | "confirmed" | "failed";
      type: TransactionType;
      chainId: ChainId;
    }
  >;
  addTx: (hash: string, type: TransactionType, chainId: ChainId) => void;
}

export const useTransactionManager = create<
  TransactionState,
  [["zustand/persist", TransactionState]]
>(
  persist(
    (set) => ({
      transactions: {},
      addTx: (hash: string, type: TransactionType, chainId: ChainId) =>
        set((state) => ({
          transactions: {
            ...state.transactions,
            [hash]: {
              status: "pending",
              type: type,
              chainId: chainId,
            },
          },
        })),
    }),
    {
      name: "starknetTransactions", // unique name for localStorage key
      //storage: createJSONStorage(() => localStorage),
    },
  ),
);
