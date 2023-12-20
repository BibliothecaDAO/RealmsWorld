import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import { NETWORK_NAME } from "@/constants/env";
import { useLordsPrice } from "@/hooks/useLordsPrice";
import { api } from "@/trpc/react";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import { formatUnits, parseUnits } from "viem";

import type { RouterOutputs } from "@realms-world/api";
import {
  LORDS,
  MarketplaceCollectionIds,
  MarketplaceContract,
} from "@realms-world/constants";
import { ChainId } from "@realms-world/constants/src/Chains";

type Item = any; //Parameters<ReservoirClientActions['buyToken']>['0']['items'][0]

export enum BuyStep {
  Checkout,
  Approving,
  Complete,
  Unavailable,
  SelectPayment,
}

export interface BuyModalStepData {
  totalSteps: number;
  stepProgress: number;
  currentStep: any; // Execute['steps'][0]
  currentStepItem: any; // NonNullable<Execute['steps'][0]['items']>[0]
}

type Token = RouterOutputs["erc721Tokens"]["byId"];

interface ChildrenProps {
  loading: boolean;
  token?: Token;
  collection?: any; //NonNullable<ReturnType<typeof useCollections>["data"]>[0];
  listing?: any; //NonNullable<ReturnType<typeof useListings>["data"]>[0];
  quantityAvailable: number;
  averageUnitPrice: number;
  totalPrice: number;
  totalIncludingFees: number;
  buyStep: BuyStep;
  transactionError?: Error | null;
  hasEnoughCurrency: boolean;
  addFundsLink: string;
  gasCost: bigint;
  //feeUsd: string;
  totalUsd: number;
  usdPrice: number;
  balance?: bigint;
  address?: string;
  steps: any; //Execute["steps"] | null;
  stepData: BuyModalStepData | null;
  quantity: number;
  isOwner: boolean;
  setBuyStep: React.Dispatch<React.SetStateAction<BuyStep>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  buyToken: () => void;
}

interface Props {
  open: boolean;
  token: RouterOutputs["erc721Tokens"]["byId"];
  tokenId?: string;
  defaultQuantity?: number;
  collectionId?: string;
  orderId?: number;
  normalizeRoyalties?: boolean;
  children: (props: ChildrenProps) => ReactNode;
  usePermit?: boolean;
}

