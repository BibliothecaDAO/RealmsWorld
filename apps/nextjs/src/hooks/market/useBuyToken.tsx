import type { Call } from "starknet";
import { useMemo } from "react";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import MarketplaceABI from "@/abi/L2/Marketplace.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useSendTransaction as useL2ContractWrite,
} from "@starknet-react/core";
import { parseUnits } from "viem";

import { LORDS, MarketplaceContract } from "@realms-world/constants";

export const useBuyToken = ({
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
  const { contract: lordsContract } = useContract({
    abi: L2_C1ERC20,
    address: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!listingId || !price) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      lordsContract?.populate("approve", [
        MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`, //Marketplace address
        parseUnits(`${price}`, 18).toString(),
        0,
      ]),

      contract?.populate("accept", [
        listingId,
        parseUnits(`${price}`, 18).toString(),
      ]),
    ];
  }, [contract, listingId, lordsContract, price]);

  const { sendAsync, data, error } = useL2ContractWrite({ calls });

  return {
    calls,
    sendAsync,
    data,
    error,
  };
};
