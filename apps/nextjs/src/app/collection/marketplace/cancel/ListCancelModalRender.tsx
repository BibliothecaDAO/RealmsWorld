import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { NETWORK_NAME, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { findLowestPriceActiveListing } from "@/utils/getters";
import { useContractWrite, useWaitForTransaction } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import { MarketplaceContract } from "@realms-world/constants";

//import { useCoinConversion } from "../../hooks";

export enum CancelStep {
  Cancel,
  Approving,
  Complete,
}

interface ChildrenProps {
  //loading: boolean;
  listing?: any;
  tokenId?: string;
  contract?: string;
  cancelStep: CancelStep;
  transactionError?: Error | null;
  /*totalUsd: number
  usdPrice: number*/
  blockExplorerBaseUrl: string;
  blockExplorerName: string;
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

  const blockExplorerBaseUrl = "https://etherscan.io";

  const blockExplorerName = "Etherscan";

  const listing =
    token?.listings &&
    findLowestPriceActiveListing(token?.listings, token?.owner);

  /*  const coinConversion = useCoinConversion(
    open && listing ? 'USD' : undefined,
    currency?.symbol
  )
  const usdPrice = coinConversion.length > 0 ? coinConversion[0].price : 0
  const totalUsd = usdPrice * (listing?.price?.amount?.decimal || 0)*/

  const {
    data,
    writeAsync,
    error: writeError,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: MarketplaceContract[
          SUPPORTED_L2_CHAIN_ID
        ] as `0x${string}`,
        entrypoint: "cancel",
        calldata: [listing?.id],
      },
    ],
  });
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
  }, [listing]);

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
