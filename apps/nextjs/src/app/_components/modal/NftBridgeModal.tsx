"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";
import { ActionType } from "@/constants/transferSteps";
import { useBridgeL2Realms } from "@/hooks/bridge/useBridgeL2Realms";
import { useWriteDepositRealms } from "@/hooks/bridge/useWriteDepositRealms";
import useERC721Approval from "@/hooks/token/useERC721Approval";
import useStore from "@/hooks/useStore";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import { shortenHex } from "@/utils/utils";
import {
  useDeployAccount,
  useAccount as useL2Account,
} from "@starknet-react/core";
import { Loader, MoveRightIcon, RefreshCcw } from "lucide-react";
import { useAccount } from "wagmi";

import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
import {
  Alert,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ScrollArea,
  toast,
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
  const { address: l2Address, account } = useL2Account();
  const transactions = useStore(useTransactionManager, (state) => state);

  const {
    writeAsync: depositRealms,
    isPending: isDepositPending,
    data: depositData,
  } = useWriteDepositRealms({
    onSuccess: (data: string) => {
      transactions?.addTx({
        hash: data,
        type: TransactionType.BRIDGE_REALMS_L1_TO_L2,
        chainId: SUPPORTED_L1_CHAIN_ID,
        timestamp: new Date(),
      });
      toast({
        title: TransactionType.BRIDGE_REALMS_L1_TO_L2,
        description: `${selectedTokenIds.length} Realms will be appear in your L2 wallet in a few minutes`,
      });
    },
  });

  const {
    initiateWithdraw,
    isPending: isWithdrawPending,
    data: withdrawData,
  } = useBridgeL2Realms({ selectedTokenIds });

  const {
    isApprovedForAll,
    approveForAll,
    isPending: isApprovePending,
    approveForAllLoading,
  } = useERC721Approval();

  const [nonce, setNonce] = useState<string | undefined>();

  const getNonce = useCallback(async () => {
    if (account?.address) {
      console.log("getting " + account.address);
      try {
        const nonce = await account.getNonce();
        setNonce(nonce);
      } catch {
        setNonce(undefined);
      }
    }
  }, [account]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getNonce();
  }, [getNonce]);

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
              {!depositData && !withdrawData ? (
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
                    {!nonce && (
                      <Alert variant={"destructive"} className="flex">
                        <div>
                          Your account must be deployed on Starknet before
                          bridging your Realms.{" "}
                          <Link
                            href="https://support.argent.xyz/hc/en-us/articles/8802319054237-How-to-activate-deploy-my-Argent-X-wallet"
                            target="_blank"
                            className="text-bright-yellow underline"
                          >
                            Follow the Argent X guide to deploy your account
                          </Link>
                        </div>
                        <Button variant={"outline"} onClick={getNonce}>
                          <RefreshCcw className="w-8" />
                        </Button>
                      </Alert>
                    )}
                    {isApprovedForAll ? (
                      <Button
                        className="w-full"
                        onClick={() =>
                          isSourceL1
                            ? depositRealms({
                                tokenIds: selectedTokenIds.map((id) =>
                                  BigInt(id),
                                ),
                                l2Address: l2Address,
                              })
                            : initiateWithdraw()
                        }
                        disabled={
                          /*(isSourceL1 && !nonce) ||*/
                          isDepositPending || isWithdrawPending
                        }
                      >
                        {isDepositPending || isWithdrawPending ? (
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
                    transfer={{
                      type:
                        sourceChain == SUPPORTED_L1_CHAIN_ID
                          ? ActionType.TRANSFER_TO_L2
                          : ActionType.TRANSFER_TO_L1,
                      l1hash: depositData,
                      l2hash: withdrawData?.transaction_hash,
                    }}
                  />
                  <TransactionSubmittedModalButton
                    transfer={{
                      type:
                        sourceChain == SUPPORTED_L1_CHAIN_ID
                          ? ActionType.TRANSFER_TO_L2
                          : ActionType.TRANSFER_TO_L1,
                      l1hash: depositData,
                      l2hash: withdrawData?.transaction_hash,
                    }}
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
