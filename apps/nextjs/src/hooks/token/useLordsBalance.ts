import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useAccount, useBalance } from "wagmi";

import { LORDS } from "@realms-world/constants";

export const useLordsBalance = () => {
  const { address } = useAccount();
  const { isLoading, data } = useBalance({
    address,
    token: LORDS[SUPPORTED_L1_CHAIN_ID]?.address as `0x${string}`,
  });
  return {
    data,
    isLoading,
  };
};
