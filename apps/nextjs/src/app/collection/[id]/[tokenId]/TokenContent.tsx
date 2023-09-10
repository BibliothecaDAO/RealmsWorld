"use client";

import { Fragment } from "react";
import Link from "next/link";
import { GameCard } from "@/app/_components/GameCard";
import { Button } from "@/app/_components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { BuyButton } from "@/app/collection/BuyModal";
import { ListingModal } from "@/app/collection/ListingModal";
import { games } from "@/constants";
import type { Collection, Game, Token } from "@/types";
import { getGamesByContract } from "@/utils/getters";
import { Globe, Twitter } from "lucide-react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { TokenActivity } from "./TokenActivity";

interface Props {
  collection: Collection;
  token: Token;
  //   attributes: any;
}

export const TokenContent = ({ token, collection }: Props) => {
  const { address, isConnecting, isConnected } = useAccount();

  const comptatible_games = getGamesByContract(games, collection.id);

  const owner = address
    ? token.owner.toUpperCase() === address.toUpperCase()
    : false;

  const tabs = [
    {
      name: "Token Info",
      content: <div className="leading-loose">{collection.description}</div>,
    },
    {
      name: "Games",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {comptatible_games.map((game: Game, index: any) => {
            return <GameCard key={index} game={game} />;
          })}
        </div>
      ),
    },
    {
      name: "Activity",
      content: (
        <div>
          <TokenActivity token={token} />
        </div>
      ),
    },
  ];

  return (
    <div className="my-8 flex-grow">
      <BuyButton address={token.contract} id={token.tokenId} />
      {owner && <ListingModal address={token.contract} id={token.tokenId} />}
      <Tabs defaultValue={tabs[0].name}>
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger
              className="text-md font-sans text-lg normal-case data-[state=active]:bg-transparent data-[state=active]:text-slate-200 data-[state=inactive]:opacity-50 data-[state=inactive]:hover:opacity-75"
              value={tab.name}
              key={index}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab, index) => (
          <TabsContent value={tab.name} key={index}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      {/*<Tab.Group>
        <Tab.List
          className={
            "w-full flex text-xl justify-start py-3 border-b border-white/20 mb-4 space-x-4"
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
          </Tab.Group>*/}
    </div>
  );
};
