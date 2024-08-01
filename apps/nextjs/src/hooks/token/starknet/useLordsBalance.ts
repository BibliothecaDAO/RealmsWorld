import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useAccount, useBalance } from "@starknet-react/core";

import { LORDS } from "@realms-world/constants";

export const useLordsBalance = () => {
  const { address } = useAccount();
  const { isLoading, data } = useBalance({
    address,
    watch: true,
    token: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as `0x${string}`,
  });
  return {
    data,
    isLoading,
  };
};
