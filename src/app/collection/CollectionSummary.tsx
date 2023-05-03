import { Button } from "@/app/components/ui/button";
import { games } from "@/constants";
import { getGamesByContract } from "@/functions/getters";
import { formatEther } from "ethers/lib/utils.js";
import { ExternalLink, Twitter, Globe, Link } from "lucide-react";
import Image from "next/image";
import Discord from "@/icons/discord.svg";
import { getCollections } from "../lib/getCollections";

export default async function CollectionSummary({ address }: any) {
  const collectionData = await getCollections([{ contract: address }]);

  //const attributesData = getData({ collection: params.address }, "attributes");

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
      icon: <Twitter />,
      value: collection?.floorSale["1day"],
      title: "Top Offer",
    },
    {
      icon: <Twitter />,
      value: formatEther(collection.floorAsk.price.amount.raw),
      title: "Floor",
    },
    { icon: <Globe />, value: collection.onSaleCount, title: "Listed" },
    {
      icon: <Globe />,
      value: collection.volume.allTime.toFixed(2),
      title: "Total Volume",
    },
    { icon: <Globe />, value: collection.tokenCount, title: "Count" },
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
          className="mx-auto border-4 rounded shadow-2xl border-white/10"
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
                {" "}
                <span className="opacity-50 ">{detail.title}</span>{" "}
                {detail.value}
              </div>
            );
          })}
        </div>
        <h1>{collection.name}</h1>
        <div className="flex flex-wrap mb-4 sm:space-x-2">
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
        </div>
        <div className="flex flex-wrap justify-between lg:space-x-2">
          {statistics.map((statistic, index) => {
            return (
              <div
                key={index}
                className="px-2 py-2 rounded lg:px-6 bg-black/40"
              >
                <div className="text-xs font-sans-serif">{statistic.title}</div>
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
