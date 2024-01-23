import type { ExpirationOption } from "@/types";
import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import { api } from "@/trpc/react";
import { getTokenContractAddresses } from "@/utils/utils";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import dayjs from "dayjs";
import { formatUnits, parseUnits, zeroAddress } from "viem";

import type { RouterOutputs } from "@realms-world/api";
import {
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";
import { ChainId } from "@realms-world/constants/src/Chains";

import type { Listing } from "../list/ListModalRender";
import expirationOptions from "../defaultExpiration";

export enum EditListingStep {
  Edit,
  Approving,
  Complete,
}

export interface EditListingStepData {
  totalSteps: number;
  stepProgress: number;
  currentStep: any;
  currentStepItem: any;
}

interface ChildrenProps {
  loading: boolean;
  listing?: any;
  tokenId?: string;
  contract?: string;
  price: number;
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
  steps: any;
  stepData: EditListingStepData | null;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  //setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setExpirationOption: React.Dispatch<React.SetStateAction<ExpirationOption>>;
  setEditListingStep: React.Dispatch<React.SetStateAction<EditListingStep>>;
  editListing: () => void;
}

interface Props {
  open: boolean;
  tokenId?: string;
  token?: RouterOutputs["erc721Tokens"]["byId"];
  collectionId?: string;
  normalizeRoyalties?: boolean;
  children: (props: ChildrenProps) => ReactNode;
}

export const ListingEditModalRender: FC<Props> = ({
  open,
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

  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  const filters = {
    limit: 20,
    token_key: token?.contract_address + ":" + token?.token_id,
    enabled: false,
  };
  const { data: listingsData } = api.erc721Listings.all.useQuery(filters, {
    enabled: open && !token?.listings?.[0],
  });

  const listing = useMemo(() => {
    return token?.listings?.[0] ?? listingsData?.items?.[0];
  }, [token, listingsData]);

  const contract = listing?.token_key?.split(":")[1];

  useEffect(() => {
    if (listing?.price) {
      setPrice(parseInt(listing?.price));
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
    writeAsync,
    error: writeError,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: MarketplaceContract[
          ChainId["SN_" + NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "edit",
        calldata: [
          listing?.id,
          !price ? "0" : parseUnits(`${price}`, 18).toString(),
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
        setEditListingStep(EditListingStep.Complete);
      }
    }
  }, [data, transactionData, transactionError]);
  useEffect(() => {
    if (writeError) {
      setEditListingStep(EditListingStep.Edit);
      setTransactionError(writeError);
    }
  }, [writeError]);

  const editListing = useCallback(async () => {
    if (!address) {
      const error = new Error("Missing a wallet/signer");
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
      weiPrice: (parseUnits(`${price}`, 18) * BigInt(quantity)).toString(),
    };

    if (quantity > 1) {
      listing.quantity = quantity;
    }

    if (expirationTime) {
      listing.expirationTime = expirationTime;
    }

    setEditListingStep(EditListingStep.Approving);
    await writeAsync();
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
