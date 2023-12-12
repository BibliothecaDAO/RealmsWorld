import type { FC } from "react";
import React from "react";
import Image from "next/image";
import Starknet from "@/icons/starknet.svg";
import { formatBigInt } from "@/utils/utils";

import { Tooltip, TooltipProvider } from "@realms-world/ui";
import { formatBN } from "@realms-world/utils";

interface Props {
  img?: string;
  name?: string;
  collection: string;
  price?: bigint;
  usdPrice?: number | string;
  expires?: string;
  warning?: string;
  isUnavailable?: boolean;
  priceSubtitle?: string;
  royaltiesBps?: number;
  quantity?: number;
}

const ERC721MarketplaceItem: FC<Props> = ({
  img,
  name,
  collection,
  expires,
  warning,
  usdPrice,
  price,
  isUnavailable,
  priceSubtitle,
  royaltiesBps,
  quantity,
}) => {
  const royaltyPercent = royaltiesBps ? royaltiesBps / 100 : royaltiesBps;
  console.log(typeof price);
  return (
    <div>
      <div className="justify-space-between flex items-center">
        <span className="mb-2 block text-lg">
          {name ? "Item" : "Collection"}
        </span>
        {priceSubtitle && (
          <span className="mb-2 block text-lg">{priceSubtitle}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {img && (
            <Image
              src={img}
              alt={name ?? "Lords Token"}
              width={80}
              height={80}
              className="shrink-0 overflow-hidden object-cover"
            />
          )}
          <div className="grid">
            <div className="mr-2 flex items-center gap-2 overflow-hidden">
              <h6 className="text-ellipsify">{name ? name : collection}</h6>
              {expires && quantity && quantity > 1 && !name ? (
                <div className="flex items-center">
                  <Starknet className="mr-2 h-6" />
                  <span className="text-xs">Starknet</span>
                </div>
              ) : null}
              {expires && quantity && quantity > 1 ? (
                <div className="mr-auto rounded p-1 hover:bg-medium-dark-green/40">
                  <span className="text-xs">{quantity} items</span>
                </div>
              ) : null}
            </div>
            {!name && !quantity && expires ? (
              <div className="items-center">
                <Starknet className="mr-2 h-6" />
                <span>Starknet</span>
              </div>
            ) : null}
            {name && (
              <div className="flex max-w-[280px]">
                <span className="text-ellipsify"> {collection}</span>
                <hr />
                <Starknet className="mr-2 h-6" />
                <span>Starknet</span>
              </div>
            )}
            {!!expires && <span className="text-xs">Expires {expires}</span>}
            {!expires && quantity && quantity > 1 ? (
              <div className="mr-auto rounded bg-medium-dark-green/40 p-1">
                <span className="text-xs">
                  {quantity} {quantity > 1 ? "items" : "item"}
                </span>
              </div>
            ) : null}
            {!expires && !quantity && royaltiesBps ? (
              <span className="flex gap-1">
                Creator Royalties: {royaltyPercent}%
                <TooltipProvider>
                  <Tooltip
                    side="right"
                    width={200}
                    content="A fee on every order that goes to the collection creator."
                  />
                </TooltipProvider>
              </span>
            ) : null}
          </div>
        </div>
        <div className="grid items-start justify-end gap-y-2">
          {price ? (
            formatBN(price, 4, 18)
          ) : (
            <span className={isUnavailable ? "subtle" : "base"}>--</span>
          )}
          {usdPrice ? (
            <span className="text-xs">
              {formatBigInt(usdPrice, 3)
                .toLocaleString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          ) : null}
          {warning && <span className="text-red">{warning}</span>}
        </div>
      </div>
    </div>
  );
};

export default ERC721MarketplaceItem;
