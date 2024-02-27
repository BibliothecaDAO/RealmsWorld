import type { FC } from "react";
import React from "react";
import Image from "next/image";
import Lords from "@/icons/lords.svg";

import { Tooltip, TooltipProvider } from "@realms-world/ui";
import { formatNumber } from "@realms-world/utils";

interface Props {
  img?: string;
  name?: string;
  collection: string;
  price?: number | string | null;
  usdPrice?: number;
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
      <div className="justify-space-between flex items-center border">
        {priceSubtitle && (
          <span className="mb-2 block text-lg">{priceSubtitle}</span>
        )}
      </div>
      <div className="flex  justify-between">
        <div className="my-3 flex  gap-2">
          {img && (
            <Image
              src={img}
              alt={name ?? "Lords Token"}
              width={100}
              height={100}
              className="shrink-0 overflow-hidden object-cover"
            />
          )}

          <div className="grid px-2">
            <div className="mr-2 flex gap-2 overflow-hidden">
              <div className="flex font-sans text-xl">
                {name ? name : collection}
              </div>

              {expires && quantity && quantity > 1 ? (
                <div className="mr-auto rounded p-1 hover:bg-medium-dark-green/40">
                  <span className="text-xs">{quantity} items</span>
                </div>
              ) : null}
            </div>
            {expires && <span className="text-xs">Expires {expires}</span>}

            {!expires && quantity && quantity > 1 ? (
              <div className="mr-auto rounded bg-medium-dark-green/40 p-1">
                <span className="text-xs">
                  {quantity} {quantity > 1 ? "items" : "item"}
                </span>
              </div>
            ) : null}
            <div className="grid items-start justify-between font-sans">
              {price ? (
                <div className="flex">
                  {formatNumber(
                    typeof price == "string" ? parseInt(price) : price,
                    4,
                  )}
                  <Lords className="ml-2 w-5 fill-current" />
                </div>
              ) : (
                <span className={isUnavailable ? "subtle" : "base"}>--</span>
              )}
              {usdPrice ? (
                <span className="text-xs text-bright-yellow/50">
                  ${formatNumber(usdPrice, 4)}
                </span>
              ) : null}
              {warning && <span className="text-red">{warning}</span>}
            </div>
            {!expires && !quantity && royaltiesBps ? (
              <span className="flex gap-1 text-xs font-semibold uppercase">
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
      </div>
    </div>
  );
};

export default ERC721MarketplaceItem;
