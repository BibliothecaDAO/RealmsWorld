/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ExpirationOption } from "@/types";
import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { useListToken } from "@/hooks/market/useListToken";
import { useWaitForTransaction } from "@starknet-react/core";
import dayjs from "dayjs";

import type { RouterOutputs } from "@realms-world/api";

import defaultExpirationOptions from "../defaultExpiration";

export enum ListStep {
  Unavailable,
  SetPrice,
  Listing,
  Complete,
}

export type Listing =
  RouterOutputs["erc721MarketEvents"]["all"]["items"][number];

export interface ListingData {
  listing: Listing;
}

export interface ListModalStepData {
  totalSteps: number;
  stepProgress: number;
  currentStep: any; //Execute['steps'][0]
  listingData: ListingData[];
}

interface ChildrenProps {
  loading: boolean;
  collection?: any;
  listStep: ListStep;
  //usdPrice: number;
  expirationOptions: ExpirationOption[];
  expirationOption: ExpirationOption;
  transactionError?: Error | null;
  stepData: ListModalStepData | null;
  price: number;
  royaltyBps?: number;
  setListStep: React.Dispatch<React.SetStateAction<ListStep>>;
  setExpirationOption: React.Dispatch<React.SetStateAction<ExpirationOption>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  listToken: () => Promise<void>;
}

interface Props {
  open: boolean;
  tokenId?: number;
  collectionId: string;
  children: (props: ChildrenProps) => ReactNode;
}

const expirationOptions = [
  ...defaultExpirationOptions,
  {
    text: "Custom",
    value: "custom",
    relativeTime: null,
    relativeTimeUnit: null,
  },
];

export const ListModalRenderer: FC<Props> = ({
  open,
  tokenId,
  collectionId,
  children,
}) => {
  //const { address } = useAccount();

  const [listStep, setListStep] = useState<ListStep>(ListStep.SetPrice);
  //const [listingData, setListingData] = useState<ListingData[]>([]);
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [stepData, setStepData] = useState<ListModalStepData | null>(null);
  const [price, setPrice] = useState<number>(0);
  //const [quantity, setQuantity] = useState(1);
  const [expirationOption, setExpirationOption] = useState<ExpirationOption>(
    expirationOptions[5]!,
  );

  //TODO fetch actual royalty
  const royaltyBps = 500;

  //TODO pass token in as prop?

  //TODO add USD/ETH price conversion
  /*const coinConversion = useCoinConversion(
      open ? 'USD' : undefined,
      currency.symbol,
      currency.coinGeckoId
    )
    const usdPrice = coinConversion.length > 0 ? coinConversion[0].price : 0*/

  useEffect(() => {
    if (!open) {
      setListStep(ListStep.SetPrice);
      setTransactionError(null);
      setPrice(0);
      setStepData(null);
      setExpirationOption(expirationOptions[5]!);
    }
  }, [open]);

  //TODO some liveliness check for marketplace
  /* useEffect(() => {
        
      if (marketplace && !exchange) {
        setListStep(ListStep.Unavailable)
      }
    }, [marketplace, exchange])*/

  //TODO usememo
  let expirationTime: string | undefined = undefined;

  if (expirationOption.relativeTime) {
    if (expirationOption.relativeTimeUnit) {
      expirationTime = dayjs()
        .add(expirationOption.relativeTime, expirationOption.relativeTimeUnit)
        .unix()
        .toString();
    } else {
      expirationTime = `${expirationOption.relativeTime}`;
    }
  }

  const {
    writeAsync,
    data,
    error: writeError,
  } = useListToken({
    price,
    tokenId,
    expirationTime,
    collectionId,
  });

  const { data: transactionData, error: txErrror } = useWaitForTransaction({
    hash: data?.transaction_hash,
    watch: true,
  });
  useEffect(() => {
    if (data?.transaction_hash) {
      //@ts-expect-error incorrect starknet react types
      if (transactionData?.execution_status == "SUCCEEDED") {
        setListStep(ListStep.Complete);
      }
    }
  }, [data, transactionData, transactionError]);
  useEffect(() => {
    if (writeError ?? txErrror) {
      setListStep(ListStep.SetPrice);
      setTransactionError(writeError ?? txErrror);
    }
  }, [writeError, txErrror]);

  const listToken = useCallback(async () => {
    setTransactionError(null);

    /*const fees = feesBps || client.marketplaceFees;
    if (fees) {
      listing.marketplaceFees = fees;
    }*/
    setListStep(ListStep.Listing);

    await writeAsync();
  }, [writeAsync]);

  return (
    <>
      {children({
        loading: /*!token ||
          !collection)*/ false,
        //token,
        // collection,
        listStep,
        //usdPrice,
        expirationOption,
        expirationOptions,
        transactionError,
        stepData,
        price,
        royaltyBps,
        setListStep,
        setPrice,
        setExpirationOption,
        listToken,
      })}
    </>
  );
};

ListModalRenderer.displayName = "ListModalRenderer";
