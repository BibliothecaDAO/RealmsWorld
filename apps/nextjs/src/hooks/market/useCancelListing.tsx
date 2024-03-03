import type { Call } from "starknet";
import { useMemo } from "react";
import MarketplaceABI from "@/abi/L2/Marketplace.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useContractWrite as useL2ContractWrite,
} from "@starknet-react/core";

import { MarketplaceContract } from "@realms-world/constants";

export const useCancelListing = ({
  listingId,
}: {
  listingId?: number;
}) => {
  const { contract } = useContract({
    abi: MarketplaceABI,
    address: MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!listingId) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      contract?.populateTransaction.cancel!(
        listingId,
      ),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  const { writeAsync, data, error } = useL2ContractWrite({ calls });

  return {
    calls,
    writeAsync,
    data,
    error,
  };
};
