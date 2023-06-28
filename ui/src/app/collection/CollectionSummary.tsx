import { Button } from "@/app/components/ui/button";
import { games } from "@/constants";
import { getGamesByContract } from "@/functions/getters";
import { formatEther } from "viem";
import { ExternalLink, Twitter, Globe } from "lucide-react";
import Image from "next/image";
import Discord from "@/icons/discord.svg";
import { getCollections } from "@/app/lib/reservoir/getCollections";
import Link from "next/link";

export default async function CollectionSummary({ address }: any) {
  const collectionData = await getCollections([{ contract: address }]);
  const collection = collectionData?.collections[0];

  const links = [
    {
      icon: <ExternalLink />,
      value: `https://etherscan.io/address/${collection.id}`,
    },
    {
      icon: <Discord className="w-[28px] h-[28px] fill-white" />,
      value: collection.discordUrl,
    },
    { icon: <Twitter />, value: collection.twitterUsername },
    { icon: <Globe />, value: collection.externalUrl },
  ];

  const statistics = [
    {

      value: collection?.floorSale["1day"],
      title: "Top Offer",
    },
    {

      value: formatEther(collection.floorAsk.price.amount.raw),
      title: "Floor",
    },
    { value: collection.onSaleCount, title: "Listed" },
    {

      value: collection.volume.allTime.toFixed(2),
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

  const comptatible_games = getGamesByContract(games, collection.id);

  return (
    <div className="-mt-16 sm:mt-0 sm:flex">
      <div className="self-center flex-none sm:pr-10">
        <Image
          src={collection.image}
          alt={collection.name}
          width={200}
          height={200}
          className="mx-auto border"
        />
        <div className="flex justify-center mx-auto my-4 space-x-2">
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
        <div className="flex flex-wrap mb-3 space-x-2 text-xs">
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
              <div
                key={index}
                className="px-4 py-2 lg:px-5 bg-black/40  border-black"
              >
                <div className="text-xs font-sans-serif mb-1 text-white/40">{statistic.title}</div>
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
