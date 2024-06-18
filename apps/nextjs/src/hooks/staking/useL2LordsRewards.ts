import type { Call } from "starknet";
import { useCallback, useMemo } from "react";
import { RealmsABI } from "@/abi/L2/Realms";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import {
  useAccount,
  useContract,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import { formatEther } from "viem";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
import { useToast } from "@realms-world/ui";

import useStore from "../useStore";

export const useL2LordsRewards = () => {
  const { toast } = useToast();
  const { address: l2Address } = useAccount();
  const l2RealmsAddress = getCollectionAddresses(Collections.REALMS)?.[
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;

  const { data: balance, isFetching } = useReadContract({
    address: l2RealmsAddress,
    abi: RealmsABI,
    functionName: "get_reward_balance_for",
    enabled: !!l2Address,
    args: l2Address ? [l2Address] : undefined,
    refetchInterval: 10000,
  });

  const { contract } = useContract({
    abi: RealmsABI,
    address: l2RealmsAddress,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!l2Address) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [contract?.populate("reward_claim", [])];
  }, [l2Address, contract]);

  const {
    sendAsync,
    data: claimHash,
    isPending: isSubmitting,
  } = useSendTransaction({ calls });

  const transactions = useStore(useTransactionManager, (state) => state);

  const claimRewards = useCallback(async () => {
    const tx = await sendAsync();
    transactions?.addTx({
      hash: tx.transaction_hash,
      type: TransactionType.CLAIM_LORDS,
      chainId: SUPPORTED_L2_CHAIN_ID,
      timestamp: new Date(Date.now()),
    });
    toast({
      title: "Realms' Lords Claim Submitted",
      description: `Claim of ${formatEther(balance as bigint)} Lords in progress`,
    });
  }, [sendAsync, transactions, toast, balance]);

  return {
    balance,
    calls,
    isFetching,
    isSubmitting,
    claimRewards,
    claimHash,
  };
};
