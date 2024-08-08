import { useEffect } from "react";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useAccount, useBalance } from "@starknet-react/core";

import { LORDS } from "@realms-world/constants";

export const useLordsBalance = () => {
  const { address, isConnected } = useAccount();
  const { isLoading, data, refetch } = useBalance({
    address,
    watch: true,
    token: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as `0x${string}`,
  });

  useEffect(() => {
    console.log(address);
    if (address) {
      refetch();
    }
  }, [isConnected, address, refetch]);

  return {
    data,
    isLoading,
  };
};
