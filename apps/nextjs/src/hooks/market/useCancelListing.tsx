import type { Call } from "starknet";
import { useMemo } from "react";
import MarketplaceABI from "@/abi/L2/Marketplace.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useSendTransaction as useL2ContractWrite,
} from "@starknet-react/core";

import { MarketplaceContract } from "@realms-world/constants";

export const useCancelListing = ({ listingId }: { listingId?: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { contract } = useContract({
    abi: MarketplaceABI,
    address: MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!listingId) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return [contract?.populate("cancel", [listingId])];
  }, [contract, listingId]);

  const { sendAsync, data, error } = useL2ContractWrite({ calls });

  return {
    calls,
    sendAsync,
    data,
    error,
  };
};
