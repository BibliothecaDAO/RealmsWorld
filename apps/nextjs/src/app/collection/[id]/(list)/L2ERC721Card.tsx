import Image from "next/image";
import Link from "next/link";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import LordsIcon from "@/icons/lords.svg";
import { findLowestPriceActiveListing } from "@/utils/getters";

import type { RouterOutputs } from "@realms-world/api";
import { getCollectionFromAddress } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

import { CardAction } from "./CardAction";

export const L2ERC721Card = ({
  token,
  layout = "grid",
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  layout?: "grid" | "list";
}) => {
  const isGrid = layout === "grid";
  const imageSize = isGrid ? 800 : 60;

  return (
    <div
      className={`group flex transform border-2 bg-dark-green duration-300 hover:border-bright-yellow ${
        isGrid ? "w-full flex-col" : "justify-between"
      }`}
    >
      <div>
        <Link
          href={`/collection/${token.contract_address && getCollectionFromAddress(token.contract_address)}/${
            token.token_id
          }`}
          className={`${isGrid ? "" : "flex"}`}
        >
          <div className={` ${!isGrid && "p-1"} relative`}>
            <div className="absolute z-0 h-full w-full from-black/50 transition-all duration-150 group-hover:bg-gradient-to-t"></div>
            {token.image && (
              <Image
                src={token.image}
                alt={token.name ?? `beasts-${token.token_id}`}
                className={isGrid ? "mx-auto" : ""}
                width={imageSize}
                height={imageSize}
              />
            )}
            {isGrid && (
              <span className="absolute bottom-1 right-1 bg-black px-1 py-1 text-xs">
                #{token.token_id}
              </span>
            )}

            <div className="absolute bottom-0 left-0 w-full px-3 opacity-0 transition-all duration-300 group-hover:bottom-4 group-hover:opacity-100">
              <TokenAttributes
                token={token}
                attributeKeys={["type", "tier", "level", "health"]}
              />
              <CardAction token={token} />
            </div>
          </div>
        </Link>
      </div>

      <TokenDetails
        token={token}
        isGrid={isGrid}
        address={token.owner ?? token.minter ?? ""}
      />
    </div>
  );
};

const TokenDetails = ({
  token,
  isGrid,
  address,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  isGrid: boolean;
  address?: string;
}) =>
  isGrid ? (
    <GridDetails token={token} address={address} />
  ) : (
    <ListDetails token={token} address={address} />
  );

const TokenAttributes = ({
  token,
  attributeKeys,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  attributeKeys: string[];
}) => (
  <table className="min-w-full bg-black font-sans text-xs">
    <tbody>
      {attributeKeys.map((key: string) => {
        const attribute = token.attributes?.find((trait) => trait.key === key);
        return attribute ? (
          <tr className="hover:bright-yellow hover:bg-theme-gray" key={key}>
            <td className="w-1/3 border px-2 py-1 uppercase">{key}</td>
            <td className="border px-2 py-1">{attribute.value}</td>
          </tr>
        ) : null;
      })}
    </tbody>
  </table>
);

const GridDetails = ({
  token,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  address?: string;
}) => (
  <div className=" flex h-full w-full flex-col justify-between p-3">
    <div className="flex justify-between pb-2">
      <span className="truncate">{decodeURIComponent(token.name ?? "")}</span>
    </div>

    <div className="flex justify-between  font-sans">
      <Price token={token} />
      {token.lastPrice && (
        <span className="flex text-bright-yellow/50">
          {token.lastPrice}
          <LordsIcon className="ml-2 h-4 w-4 self-center fill-current" />
        </span>
      )}
    </div>
  </div>
);

const Price = ({
  token,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number] & {
    listings: RouterOutputs["erc721MarketEvents"]["all"]["items"];
  };
}) => {
  const listing = findLowestPriceActiveListing(token.listings, token.owner);
  return (
    <div className="flex justify-between">
      {listing?.price && (
        <div>
          <div className="flex">
            {listing?.price}
            <LordsIcon className="mx-auto ml-2 h-4 w-4 self-center fill-bright-yellow" />{" "}
          </div>
        </div>
      )}
    </div>
  );
};

const ListDetails = ({
  token,
  address,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  address?: string;
}) => {
  return (
    <div className="flex w-full justify-between space-x-6 self-center px-3">
      <div className="mr-auto flex justify-between self-center">
        <span className="">{decodeURIComponent(token?.name ?? "")}</span>
      </div>
      <div className="mr-auto flex self-center font-sans">
        {token?.price}
        <LordsIcon className="mx-auto ml-3 h-6 w-6 fill-bright-yellow pb-1" />
      </div>
      <div className="fonts-sans ml-auto self-center text-xs">
        <Button variant={"ghost"} href={`/user/${address}`}>
          {useStarkDisplayName(address)}
        </Button>
      </div>
      <div className="absolute bottom-0 right-0 w-full  px-3 opacity-0 transition-all duration-300 group-hover:bottom-2 group-hover:opacity-100">
        <CardAction token={token} />
      </div>
    </div>
  );
};
