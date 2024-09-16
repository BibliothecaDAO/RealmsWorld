import { useEffect, useState } from "react";
import { VeLords as VeLordsABI } from "@/abi/L2/VeLords";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { api } from "@/trpc/react";
import { useAccount, useBalance, useReadContract } from "@starknet-react/core";

import { LORDS, StakingAddresses } from "@realms-world/constants";

export const useVeLordsData = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [ownerLordsLock, setOwnerLordsLock] = useState<any>(null);
  const [veLordsBurns, setVeLordsBurns] = useState<any[]>([]);

  const { data: lordsBalance } = useBalance({
    address,
    token: LORDS[SUPPORTED_L2_CHAIN_ID],
  });

  const { data: veLordsBalance } = useBalance({
    address,
    token: StakingAddresses[SUPPORTED_L2_CHAIN_ID].VeLords,
  });

  const { data: totalSupply } = useReadContract({
    functionName: "total_supply",
    abi: VeLordsABI,
    address: StakingAddresses[SUPPORTED_L2_CHAIN_ID].VeLords,
  });

  useEffect(() => {
    const fetchOwnerLordsLock = async () => {
      if (address) {
        try {
          const result = await api.veLords.getOwnerLordsLock.query({ address });
          setOwnerLordsLock(result);
        } catch (error) {
          console.error("Error fetching owner lords lock:", error);
        }
      }
    };

    const fetchVeLordsBurns = async () => {
      try {
        const result = await api.veLords.getVeLordsBurns.query();
        setVeLordsBurns(result);
      } catch (error) {
        console.error("Error fetching veLords burns:", error);
      }
    };

    Promise.all([fetchOwnerLordsLock(), fetchVeLordsBurns()]).then(() => {
      setIsLoading(false);
    });
  }, [address]);

  return {
    address,
    lordsBalance,
    veLordsBalance,
    totalSupply,
    ownerLordsLock,
    veLordsBurns,
    isLoading,
  };
};
