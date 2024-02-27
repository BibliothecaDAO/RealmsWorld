import type { Collection } from "@reservoir0x/reservoir-kit-ui";
import Image from "next/image";
import Link from "next/link";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import Discord from "@/icons/discord.svg";
import { getCollections } from "@/lib/reservoir/getCollections";
import { ExternalLink, Globe, X } from "lucide-react";
import { formatEther } from "viem";

import type { Collections } from "@realms-world/constants";
import { getCollectionAddresses } from "@realms-world/constants";

import L2CollectionSummary from "./L2CollectionSummary";

export default async function CollectionSummary({
  collectionId,
}: {
  collectionId: string;
}) {
  const tokenAddresses = getCollectionAddresses(collectionId);
  if (!tokenAddresses) {
    return <div>Collection Not Found</div>;
  }

  if (tokenAddresses[SUPPORTED_L2_CHAIN_ID]) {
    return <L2CollectionSummary collectionId={collectionId as Collections} />;
  } else if (tokenAddresses[SUPPORTED_L1_CHAIN_ID]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { collections }: { collections: Collection[] } = await getCollections(
      [{ contract: tokenAddresses[SUPPORTED_L1_CHAIN_ID]! }],
    );

    const collection = collections?.[0];

    if (!collection) {
      return <div>Collection Not Found</div>;
    }

    const links = [
      {
        icon: <ExternalLink />,
        value: `https://etherscan.io/address/${collection.id}`,
      },
      {
        icon: <Discord className="h-[28px] w-[28px] fill-white" />,
        value: collection.discordUrl,
      },
      {
        icon: <X />,
        value: "https://twitter.com/" + collection.twitterUsername,
      },
      { icon: <Globe />, value: collection.externalUrl },
    ];

    const statistics = [
      {
        value: collection.floorSale?.["1day"],
        title: "Top Offer",
      },
      {
        value:
          collection.floorAsk?.price?.amount?.raw &&
          formatEther(BigInt(collection?.floorAsk?.price?.amount?.raw)),
        title: "Floor",
      },
      { value: collection.onSaleCount, title: "Listed" },
      {
        value: collection.volume?.allTime?.toFixed(2),
        title: "Total Volume",
      },
      { value: collection.tokenCount, title: "Count" },
    ];

    const contract_details = [
      {
        title: "Type",
        value: collection.contractKind,
      },
      {
        title: "Chain",
        value: "Ethereum",
      },
    ];

    /*const comptatible_games = collection.id
      ? getGamesByContract(games, collection.id)
      : null;*/

    return (
      <div className=" pt-10 sm:flex">
        <div className="flex-none self-center sm:pr-10">
          {collection.image && (
            <Image
              src={collection.image}
              alt={collection.name ?? "Collection Image"}
              width={200}
              height={200}
              className="mx-auto border"
            />
          )}
          <div className="mx-auto my-4 flex justify-center space-x-2">
            {links.map((social, index) => {
              if (social.value)
                return (
                  <Link key={index} href={`${social.value}`}>
                    {social.icon}
                  </Link>
                );
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap space-x-2 text-xs">
            {contract_details.map((detail, index) => {
              return (
                <div key={index} className="uppercase">
                  <span className="opacity-50 ">{detail.title}</span>{" "}
                  {detail.value}
                </div>
              );
            })}
          </div>
          <h1>{collection.name}</h1>
          {/* <div className="flex flex-wrap mb-4 sm:space-x-2">
          {comptatible_games.map((game: any, index: any) => {
            return (
              <Button
                key={index}
                href={`/games/${game.id}`}
                className="text-xs font-sans-serif"
              >
                {game.name}
              </Button>
            );
          })}
        </div> */}
          <div className="flex flex-wrap justify-start lg:space-x-2">
            {statistics.map((statistic, index) => {
              return (
                <div key={index} className=" px-4 py-2  lg:px-5">
                  <div className="mb-1 text-xs text-white/40">
                    {statistic.title}
                  </div>
                  <div className="text-sm lg:text-xl">{statistic.value}</div>
                </div>
              );
            })}
          </div>

          {/* <p
              dangerouslySetInnerHTML={{ __html: collection.description }}
              className="hidden sm:block"
            /> */}
        </div>
      </div>
    );
  }
}
