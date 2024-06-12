import type { paths } from "@reservoir0x/reservoir-sdk";
import Image from "next/image";
import Link from "next/link";
import { AnimatedMap } from "@/app/_components/AnimatedMap";
import { formatEther } from "viem";

import { Button } from "@realms-world/ui";
import { cn } from "@realms-world/utils";

import { BuyButton } from "../../reservoir/BuyModal";

//import { BuyButton } from "./BuyModal";

interface L1ERC721CardProps {
  token:
    | NonNullable<
        paths["/tokens/v7"]["get"]["responses"]["200"]["schema"]["tokens"]
      >[0]
    | NonNullable<
        paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"]["tokens"]
      >[0];
  collectionName: string;
  layout?: "grid" | "list";
  selectable?: boolean;
  isSelected?: boolean;
}

export const L1ERC721Card = ({
  token,
  layout,
  collectionName,
  isSelected,
  selectable,
}: L1ERC721CardProps) => {
  const isGrid = layout == "grid";

  /* const grid =
    "bg-background duration-300 transform border hover:-translate-y-1";

  const list =
    "bg-background duration-300 transform border-t hover:-translate-y-1 flex w-full";
*/
  const imageSize = isGrid ? 800 : 60;

  const isMarket = "market" in token;

  return (
    <div
      className={cn(
        "group flex transform border bg-background duration-300 hover:border-bright-yellow",
        isGrid ? "w-full flex-col" : "justify-between",
        isSelected &&
          "border-2 border-accent-foreground hover:border-accent-foreground/50",
      )}
    >
      <div>
        <div className={` ${!isGrid && "p-1"} relative`}>
          <div className="absolute z-0 h-full w-full from-black/50 transition-all duration-150 group-hover:bg-gradient-to-t"></div>

          {token.token?.image ? (
            <Image
              src={token.token.image}
              alt={token.token.name ?? ""}
              className={`${isGrid ? "mx-auto" : ""}`}
              width={imageSize}
              height={imageSize}
            />
          ) : (
            <AnimatedMap />
          )}
          {isGrid ? (
            <div className={`w-full px-3 pb-2 pt-4`}>
              <div className="flex w-full justify-between text-sm">
                <span className="font-semibold">#{token.token?.tokenId} </span>
                {isMarket && token.market?.floorAsk?.source?.icon && (
                  <Image
                    src={token.market.floorAsk.source.icon}
                    alt="An example image"
                    width={20}
                    height={20}
                    className=""
                  />
                )}
              </div>
              <h6>{token.token?.name}</h6>

              <div className="my-3 h-6 text-sm">
                {isMarket &&
                  token.market?.floorAsk?.price?.amount?.raw &&
                  formatEther(
                    BigInt(token.market.floorAsk.price.amount.raw ?? 0),
                  ).toLocaleLowerCase() + " ETH"}
              </div>

              <div className="flex justify-between space-x-2">
                <Button
                  asChild
                  variant={"ghost"}
                  size={"xs"}
                  className="z-20 w-full"
                >
                  <Link
                    href={`/collection/${collectionName}/${token.token?.tokenId}`}
                  >
                    view
                  </Link>
                </Button>
                {isMarket && token.token && token.market?.floorAsk?.id && (
                  <BuyButton
                    size="xs"
                    address={token.token.contract}
                    id={token.token.tokenId}
                  />
                )}
              </div>
              {selectable && (
                <div
                  className={cn(
                    "absolute right-2 top-2 h-5 w-5 flex-shrink-0 rounded-full shadow-lg",
                    isSelected
                      ? "border-[5px] border-primary bg-accent-foreground"
                      : "bg-muted-foreground",
                  )}
                />
              )}
            </div>
          ) : (
            <div className={`flex w-full justify-between px-3`}>
              <div className="flex w-full">
                <div className="self-center">
                  <div className="text-sm">#{token.token?.tokenId} </div>
                  <div className="self-center">{token.token?.name}</div>
                </div>

                <h6 className="ml-auto self-center">
                  {isMarket &&
                    formatEther(
                      BigInt(token.market?.floorAsk?.price?.amount?.raw ?? 0),
                    ).toLocaleLowerCase()}
                  ETH
                </h6>
                <div className="justify-between self-center px-3 text-sm">
                  {isMarket && token.market?.floorAsk?.source?.icon && (
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
                <Button asChild variant={"outline"} className="w-full">
                  <Link
                    href={`/collection/${collectionName}/${token.token?.tokenId}`}
                  >
                    view
                  </Link>
                </Button>
                {token.token && isMarket && (
                  <BuyButton
                    size="default"
                    address={token.token.contract}
                    id={token.token.tokenId}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
