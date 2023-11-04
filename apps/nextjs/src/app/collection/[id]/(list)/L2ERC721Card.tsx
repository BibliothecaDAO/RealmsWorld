import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import type { RouterOutputs } from "@/utils/api";
import { findTokenName, shortenHex } from "@/utils/utils";

// import { BuyModal } from "@reservoir0x/reservoir-kit-ui";

interface TokenCardProps {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  layout?: "grid" | "list";
}

export const L2ERC721Card = (props: TokenCardProps) => {
  const { token, layout } = props;

  const isGrid = layout == "grid";

  const grid =
    "bg-dark-green duration-300 transform border   hover:-translate-y-1";

  const list =
    "duration-300 transform border bg-dark-green  hover:-translate-y-1 flex w-full";

  const imageSize = isGrid ? 800 : 60;

  const starkName = useStarkDisplayName(token.owner);
  return (
    <div className={layout === "grid" ? grid : list}>
      <Link
        href={`/collection/${findTokenName(token.contract_address ?? "")}/${
          token.token_id
        }`}
      >
        {token.image && (
          <Image
            src={token.image || ""}
            alt={token.name || `beasts-${token.token_id}`}
            className={`${isGrid ? "mx-auto " : ""}`}
            width={imageSize}
            height={imageSize}
          />
        )}
      </Link>
      {isGrid ? (
        <div className={`w-full px-3 pb-2 pt-4`}>
          <div className="flex w-full justify-between text-sm">
            <span className="font-semibold">#{token.token_id} </span>
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
          <h6> {decodeURIComponent(token.name || "")}</h6>
          <h6>{starkName}</h6>
          {token.metadata?.attributes?.length && (
            <>
              <p>
                Type:{" "}
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "type",
                  )?.value
                }
              </p>
              <p>
                Tier:{" "}
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "tier",
                  )?.value
                }
              </p>
              <p>
                Level:{" "}
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "level",
                  )?.value
                }
              </p>
            </>
          )}

          <div className="my-3 h-6 text-sm">
            {/*token.market.floorAsk.price &&
              formatEther(
                BigInt(token.market.floorAsk.price.amount.raw)
              ).toLocaleLowerCase() + "ETH"*/}
          </div>

          <div className="flex justify-between space-x-2">
            <Button
              href={`/collection/${findTokenName(
                token.contract_address ?? "",
              )}/${token.token_id}`}
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
              <div className="text-sm">#{token.token_id} </div>
              <div className="self-center">
                {decodeURIComponent(token.name || "")}
              </div>
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
              href={`/collection/beasts/${token.token_id}`}
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