export const BuyModalRender: FC<Props> = ({
  open,
  token,
  tokenId,
  collectionId,
  orderId,
  defaultQuantity,
  normalizeRoyalties,
  children,
  usePermit,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalIncludingFees, setTotalIncludingFees] = useState(0);
  const [gasCost, setGasCost] = useState(0n);
  const [averageUnitPrice, setAverageUnitPrice] = useState(0);
  const [isFetchingPath, setIsFetchingPath] = useState(false);
  const [buyStep, setBuyStep] = useState<BuyStep>(BuyStep.Checkout);
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [hasEnoughCurrency, setHasEnoughCurrency] = useState(true);
  const [stepData, setStepData] = useState<BuyModalStepData | null>(null);
  const [steps, setSteps] = useState(/*<Execute["steps"] | null>*/ null);
  const [quantity, setQuantity] = useState(1);
  const { lordsPrice } = useLordsPrice();
  const { balances } = useWalletsProviderContext();

  /*  const blockExplorerBaseUrl =
    wagmiChain?.blockExplorers?.default?.url || "https://etherscan.io";
  const blockExplorerBaseName =
    wagmiChain?.blockExplorers?.default?.name || "Etherscan";*/

  const contract = collectionId ? collectionId?.split(":")[0] : undefined;

  const { address } = useAccount();

  /*const collection = collections?.[0] ? collections[0] : undefined;
  const is1155 = token?.token?.kind === "erc1155";*/
  const isOwner = token?.owner?.toLowerCase() === address?.toLowerCase();

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

  const quantityRemaining = useMemo(() => {
    if (orderId) {
      return /*listing?.quantityRemaining ||*/ 1;
    }
  }, [listing, token, orderId]);

  const usdPrice = (listing?.price ?? 0) * lordsPrice;
  //const usdPriceRaw = paymentCurrency?.usdPriceRaw || 0n;*/
  const totalUsd = totalIncludingFees * lordsPrice;

  const addFundsLink = `https://app.avnu.fi/en?tokenFrom=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7&tokenTo=0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49&amount=0.001`;

  const {
    data,
    writeAsync,
    error: writeError,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: LORDS[ChainId["SN_" + NETWORK_NAME]]
          ?.address as `0x${string}`,
        entrypoint: "approve",
        calldata: [
          MarketplaceContract[ChainId["SN_" + NETWORK_NAME]] as `0x${string}`, //Marketplace address
          parseUnits(`${listing?.price ?? 0}`, 18).toString(),
          0,
        ],
      },
      {
        contractAddress: MarketplaceContract[
          ChainId["SN_" + NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "accept",
        calldata: [listing?.id],
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
        setBuyStep(BuyStep.Complete);
      }
    }
  }, [data, transactionData, transactionError]);
  useEffect(() => {
    if (writeError) {
      setBuyStep(BuyStep.Checkout);
      setTransactionError(writeError);
    }
  }, [writeError]);

  const buyToken = useCallback(async () => {
    const contract = collectionId?.split(":")[0];

    setBuyStep(BuyStep.Approving);
    const items: Item[] = [];
    const item: Item = {
      fillType: "trade",
      quantity,
    };

    if (orderId) {
      item.orderId = orderId;
    } else {
      item.token = `${contract}:${tokenId}`;
    }
    items.push(item);

    await writeAsync();
  }, [
    tokenId,
    listing,
    collectionId,
    orderId,
    quantity,
    normalizeRoyalties,
    totalPrice,
    totalIncludingFees,
    usePermit,
  ]);

  useEffect(() => {
    if (!token || (orderId && !listing) || isOwner) {
      setBuyStep(BuyStep.Unavailable);
    } else {
      setBuyStep(BuyStep.Checkout);
    }
  }, [listing, isFetchingPath, orderId, token]);

  useEffect(() => {
    if (quantity === -1) return;
    if (!token || (orderId && !listing) || isOwner) {
      setBuyStep(BuyStep.Unavailable);
      setTotalPrice(0);
      setTotalIncludingFees(0);
      setAverageUnitPrice(0);
      return;
    }

    let total = 0;
    const gasCost = 0;

    if (orderId) {
      total = (parseInt(listing?.price) || 0) * quantity;
    } else if (listing?.price) {
      total = listing?.price || 0;
      console.log(total);
    }

    if (total > 0) {
      setTotalPrice(total);
      setTotalIncludingFees(total);
      setGasCost(gasCost);
      setAverageUnitPrice(total / quantity);
    } else {
      setTotalIncludingFees(0);
      setTotalPrice(0);
      setAverageUnitPrice(0);
    }
  }, [
    listing,
    isFetchingPath,
    orderId,
    //usdPrice,
    quantity,
    token,
    isOwner,
  ]);

  useEffect(() => {
    if (
      // !lords or lords  balance < item total + gas
      parseInt(formatUnits(balances.l2.lords ?? 0n, 18)) < totalIncludingFees
    ) {
      setHasEnoughCurrency(false);
    } else {
      setHasEnoughCurrency(true);
    }
  }, [totalIncludingFees, gasCost, balances.l2.lords]);

  useEffect(() => {
    if (!open) {
      setBuyStep(BuyStep.Checkout);
      setTransactionError(null);
      setStepData(null);
      setSteps(null);
      setQuantity(1);
    } else {
      setQuantity(defaultQuantity || 1);
    }
  }, [open]);

  /*useEffect(() => {
    if (quantityRemaining > 0 && quantity > quantityRemaining) {
      setQuantity(quantityRemaining);
    }
  }, [quantityRemaining, quantity]);*/

  return (
    <>
      {children({
        loading: !listing || !token,
        listing,
        quantityAvailable: quantityRemaining || 1,
        totalPrice,
        totalIncludingFees,
        averageUnitPrice,
        gasCost,
        buyStep,
        token,
        transactionError,
        hasEnoughCurrency,
        addFundsLink,
        //feeUsd,
        totalUsd,
        usdPrice,
        address: address,
        steps,
        stepData,
        quantity,
        isOwner,
        setQuantity,
        setBuyStep,
        buyToken,
      })}
    </>
  );
};
