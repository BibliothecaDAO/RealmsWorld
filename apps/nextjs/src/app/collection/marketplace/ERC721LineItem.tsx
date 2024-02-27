import type { FC } from "react";
import React from "react";
import { getTokenName } from "@/utils/utils";

import type { RouterOutputs } from "@realms-world/api";
import {
  CollectionDisplayName,
  getCollectionFromAddress,
} from "@realms-world/constants";

import ERC721MarketplaceItem from "./ERC721MarketplaceItem";

interface ERC721LineItemProps {
  tokenDetails?:
    | RouterOutputs["erc721Tokens"]["byId"]
    | RouterOutputs["erc721Tokens"]["all"]["items"][number];
  usdPrice?: number;
  isUnavailable?: boolean;
  warning?: string;
  price: number | string | null;
  priceSubtitle?: string;
  expires?: string;
  className?: string;
  showRoyalties?: boolean;
  quantity?: number;
}

const ERC721LineItem: FC<ERC721LineItemProps> = ({
  tokenDetails,
  usdPrice,
  isUnavailable,
  price,
  priceSubtitle,
  warning,
  expires,
  //showRoyalties,
  quantity,
}) => {
  if (!tokenDetails) {
    return null;
  }

  return (
    <ERC721MarketplaceItem
      img={tokenDetails?.image ?? ""}
      name={getTokenName(tokenDetails)}
      price={price}
      usdPrice={usdPrice}
      expires={expires}
      warning={warning}
      collection={
        tokenDetails.contract_address
          ? CollectionDisplayName[
              getCollectionFromAddress(tokenDetails.contract_address)!
            ]
          : ""
      }
      isUnavailable={isUnavailable}
      priceSubtitle={priceSubtitle}
      royaltiesBps={
        /*showRoyalties && collection?.royalties ? collection.royalties.bps :*/ 500
      }
      quantity={quantity}
    />
  );
};

export default ERC721LineItem;
