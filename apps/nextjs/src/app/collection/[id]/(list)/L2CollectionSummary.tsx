import Image from "next/image";
import Link from "next/link";
import { erc721Tokens, games } from "@/constants";
import Discord from "@/icons/discord.svg";
import { getCollections } from "@/lib/reservoir/getCollections";
import { api } from "@/trpc/server";
import { getGamesByContract } from "@/utils/getters";
import { getTokenContractAddresses } from "@/utils/utils";
import { ExternalLink, Globe, Twitter } from "lucide-react";
import { formatEther } from "viem";

export default async function L2CollectionSummary({
  collectionId,
}: {
  collectionId: keyof typeof erc721Tokens;
}) {
  const tokenAddresses = getTokenContractAddresses(collectionId);
  const erc721Collection = await api.erc721Collections.byId({
    id: 1,
  });
  console.log(erc721Collection);
  const contract_details = [
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
    },
    //{ value: collection.tokenCount, title: "Count" },
  ];
  //const comptatible_games = getGamesByContract(games, collection.id);

  return (
    <div className="sm:mt-10 sm:flex">
      <div className="flex-none self-center sm:pr-10">
        <Image
          src={`/collections/${collectionId}.svg`}
          alt={collectionId}
          width={100}
          height={100}
          className="mx-auto rounded-full border"
        />

        <div className="mx-auto flex justify-center space-x-2">
          {/*links.map((social, index) => {
            if (social.value)
              return (
                <Link key={index} href={`${social.value}`}>
                  {social.icon}
                </Link>
              );
          })*/}
        </div>
      </div>

      <div>
        <div className="mb-1 flex flex-wrap space-x-2 text-xs">
          {contract_details.map((detail, index) => {
            return (
              <div key={index} className="uppercase">
                <span className="opacity-50 ">{detail.title}</span>{" "}
                {detail.value}
              </div>
            );
          })}
        </div>
        <h1>{erc721Tokens[collectionId].name}</h1>
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
                className="border-black bg-black/40 px-4 py-2  lg:px-5"
              >
                <div className="mb-1 font-sans-serif text-xs text-white/40">
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
