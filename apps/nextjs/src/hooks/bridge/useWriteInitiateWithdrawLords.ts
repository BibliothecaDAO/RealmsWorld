import type { Call } from "starknet";
import { useMemo, useState } from "react";
import L2BridgeABI from "@/abi/L2/LordsBridge.json";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import {
  useContract,
  useContractWrite as useL2ContractWrite,
} from "@starknet-react/core";
import { parseEther } from "viem";
import { useAccount as useL1Account } from "wagmi";

export const useWriteInitiateWithdrawLords = () => {
  const { address: addressL1 } = useL1Account();

  const l2BridgeAddress =
    tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]];
  const { contract } = useContract({
    abi: L2BridgeABI,
    address: l2BridgeAddress as `0x${string}`,
  });
  const [amount, setAmount] = useState<string | null>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!amount || !addressL1) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      contract?.populateTransaction.initiate_withdrawal!(addressL1, {
        low: parseEther(amount),
        high: 0,
      }),
    ];
  }, [addressL1, amount, contract?.populateTransaction.initiate_withdrawal]);

  const { writeAsync, data: withdrawHash } = useL2ContractWrite({ calls });

  return {
    calls,
    writeAsync,
    withdrawHash,
    amount,
    setAmount,
  };
};
