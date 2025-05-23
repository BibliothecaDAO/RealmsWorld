import { useCallback, useMemo } from "react";
import { ERC721 } from "@/abi/L2/ERC721";
import { SUPPORTED_L2_CHAIN_ID } from "@/utils/utils";

import {
  useAccount,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";

import {
  CollectionAddresses,
  REALMS_BRIDGE_ADDRESS,
} from "@realms-world/constants";

import { useERC721Approval } from "@/hooks/token/L2/useERC721Approval";
import { useWriteInitiateWithdrawRealms } from "./useWriteInitiateWithdrawRealms";

export function useBridgeL2Realms({
  selectedTokenIds,
}: {
  selectedTokenIds: string[];
}) {
  const l2BridgeAddress = REALMS_BRIDGE_ADDRESS[SUPPORTED_L2_CHAIN_ID];
  const { address } = useAccount();
  const l2RealmsAddress = CollectionAddresses.realms[
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;

  const { data: isApprovedForAll } = useReadContract({
    abi: ERC721,
    address: l2RealmsAddress,
    args: l2BridgeAddress && address ? [address, l2BridgeAddress] : undefined,
    functionName: "is_approved_for_all",
    watch: true,
  });

  const { calls: approveCall } = useERC721Approval({
    contractAddress: l2RealmsAddress,
    operator: l2BridgeAddress as `0x${string}`,
  });
  const { calls: removeApprovalCall } = useERC721Approval({
    contractAddress: l2RealmsAddress,
    operator: l2BridgeAddress as `0x${string}`,
    removeApproval: true,
  });
  const { calls: depositCall } = useWriteInitiateWithdrawRealms({
    selectedTokenIds,
  });

  const depositCalls = useMemo(() => {
    return [...approveCall, ...depositCall, ...removeApprovalCall];
  }, [approveCall, depositCall, removeApprovalCall]);

  const { sendAsync, ...writeReturn } = useSendTransaction({
    calls: depositCalls,
  });

  //const transactions = useStore(useTransactionManager, (state) => state);

  const initiateWithdraw = useCallback(async () => {
    const tx = await sendAsync();
    /*transactions?.addTx({
      hash: tx.transaction_hash,
      type: TransactionType.BRIDGE_REALMS_L2_TO_L1_INITIATE,
      chainId: SUPPORTED_L2_CHAIN_ID,
      status: "pending",
      timestamp: new Date(Date.now()),
    });*/

    return tx;
  }, [sendAsync /*, transactions*/]);

  return {
    isApprovedForAll,
    initiateWithdraw,
    ...writeReturn,
  };
}
