import { useEffect, useState } from "react";
import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
import { useAccount, useReadContract } from "wagmi";

import { useAirdropClaim } from "../useAirdropClaim";
import { useStakedRealmsData } from "./useStakedRealmsData";

export const useStaking = () => {
  const [paymentPoolV1, setPaymentPoolv1] = useState<{
    proof: `0x${string}`;
    amount: number;
  }>();
  const { address: l1Address } = useAccount();
  const { data } = useStakedRealmsData(l1Address);

  const { data: galleonLordsAvailable, isLoading: isGalleonLordsLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].v1Galleon as `0x${string}`,
      abi: GalleonStaking,
      functionName: "lordsAvailable",
      args: [l1Address!],
    });

  const { data: carrackLordsAvailable, isLoading: isCarrackLordsLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].v2Carrack as `0x${string}`,
      abi: CarrackStaking,
      functionName: "lordsAvailable",
      args: [l1Address!],
    });

  const { data: poolV1Balance, isLoading: poolBalanceLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].paymentPool as `0x${string}`,
      abi: paymentPoolAbi,
      functionName: "balanceForProofWithAddress",
      args: paymentPoolV1?.proof &&
        l1Address && [
          l1Address.toLowerCase() as `0x${string}`,
          paymentPoolV1?.proof,
        ],
      // query: { enabled: !!address && !!poolTotal }
    });
  const { numTokens, claimAirdrop, balance } = useAirdropClaim();

  useEffect(() => {
    const fetchStakingData = async () => {
      if (l1Address) {
        try {
          const response = await fetch(`/api/staking/${l1Address}`);
          const data = (await response.json()) as {
            proof: `0x${string}`;
            amount: number;
          };
          setPaymentPoolv1(data);
        } catch (error) {
          console.error("Error fetching staking data:", error);
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchStakingData();
  }, [l1Address]);

  return {
    data,
    loading:
      isGalleonLordsLoading && isCarrackLordsLoading && poolBalanceLoading,
    galleonLordsAvailable,
    carrackLordsAvailable: carrackLordsAvailable?.[0],
    paymentPoolV1,
    poolV1Balance,
    poolV2Balance: balance ? 0 : numTokens,
    totalClaimable:
      parseInt((galleonLordsAvailable ?? 0n).toString()) +
      parseInt((carrackLordsAvailable ?? 0n).toString()) +
      (balance ? 0 : numTokens),
  };
};
