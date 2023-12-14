import type { FC } from "react";
import React from "react";
import Image from "next/image";
import Starknet from "@/icons/starknet.svg";
import { formatBigInt } from "@/utils/utils";

import { Tooltip, TooltipProvider } from "@realms-world/ui";

interface Props {
  img?: string;
  name?: string;
  collection: string;
  price?: number;
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

  return (
    <div>
      <div className="justify-space-between flex items-center">
        {/* <span className="mb-2 block text-lg uppercase">
          {name ? "Item" : "Collection"}
        </span> */}
        {priceSubtitle && (
          <span className="mb-2 block text-lg">{priceSubtitle}</span>
        )}
      </div>
      <div className="flex  justify-between">
        <div className="my-3 flex items-center gap-2">
          {img && (
            <Image
              src={img}
              alt={name ?? "Lords Token"}
              width={100}
              height={100}
              className="shrink-0 overflow-hidden object-cover"
            />
          )}

          <div className="grid p-2">
            <div className="mr-2 flex gap-2 overflow-hidden">
              <div className="mb-3 flex font-sans text-xl">
                {name ? name : collection}
              </div>

              {expires && quantity && quantity > 1 ? (
                <div className="mr-auto rounded p-1 hover:bg-medium-dark-green/40">
                  <span className="text-xs">{quantity} items</span>
                </div>
              ) : null}
            </div>

            {/* {name && (
              <div className="my-1 flex">
                <span> {collection}</span>
                <hr />
                <Starknet className="mr-2 h-6" />
              </div>
            )} */}

            {expires && <span className="text-xs">Expires {expires}</span>}

            {!expires && quantity && quantity > 1 ? (
              <div className="mr-auto rounded bg-medium-dark-green/40 p-1">
                <span className="text-xs">
                  {quantity} {quantity > 1 ? "items" : "item"}
                </span>
              </div>
            ) : null}
            {!expires && !quantity && royaltiesBps ? (
              <span className="flex gap-1 text-xs uppercase">
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

        {/* <div className="grid items-start justify-end gap-y-2">
          {price ? (
            formatBN(price, 4, 18)
          ) : (
            <span className={isUnavailable ? "subtle" : "base"}>--</span>
          )}
          {usdPrice ? (
            <span className="text-xs">{formatBN(usdPrice, 4, 18)}</span>
          ) : null}
          {warning && <span className="text-red">{warning}</span>}
        </div> */}
      </div>
    </div>
  );
};

export default ERC721MarketplaceItem;
