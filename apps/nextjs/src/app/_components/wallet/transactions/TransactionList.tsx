import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";

import { ExplorerLink } from "../ExplorerLink";
import { TransactionStatusL2 } from "./TransactionStatusL2";

export const TransactionList = () => {
  const transactions = useStore(
    useTransactionManager,
    (state) => state.transactions,
  );

  return (
    <div className="mt-2 flex w-full flex-col p-2">
      <span className="mb-2 font-sans text-sm">Transactions</span>
      {transactions &&
        Object.keys(transactions).map((key) => {
          const tx = transactions[key];
          if (tx) {
            const isL2 = tx.chainId == SUPPORTED_L2_CHAIN_ID;

            return (
              <div className="mb-1.5 rounded border p-2" key={key}>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="mb-1">{tx.type}</span>
                    <span>
                      <ExplorerLink
                        type="tx"
                        text={isL2 ? "Starkscan" : "Etherscan"}
                        hash={key}
                        chainId={tx.chainId}
                      />
                    </span>
                  </div>
                  <div>{isL2 && <TransactionStatusL2 hash={key} />}</div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};
