"use client";

import { TokenMarketData } from "@/types";
// import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { formatEther } from "ethers/lib/utils.js";
import Link from "next/link";
import { BuyButton } from "./BuyModal";
import Image from "next/image";
import { Button } from "./ui/button";

interface TokenCardProps {
  token: TokenMarketData;
}

export const TokenCard = (props: TokenCardProps) => {
  const { token } = props;

  console.log(token);
  return (
    <div className="duration-300 transform border-4 rounded-xl border-white/5 hover:-translate-y-1">
      <Image
        src={token.token.image} // Use the path to your image
        alt="An example image" // Provide a descriptive alt text
        className="mx-auto rounded-t-xl"
        width={800} // Set the original width of the image
        height={800} // Set the original height of the image'fill')
      />
      <div className="w-full px-3 pt-4 pb-4">
        <div className="flex justify-between w-full text-sm">
          <span className="font-semibold">#{token.token.tokenId} </span>

          <Image
            src={token.market.floorAsk.source.icon} // Use the path to your image
            alt="An example image" // Provide a descriptive alt text
            width={20} // Set the original width of the image
            height={20} // Set the original height of the image'fill')
            className=""
          />
        </div>
        <h5>{token.token.name}</h5>

        <h6 className="font-semibold">
          {token.market.floorAsk.price
            ? formatEther(token.market.floorAsk.price.amount.raw)
            : ""}{" "}
          ETH
        </h6>

        <div className="flex justify-between">
          <Button
            href={`/collection/${token.token.contract}/${token.token.tokenId}`}
            variant={"default"}
            className="w-full"
          >
            view
          </Button>
          <BuyButton address={token.token.contract} id={token.token.tokenId} />
        </div>
      </div>
    </div>
  );
};
