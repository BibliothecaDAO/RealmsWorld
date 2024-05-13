import { useCallback } from "react";
import { ERC721 } from "@/abi/L1/ERC721";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

import { LORDS_BRIDGE_ADDRESS } from "@realms-world/constants";

const FUNCTION = "setApprovalForAll";

export function useERC721SetApprovalForAll({
  onSuccess,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => Promise<void>;
}) {
  const { writeContractAsync, error, ...writeReturn } = useWriteContract({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutation: { onSuccess: (data: any) => onSuccess?.(data) },
  });

  // if (!l2Address) throw new Error("Missing L2 Address");

  const writeAsync = useCallback(
    async ({
      contractAddress,
      operator,
    }: {
      contractAddress: `0x${string}`;
      operator: `0x${string}`;
    }) => {
      console.log(contractAddress, operator);

      return await writeContractAsync({
        address: contractAddress,
        abi: ERC721,
        functionName: FUNCTION,
        args: [operator, true],
      });
    },
    [writeContractAsync],
  );
  return { writeAsync, error, ...writeReturn };
}
