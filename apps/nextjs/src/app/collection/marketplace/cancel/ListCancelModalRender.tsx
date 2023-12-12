import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import { useContractWrite } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import {
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";
import { ChainId } from "@realms-world/constants/src/Chains";

import { useCoinConversion } from "../../hooks";

export enum CancelStep {
  Cancel,
  Approving,
  Complete,
}

export interface CancelListingStepData {
  totalSteps: number;
  stepProgress: number;
  currentStep: any; //Execute['steps'][0]
  currentStepItem: any; // NonNullable<Execute['steps'][0]['items']>[0]
}

interface ChildrenProps {
  //loading: boolean;
  listing?: any; //NonNullable<ReturnType<typeof useListings>["data"]>[0];
  tokenId?: string;
  contract?: string;
  cancelStep: CancelStep;
  transactionError?: Error | null;
  /*totalUsd: number
  usdPrice: number*/
  blockExplorerBaseUrl: string;
  blockExplorerName: string;
  steps: any; // Execute['steps'] | null
  stepData: CancelListingStepData | null;
  setCancelStep: React.Dispatch<React.SetStateAction<CancelStep>>;
  cancelOrder: () => void;
}

interface Props {
  open: boolean;
  //listingId?: string;
  token: RouterOutputs["erc721Tokens"]["byId"];
  children: (props: ChildrenProps) => ReactNode;
}

export const ListCancelModalRender: FC<Props> = ({
  open,
  //listingId,
  children,
  token,
}) => {
  const [cancelStep, setCancelStep] = useState<CancelStep>(CancelStep.Cancel);
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [stepData, setStepData] = useState<CancelListingStepData | null>(null);
  const [steps, setSteps] = useState<any /*Execute['steps'] | null*/>(null);

  const blockExplorerBaseUrl = "https://etherscan.io";

  const blockExplorerName = "Etherscan";

  const listing = token?.listings[0];

  /*  const coinConversion = useCoinConversion(
    open && listing ? 'USD' : undefined,
    currency?.symbol
  )
  const usdPrice = coinConversion.length > 0 ? coinConversion[0].price : 0
  const totalUsd = usdPrice * (listing?.price?.amount?.decimal || 0)*/

  const {
    data,
    write,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: MarketplaceContract[
          ChainId["SN_" + NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "cancel",
        calldata: [listing?.id],
      },
    ],
  });

  const cancelOrder = useCallback(async () => {
    if (!listing) {
      const error = new Error("Missing list id to cancel");
      setTransactionError(error);
      throw error;
    }

    setCancelStep(CancelStep.Approving);

    write();

    /*client.actions
      .cancelOrder({
        chainId: rendererChain?.id,
        ids: [listingId],
        wallet,
        onProgress: (steps: Execute["steps"]) => {
          if (!steps) {
            return;
          }
          setSteps(steps);

          const executableSteps = steps.filter(
            (step) => step.items && step.items.length > 0,
          );

          const stepCount = executableSteps.length;

          let currentStepItem:
            | NonNullable<Execute["steps"][0]["items"]>[0]
            | undefined;

          const currentStepIndex = executableSteps.findIndex((step) => {
            currentStepItem = step.items?.find(
              (item) => item.status === "incomplete",
            );
            return currentStepItem;
          });

          const currentStep =
            currentStepIndex > -1
              ? executableSteps[currentStepIndex]
              : executableSteps[stepCount - 1];

          if (currentStepItem) {
            setStepData({
              totalSteps: stepCount,
              stepProgress: currentStepIndex,
              currentStep,
              currentStepItem,
            });
          } else if (
            steps.every(
              (step) =>
                !step.items ||
                step.items.length == 0 ||
                step.items?.every((item) => item.status === "complete"),
            )
          ) {
            setCancelStep(CancelStep.Complete);
          }
        },
      })
      .catch((error: Error) => {
        setTransactionError(error);
        setCancelStep(CancelStep.Cancel);
        setStepData(null);
        setSteps(null);
      });*/
  }, [listing]);

  useEffect(() => {
    if (!open) {
      setCancelStep(CancelStep.Cancel);
      setTransactionError(null);
      setStepData(null);
      setSteps(null);
    }
  }, [open]);

  const tokenId = listing?.token_key?.split(":")[2];
  const contract = listing?.token_key?.split(":")[1];

  return (
    <>
      {children({
        listing,
        tokenId,
        blockExplorerName,
        contract,
        cancelStep,
        transactionError,
        /*usdPrice,
        totalUsd,*/
        blockExplorerBaseUrl,
        steps,
        stepData,
        setCancelStep,
        cancelOrder,
      })}
    </>
  );
};
