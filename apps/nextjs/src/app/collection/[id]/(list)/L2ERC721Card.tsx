import Image from "next/image";
import Link from "next/link";
import { useStarkDisplayName } from "@/hooks/useStarkName";
import type { RouterOutputs } from "@/utils/api";
import { findTokenName } from "@/utils/utils";

export const L2ERC721Card = ({
  token,
  layout = "grid",
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  layout?: "grid" | "list";
}) => {
  const isGrid = layout === "grid";
  const imageSize = isGrid ? 800 : 80;

export const L2ERC721Card = (props: TokenCardProps) => {
  const { token, layout } = props;

  const isGrid = layout == "grid";

  const grid =
    "bg-dark-green duration-300 transform border   hover:-translate-y-1";

  const list =
    "duration-300 transform border bg-dark-green  hover:-translate-y-1 flex w-full";

  const imageSize = isGrid ? 800 : 60;

  /* const { data, isLoading, error, refetch } = useContractRead({
    address: ethAddress,
    abi: compiledErc721.abi,
    functionName: 'tokenURI',
    args: [address],
    watch: false
  })

  if(!token.name) {

  }*/
  const tokenOwner = token.owner ?? token.minter;
  const starkName = useStarkDisplayName(tokenOwner ?? undefined);

  function renderAttribute(token: typeof props.token, traitType: string) {
    const attribute = token.metadata?.attributes.find(
      (trait) => trait.trait_type === traitType,
    );
    return attribute ? (
      <p className="capitalize">
        {traitType}: {attribute.value}
      </p>
    ) : null;
  }

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
          starkName={useStarkDisplayName(
            token.transfers[0]?.toAddress ?? token.minter ?? "",
          )}
        />
      </Link>
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
    <Price />
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
        <span className="">{decodeURIComponent(token.name ?? "")}</span>
      </div>
      <div className="mt-3 text-xs opacity-70">{starkName}</div>
    </div>
  );
};
