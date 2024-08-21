"use client";

import { RealmsABI } from "@/abi/L2/Realms";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useAccount, useReadContract } from "@starknet-react/core";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

export const useCurrentDelegate = () => {
  const { address } = useAccount();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const l2RealmsAddress = getCollectionAddresses(Collections.REALMS)![
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;

  return useReadContract({
    abi: RealmsABI,
    address: l2RealmsAddress,
    args: address ? [address] : [],
    functionName: "delegates",
    watch: true,
  });
};
