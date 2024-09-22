import type { CombinedTransaction } from "@/hooks/useTransactions";
import { useCallback } from "react";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";
import { useWriteFinalizeWithdrawRealms } from "@/hooks/bridge/useWriteFinalizeWithdrawRealms";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import { Loader } from "lucide-react";

import { Button, toast } from "@realms-world/ui";

export const TransactionAction = ({ tx }: { tx: CombinedTransaction }) => {
  const { writeAsync, isPending, isSuccess } = useWriteFinalizeWithdrawRealms();
  const transactions = useStore(useTransactionManager, (state) => state);
  const finalizeWithdraw = useCallback(async () => {
    const tokenIds = tx.withdrawalEvents?.[0]?.tokenIds;
    const txHash =
      tokenIds &&
      tx.req_hash &&
      tx.l1Recipient &&
      tx.l2Sender &&
      (await writeAsync({
        hash: tx.req_hash,
        l1Address: tx.l1Recipient,
        l2Address: tx.l2Sender,
        tokenIds,
      }));
    console.log(tx)
    if (isSuccess) {
      transactions?.addTx({
        hash: txHash || '',
        type: TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM,
        chainId: SUPPORTED_L2_CHAIN_ID,
        status: "complete",
        timestamp: new Date(Date.now())
      });
      toast({
        title: TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM,
        description: `${tokenIds?.length} Realms are being withdrawn to your L1 wallet`,
      });
    }
  }, [writeAsync, transactions, tx]);

  return (
    <Button
      onClick={finalizeWithdraw}
      size={"xs"}
      disabled={isPending}
      className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 text-green-800 transition-all"
    >
      {isPending ? (
        <>
          <Loader className="mr-2 w-4 animate-spin" />
          Withdrawing...
        </>
      ) : (
        "Complete Withdrawal"
      )}
    </Button>
  );
};
