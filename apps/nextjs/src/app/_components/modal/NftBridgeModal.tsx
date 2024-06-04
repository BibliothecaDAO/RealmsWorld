"use client";

import { useEffect } from "react";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { ActionType } from "@/constants/transferSteps";
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

import { EthereumLoginButton } from "../wallet/EthereumLoginButton";
import { StarknetLoginButton } from "../wallet/StarknetLoginButton";
import TransactionSubmittedModalBody from "./TransactionSubmittedModal/TransactionSubmittedModalBody";
import TransactionSubmittedModalButton from "./TransactionSubmittedModal/TransactionSubmittedModalButton";

export const NftBridgeModal = () => {
  const {
    isNftBridgeOpen,
    toggleNftBridge,
    nftBridgeModalProps: { selectedTokenIds, sourceChain },
  } = useUIStore((state) => state);

  const isSourceL1 = sourceChain == SUPPORTED_L1_CHAIN_ID;
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const {
    writeAsync: depositRealms,
    isPending: isDepositPending,
    data,
  } = useWriteDepositRealms({
    onSuccess: (data) => console.log("success" + data),
  });
  const {
    isApprovedForAll,
    approveForAll,
    isPending: isApprovePending,
    approveForAllLoading,
  } = useERC721Approval();

  useEffect(() => {
    if (data !== undefined) {
      console.log("useEffect" + data);
    }
  }, [data]);

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

  if (isNftBridgeOpen) {
    return (
      <Dialog open onOpenChange={toggleNftBridge}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-2xl">
            Bridge {selectedTokenIds.length} Realms
          </DialogTitle>

          {!l1Address && <EthereumLoginButton />}
          {!l2Address && <StarknetLoginButton />}
          {l1Address && l2Address && (
            <>
              {!data ? (
                <ScrollArea className="-mr-6 max-h-[600px] pr-6">
                  <div className="space-y-6">
                    <div>
                      <hr />
                      <div className="my-2">
                        {selectedTokenIds.map(
                          (id: string, index: number) =>
                            "#" +
                            id +
                            (index === selectedTokenIds.length - 1 ? "" : ", "),
                        )}
                      </div>
                      <hr />
                    </div>
                    <div className="mb-4 flex items-center">
                      <div className="flex flex-col">
                        <span className="pb-1 text-sm uppercase">From</span>
                        {renderBadge(
                          isSourceL1,
                          isSourceL1 ? l1Address : l2Address,
                        )}
                      </div>
                      <MoveRightIcon className="w-10" />
                      <div className="flex flex-col">
                        <span className="pb-1 text-sm uppercase">To</span>
                        {renderBadge(
                          !isSourceL1,
                          isSourceL1 ? l2Address : l1Address,
                        )}
                      </div>
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
                        {isDepositPending ? (
                          <>
                            <Loader className="mr-2 animate-spin" />
                            Confirm in Wallet
                          </>
                        ) : (
                          "Bridge Realms"
                        )}
                      </Button>
                    ) : (
                      <>
                        <p>
                          You must approve the Bridge contract for your Realms
                          before confirming transfer
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
                                  <Loader className="mr-2 animate-spin" /> In
                                  Progress
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
              ) : (
                <>
                  <TransactionSubmittedModalBody
                    transfer={{ type: ActionType.TRANSFER_TO_L2, l1hash: data }}
                  />
                  <TransactionSubmittedModalButton
                    transfer={{ type: ActionType.TRANSFER_TO_L2, l1hash: data }}
                  />
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  return null;
};
