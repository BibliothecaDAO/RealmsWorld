import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";

export const useLocalStorageTransactions = () => {
  const transactionState = useStore(useTransactionManager, (state) => state);
  return {
    transactions: transactionState?.combinedTransactions,
  };
};
