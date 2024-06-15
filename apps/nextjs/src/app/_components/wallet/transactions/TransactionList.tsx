import { useTransactions } from "@/hooks/useTransactions";

import { ScrollArea } from "@realms-world/ui";

import { TransactionItem } from "./TransactionItem";

export const TransactionList = () => {
  const { transactions } = useTransactions();
  console.log(transactions);
  return (
    <div className="mt-2 flex h-full w-full flex-grow flex-col p-2">
      <span className="mb-2 font-sans text-sm">Transactions</span>
      <ScrollArea className="[&>[data-radix-scroll-area-viewport]]:max-h-[500px]">
        {transactions.map((tx) => {
          return <TransactionItem tx={tx} />;
        })}
      </ScrollArea>
    </div>
  );
};
