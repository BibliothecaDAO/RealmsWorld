// ... existing imports ...
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
import { useAccount as useL2Account } from "@starknet-react/core";
import { Loader, MoveRightIcon, RefreshCcw } from "lucide-react";
import { useAccount } from "wagmi";

import type { StepItem } from "@realms-world/ui";
import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
import {
  Alert,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ScrollArea,
  Step,
  Stepper,
  toast,
  useStepper,
} from "@realms-world/ui";

import { EthereumLoginButton } from "../wallet/EthereumLoginButton";
import { StarknetLoginButton } from "../wallet/StarknetLoginButton";
import TransactionSubmittedModalBody from "./TransactionSubmittedModal/TransactionSubmittedModalBody";
import TransactionSubmittedModalButton from "./TransactionSubmittedModal/TransactionSubmittedModalButton";

// BridgeBadge Component
const BridgeBadge = ({
  isL1,
  address,
}: {
  isL1: boolean;
  address?: string;
}) => (
  <Badge className="flex gap-4 px-4">
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

// NonceAlert Component
const NonceAlert = ({
  nonce,
  getNonce,
}: {
  nonce?: string;
  getNonce: () => void;
}) => {
  return (
    <>
      {!nonce && (
        <Alert variant={"destructive"} className="flex">
          <div>
            Your account must be deployed on Starknet before bridging your
            Realms.{" "}
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
    </>
  );
};

// BridgeSteps Component
const BridgeSteps = ({
  steps,
  selectedTokenIds,
  isSourceL1,
  l1Address,
}: {
  steps: StepItem[];
  selectedTokenIds: string[];
  isSourceL1: boolean;
  l1Address: string;
}) => {
  const transactions = useStore(useTransactionManager, (state) => state);
  const { address: l2Address, account } = useL2Account();
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

  const onBridge = async () => {
    let hash;
    if (isSourceL1) {
      hash = await depositRealms({
        tokenIds: selectedTokenIds.map((id) => BigInt(id)),
        l2Address: l2Address,
      });
    } else {
      hash = await initiateWithdraw();
    }
    if (hash) {
      toast({
        title: "Bridge Realms",
        description: isSourceL1
          ? `${selectedTokenIds.length} Realms will be appear in your L2 wallet in a few minutes`
          : `${selectedTokenIds.length} Realms will require a transction in ~6 hours to finalize your withdrawal`,
      });
    }
  };
  const [nonce, setNonce] = useState<string | undefined>();

  const getNonce = useCallback(async () => {
    if (l2Address && account) {
      console.log("getting " + l2Address);
      try {
        const nonce = await account.getNonce();
        setNonce(nonce);
      } catch {
        setNonce(undefined);
      }
    }
  }, [l2Address, account]);
  useEffect(() => {
    if (l2Address) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getNonce();
    }
  }, [getNonce, l2Address]);
  return (
    <Stepper
      initialStep={0}
      variant="circle-alt"
      steps={steps}
      orientation="horizontal"
    >
      {steps.map((stepProps) => {
        return (
          <Step key={stepProps.label} {...stepProps}>
            <div className="mt-6 space-y-6">
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
              <div className="flex w-full justify-between">
                <BridgeBadge
                  isL1={isSourceL1}
                  address={isSourceL1 ? l1Address : l2Address}
                />
                <MoveRightIcon className="w-10 self-center" />
                <BridgeBadge
                  isL1={!isSourceL1}
                  address={isSourceL1 ? l2Address : l1Address}
                />
              </div>
              <NonceAlert nonce={nonce} getNonce={getNonce} />
              {stepProps.id == "bridge" && (
                <Button
                  className="w-full"
                  onClick={() => onBridge()}
                  disabled={
                    (isSourceL1 && !nonce) ||
                    isDepositPending ||
                    isWithdrawPending
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
              )}
              {stepProps.id == "approve" && (
                <>
                  <p>
                    You must approve the Bridge contract for your Realms before
                    confirming transfer
                  </p>
                  <Button
                    onClick={async () => {
                      const hash = await approveForAll();
                      if (hash) {
                        toast({
                          title: "Approved Realms",
                          description: `You can now proceed to bridge your Realms`,
                        });
                      }
                    }}
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
          </Step>
        );
      })}
      <Footer
        isSourceL1={isSourceL1}
        depositData={depositData}
        withdrawData={withdrawData?.transaction_hash}
      />
    </Stepper>
  );
};
const Footer = ({
  isSourceL1,
  depositData,
  withdrawData,
}: {
  isSourceL1: boolean;
  depositData?: string;
  withdrawData?: string;
}) => {
  const { hasCompletedAllSteps, setStep, nextStep } = useStepper();
  const { isApprovedForAll } = useERC721Approval();
  useEffect(() => {
    if (isApprovedForAll && isSourceL1) {
      setStep(1);
    } else {
      setStep(0);
    }
  }, [isApprovedForAll, setStep, isSourceL1]);
  useEffect(() => {
    if (depositData || withdrawData) {
      nextStep();
    }
  }, [depositData, withdrawData, nextStep]);

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="mt-4">
          <TransactionSubmittedModalBody
            transfer={{
              type: isSourceL1
                ? ActionType.TRANSFER_TO_L2
                : ActionType.TRANSFER_TO_L1,
              l1hash: depositData,
              l2hash: withdrawData,
            }}
          />
          <TransactionSubmittedModalButton
            transfer={{
              type: isSourceL1
                ? ActionType.TRANSFER_TO_L2
                : ActionType.TRANSFER_TO_L1,
              l1hash: depositData,
              l2hash: withdrawData,
            }}
          />
        </div>
      )}
    </>
  );
};

export default function NftBridgeModal() {
  const {
    isNftBridgeOpen,
    toggleNftBridge,
    nftBridgeModalProps: { selectedTokenIds, sourceChain },
  } = useUIStore((state) => state);

  const isSourceL1 = sourceChain == SUPPORTED_L1_CHAIN_ID;
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const steps = isSourceL1
    ? ([
        {
          label: "Approve",
          description: `Allow Bridge Contract access to Realms`,
          id: "approve",
        },
        {
          label: "Bridge",
          description: `Realms to Starknet`,
          id: "bridge",
        },
      ] satisfies StepItem[])
    : ([
        {
          label: "Approve & Bridge",
          description: `Realms to Ethereum`,
          id: "bridge",
        },
      ] satisfies StepItem[]);

  if (isNftBridgeOpen) {
    return (
      <Dialog open={isNftBridgeOpen} onOpenChange={toggleNftBridge}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle className="text-2xl">
            Bridge {selectedTokenIds.length} Realms
          </DialogTitle>
          {!l1Address && <EthereumLoginButton />}
          {!l2Address && <StarknetLoginButton />}
          {l1Address && l2Address && (
            <>
              <ScrollArea className="-mr-6 max-h-[600px] pr-6">
                <BridgeSteps
                  steps={steps}
                  selectedTokenIds={selectedTokenIds}
                  isSourceL1={isSourceL1}
                  l1Address={l1Address}
                />
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
