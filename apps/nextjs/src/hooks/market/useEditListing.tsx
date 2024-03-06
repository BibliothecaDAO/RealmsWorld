import type { Call } from "starknet";
import { useMemo } from "react";
import MarketplaceABI from "@/abi/L2/Marketplace.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useContractWrite as useL2ContractWrite,
} from "@starknet-react/core";
import { parseUnits } from "viem";

import { MarketplaceContract } from "@realms-world/constants";

export const useEditListing = ({
  listingId,
  price,
}: {
  listingId?: number;
  price?: string | null;
}) => {
  const { contract } = useContract({
    abi: MarketplaceABI,
    address: MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!listingId || !price) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      contract?.populateTransaction.edit!(
        listingId,
        parseUnits(`${price}`, 18).toString(),
      ),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId, price]);

  const { writeAsync, data, error } = useL2ContractWrite({ calls });

  return {
    calls,
    writeAsync,
    data,
    error,
  };
};
