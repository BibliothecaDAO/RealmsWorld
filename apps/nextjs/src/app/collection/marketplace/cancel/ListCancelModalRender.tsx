import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { findLowestPriceActiveListing } from "@/utils/getters";
import { useWaitForTransaction } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import { useCancelListing } from "@/hooks/market/useCancelListing";

//import { useCoinConversion } from "../../hooks";

export enum CancelStep {
  Cancel,
  Approving,
  Complete,
}

interface ChildrenProps {
  listing?: RouterOutputs["erc721MarketEvents"]["all"]["items"][number];
  tokenId?: string;
  contract?: string;
  cancelStep: CancelStep;
  transactionError?: Error | null;
  blockExplorerBaseUrl: string;
  blockExplorerName: string;
  setCancelStep: React.Dispatch<React.SetStateAction<CancelStep>>;
  cancelOrder: () => Promise<void>;
}

interface Props {
  open: boolean;
  token: RouterOutputs["erc721Tokens"]["byId"];
  children: (props: ChildrenProps) => ReactNode;
}

export const ListCancelModalRender: FC<Props> = ({
  open,
  children,
  token,
}) => {
  const [cancelStep, setCancelStep] = useState<CancelStep>(CancelStep.Cancel);
  const [transactionError, setTransactionError] = useState<Error | null>();

  const blockExplorerBaseUrl = "https://etherscan.io";

  const blockExplorerName = "Etherscan";

  const listing =
    token?.listings &&
    findLowestPriceActiveListing(token?.listings, token?.owner);


  const {
    data,
    writeAsync,
    error: writeError,
    // isLoading: isTxSubmitting,
  } = useCancelListing({listingId: listing?.id})
  
  const { data: transactionData } = useWaitForTransaction({
    hash: data?.transaction_hash,
    watch: true,
  });
  useEffect(() => {
    if (data?.transaction_hash) {
      //@ts-expect-error Wrong starknet types
      if (transactionData?.execution_status == "SUCCEEDED") {
        setCancelStep(CancelStep.Complete);
      }
    }
  }, [data, transactionData, transactionError]);

  useEffect(() => {
    if (writeError) {
      console.log(writeError);
      setCancelStep(CancelStep.Cancel);
      setTransactionError(writeError);
    }
  }, [writeError]);

  const cancelOrder = useCallback(async () => {
    if (!listing) {
      const error = new Error("Missing list id to cancel");
      setTransactionError(error);
      throw error;
    }

    setCancelStep(CancelStep.Approving);

    await writeAsync();
  }, [listing, writeAsync]);

  useEffect(() => {
    if (!open) {
      setCancelStep(CancelStep.Cancel);
      setTransactionError(null);
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
        setCancelStep,
        cancelOrder,
      })}
    </>
  );
};
