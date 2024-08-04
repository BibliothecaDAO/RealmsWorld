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
    <div className="mb-1.5 border p-3" key={tx.hash}>
      <div className="flex justify-between">
        <div className="flex w-full flex-col">
          <div className="mb-3 flex gap-2 text-xs text-muted-foreground">
            <span className="self-center">
              {" "}
              {tx.timestamp.toLocaleString()}
            </span>

            <ExplorerLink
              type="tx"
              hash={tx.hash}
              chainId={tx.chainId ?? SUPPORTED_L2_CHAIN_ID}
            />
          </div>
          <span className="mb-3 text-xl">{tx.type}</span>
          <div className="mb-1.5 flex gap-2">
            {tx.tokenIds?.slice(0, 5).map((id) => (
              <Badge className={""} variant={"outline"} key={id}>
                Token #{id}
              </Badge>
            ))}
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
