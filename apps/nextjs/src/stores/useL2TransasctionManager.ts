import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TransactionState {
  hashes: string[];
  addHash: (hash: string) => void;
}

export const useTransactionManager = create<
  TransactionState,
  [["zustand/persist", TransactionState]]
>(
  persist(
    (set) => ({
      hashes: [],
      addHash: (hash: string) =>
        set((state) => ({ hashes: [...state.hashes, hash] })),
    }),
    {
      name: "starknetTransactions", // unique name for localStorage key
      //storage: createJSONStorage(() => localStorage),
    },
  ),
);
