import { useMemo } from "react";
import RealmsABI from "@/abi/L2/Realms.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
} from "@starknet-react/core";
import { Call } from "starknet";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

export const useL2LordsRewards = () => {
  const { address: l2Address } = useAccount();
  const l2RealmsAddress = getCollectionAddresses(Collections.REALMS)[
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;
  const { data: balance, isFetching: l2LordsIsLoading } = useContractRead({
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
    return [contract?.populateTransaction.reward_claim!()];
  }, [l2Address, contract?.populateTransaction.reward_claim]);

  const { writeAsync, data: claimHash } = useContractWrite({ calls });

  return {
    balance,
    calls,
    loading: l2LordsIsLoading,
    writeAsync,
    claimHash,
  };
};
