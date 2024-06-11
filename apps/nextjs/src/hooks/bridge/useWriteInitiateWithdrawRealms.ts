import type { Call } from "starknet";
import { useMemo } from "react";
import L2RealmsBridgeABI from "@/abi/L2/RealmsBridge.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useContractWrite as useL2ContractWrite,
} from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";

import { REALMS_BRIDGE_ADDRESS } from "@realms-world/constants";

export const useWriteInitiateWithdrawRealms = ({
  selectedTokenIds,
}: {
  selectedTokenIds: string[];
}) => {
  const { address: addressL1 } = useL1Account();

  const l2BridgeAddress = REALMS_BRIDGE_ADDRESS[SUPPORTED_L2_CHAIN_ID];
  const { contract } = useContract({
    abi: L2RealmsBridgeABI,
    address: l2BridgeAddress as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!selectedTokenIds.length || !addressL1) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      contract?.populateTransaction.deposit_tokens?.(
        Date.now(),
        addressL1,
        selectedTokenIds,
      ),
    ];
  }, [addressL1, selectedTokenIds, contract?.populateTransaction]);

  const {
    writeAsync,
    data: withdrawHash,
    ...writeReturn
  } = useL2ContractWrite({ calls });

  return {
    calls,
    writeAsync,
    withdrawHash,
    ...writeReturn,
  };
};
