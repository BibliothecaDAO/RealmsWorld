import type { Call } from "starknet";
import { useMemo } from "react";
import MarketplaceABI from "@/abi/L2/Marketplace.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useSendTransaction as useL2ContractWrite,
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { contract } = useContract({
    // @ts-expect-error check starknet-react type
    abi: MarketplaceABI,
    address: MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!listingId || !price) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      contract?.populate("edit", [
        listingId,
        parseUnits(`${price}`, 18).toString(),
      ]),
    ];
  }, [contract, listingId, price]);

  const { sendAsync, data, error } = useL2ContractWrite({ calls });

  return {
    calls,
    sendAsync,
    data,
    error,
  };
};
