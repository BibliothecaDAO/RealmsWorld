import Image from "next/image";
import Link from "next/link";
import type { Beast } from "@/.graphclient";
import { Button } from "@/app/_components/ui/button";
import { TokenMarketData } from "@/types";
import { shortenHex } from "@/utils/utils";
// import { BuyModal } from "@reservoir0x/reservoir-kit-ui";
import { formatEther } from "viem";

interface TokenCardProps {
  token: Beast;
  layout?: "grid" | "list";
}

export const BeastCard = (props: TokenCardProps) => {
  const { token, layout } = props;

  const isGrid = layout == "grid";

  const grid =
    "duration-300 transform border  border-white/10 hover:-translate-y-1";

  const list =
    "duration-300 transform border  border-white/10 hover:-translate-y-1 flex w-full";

  const imageSize = isGrid ? 800 : 60;

  return (
    <div className={layout === "grid" ? grid : list}>
      <Link href={`/collection/beasts/${token.id}`}>
        <Image
          src={token.image || ""}
          alt={token.name || `beats-${token.id}`}
          className={`${isGrid ? "mx-auto " : ""}`}
          width={imageSize}
          height={imageSize}
        />
      </Link>
      {isGrid ? (
        <div className={`w-full px-3 pb-2 pt-4`}>
          <div className="flex w-full justify-between text-sm">
            <span className="font-semibold">#{token.id} </span>
            {/*token.market.floorAsk.source.icon && (
              <Image
                src={token.market.floorAsk.source.icon}
                alt="An example image"
                width={20}
                height={20}
                className=""
              />
            )*/}
          </div>
          <h6>{token.name}</h6>
          <h6>{shortenHex(token.owner, 8)}</h6>

          <div className="my-3 h-6 text-sm">
            {/*token.market.floorAsk.price &&
              formatEther(
                BigInt(token.market.floorAsk.price.amount.raw)
              ).toLocaleLowerCase() + "ETH"*/}
          </div>

          <div className="flex justify-between space-x-2">
            <Button
              href={`/collection/beasts/${token.id}`}
              variant={"ghost"}
              size={"xs"}
              className="w-full"
            >
              view
            </Button>
          </div>
        </div>
      ) : (
        <div className={`flex w-full justify-between px-3`}>
          <div className="flex w-full">
            <div className="self-center">
              <div className="text-sm">#{token.id} </div>
              <div className="self-center">{token.name}</div>
            </div>

            {/*<h6 className="self-center ml-auto">
              {token.market.floorAsk.price
                ? formatEther(
                    BigInt(token.market.floorAsk.price.amount.raw)
                  ).toLocaleLowerCase()
                : ""}{" "}
              ETH
            </h6>
            <div className="self-center justify-between px-3 text-sm">
              {token.market.floorAsk.source.icon && (
                <Image
                  src={token.market.floorAsk.source.icon}
                  alt="An example image"
                  width={20}
                  height={20}
                  className=""
                />
              )}
              </div>*/}
          </div>

          <div className="flex justify-between space-x-2 self-center">
            <Button
              href={`/collection/beasts/${token.id}`}
              variant={"outline"}
              className="w-full"
            >
              view
            </Button>
            {/*<BuyButton
              address={token.contract}
              id={token.id}
            />*/}
          </div>
        </div>
      )}
    </div>
  );
};
