import type { CombinedTransaction } from "@/hooks/useTransactions";
import type { Transaction } from "@/stores/useTransasctionManager";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";

import { Badge } from "@realms-world/ui";

import { ExplorerLink } from "../ExplorerLink";
import { TransactionAction } from "./TransactionAction";
import { TransactionStatusL1 } from "./TransactionStatusL1";
import { TransactionStatusL2 } from "./TransactionStatusL2";

export const TransactionItem = ({ tx }: { tx: CombinedTransaction }) => {
  const isL2 = tx.chainId == SUPPORTED_L2_CHAIN_ID;

  const actionRequired =
    tx.type === TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM &&
    tx.withdrawalEvents?.[0]?.status == "ACCEPTED_ON_L1";

  return (
    <div className="mb-1.5 rounded border p-2" key={tx.hash}>
      <div className="flex justify-between">
        <div className="flex w-full flex-col">
          <span className="text-xs text-muted-foreground">
            {tx.timestamp.toLocaleString()}
          </span>
          <span className="mb-1">{tx.type}</span>
          <div className="mb-1.5 flex">
            {tx.tokenIds?.slice(0, 5).map((id) => (
              <Badge className={"px-1 pr-2"} variant={"outline"} key={id}>
                #{id}
              </Badge>
            ))}
          </div>
          <div>
            <ExplorerLink
              type="tx"
              hash={tx.hash}
              chainId={tx.chainId ?? SUPPORTED_L2_CHAIN_ID}
            />
          </div>
        </div>
        <div>
          {actionRequired ? (
            <TransactionAction tx={tx} />
          ) : isL2 ? (
            <TransactionStatusL2 hash={tx.hash} />
          ) : (
            <TransactionStatusL1 hash={tx.hash} />
          )}
        </div>
      </div>
    </div>
  );
};
