import type { ContractDetails } from "@/types";
import Image from "next/image";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import LordsIcon from "@/icons/lords.svg";
import { api } from "@/trpc/server";
import { getGamesByContract } from "@/utils/getters";

import type { Collections, Game } from "@realms-world/constants";
import {
  CollectionDisplayName,
  games,
  getCollectionAddresses,
} from "@realms-world/constants";
import { Button } from "@realms-world/ui";

export default async function L2CollectionSummary({
  collectionId,
}: {
  collectionId: string;
}) {
  const tokenAddresses = getCollectionAddresses(collectionId);
  console.log(tokenAddresses[SUPPORTED_L2_CHAIN_ID]!);
  const erc721Collection = await api.erc721Collections.byId({
    id: tokenAddresses[SUPPORTED_L2_CHAIN_ID]!,
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
    /* {
      value: collection.floorSale?.["1day"],
      title: "Top Offer",
    },
    {
      value:
        collection.floorAsk?.price?.amount?.raw &&
        formatEther(BigInt(collection?.floorAsk?.price?.amount?.raw)),
      title: "Floor",
    },*/
    //{ value: collection.onSaleCount, title: "Listed" },
    {
      value: erc721Collection?.[0]?.volume,
      title: "Total Volume",
      icon: <LordsIcon className="w-5 fill-current" />,
    },
    //{ value: collection.tokenCount, title: "Count" },
  ];
  const marketplaceId = erc721Collection?.[0]?.marketplaceId?.toString();
  const compatibleGames = marketplaceId ? getGamesByContract(
    games,
   marketplaceId
  ) : [];

  return (
    <div className="px-4 sm:mt-10 sm:flex">
      <div className="flex-none self-center sm:pr-10">
        <Image
          src={`/collections/${collectionId}.svg`}
          alt={collectionId}
          width={150}
          height={150}
          className="mx-auto rounded-full border-2"
        />
      </div>

      <div>
        <h1>{CollectionDisplayName[collectionId as Collections]}</h1>
        <ContractDetailsList contract_details={contract_details} />

        {compatibleGames.length > 0 && (
          <CompatibleGames games={compatibleGames} />
        )}

        <div className="flex flex-wrap justify-start lg:space-x-2">
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
    <div className="px-1 py-2">
      <div className="text-sm lg:text-xl">
        {" "}
        <span className="flex space-x-3">
          {value
            ? Number(value).toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 2,
              })
            : null}{" "}
          <span className="ml-2 self-center">{icon && icon}</span>
        </span>
      </div>
      <div className="mb-1 mt-1 font-sans-serif text-xs">{title}</div>
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
            <span className="opacity-50 ">{detail.title}</span> {detail.value}
          </div>
        );
      })}
    </div>
  );
};

export const CompatibleGames = ({ games }: { games: Game[] }) => {
  return (
    <div className="mb-4 flex flex-wrap sm:space-x-2">
      {games.map((game, index) => {
        return (
          <Button key={index} href={`/games/${game.id}`} className="text-xs">
            {game.name}
          </Button>
        );
      })}
    </div>
  );
};
