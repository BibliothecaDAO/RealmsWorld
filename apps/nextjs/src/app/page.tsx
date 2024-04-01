import Link from "next/link";
import { GameCard } from "@/app/games/GameCard";
import DojoDark from "@/icons/mark-dark.svg";
import Starknet from "@/icons/starknet.svg";

import type { Game } from "@realms-world/constants";
import { games } from "@realms-world/constants";
import { Carousel } from "@realms-world/ui";

import { Partners } from "./_components/Partners";
import PostGrid from "./blog/PostGrid";
import CollectionsList from "./collection/CollectionsList";
import { EventGrid } from "./events/EventGrid";

export default async function Home() {
  const carouselImages = games
    .filter((a) => a.status === "beta" || a.status === "mainnet")
    .map((game: Game) => ({
      alt: game.name,
      src: `/games/${game.id}/cover.webp`,
      description: game.description,
      href: `/games/${game.id}`,
      title: game.name,
    }));

  return (
    <div className="container mx-auto mt-24 px-4 md:pl-24 lg:mt-24">
      <div className="my-4 flex w-fit flex-wrap bg-dark-green p-1 text-xl">
        <span className="align-center">Powered by </span>
        <Link href={"https://dojoengine.org/"}>
          <DojoDark className="mx-2 w-12" />
        </Link>
        <span>on</span>
        <Link href={"https://www.starknet.io/en"}>
          <Starknet className="mx-2 w-8" />
        </Link>
        Realms.World is a fantasy multiverse filled with fully onchain games
      </div>

      <Carousel
        className="left-0 top-0 h-[700px] sm:w-full"
        // showPreview
        images={carouselImages}
        cover
        options={{
          loop: true,
        }}
        autoPlay
      />

      <Partners />

      <div className="my-24">
        <hr />
        <h3>Events</h3>
        <EventGrid />
      </div>
      <hr />

      <h3>All Games</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game: Game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      <hr />
      <div className="my-24">
        <h3>News</h3>
        <PostGrid />
      </div>

      <hr className="my-8 border" />
      <div className="my-20 ">
        <h3 className="mb-8">Featured Collections</h3>
        <CollectionsList />
      </div>
    </div>
  );
}
