import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import type { ExpirationOption } from "@/types";
import { getTokenContractAddresses } from "@/utils/utils";
import { useAccount, useContractWrite } from "@starknet-react/core";
import dayjs from "dayjs";
import { parseUnits } from "viem";

import { MarketplaceCollectionIds } from "@realms-world/constants";

import defaultExpirationOptions from "./defaultExpiration";

export enum ListStep {
  Unavailable,
  SetPrice,
  Listing,
  Complete,
}

export type Listing = any;

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
  token?: any;
  collection?: any;
  listStep: ListStep;
  //usdPrice: number;
  expirationOptions: ExpirationOption[];
  expirationOption: ExpirationOption;
  listingData: ListingData[];
  transactionError?: Error | null;
  stepData: ListModalStepData | null;
  price: string;
  royaltyBps?: number;
  setListStep: React.Dispatch<React.SetStateAction<ListStep>>;
  setExpirationOption: React.Dispatch<React.SetStateAction<ExpirationOption>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  listToken: () => void;
}

interface Props {
  open: boolean;
  tokenId?: string;
  collectionId?: string;
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
  const { address } = useAccount();

  const [listStep, setListStep] = useState<ListStep>(ListStep.SetPrice);
  const [listingData, setListingData] = useState<ListingData[]>([]);
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [stepData, setStepData] = useState<ListModalStepData | null>(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const contract = collectionId ? collectionId?.split(":")[0] : undefined;
  const [expirationOption, setExpirationOption] = useState<ExpirationOption>(
    expirationOptions[5],
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

  /*useEffect(() => {
    if (!open) {
      setListStep(ListStep.SetPrice);
      setTransactionError(null);
      setPrice("");
      setStepData(null);
      setExpirationOption(expirationOptions[5]);
    }
  }, [open]);*/

  //TODO some liveliness check for marketplace
  /* useEffect(() => {
        
      if (marketplace && !exchange) {
        setListStep(ListStep.Unavailable)
      }
    }, [marketplace, exchange])*/
  console.log(getTokenContractAddresses("goldenToken").L2);
  console.log(price);
  console.log(expirationOption);

  //TODO usememo
  let expirationTime: string | null = null;

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
    data: mintData,
    write,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: getTokenContractAddresses("goldenToken")
          .L2 as `0x${string}`,
        entrypoint: "set_approval_for_all",
        calldata: [
          address as `0x${string}`,
          "0x0136c83ac9a4938fa5205ac08a52937f5d19e02fe1fe5400d664f47c2b2297bb", //Marketplace address
        ],
      },
      {
        contractAddress:
          "0x0136c83ac9a4938fa5205ac08a52937f5d19e02fe1fe5400d664f47c2b2297bb" as `0x${string}`,
        entrypoint: "create",
        calldata: [
          tokenId as `0x${string}`,
          MarketplaceCollectionIds["Golden Token"],
          price,
          expirationTime,
        ],
      },
    ],
  });

  const listToken = useCallback(async () => {
    setTransactionError(null);

    let expirationTime: string | null = null;

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

    const listing: Listing = {
      token: `${contract}:${tokenId}`,
      weiPrice: parseUnits(`${+price}`, 18).toString(),
    };

    /*const fees = feesBps || client.marketplaceFees;
    if (fees) {
      listing.marketplaceFees = fees;
    }*/

    if (expirationTime) {
      listing.expirationTime = expirationTime;
    }

    setListingData([{ listing }]);
    setListStep(ListStep.Listing);

    write();

    setListStep(ListStep.Complete);

    //TODO error handling
    /* .catch((error: Error) => {
        setListStep(ListStep.SetPrice);
        setTransactionError(error);
      });*/
  }, [collectionId, tokenId, expirationOption, quantity, price]);

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
        listingData,
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
