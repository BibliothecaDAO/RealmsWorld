import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useBuyToken } from "@/hooks/market/useBuyToken";
import { useWalletsProviderContext } from "@/providers/WalletsProvider";
import { api } from "@/trpc/react";
import { findLowestPriceActiveListing } from "@/utils/getters";
import { useAccount, useTransactionReceipt } from "@starknet-react/core";
import { formatUnits } from "viem";
import { useLordsBalance as useL2LordsBalance } from "@/hooks/token/starknet/useLordsBalance";
import type { RouterInputs, RouterOutputs } from "@realms-world/api";
import { useArkClient } from "@/lib/ark/useArkClient";
import { useQuery } from "@tanstack/react-query";
import { getTokenMarketdata } from "@/lib/ark/getTokenMarketdata";
import { useTokenPrice } from "@/hooks/market/useTokenPrice";
import type { Token } from "@/types/ark";
import { useFulfillListing, useConfig } from '@ark-project/react'

export enum BuyStep {
  Checkout,
  Approving,
  Complete,
  Unavailable,
  SelectPayment,
}

interface ChildrenProps {
  loading: boolean;
  listing?: RouterOutputs["erc721MarketEvents"]["all"]["items"][number];
  averageUnitPrice: number;
  totalPrice: number;
  totalIncludingFees: number;
  buyStep: BuyStep;
  transactionError?: Error | null;
  hasEnoughCurrency: boolean;
  missingAmount: number;
  gasCost: bigint;
  //feeUsd: string;
  totalUsd: number;
  usdPrice: number;
  balance?: bigint;
  address?: string;
  quantity: number;
  isOwner: boolean;
  setBuyStep: React.Dispatch<React.SetStateAction<BuyStep>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  buyToken: () => Promise<void>;
}

interface Props {
  open: boolean;
  token:
  Token;
  tokenId?: string;
  defaultQuantity?: number;
  orderId?: number;
  normalizeRoyalties?: boolean;
  children: (props: ChildrenProps) => ReactNode;
  usePermit?: boolean;
}

