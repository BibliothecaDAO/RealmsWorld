import type { Transaction } from "@/stores/useTransasctionManager";
import type { RealmsWithdrawalEvent } from "@/types/subgraph";
import { useEffect, useState } from "react";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import useStore from "@/hooks/useStore";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import { api } from "@/trpc/react";
import { WithdrawalEvent } from "@/types/subgraph";
import { num } from "starknet";
import { useAccount } from "wagmi";

import type { RouterInputs, RouterOutputs } from "@realms-world/api";
import { padAddress } from "@realms-world/utils";

export const useTransactions = () => {
  const transactions = useStore(
    useTransactionManager,
    (state) => state.transactions,
  );
  const { address } = useAccount();
  const { data: pendingWithdrawals } = usePendingRealmsWithdrawals({ address });
  const filters: RouterInputs["erc721Bridge"]["all"] = {
    l1Account: padAddress(address),
  };

  const { data: l2BridgeTransactions } = api.erc721Bridge.all.useQuery(
    filters,
    {
      refetchInterval: 30000,
    },
  );

  // Create a map of l2BridgeTransactions by req_hash for quick lookup
  const l2TransactionsMap = new Map<
    string,
    Omit<
      NonNullable<RouterOutputs["erc721Bridge"]["all"]>[number],
      "_cursor"
    > & { withdrawalEvents?: RealmsWithdrawalEvent[] }
  >(l2BridgeTransactions?.map((tx) => [tx.req_hash ?? "", tx]));

  // Merge pendingWithdrawals into l2BridgeTransactions if they have the same req_hash
  pendingWithdrawals?.forEach((withdrawal) => {
    if (typeof withdrawal.req_hash == "string") {
      const matchingTransaction = l2TransactionsMap.get(
        withdrawal.req_hash.toString(),
      );
      if (matchingTransaction) {
        // Merge withdrawalEvents into the matching l2BridgeTransaction
        matchingTransaction.withdrawalEvents = withdrawal.withdrawalEvents;
      } else {
        // If no matching transaction, add the withdrawal as a new transaction
        l2TransactionsMap.set(withdrawal.req_hash.toString(), {
          ...withdrawal,
          hash: "",
          l1Account: padAddress(address),
          l2Account: padAddress(address), // Assuming the same account for simplicity
          timestamp:
            typeof withdrawal.createdTimestamp == "bigint"
              ? new Date(withdrawal.createdTimestamp.toString())
              : new Date(),
          withdrawalEvents: withdrawal.withdrawalEvents,
          type: TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM,
          tokenIds:
            withdrawal.withdrawalEvents[0]?.tokenIds.map((id) =>
              id.toString(),
            ) ?? [],
        });
      }
    }
  });

  // Modify each transaction in the map based on the conditions
  l2TransactionsMap.forEach((value) => {
    if (value.withdrawalEvents && value.withdrawalEvents.length > 0) {
      value.type = TransactionType.BRIDGE_REALMS_L2_TO_L1_CONFIRM;
    } else if (value.type === "DepositRequestInitiated") {
      value.type = TransactionType.BRIDGE_REALMS_L2_TO_L1_INITIATE;
    } else {
      value.type = TransactionType.BRIDGE_REALMS_L1_TO_L2;
    }
  });

  // Convert the map back to an array for the combinedTransactions
  const combinedTransactions = Array.from(l2TransactionsMap.values());

  // Include other transactions that are not part of l2BridgeTransactions or pendingWithdrawals
  combinedTransactions.push(...(transactions ?? []));

  return {
    transactions: combinedTransactions,
  };
};
