import type { Claim } from "@/types/subgraph";
import type { TransactionFinalityStatus } from "starknet";
import { useEffect, useState } from "react";
import { LegacyReward } from "@/abi/L1/LegacyReward";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useQuery } from "@tanstack/react-query";
import { env } from "env";
import { parseGwei } from "viem";
import { useAccount as useL1Account, useWriteContract } from "wagmi";

import { StakingAddresses } from "@realms-world/constants";

interface LegacyReward {
  id: number;
  amount: string;
}

export function useLegacyReward() {
  const [reward, setReward] = useState<LegacyReward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { address: l1Address } = useL1Account();

  const { writeContract, ...writeReturn } = useWriteContract();

  const claim = ({
    claimId,
    l2Address,
  }: {
    claimId: number;
    l2Address?: string;
  }) => {
    if (!l2Address) throw new Error("Missing L2 Address");
    console.log("claiming", claimId, l2Address);

    return writeContract({
      abi: LegacyReward,
      address: StakingAddresses.legacyreward[
        SUPPORTED_L1_CHAIN_ID
      ] as `0x${string}`,
      functionName: "claimOnStarknet",
      args: [BigInt(l2Address), claimId],
      value: parseGwei((5000).toString()),
    });
  };

  useEffect(() => {
    async function fetchReward() {
      try {
        const response = await fetch(`/api/legacy-reward/${l1Address}`);
        if (!response.ok) throw new Error("Failed to fetch reward");
        const data = await response.json();
        setReward(data.id !== undefined ? data : null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    }

    fetchReward();
  }, [l1Address]);

  return { reward, loading, error, claim, writeReturn };
}

const query = `query Claims(
      $l1Address: String
    ) {
      claims(
        where: {
          l1Sender: $l1Address
        }
        orderBy: createdTimestamp
        orderDirection: desc
      ) {
        id
        l2Recipient
        l1Sender
        createdTimestamp
        claimEvents {
          id
          status
          createdTxHash
          finishedTxHash
          finishedAtDate
        }
      }
    }
    `;

export const useLegacyRewardData = ({ address }: { address?: string }) => {
  const variables: { l1Address?: string } = {};
  if (address) {
    variables.l1Address = address.toLowerCase();
  }

  return useQuery({
    queryKey: ["legacyRewards" + address],
    queryFn: async () =>
      await fetch(env.NEXT_PUBLIC_REALMS_LEGACY_REWARD_SUBGRAPH_NAME, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: variables,
        }),
      })
        .then((res) => res.json())
        .then((res: { data?: { claims: Claim[] } }) => {
          return res.data?.claims;
        }),
    enabled: !!address,
    refetchInterval: 10000,
  });
};
