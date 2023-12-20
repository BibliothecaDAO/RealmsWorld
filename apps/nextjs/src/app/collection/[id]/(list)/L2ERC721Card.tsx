import Image from "next/image";
import Link from "next/link";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import LordsIcon from "@/icons/lords.svg";
import { findTokenName } from "@/utils/utils";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

import { BuyModal } from "../../marketplace/buy/BuyModal";
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
      className={`transform border-2 bg-dark-green duration-300 hover:border-white ${
        isGrid ?? "flex w-full"
      }`}
    >
      <Link
        href={`/collection/${findTokenName(token.contract_address)}/${
          token.token_id
        }`}
        className={`${isGrid ? "" : "flex"}`}
      >
        <div className={` ${!isGrid && "p-1"} relative`}>
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
            <span className="absolute bottom-3 right-3 border bg-black px-3 py-1 text-xs">
              #{token.token_id}
            </span>
          )}
        </div>
      </Link>

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
  <table className="min-w-full text-xs">
    <tbody>
      {attributeKeys.map((key: string) => {
        const attribute = token.metadata?.attributes?.find(
          (trait: any) => trait.trait_type === key,
        );
        return attribute ? (
          <tr className="hover:bright-yellow hover:bg-theme-gray" key={key}>
            <td className="border px-2 py-1 uppercase">{key}:</td>
            <td className="border px-2 py-1">{attribute.value}</td>
          </tr>
        ) : null;
      })}
    </tbody>
  </table>
);

const GridDetails = ({
  token,
  address,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  address?: string;
}) => (
  <div className="w-full p-3">
    <div className="flex justify-between border-b pb-2">
      <span className="">{decodeURIComponent(token.name ?? "")}</span>
    </div>
    <TokenAttributes
      token={token}
      attributeKeys={["type", "tier", "level", "health"]}
    />
    <Price token={token} />
    <div className="mt-3 text-xs opacity-70">
      <Button size={"xs"} variant={"ghost"} href={`/user/${address}`}>
        {useStarkDisplayName(address)}
      </Button>
    </div>
    <CardAction token={token} />
  </div>
);

const Price = ({
  token,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
}) => {
  return (
    <div className="flex justify-between">
      {token?.price && (
        <div>
          <h6 className="uppercase">Price</h6>
          <div className="flex">
            {token?.price}
            <LordsIcon className="mx-auto ml-3 h-4 w-4 self-center fill-bright-yellow" />{" "}
          </div>
        </div>
      )}
      {/*TODO Add last price sold */}
      {/*token?.lastPrice && (
        <div>
          <h6 className="uppercase">Last price</h6>
          <div>100</div>
        </div>
      )*/}
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
    <div className="flex w-full space-x-6 self-center px-3">
      <div className="flex justify-between self-center">
        <span className="">{decodeURIComponent(token?.name ?? "")}</span>
      </div>
      <div className="mr-auto flex self-center">
        {token?.price}
        <LordsIcon className="mx-auto ml-3 h-6 w-6 fill-bright-yellow pb-1" />
      </div>
      <div className="fonts-sans ml-auto self-center text-xs opacity-70">
        <Button variant={"ghost"} href={`/user/${address}`}>
          {useStarkDisplayName(address)}
        </Button>
      </div>
    </div>
  );
};
