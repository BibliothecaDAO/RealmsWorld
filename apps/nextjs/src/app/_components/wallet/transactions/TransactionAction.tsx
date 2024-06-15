import type { Transaction } from "@/stores/useTransasctionManager";
import { useCallback } from "react";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";
import { useWriteFinalizeWithdrawRealms } from "@/hooks/bridge/useWriteFinalizeWithdrawRealms";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";

import { Button, toast } from "@realms-world/ui";

export const TransactionAction = ({ tx }: { tx: Transaction }) => {
  const { writeAsync } = useWriteFinalizeWithdrawRealms();
  const transactions = useStore(useTransactionManager, (state) => state);
  const finalizeWithdraw = useCallback(async () => {
    const tokenIds = tx.withdrawalEvents?.[0]?.tokenIds as string[];
    const txHash = await writeAsync({
      hash: tx.req_hash,
      l1Address: tx.l1Account,
      l2Address: tx.l2Account,
      tokenIds,
    });
    transactions?.addTx({
      hash: txHash,
      type: TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM,
      chainId: SUPPORTED_L2_CHAIN_ID,
      status: "complete",
    });
    toast({
      title: TransactionType.BRIDGE_REALMS_L2_TO_L1_INITIATE,
      description: `${tokenIds.length} Realms will be ready to withdraw on Ethereum in ~12 hours`,
    });
  }, [writeAsync, transactions, tx]);

  return (
    <Button
      onClick={finalizeWithdraw}
      size={"xs"}
      className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 text-green-800 transition-all"
    >
      Complete Withdrawal
    </Button>
  );
};
