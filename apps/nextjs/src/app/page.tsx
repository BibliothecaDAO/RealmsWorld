import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/app/games/GameCard";
import DojoDark from "@/icons/mark-dark.svg";
import RWLogo from "@/icons/rw-logo.svg";
import Starknet from "@/icons/starknet.svg";

import type { Game } from "@realms-world/constants";
import { games } from "@realms-world/constants";
import { Carousel } from "@realms-world/ui";

//import { Carousel } from "@realms-world/ui";

import CollectionsList from "./collection/CollectionsList";
import { EventGrid } from "./events/EventGrid";

export default async function Home() {
  const carouselImages = games
    .filter((a) => a.status === "beta" || a.status === "mainnet")
    .map((game: Game, index) => ({
      alt: game.name,
      src: `/games/${game.id}/cover.webp`,
      description: game.description,
      href: `/games/${game.id}`,
      title: game.name,
    }));

  return (
    <div className="container mx-auto mt-12 px-4 md:pl-24 lg:mt-24">
      <h1 className="mb-8 flex justify-center font-sans text-4xl md:text-6xl">
        <RWLogo className="h-24 md:h-32" />
      </h1>
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
      <h2>Live onchain games</h2>
      <div className="my-10 ">
        <Carousel
          className="left-0 top-0 h-[700px] pb-8  sm:w-full"
          showPreview
          images={carouselImages}
          cover
          options={{
            loop: true,
          }}
          autoPlay
        />
        <h2>Events</h2>
        <EventGrid />
        <h2>All Games</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game: Game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>

      {/* <h3 className="mb-8">Blog</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border">
          <Link href={"/blog/loot-survivor"}>
            <Image
              src="/blog/loot-survivor/Realms.World_LS_article_modal.png"
              width={600}
              height={900}
              alt="LS Blog"
            ></Image>
          </Link>
        </div>
      </div> */}
      <hr className="my-8 border" />
      <div className="my-20 ">
        <h3 className="mb-8">Featured Collections</h3>
        <CollectionsList />
      </div>
    </div>
  );
}
