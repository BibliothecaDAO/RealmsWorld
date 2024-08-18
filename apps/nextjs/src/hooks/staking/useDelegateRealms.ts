import { RealmsABI } from "@/abi/L2/Realms";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useContract, useSendTransaction } from "@starknet-react/core";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

export const useDelegateRealms = ({ delegatee }: { delegatee?: string }) => {
  const l2RealmsAddress = getCollectionAddresses(Collections.REALMS)[
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;

  const { contract } = useContract({
    abi: RealmsABI,
    address: l2RealmsAddress,
  });

  const {
    sendAsync,
    data: withdrawHash,
    ...writeReturn
  } = useSendTransaction({
    calls: delegatee
      ? [contract?.populate("delegate", [delegatee])]
      : undefined,
  });

  return {
    sendAsync,
    withdrawHash,
    ...writeReturn,
  };
};
