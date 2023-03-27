"use client";

import { Fragment } from "react";
import { Collection, Token } from "@/types";
import { TokenTable } from "../components/TokenTable";
import { Tab } from "@headlessui/react";
import { CollectionActivity } from "./CollectionActivity";
import Image from "next/image";
import { Attributes } from "../components/Attributes";
import { Globe, Twitter, X, Filter, Grid } from "lucide-react";
import Link from "next/link";
import { formatEther } from "ethers/lib/utils.js";
import { useQuery } from "@/composables/useQuery";
import { Button } from "../components/ui/button";
import { Switch } from "../components/Switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { games, sortDirection, sortOptions } from "@/constants";
import { getGamesByContract } from "@/functions/getters";
import { useUIContext } from "../providers/UIProvider";

interface Props {
  collection: Collection;
  tokens: Token[];
  attributes: any;
}

export const CollectionContent = ({
  collection,
  tokens,
  attributes,
}: Props) => {
  const { handleAttributeClick, getQueriesFromUrl } = useQuery();
  const { isFilterOpen, toggleFilter, toggleGrid } = useUIContext();

  const tabs = [
    {
      name: "Trade",
      content: (
        <div>
          <div className="flex justify-between w-full mb-3">
            <div className="flex ml-auto space-x-2">
              <Button
                className="self-center sm:hidden"
                size={"xs"}
                onClick={toggleFilter}
                variant={"default"}
              >
                <Filter className="w-3" />
              </Button>{" "}
              <Button
                onClick={toggleGrid}
                className="self-center"
                size={"xs"}
                variant={"default"}
              >
                <Grid className="self-center w-4" />
              </Button>{" "}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <Button size={"xs"} variant={"default"}>
                    Direction
                  </Button>{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortDirection.map((query, index) => {
                    return (
                      <DropdownMenuItem
                        key={index}
                        onClick={() =>
                          handleAttributeClick(query.key, query.value)
                        }
                      >
                        {query.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"xs"} variant={"default"}>
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((query, index) => {
                    return (
                      <DropdownMenuItem
                        key={index}
                        onClick={() =>
                          handleAttributeClick(query.key, query.value)
                        }
                      >
                        {query.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex w-full">
            <Attributes address={collection.id} attributes={attributes} />
            <div className="w-full">
              <div className="flex flex-wrap px-4 pr-8 mb-2 space-x-1">
                {getQueriesFromUrl().map((query, index) => {
                  return (
                    <Button
                      variant={"outline"}
                      size={"xs"}
                      key={index}
                      onClick={() =>
                        handleAttributeClick(query.key, query.value)
                      }
                    >
                      {query.key}: <span> {query.value} </span>
                      <X className="w-3 ml-3" />
                    </Button>
                  );
                })}
              </div>
              <TokenTable
                address={collection.id}
                collection={collection}
                tokens={tokens}
              />
            </div>
          </div>
        </div>
      ),
    },
    { name: "Analytics", content: <div>coming soon</div> },
    {
      name: "Activity",
      content: <CollectionActivity address={collection.id} />,
    },
  ];

  const links = [
    {
      icon: <Twitter />,
      value: `https://etherscan.io/address/${collection.id}`,
    },
    { icon: <Twitter />, value: collection.discordUrl },
    { icon: <Twitter />, value: collection.twitterUsername },
    { icon: <Globe />, value: collection.externalUrl },
  ];

  const statistics = [
    {
      icon: <Twitter />,
      value: collection.floorSale["1day"],
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
    <div className="flex-grow p-4 sm:p-8">
      <div className="-mt-16 sm:mt-0 sm:flex">
        <div className="self-center flex-none sm:pr-10">
          <Image
            src={collection.image} // Use the path to your image
            alt="An example image" // Provide a descriptive alt text
            width={200} // Set the original width of the image
            height={200} // Set the original height of the image'fill')
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
          <div className="flex flex-wrap justify-between sm:space-x-2">
            {statistics.map((statistic, index) => {
              return (
                <div
                  key={index}
                  className="px-2 py-2 rounded sm:px-6 bg-black/40"
                >
                  <div className="text-xs font-sans-serif">
                    {statistic.title}
                  </div>
                  <div className="text-sm sm:text-xl">{statistic.value}</div>
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

      <Tab.Group>
        <Tab.List
          className={
            "w-full flex text-xl justify-center py-3 border-b border-white/20 mb-4 space-x-4"
          }
        >
          {tabs.map((tab, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <button
                  className={selected ? " " : "opacity-50 hover:opacity-100"}
                >
                  {tab.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index}>{tab.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
