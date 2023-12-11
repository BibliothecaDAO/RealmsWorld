import Image from "next/image";
import Link from "next/link";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import type { RouterOutputs } from "@/utils/api";
import { findTokenName } from "@/utils/utils";

interface TokenCardProps {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  layout?: "grid" | "list";
}

const TokenAttributes = ({ token, attributeKeys }: any) => (
  <table className="min-w-full text-xs">
    <tbody>
      {attributeKeys.map((key: any) => {
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

export const L2ERC721Card = ({ token, layout = "grid" }: TokenCardProps) => {
  const isGrid = layout === "grid";
  const imageSize = isGrid ? 800 : 80;
  const tokenOwner = token.transfers[0]?.toAddress ?? token.minter;
  const starkName = useStarkDisplayName(tokenOwner || "");

  const cardClassName = isGrid
    ? "bg-dark-green duration-300 transform border border-2 hover:border-white"
    : "duration-300 transform bg-dark-green flex w-full border-2  hover:border-white";

  const imageAlt = token.name || `beasts-${token.token_id}`;

  return (
    <div className={cardClassName}>
      <Link
        className={isGrid ? "" : "flex w-full"}
        href={`/collection/${findTokenName(token.contract_address ?? "")}/${
          token.token_id
        }`}
      >
        <div className={` ${!isGrid && "p-2"} relative`}>
          {token.image && (
            <Image
              src={token.image}
              alt={imageAlt}
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

        <TokenDetails token={token} isGrid={isGrid} starkName={starkName} />
      </Link>
    </div>
  );
};

const TokenDetails = ({ token, isGrid, starkName }: any) =>
  isGrid ? (
    <GridDetails token={token} starkName={starkName} isGrid />
  ) : (
    <ListDetails token={token} starkName={starkName} />
  );

const GridDetails = ({ token, starkName }: any) => (
  <div className="w-full p-3">
    <div className="flex justify-between border-b pb-2">
      <span className="">{decodeURIComponent(token.name || "")}</span>
    </div>

    <TokenAttributes
      token={token}
      attributeKeys={["type", "tier", "level", "health"]}
    />
    <Price />
    {/* <ViewButton token={token} isGrid /> */}
    <div className="mt-3 text-xs opacity-70">{starkName}</div>
  </div>
);

const Price = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h6 className="uppercase">Price</h6>
        <div>100</div>
      </div>
      <div>
        <h6 className="uppercase">Last price</h6>
        <div>100</div>
      </div>
    </div>
  );
};

const ListDetails = ({ token, starkName }: any) => {
  return (
    <div className="px-6 py-3">
      <div className="flex justify-between border-b pb-2">
        <span className="">{decodeURIComponent(token.name || "")}</span>
      </div>
      <div className="mt-3 text-xs opacity-70">{starkName}</div>
    </div>
  );
};
