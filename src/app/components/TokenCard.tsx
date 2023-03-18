"use client";

import { TokenMarketData } from "@/types";
// import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { formatEther } from "ethers/lib/utils.js";
import Link from "next/link";
import { BuyButton } from "./BuyModal";
import Image from "next/image";

interface TokenCardProps {
  token: TokenMarketData;
}

export const TokenCard = (props: TokenCardProps) => {
  const { token } = props;
  return (
    <div className="border rounded-xl border-white/10">
      <Image
        src={token.token.image} // Use the path to your image
        alt="An example image" // Provide a descriptive alt text
        className="mx-auto rounded-t-xl"
        width={800} // Set the original width of the image
        height={800} // Set the original height of the image'fill')
      />
      <div className="px-3 pt-4 pb-4">
        <div className="text-sm">#{token.token.tokenId}</div>
        <h6>{token.token.name}</h6>

        <h5>
          {token.market.floorAsk.price
            ? formatEther(token.market.floorAsk.price.amount.raw)
            : ""}{" "}
          ETH
        </h5>
        {/* <h6>${token.market.floorAsk.price ? token.market.floorAsk.price.amount.usd : ''}</h6> */}
        <div className="flex justify-between">
          <Link
            href={`/collection/${token.token.contract}/${token.token.tokenId}`}
          >
            More
          </Link>
          <BuyButton address={token.token.contract} id={token.token.tokenId} />
        </div>
      </div>
    </div>
  );
};
