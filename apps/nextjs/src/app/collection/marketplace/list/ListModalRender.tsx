import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import type { ExpirationOption } from "@/types";
import type { RouterOutputs } from "@/utils/api";
import { getTokenContractAddresses } from "@/utils/utils";
import { useAccount, useContractWrite } from "@starknet-react/core";
import dayjs from "dayjs";
import { parseUnits } from "viem";

import {
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";
import { ChainId } from "@realms-world/constants/src/Chains";

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
  token?:
    | RouterOutputs["erc721Tokens"]["all"]["items"][number]
    | RouterOutputs["erc721Tokens"]["byId"];
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

  useEffect(() => {
    if (!open) {
      setListStep(ListStep.SetPrice);
      setTransactionError(null);
      setPrice("");
      setStepData(null);
      setExpirationOption(expirationOptions[5]);
    }
  }, [open]);

  //TODO some liveliness check for marketplace
  /* useEffect(() => {
        
      if (marketplace && !exchange) {
        setListStep(ListStep.Unavailable)
      }
    }, [marketplace, exchange])*/

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
  console.log(MarketplaceContract[ChainId["SN_" + NETWORK_NAME]]);
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
          MarketplaceContract[ChainId["SN_" + NETWORK_NAME]] as `0x${string}`, //Marketplace address
          1,
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
