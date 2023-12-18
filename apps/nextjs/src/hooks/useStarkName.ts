"use client";

import { useEffect, useMemo } from "react";
import { shortenHex } from "@/utils/utils";
import { useStarkName } from "@starknet-react/core";

export function useStarkDisplayName(address?: string) {
  const truncatedAddress = useMemo(() => {
    if (!address) return undefined;
    return shortenHex(address);
  }, [address]);

  const { data: starkName, refetch } = useStarkName({
    address: address,
  });

  useEffect(() => {
    if (address !== undefined) {
      refetch();
    }
  }, [address, refetch]);

  return starkName ?? truncatedAddress;
}
