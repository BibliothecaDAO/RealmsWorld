import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import type { ExpirationOption } from "@/types";
import type { RouterOutputs } from "@/utils/api";
import { getTokenContractAddresses } from "@/utils/utils";
import { useAccount, useContractWrite } from "@starknet-react/core";
import dayjs from "dayjs";
import { formatUnits, parseUnits, zeroAddress } from "viem";

import {
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";
import { ChainId } from "@realms-world/constants/src/Chains";

import expirationOptions from "../defaultExpiration";
import type { Listing } from "../list/ListModalRender";

type Exchange = NonNullable<Marketplace["exchanges"]>["string"];

export enum EditListingStep {
  Edit,
  Approving,
  Complete,
}

export interface EditListingStepData {
  totalSteps: number;
  stepProgress: number;
  currentStep: any; //Execute["steps"][0];
  currentStepItem: any; //NonNullable<Execute["steps"][0]["items"]>[0];
}

interface ChildrenProps {
  loading: boolean;
  listing?: any; ///NonNullable<ReturnType<typeof useListings>["data"]>[0];
  tokenId?: string;
  contract?: string;
  price: bigint | undefined;
  collection?: any;
  // quantityAvailable: number;
  //quantity: number;
  editListingStep: EditListingStep;
  transactionError?: Error | null;
  //totalUsd: number;
  royaltyBps?: number;
  expirationOptions: ExpirationOption[];
  expirationOption: ExpirationOption | undefined;
  //usdPrice: number;
  steps: any; //Execute["steps"] | null;
  stepData: EditListingStepData | null;
  setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  //setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setExpirationOption: React.Dispatch<React.SetStateAction<ExpirationOption>>;
  setEditListingStep: React.Dispatch<React.SetStateAction<EditListingStep>>;
  editListing: () => void;
}

interface Props {
  open: boolean;
  listingId?: string;
  tokenId?: string;
  token?: RouterOutputs["erc721Tokens"]["byId"];
  collectionId?: string;
  normalizeRoyalties?: boolean;
  children: (props: ChildrenProps) => ReactNode;
}

export const ListingEditModalRender: FC<Props> = ({
  open,
  listingId,
  tokenId,
  token,
  collectionId,
  normalizeRoyalties,
  children,
}) => {
  const { address } = useAccount();
  const [editListingStep, setEditListingStep] = useState<EditListingStep>(
    EditListingStep.Edit,
  );
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [stepData, setStepData] = useState<EditListingStepData | null>(null);
  const [steps, setSteps] = useState<Execute["steps"] | null>(null);

  const [price, setPrice] = useState<number | undefined>(0);
  const [quantity, setQuantity] = useState(1);

  const listing = token?.listings?.[0] ?? undefined;
  const contract = listing?.tokenSetId?.split(":")[1];

  useEffect(() => {
    if (listing?.price) {
      setPrice(listing?.price);
    }
  }, [listing?.price]);

  /*const coinConversion = useCoinConversion(
    open && listing ? "USD" : undefined,
    currency?.symbol,
  );
  const usdPrice = coinConversion.length > 0 ? coinConversion[0].price : 0;
  const totalUsd = usdPrice * (listing?.price?.amount?.decimal || 0);*/

  const [expirationOption, setExpirationOption] = useState<ExpirationOption>(
    expirationOptions[5],
  );

  //TODO fetch actual royalty
  const royaltyBps = 500;

  useEffect(() => {
    if (!open) {
      setEditListingStep(EditListingStep.Edit);
      setTransactionError(null);
      setStepData(null);
      setExpirationOption(expirationOptions[5]);
      setQuantity(1);
    }
  }, [open]);

  /*const quantityAvailable =
    is1155 && userTokens[0]
      ? Number(userTokens[0].ownership?.tokenCount || 1)
      : 1;
*/
  let expirationTime: string | null = null;

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
        entrypoint: "edit",
        calldata: [listingId, price],
      },
    ],
  });

  const editListing = useCallback(async () => {
    if (!address) {
      const error = new Error("Missing a wallet/signer");
      setTransactionError(error);
      throw error;
    }

    if (!listingId) {
      const error = new Error("Missing list id to edit");
      setTransactionError(error);
      throw error;
    }

    setTransactionError(null);

    if (expirationOption.relativeTime && expirationOption.relativeTimeUnit) {
      expirationTime = dayjs()
        .add(expirationOption.relativeTime, expirationOption.relativeTimeUnit)
        .unix()
        .toString();
    }

    const listing: Listing = {
      token: `${contract}:${tokenId}`,
      weiPrice: (parseUnits(`${price!}`, 18) * BigInt(quantity)).toString(),
    };

    if (quantity > 1) {
      listing.quantity = quantity;
    }

    if (expirationTime) {
      listing.expirationTime = expirationTime;
    }

    setEditListingStep(EditListingStep.Approving);
    write();

    /*client.actions
      .listToken({
        chainId: rendererChain?.id,
        listings: [listing],
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
            setEditListingStep(EditListingStep.Complete);
          }
        },
      })
      .catch((error: Error) => {
        setTransactionError(error);
        setEditListingStep(EditListingStep.Edit);
        setStepData(null);
        setSteps(null);
      });*/
  }, [collectionId, tokenId, expirationOption, price, quantity, contract]);

  useEffect(() => {
    if (!open) {
      setEditListingStep(EditListingStep.Edit);
      setTransactionError(null);
      setStepData(null);
      setSteps(null);
    }
  }, [open]);

  return (
    <>
      {children({
        loading: !listing,
        listing,
        tokenId,
        contract,
        price,
        //quantityAvailable,
        //collection,
        //quantity,
        expirationOption,
        expirationOptions,
        editListingStep,
        transactionError,
        /*usdPrice,
        totalUsd,*/
        royaltyBps,
        steps,
        stepData,
        setPrice,
        //setQuantity,
        setExpirationOption,
        setEditListingStep,
        editListing,
      })}
    </>
  );
};
