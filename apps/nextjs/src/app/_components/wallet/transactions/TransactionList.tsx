import { useTransactions } from "@/hooks/useTransactions";
import { useLocalStorageTransactions } from "@/hooks/useLocalStorageTransactions";
import { ScrollArea } from "@realms-world/ui";
import { TransactionItem } from "./TransactionItem";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import { useEffect } from "react";

export const QueryTransactionList = () => {
  const { transactions } = useTransactions();
  const transactionState = useStore(useTransactionManager, (state) => state);
  // after useTransactions fires, update stored transactions in localstorage that useTransactions returns
  useEffect(() => {
    transactionState?.updateCombinedTransactions(transactions);
  }, [transactions]);
  return (
    <div className="mt-2 flex h-full w-full flex-grow flex-col border-b p-2">
      <span className="mb-2 font-sans text-sm">Transactions</span>
      <ScrollArea className="pr-2 [&>[data-radix-scroll-area-viewport]]:max-h-[500px]">
        {transactions?.map((tx, index) => {
          return <TransactionItem tx={tx} key={tx.hash + index} />;
        })}
      </ScrollArea>
    </div>
  );
};


export const LocalStorageTransactionList = () => {
  // if newTransactioncount is 0, use localstorage transactions instead
  const { transactions } = useLocalStorageTransactions();
  return (
    <div className="mt-2 flex h-full w-full flex-grow flex-col border-b p-2">
      <span className="mb-2 font-sans text-sm">Transactions</span>
      <ScrollArea className="pr-2 [&>[data-radix-scroll-area-viewport]]:max-h-[500px]">
        {transactions?.map((tx, index) => {
          return <TransactionItem tx={tx} key={tx.hash + index} />;
        })}
      </ScrollArea>
    </div>
  );
};
