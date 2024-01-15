import type { FC } from "react";
import React from "react";
import { getTokenName } from "@/utils/utils";

import type { RouterOutputs } from "@realms-world/api";

import ERC721MarketplaceItem from "./ERC721MarketplaceItem";

interface ERC721LineItemProps {
  tokenDetails?: RouterOutputs["erc721Tokens"]["byId"] /*NonNullable<
    NonNullable<ReturnType<typeof useTokens>>["data"]
  >[0];*/;
  collection?: any /*Pick<
    NonNullable<ReturnType<typeof useCollections>["data"]>[0],
    "name" | "royalties" | "image"
  >;*/;
  usdPrice?: number;
  isUnavailable?: boolean;
  warning?: string;
  price: number;
  priceSubtitle?: string;
  expires?: string;
  className?: string;
  showRoyalties?: boolean;
  quantity?: number;
}

const ERC721LineItem: FC<ERC721LineItemProps> = ({
  tokenDetails,
  collection,
  usdPrice,
  isUnavailable,
  price,
  priceSubtitle,
  warning,
  expires,
  showRoyalties,
  quantity,
}) => {
  if (!tokenDetails) {
    return null;
  }

  return (
    <ERC721MarketplaceItem
      img={
        tokenDetails?.image ? tokenDetails.image : (collection?.image as string)
      }
      name={getTokenName(tokenDetails)}
      price={price}
      usdPrice={usdPrice}
      collection={tokenDetails?.collection?.name || collection?.name || ""}
      expires={expires}
      warning={warning}
      isUnavailable={isUnavailable}
      priceSubtitle={priceSubtitle}
      royaltiesBps={
        showRoyalties && collection?.royalties ? collection.royalties.bps : 500
      }
      quantity={quantity}
    />
  );
};

export default ERC721LineItem;
