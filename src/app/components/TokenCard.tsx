"use client";

import { TokenMarketData } from "@/types";
// import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { formatEther } from "ethers/lib/utils.js";
import Link from "next/link";
import { BuyButton } from "./BuyModal";

interface TokenCardProps {
  token: TokenMarketData;
}

export const TokenCard = (props: TokenCardProps) => {
  const { token } = props;
  return (
    <div className="border rounded border-white/10">
      <img
        src={token.token.image} // Use the path to your image
        alt="An example image" // Provide a descriptive alt text
        className="mx-auto"
      />
      <div className="px-3 pb-4">
        <h6>#{token.token.tokenId}</h6>
        <h5>{token.token.name}</h5>

        <h4>{token.market.floorAsk.price ? formatEther(token.market.floorAsk.price.amount.raw): ''}</h4>
        <h6>${token.market.floorAsk.price ? token.market.floorAsk.price.amount.usd : ''}</h6>
        <Link
          href={`/collection/${token.token.contract}/${token.token.tokenId}`}
        >
          details
        </Link>
        <BuyButton address={token.token.contract} id={token.token.tokenId} />
      </div>
    </div>
  );
};
