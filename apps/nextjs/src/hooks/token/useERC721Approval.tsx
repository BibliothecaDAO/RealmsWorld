"use client";

import { useEffect } from "react";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { erc721Abi } from "viem";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";

import {
  CollectionAddresses,
  REALMS_BRIDGE_ADDRESS,
} from "@realms-world/constants";

export default function useERC721Approval() {
  const { address } = useAccount();

  const { data: isApprovedForAll, refetch } = useReadContract({
    abi: erc721Abi,
    address: CollectionAddresses.realms[SUPPORTED_L1_CHAIN_ID] as `0x${string}`,
    args: [
      address ?? "0xa",
      REALMS_BRIDGE_ADDRESS[SUPPORTED_L1_CHAIN_ID] as `0x${string}`,
    ],
    functionName: "isApprovedForAll",
    /*query: {
      enabled:  0,
    },*/
  });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    void refetch();
  }, [blockNumber, refetch]);

  return {
    isApprovedForAll,
  };
}
