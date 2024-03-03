import type { TokenMarketData } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { formatEther } from "viem";

import { Button } from "@realms-world/ui";

import { BuyButton } from "../../reservoir/BuyModal";
//import { BuyButton } from "./BuyModal";

interface TokenCardProps {
  token: TokenMarketData;
  collectionName: string;
  layout?: "grid" | "list";
}

export const L1TokenCard = (props: TokenCardProps) => {
  const { token, layout, collectionName } = props;

  const isGrid = layout == "grid";

  const grid =
    "bg-dark-green duration-300 transform border hover:-translate-y-1";

  const list =
    "bg-dark-green duration-300 transform border-t hover:-translate-y-1 flex w-full";

  const imageSize = isGrid ? 800 : 60;

  return (
    <div className={layout === "grid" ? grid : list}>
      <Link href={`/collection/${collectionName}/${token.token.tokenId}`}>
        <Image
          src={token.token.image || ""}
          alt={token.token.name}
          className={`${isGrid ? "mx-auto " : ""}`}
          width={imageSize}
          height={imageSize}
        />
      </Link>
      {isGrid ? (
        <div className={`w-full px-3 pb-2 pt-4`}>
          <div className="flex w-full justify-between text-sm">
            <span className="font-semibold">#{token.token.tokenId} </span>
            {token.market.floorAsk.source?.icon && (
              <Image
                src={token.market.floorAsk.source.icon}
                alt="An example image"
                width={20}
                height={20}
                className=""
              />
            )}
          </div>
          <h6>{token.token.name}</h6>

          <div className="my-3 h-6 text-sm">
            {token.market.floorAsk.price &&
              formatEther(
                BigInt(token.market.floorAsk.price.amount.raw),
              ).toLocaleLowerCase() + " ETH"}
          </div>

          <div className="flex justify-between space-x-2">
            <Button
              href={`/collection/${collectionName}/${token.token.tokenId}`}
              variant={"ghost"}
              size={"xs"}
              className="w-full"
            >
              view
            </Button>
            {token.market.floorAsk.id && (
              <BuyButton
                size="xs"
                address={token.token.contract}
                id={token.token.tokenId}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={`flex w-full justify-between px-3`}>
          <div className="flex w-full">
            <div className="self-center">
              <div className="text-sm">#{token.token.tokenId} </div>
              <div className="self-center">{token.token.name}</div>
            </div>

            <h6 className="ml-auto self-center">
              {token.market.floorAsk.price
                ? formatEther(
                    BigInt(token.market.floorAsk.price.amount.raw),
                  ).toLocaleLowerCase()
                : ""}{" "}
              ETH
            </h6>
            <div className="justify-between self-center px-3 text-sm">
              {token.market.floorAsk.source.icon && (
                <Image
                  src={token.market.floorAsk.source.icon}
                  alt="An example image"
                  width={20}
                  height={20}
                  className=""
                />
              )}
            </div>
          </div>

          <div className="flex justify-between space-x-2 self-center">
            <Button
              href={`/collection/${collectionName ?? token.token.contract}/${
                token.token.tokenId
              }`}
              variant={"outline"}
              className="w-full"
            >
              view
            </Button>
            {
            <BuyButton
              size='default'
              address={token.token.contract}
              id={token.token.tokenId}
            />}
          </div>
        </div>
      )}
    </div>
  );
};
