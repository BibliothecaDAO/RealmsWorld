"use client";

import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useWriteDepositRealms } from "@/hooks/bridge/useWriteDepositRealms";
import useERC721Approval from "@/hooks/token/useERC721Approval";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { shortenHex } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
import { Loader, MoveRightIcon } from "lucide-react";
import { useAccount } from "wagmi";

import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ScrollArea,
} from "@realms-world/ui";

import { StarknetLoginButton } from "../wallet/StarknetLoginButton";

export const NftBridgeModal = () => {
  const {
    isNftBridgeOpen,
    toggleNftBridge,
    nftBridgeModalProps: { selectedTokenIds, sourceChain },
  } = useUIStore((state) => state);

  const isSourceL1 = sourceChain == SUPPORTED_L1_CHAIN_ID;
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const { writeAsync: depositRealms, isPending: isDepositPending } =
    useWriteDepositRealms({
      onSuccess: () => console.log("success"),
    });
  const {
    isApprovedForAll,
    approveForAll,
    isPending: isApprovePending,
    approveForAllLoading,
  } = useERC721Approval();

  const renderBadge = (isL1: boolean, address: string) => (
    <Badge className="rounded-2xl pr-4">
      {isL1 ? (
        <EthereumLogo className="mr-2 w-8" />
      ) : (
        <StarknetLogo className="mr-2 w-8" />
      )}
      <div className="-mt-1 flex flex-col items-start">
        <span className="text-lg">
          {
            CHAIN_IDS_TO_NAMES[
              isL1 ? SUPPORTED_L1_CHAIN_ID : SUPPORTED_L2_CHAIN_ID
            ]
          }
        </span>
        <span>{address && shortenHex(address, 8)}</span>
      </div>
    </Badge>
  );

  if (!l1Address || !l2Address) {
    return <StarknetLoginButton />;
  }

  if (isNftBridgeOpen) {
    return (
      <Dialog open onOpenChange={toggleNftBridge}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-2xl">Bridge Realms</DialogTitle>
          <ScrollArea className="-mr-6 max-h-[600px] pr-6">
            <div className="space-y-3">
              <div>
                <span className="text-lg">
                  Transferring {selectedTokenIds.length} Realms:{" "}
                </span>
                <br />
                {selectedTokenIds?.map(
                  (id: string, index: number) =>
                    "#" +
                    id +
                    (index === selectedTokenIds.length - 1 ? "" : ", "),
                )}
              </div>
              <div className="flex items-center">
                {renderBadge(isSourceL1, isSourceL1 ? l1Address : l2Address)}
                <MoveRightIcon className="w-10" />
                {renderBadge(!isSourceL1, isSourceL1 ? l2Address : l1Address)}
              </div>

              {isApprovedForAll ? (
                <Button
                  className="w-full"
                  onClick={() =>
                    depositRealms({
                      tokenIds: selectedTokenIds.map((id) => BigInt(id)),
                      l2Address: l2Address,
                    })
                  }
                  disabled={isDepositPending}
                >
                  {isDepositPending ? "Confirm in Wallet" : "Bridge Realms"}
                </Button>
              ) : (
                <>
                  <p>
                    You must approve the Bridge contract for your Realms before
                    confirming transfer
                  </p>
                  <Button
                    onClick={approveForAll}
                    disabled={isApprovePending || approveForAllLoading}
                    className="w-full"
                  >
                    {isApprovePending ? (
                      "Confirm in Wallet"
                    ) : (
                      <>
                        {approveForAllLoading ? (
                          <>
                            <Loader className="mr-2 animate-spin" /> In Progress
                          </>
                        ) : (
                          "Approve Realms"
                        )}
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};
