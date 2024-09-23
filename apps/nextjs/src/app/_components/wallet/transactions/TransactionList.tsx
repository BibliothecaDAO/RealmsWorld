import { useTransactions } from "@/hooks/useTransactions";
import { useLocalStorageTransactions } from "@/hooks/useLocalStorageTransactions";
import { ScrollArea } from "@realms-world/ui";
import { TransactionItem } from "./TransactionItem";


export const QueryTransactionList = () => {
  const { transactions } = useTransactions();
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
