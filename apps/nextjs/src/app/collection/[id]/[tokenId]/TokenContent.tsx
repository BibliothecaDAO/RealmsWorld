"use client";

import type { paths } from "@reservoir0x/reservoir-sdk";
import { BuyButton } from "@/app/collection/reservoir/BuyModal";
import { ListingModal } from "@/app/collection/reservoir/ListingModal";
import { GameCard } from "@/app/games/GameCard";
import { getGamesByContract } from "@/utils/getters";
import { useAccount } from "wagmi";

import { games } from "@realms-world/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@realms-world/ui";

import { TokenActivity } from "./TokenActivity";

interface Props {
  collection: NonNullable<
    paths["/collections/v5"]["get"]["responses"]["200"]["schema"]["collections"]
  >[0];
  token: NonNullable<
    paths["/tokens/v7"]["get"]["responses"]["200"]["schema"]["tokens"]
  >[0]["token"];
  //   attributes: any;
}

export const TokenContent = ({ token, collection }: Props) => {
  const { address } = useAccount();

  const comptatible_games = collection.id
    ? getGamesByContract(games, collection.id)
    : undefined;

  const owner = address
    ? token?.owner?.toUpperCase() === address.toUpperCase()
    : false;

  if (!token) {
    return null;
  }

  const tabs = [
    {
      name: "Token Info",
      content: <div className="leading-loose">{collection.description}</div>,
    },
    {
      name: "Games",
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          {comptatible_games?.map((game, index) => {
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
      <BuyButton size={"lg"} address={token.contract} id={token.tokenId} />
      {owner && <ListingModal address={token.contract} id={token.tokenId} />}
      <Tabs className="mt-12" defaultValue={tabs[0]?.name}>
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger value={tab.name} key={index}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab, index) => (
          <TabsContent
            value={tab.name}
            key={index}
            className="rounded border bg-background px-5 py-2"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
