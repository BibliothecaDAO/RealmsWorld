import type { Transaction } from "@/stores/useTransasctionManager";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";

import { ExplorerLink } from "../ExplorerLink";
import { TransactionAction } from "./TransactionAction";
import { TransactionStatusL2 } from "./TransactionStatusL2";

export const TransactionItem = ({ tx }: { tx: Transaction }) => {
  const isL2 = tx.chainId == SUPPORTED_L2_CHAIN_ID;

  const actionRequired =
    tx.type === TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM;

  return (
    <div className="mb-1.5 rounded border p-2" key={tx.hash}>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="mb-1">{tx.type}</span>
          <span>
            <ExplorerLink
              type="tx"
              text={isL2 ? "Starkscan" : "Etherscan"}
              hash={tx.hash}
              chainId={tx.chainId}
            />
          </span>
        </div>
        <div>
          {actionRequired ? (
            <TransactionAction tx={tx} />
          ) : (
            isL2 && <TransactionStatusL2 hash={tx.hash} />
          )}
        </div>
      </div>
    </div>
  );
};
