import type { ExpirationOption } from "@/types";
import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import { findCollectionKeyByAddress } from "@/utils/getters";
import { getTokenContractAddresses } from "@/utils/utils";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import dayjs from "dayjs";
import { parseUnits } from "viem";

import type { RouterOutputs } from "@realms-world/api";
import {
  ChainId,
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";

import defaultExpirationOptions from "../defaultExpiration";

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
  token?: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  collection?: any;
  listStep: ListStep;
  //usdPrice: number;
  expirationOptions: ExpirationOption[];
  expirationOption: ExpirationOption;
  listingData: ListingData[];
  transactionError?: Error | null;
  stepData: ListModalStepData | null;
  price: number;
  royaltyBps?: number;
  setListStep: React.Dispatch<React.SetStateAction<ListStep>>;
  setExpirationOption: React.Dispatch<React.SetStateAction<ExpirationOption>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
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
  const [price, setPrice] = useState<number>(0);
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
      setPrice(0);
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
  const {
    data,
    writeAsync,
    error: writeError,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: collectionId as `0x${string}`,
        entrypoint: "set_approval_for_all",
        calldata: [
          MarketplaceContract[ChainId["SN_" + NETWORK_NAME]] as `0x${string}`, //Marketplace address
          1,
        ],
      },
      {
        contractAddress: MarketplaceContract[
          ChainId["SN_" + NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "create",
        calldata: [
          tokenId as `0x${string}`,
          MarketplaceCollectionIds[findCollectionKeyByAddress(collectionId)],
          !price ? "0" : parseUnits(`${price}`, 18).toString(),
          expirationTime,
        ],
      },
    ],
  });
  const { data: transactionData, error: txErrror } = useWaitForTransaction({
    hash: data?.transaction_hash,
    watch: true,
  });
  useEffect(() => {
    if (data?.transaction_hash) {
      if (transactionData?.execution_status == "SUCCEEDED") {
        setListStep(ListStep.Complete);
      }
    }
  }, [data, transactionData, transactionError]);
  useEffect(() => {
    if (writeError) {
      setListStep(ListStep.SetPrice);
      setTransactionError(writeError);
    }
  }, [writeError]);

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

    await writeAsync();
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
