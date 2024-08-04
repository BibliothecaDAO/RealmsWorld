import type { BlockNumber, Call } from "starknet";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { BlockTag } from "starknet";
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

  const [previousBalance, setPreviousBalance] = useState<bigint | null>(null);
  const [easedBalance, setEasedBalance] = useState<bigint | null>(null);

  const { data: balance, isFetching } = useReadContract({
    address: l2RealmsAddress,
    abi: RealmsABI,
    functionName: "get_reward_balance_for",
    enabled: !!l2Address,
    watch: true,
    args: l2Address ? [l2Address] : undefined,
    blockIdentifier: BlockTag.PENDING as BlockNumber,
  });

  useEffect(() => {
    if (balance !== undefined && balance !== previousBalance) {
      const start = previousBalance ?? balance;
      const end = balance;
      const duration = 1000; // duration of the easing in ms
      const startTime = Date.now();

      const ease = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedValue =
          start + BigInt(Math.round(Number(end - start) * progress));

        setEasedBalance(easedValue);

        if (progress < 1) {
          requestAnimationFrame(ease);
        } else {
          setPreviousBalance(balance);
        }
      };

      ease();
    }
  }, [balance, previousBalance, isFetching]);

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
    balance: easedBalance,
    calls,
    isFetching,
    isSubmitting,
    claimRewards,
    claimHash,
  };
};
