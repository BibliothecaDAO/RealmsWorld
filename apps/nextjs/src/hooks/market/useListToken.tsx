import type { Call } from "starknet";
import { useMemo } from "react";
import ERC721ABI from "@/abi/L2/ERC721.json";
import MarketplaceABI from "@/abi/L2/Marketplace.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { findCollectionKeyByAddress } from "@/utils/getters";
import {
  useContract,
  useSendTransaction as useL2ContractWrite,
} from "@starknet-react/core";
import { parseUnits } from "viem";

import type { Collections } from "@realms-world/constants";
import {
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";

export const useListToken = ({
  tokenId,
  collectionId,
  price,
  expirationTime,
}: {
  tokenId?: number;
  price: number;
  collectionId?: string;
  expirationTime?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { contract } = useContract({
    abi: MarketplaceABI,
    address: MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { contract: collectionContract } = useContract({
    abi: ERC721ABI,
    address: collectionId as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!collectionId || !tokenId || !price || !collectionId || !expirationTime)
      return [];

    const collectionKey = findCollectionKeyByAddress(collectionId);
    const marketplaceId =
      MarketplaceCollectionIds[collectionKey as Collections];

    if (!marketplaceId) return [];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      collectionContract?.populate("set_approval_for_all", [
        MarketplaceContract[SUPPORTED_L2_CHAIN_ID] as `0x${string}`, //Marketplace address
        1,
      ]),

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      contract?.populate("create", [
        tokenId,
        marketplaceId,
        !price ? "0" : parseUnits(`${price}`, 18).toString(),
        expirationTime,
      ]),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId, collectionId, price, expirationTime]);

  const { sendAsync, data, error } = useL2ContractWrite({ calls });

  return {
    calls,
    sendAsync,
    data,
    error,
  };
};
