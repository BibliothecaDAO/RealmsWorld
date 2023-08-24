"use client";

import { Fragment } from "react";
import { Collection, Game, Token } from "@/types";

import { Globe, Twitter } from "lucide-react";
import Link from "next/link";
import { formatEther } from "viem";
import { TokenActivity } from "./TokenActivity";
import { BuyButton } from "@/app/components/BuyModal";
import { ListingModal } from "@/app/components/ListingModal";
import { useAccount } from "wagmi";
import { getGamesByContract } from "@/functions/getters";
import { games } from "@/constants";
import { Button } from "@/app/components/ui/button";
import { GameCard } from "@/app/components/GameCard";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";

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
        <div className="grid sm:grid-cols-2 gap-4">
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
    <div className="flex-grow my-8">
      <BuyButton address={token.contract} id={token.tokenId} />
      {owner && <ListingModal address={token.contract} id={token.tokenId} />}
      <Tabs defaultValue={tabs[0].name}>
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger
              className="data-[state=active]:bg-transparent data-[state=active]:text-slate-200 data-[state=inactive]:opacity-50 text-md normal-case font-sans text-lg data-[state=inactive]:hover:opacity-75"
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