export const BuyModalRender: FC<Props> = ({
  open,
  token,
  orderId,
  defaultQuantity,
  children,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalIncludingFees, setTotalIncludingFees] = useState(0);
  const [gasCost, setGasCost] = useState(0n);
  const [averageUnitPrice, setAverageUnitPrice] = useState(0);
  const [buyStep, setBuyStep] = useState<BuyStep>(BuyStep.Checkout);
  const [transactionError, setTransactionError] = useState<Error | null>();
  const [hasEnoughCurrency, setHasEnoughCurrency] = useState(true);
  const [missingAmount, setMissingAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const lordsPrice = { usdPrice: 0.11 };
  const { balances } = useWalletsProviderContext();
  const { data: l2LordsBalance } = useL2LordsBalance();
  const { fullfillListing, status } = useFulfillListing();
  const { config } = useConfig();
  console.log(config)

  /*  const blockExplorerBaseUrl =
    wagmiChain?.blockExplorers?.default?.url || "https://etherscan.io";
  const blockExplorerBaseName =
    wagmiChain?.blockExplorers?.default?.name || "Etherscan";*/

  const { address } = useAccount();

  /*const collection = collections?.[0] ? collections[0] : undefined;
  const is1155 = token?.token?.kind === "erc1155";*/
  const isOwner = token.owner.toLowerCase() === address?.toLowerCase();

  const { marketplace: arkClient } = useArkClient();
  const { contract_address: contractAddress, token_id: tokenId } = token;
  const { data: listing } = useQuery({
    queryKey: ["erc721Listings", contractAddress, tokenId],
    queryFn: async () => {
      return await getTokenMarketdata({ client: arkClient, contractAddress, tokenId: parseInt(tokenId) })
    },
    refetchInterval: 5000,
  });
  const price = useTokenPrice(listing?.data?.listing?.start_amount, listing?.data?.listing?.currency_address);
  console.log(listing?.data, status)


  const usdPrice = price * lordsPrice.usdPrice;
  //const usdPriceRaw = paymentCurrency?.usdPriceRaw || 0n;*/
  const totalUsd = totalIncludingFees * lordsPrice.usdPrice;

  // const { data: transactionData } = useTransactionReceipt({
  //   hash: data?.transaction_hash,
  //   watch: true,
  // });
  // useEffect(() => {
  //   if (data?.transaction_hash) {
  //     //@ts-expect-error Wrong starknet types
  //     if (transactionData?.execution_status == "SUCCEEDED") {
  //       setBuyStep(BuyStep.Complete);
  //     }
  //   }
  // }, [data, transactionData, transactionError]);
  // useEffect(() => {
  //   if (writeError) {
  //     setBuyStep(BuyStep.Checkout);
  //     setTransactionError(writeError);
  //   }
  // }, [writeError]);
  //
  const buyToken = useCallback(async () => {
    setBuyStep(BuyStep.Approving);
    await fullfillListing({
      starknetAccount: address,
      tokenAddress: contractAddress,
      tokenId,
      startAmount: listing?.data?.listing.start_amount,
      currencyAddress: "",
      brokerId: "",
    });
  }, [address, listing, contractAddress, tokenId, fullfillListing]);
  //
  // useEffect(() => {
  //   if ((orderId && !listing) ?? isOwner) {
  //     setBuyStep(BuyStep.Unavailable);
  //   } else {
  //     setBuyStep(BuyStep.Checkout);
  //   }
  // }, [isOwner, listing, orderId, token]);
  //
  // useEffect(() => {
  //   if (quantity === -1) return;
  //   if ((orderId && !listing) ?? isOwner) {
  //     setBuyStep(BuyStep.Unavailable);
  //     setTotalPrice(0);
  //     setTotalIncludingFees(0);
  //     setAverageUnitPrice(0);
  //     return;
  //   }
  //
  //   let total = 0;
  //   const gasCost = 0n;
  //
  //   if (orderId) {
  //     total = parseInt(listing.price ?? "0") * quantity;
  //   } else if (listing.price) {
  //     total = parseInt(listing.price);
  //   }
  //
  //   if (total > 0) {
  //     setTotalPrice(total);
  //     setTotalIncludingFees(total);
  //     setGasCost(gasCost);
  //     setAverageUnitPrice(total / quantity);
  //   } else {
  //     setTotalIncludingFees(0);
  //     setTotalPrice(0);
  //     setAverageUnitPrice(0);
  //   }
  // }, [
  //   listing,
  //   orderId,
  //   //usdPrice,
  //   quantity,
  //   token,
  //   isOwner,
  // ]);
  //
  // useEffect(() => {
  //   if (
  //     // !lords or lords  balance < item total + gas
  //     parseInt(formatUnits(l2LordsBalance?.value ?? 0n, 18)) < totalIncludingFees
  //   ) {
  //     const missingAmountToBuyAsset =
  //       totalIncludingFees - parseInt(formatUnits(l2LordsBalance?.value ?? 0n, 18));
  //     setMissingAmount(missingAmountToBuyAsset);
  //     setHasEnoughCurrency(false);
  //   } else {
  //     setHasEnoughCurrency(true);
  //   }
  // }, [totalIncludingFees, gasCost, l2LordsBalance?.value]);
  //
  // useEffect(() => {
  //   if (!open) {
  //     setBuyStep(BuyStep.Checkout);
  //     setTransactionError(null);
  //     setQuantity(1);
  //   } else {
  //     setQuantity(defaultQuantity ?? 1);
  //   }
  // }, [defaultQuantity, open]);
  //
  // /*useEffect(() => {
  //   if (quantityRemaining > 0 && quantity > quantityRemaining) {
  //     setQuantity(quantityRemaining);
  //   }
  // }, [quantityRemaining, quantity]);*/

  return (
    <>
      {children({
        loading: !listing || !token,
        listing,
        totalPrice,
        totalIncludingFees,
        averageUnitPrice,
        gasCost,
        buyStep,
        transactionError,
        hasEnoughCurrency,
        missingAmount,
        //feeUsd,
        totalUsd,
        usdPrice,
        address: address,
        quantity,
        isOwner,
        setQuantity,
        setBuyStep,
        buyToken,
      })}
    </>
  );
};
