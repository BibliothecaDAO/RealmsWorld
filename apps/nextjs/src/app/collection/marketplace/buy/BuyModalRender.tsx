import type { FC, ReactNode } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useLordsPrice } from "@/hooks/useLordsPrice";
import { api } from "@/trpc/react";
import { findLowestPriceActiveListing } from "@/utils/getters";
import {
  useAccount,
  useWaitForTransaction,
} from "@starknet-react/core";
import { formatUnits } from "viem";

import type { RouterInputs, RouterOutputs } from "@realms-world/api";
import { LORDS } from "@realms-world/constants";
import { useBuyToken } from "@/hooks/market/useBuyToken";

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
  addFundsLink: string;
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
    | RouterOutputs["erc721Tokens"]["byId"]
    | RouterOutputs["erc721Tokens"]["all"]["items"][number];
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
  const [quantity, setQuantity] = useState(1);
  const { lordsPrice } = useLordsPrice();
  const { balances } = useWalletsProviderContext();

  /*  const blockExplorerBaseUrl =
    wagmiChain?.blockExplorers?.default?.url || "https://etherscan.io";
  const blockExplorerBaseName =
    wagmiChain?.blockExplorers?.default?.name || "Etherscan";*/

  const { address } = useAccount();

  /*const collection = collections?.[0] ? collections[0] : undefined;
  const is1155 = token?.token?.kind === "erc1155";*/
  const isOwner = token?.owner?.toLowerCase() === address?.toLowerCase();

  const filters: RouterInputs["erc721MarketEvents"]["all"] = {
    limit: 20,
    token_key: token?.contract_address + ":" + token?.token_id,
    upper_inf: true,
  };

  const { data: listingsData } = api.erc721MarketEvents.all.useQuery(filters, {
    //enabled: open && !token?.listings?.[0],
  });

  const listing = useMemo(() => {
    if (token?.listings)
      return findLowestPriceActiveListing(token?.listings, token?.owner);
    else if (listingsData?.items.length)
      return findLowestPriceActiveListing(listingsData?.items, token?.owner);
  }, [token, listingsData]);

  const usdPrice = parseInt(listing?.price ?? "0") * lordsPrice;
  //const usdPriceRaw = paymentCurrency?.usdPriceRaw || 0n;*/
  const totalUsd = totalIncludingFees * lordsPrice;

  const lordsAddress = LORDS[SUPPORTED_L2_CHAIN_ID]?.address as `0x${string}`;

  const addFundsLink = `https://app.avnu.fi/en?tokenFrom=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7&tokenTo=${lordsAddress}&amount=${totalPrice}`;

  const {writeAsync, error: writeError, data} = useBuyToken({listingId: listing?.id, price: listing?.price})
  const { data: transactionData } = useWaitForTransaction({
    hash: data?.transaction_hash,
    watch: true,
  });
  useEffect(() => {
    if (data?.transaction_hash) {
      //@ts-expect-error Wrong starknet types
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
    setBuyStep(BuyStep.Approving);
    await writeAsync();
  }, [writeAsync]);

  useEffect(() => {
    if (!token ?? (orderId && !listing) ?? isOwner) {
      setBuyStep(BuyStep.Unavailable);
    } else {
      setBuyStep(BuyStep.Checkout);
    }
  }, [isOwner, listing, orderId, token]);

  useEffect(() => {
    if (quantity === -1) return;
    if (!token ?? (orderId && !listing) ?? isOwner) {
      setBuyStep(BuyStep.Unavailable);
      setTotalPrice(0);
      setTotalIncludingFees(0);
      setAverageUnitPrice(0);
      return;
    }

    let total = 0;
    const gasCost = 0n;

    if (orderId) {
      total = parseInt(listing?.price ?? "0") * quantity;
    } else if (listing?.price) {
      total = parseInt(listing?.price ?? 0);
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
      setQuantity(1);
    } else {
      setQuantity(defaultQuantity ?? 1);
    }
  }, [defaultQuantity, open]);

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
        totalPrice,
        totalIncludingFees,
        averageUnitPrice,
        gasCost,
        buyStep,
        transactionError,
        hasEnoughCurrency,
        addFundsLink,
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
