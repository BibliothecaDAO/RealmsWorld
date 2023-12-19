import Image from "next/image";
import Link from "next/link";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import { findTokenName } from "@/utils/utils";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

import { BuyModal } from "../../marketplace/buy/BuyModal";

export const L2ERC721Card = ({
  token,
  layout = "grid",
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  layout?: "grid" | "list";
}) => {
  const isGrid = layout === "grid";
  const imageSize = isGrid ? 800 : 80;

  return (
    <div
      className={`transform border-2 bg-dark-green duration-300 hover:border-white ${
        isGrid ?? "flex w-full"
      }`}
    >
      <div className={` ${!isGrid && "p-2"} relative`}>
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

      <TokenDetails
        token={token}
        isGrid={isGrid}
        starkName={useStarkDisplayName(token.owner ?? token.minter ?? "")}
      />
    </div>
  );
};

const TokenDetails = ({
  token,
  isGrid,
  starkName,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  isGrid: boolean;
  starkName?: string;
}) =>
  isGrid ? (
    <GridDetails token={token} starkName={starkName} />
  ) : (
    <ListDetails token={token} starkName={starkName} />
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
  starkName,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  starkName?: string;
}) => (
  <div className="w-full p-3">
    <div className="flex justify-between border-b pb-2">
      <span className="">{decodeURIComponent(token.name ?? "")}</span>
    </div>
    <TokenAttributes
      token={token}
      attributeKeys={["type", "tier", "level", "health"]}
    />
    {token?.price && <Price token={token} />}
    <div className="mt-3 text-xs opacity-70">{starkName}</div>
    {token?.price && (
      <BuyModal
        trigger={
          <Button className="w-full" size={"lg"}>
            Buy Now
          </Button>
        }
        // tokenId={tokenId}
        token={token}
        collectionId={token.contract_address}
        orderId={0}
      />
    )}
  </div>
);

const Price = ({
  token,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
}) => {
  return (
    <div className="flex justify-between">
      <div>
        <h6 className="uppercase">Price</h6>
        <div>{token?.price}</div>
      </div>
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
  starkName,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  starkName?: string;
}) => {
  return (
    <div className="px-6 py-3">
      <div className="flex justify-between border-b pb-2">
        <span className="">{decodeURIComponent(token?.name ?? "")}</span>
      </div>
      <div className="mt-3 text-xs opacity-70">{starkName}</div>
    </div>
  );
};
