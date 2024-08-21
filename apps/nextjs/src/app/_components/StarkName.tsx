"use client";

import { useEffect, useMemo } from "react";
import { shortenHex } from "@/utils/utils";
import { useStarkName } from "@starknet-react/core";

export const StarkName = ({ address }: { address?: string }) => {
  const truncatedAddress = useMemo(() => {
    if (!address) return undefined;
    return shortenHex(address);
  }, [address]);

  const { data: starkName, refetch } = useStarkName({
    address: address as `0x${string}`,
  });

  useEffect(() => {
    if (address !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    }
  }, [address, refetch]);

  return starkName ?? truncatedAddress;
};
