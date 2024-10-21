import type { ContractDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import LordsIcon from "@/icons/lords.svg";

import type { Collections, Game } from "@realms-world/constants";
import {
  CollectionDetails,
  getCollectionAddresses,
} from "@realms-world/constants";
import { Button } from "@realms-world/ui/components/ui/button";
import { ViewOnMarketplace } from "../../ViewOnMarketplace";
import { getCollections } from "@/lib/ark/getCollection";
import { marketPlaceClientBuilder } from "@/lib/ark/client";
import { reader } from "@/utils/keystatic";
import { formatEther } from "viem";
import Gamepad from "@/icons/gamepad.svg";

export default async function L2CollectionSummary({
  collectionId,
}: {
  collectionId: string;
}) {
  const collectionContent =
    await reader().collections.collections.read(collectionId);

  const collectionGames = await Promise.all(
    collectionContent.games.map(async (game, index) => {
      return (
        {
          ...(await reader().collections.games.read(game ?? "")),
          slug: collectionContent.games[index],
        } ?? ""
      );
    }),
  );
  const l2CollectionAddress =
    getCollectionAddresses(collectionId)?.[SUPPORTED_L2_CHAIN_ID];

  if (!l2CollectionAddress) {
    return "No Collection";
  }
  // in server components, we can directly get client with server builder
  const client = marketPlaceClientBuilder(fetch);
  const erc721Collection = await getCollections({
    client,
    collectionAddress: l2CollectionAddress,
  });
  const contract_details: ContractDetails[] = [
    {
      title: "Type",
      value: "ERC721",
    },
    {
      title: "Chain",
      value: "Starknet",
    },
  ];

  const statistics = [
    /*{
      value: erc721Collection.data.top_offer,
      title: "Top Offer",
    },*/
    {
      value:
        erc721Collection.data.floor &&
        formatEther(BigInt(erc721Collection.data.floor)),
      title: "Floor",
      icon: <LordsIcon className="w-5 fill-current" />,
    },
    //{ value: collection.onSaleCount, title: "Listed" },
    {
      value: erc721Collection.data.total_volume,
      title: "Total Volume",
      icon: <LordsIcon className="w-5 fill-current" />,
    },
    {
      value: erc721Collection.data.token_count,
      title: "Items",
    },
    { value: erc721Collection.data.owner_count, title: "Owner Count" },
  ];

  return (
    <div className="w-full px-4 sm:flex">
      <div className="flex-none self-center sm:pr-10">
        <Image
          src={`/collections/${collectionId}.svg`}
          alt={collectionId}
          width={150}
          height={150}
          className="mx-auto rounded-full border-2"
        />
      </div>

      <div className="flex flex-grow items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl">
            {CollectionDetails[collectionId as Collections].displayName}
          </h1>
          <ContractDetailsList contract_details={contract_details} />

          {collectionGames.length > 0 && (
            <CompatibleGames games={collectionGames} />
          )}
        </div>
        <div>
          <div className="mb-4 flex flex-wrap justify-start lg:space-x-2">
            {statistics.map((statistic, index) => {
              return (
                <StatisticsBox
                  key={index}
                  value={statistic.value}
                  title={statistic.title}
                  icon={statistic.icon}
                />
              );
            })}
          </div>
          <ViewOnMarketplace collection={l2CollectionAddress} />
        </div>
      </div>
    </div>
  );
}

export const DetailsBox = ({ description }: { description: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: description }}
      className="hidden sm:block"
    />
  );
};

export const StatisticsBox = ({
  title,
  value,
  icon,
}: {
  title: string;
  value?: string | null | undefined;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="border-r-2 pl-3 pr-6 last:border-r-0">
      <div className="text-sm lg:text-xl">
        <div className="mb-1 mt-1 font-sans-serif text-xs">{title}</div>
        <span className="flex space-x-3">
          {icon && <span className="mr-2 self-center">{icon}</span>}
          {value
            ? Number(value).toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 2,
              })
            : null}
        </span>
      </div>
    </div>
  );
};

export const ContractDetailsList = ({
  contract_details,
}: {
  contract_details: ContractDetails[];
}) => {
  return (
    <div className="mb-3 flex flex-wrap space-x-2 text-xs">
      {contract_details.map((detail, index) => {
        return (
          <div key={index} className="uppercase">
            <span className="opacity-50">{detail.title}</span> {detail.value}
          </div>
        );
      })}
    </div>
  );
};

export const CompatibleGames = ({ games }: { games: Game[] }) => {
  return (
    <div className="flex flex-wrap items-center sm:space-x-2">
      <Gamepad className="w-[29px]" /> :
      {games.map((game, index) => {
        return (
          <Button key={index} className="text-xs" variant={"outline"} asChild>
            <Link href={`/games/${game.slug}`}>{game.title}</Link>
          </Button>
        );
      })}
    </div>
  );
};
