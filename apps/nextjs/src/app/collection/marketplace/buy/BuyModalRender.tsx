import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NETWORK_NAME } from "@/constants/env";
import type { RouterOutputs } from "@/utils/api";
import { getTokenContractAddresses } from "@/utils/utils";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { uint256 } from "starknet";
import { formatUnits } from "viem";

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
  averageUnitPrice: bigint;
  totalPrice: bigint;
  totalIncludingFees: bigint;
  buyStep: BuyStep;
  transactionError?: Error | null;
  hasEnoughCurrency: boolean;
  addFundsLink: string;
  gasCost: bigint;
  /*feeUsd: string;
  totalUsd: bigint;
  usdPrice: number;*/
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
  const [totalPrice, setTotalPrice] = useState(0n);
  const [totalIncludingFees, setTotalIncludingFees] = useState(0n);
  const [gasCost, setGasCost] = useState(0n);
  const [averageUnitPrice, setAverageUnitPrice] = useState(0n);
  const [isFetchingPath, setIsFetchingPath] = useState(false);
  const [buyStep, setBuyStep] = useState<BuyStep>(BuyStep.Checkout);
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [hasEnoughCurrency, setHasEnoughCurrency] = useState(true);
  const [stepData, setStepData] = useState<BuyModalStepData | null>(null);
  const [steps, setSteps] = useState(/*<Execute["steps"] | null>*/ null);
  const [quantity, setQuantity] = useState(1);

  /*  const blockExplorerBaseUrl =
    wagmiChain?.blockExplorers?.default?.url || "https://etherscan.io";
  const blockExplorerBaseName =
    wagmiChain?.blockExplorers?.default?.name || "Etherscan";*/

  const contract = collectionId ? collectionId?.split(":")[0] : undefined;

  const { address } = useAccount();

  /*const collection = collections?.[0] ? collections[0] : undefined;
  const is1155 = token?.token?.kind === "erc1155";*/
  const isOwner = token?.owner?.toLowerCase() === address?.toLowerCase();

  const listing = token?.listings[0];

  const quantityRemaining = useMemo(() => {
    if (orderId) {
      return /*listing?.quantityRemaining ||*/ 1;
    }
  }, [listing, token, orderId]);

  /*const usdPrice = paymentCurrency?.usdPrice || 0;
  const usdPriceRaw = paymentCurrency?.usdPriceRaw || 0n;
  const totalUsd = totalIncludingFees * usdPriceRaw;*/

  const addFundsLink = `https://app.avnu.fi/en?tokenFrom=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7&tokenTo=0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49&amount=0.001`;

  const {
    data,
    write,
    // isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: LORDS[ChainId["SN_" + NETWORK_NAME]]
          ?.address as `0x${string}`,
        entrypoint: "approve",
        calldata: [
          MarketplaceContract[ChainId["SN_" + NETWORK_NAME]] as `0x${string}`, //Marketplace address
          listing?.price * 10 ** 18,
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

  const buyToken = useCallback(async () => {
    if (!tokenId || !collectionId) {
      const error = new Error("Missing tokenId or collectionId");
      setTransactionError(error);
      throw error;
    }

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

    write();

    /* client.actions
      .buyToken({
        chainId: rendererChain?.id,
        items: items,
        expectedPrice: {
          [paymentCurrency?.address || zeroAddress]: {
            raw: totalPrice,
            currencyAddress: paymentCurrency?.address,
            currencyDecimals: paymentCurrency?.decimals || 18,
          },
        },
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
            setBuyStep(BuyStep.Complete);
          }
        },
        options,
      })
      .catch((error: Error) => {
        if (error && error?.message && error?.message.includes("ETH balance")) {
          setHasEnoughCurrency(false);
        } else {
          setTransactionError(error);
          if (orderId) {
            mutateListings();
          }
          mutateCollection();
          mutateTokens();
          fetchPath();
        }
        setBuyStep(BuyStep.Checkout);
        setStepData(null);
        setSteps(null);
      });*/
  }, [
    tokenId,
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
      setTotalPrice(0n);
      setTotalIncludingFees(0n);
      setAverageUnitPrice(0n);
      return;
    }

    let total = 0n;
    const gasCost = 0n;

    if (orderId) {
      total = (listing?.price || 0) * quantity;
    } /*else if (token?.market?.floorAsk?.price) {
      total = BigInt(token.market.floorAsk.price?.amount?.raw || 0);
    }*/

    if (total > 0) {
      setTotalPrice(total);
      setTotalIncludingFees(total);
      setGasCost(gasCost);
      setAverageUnitPrice(total / BigInt(quantity));
    } else {
      setTotalIncludingFees(0n);
      setTotalPrice(0n);
      setAverageUnitPrice(0n);
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
      1 != 1
    ) {
      setHasEnoughCurrency(false);
    } else {
      setHasEnoughCurrency(true);
    }
  }, [totalIncludingFees, gasCost]);

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
        /*feeUsd,
        totalUsd,
        usdPrice,*/
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
