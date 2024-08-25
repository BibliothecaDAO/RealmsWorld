import Link from "next/link";
import { GameCard } from "@/app/(app)/games/GameCard";
import DojoDark from "@/icons/mark-dark.svg";
import Starknet from "@/icons/starknet.svg";

import type { Game } from "@realms-world/constants";
import { games } from "@realms-world/constants";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@realms-world/ui";

import { PageLayout } from "../_components/PageLayout";
import { Partners } from "../_components/Partners";
import PostGrid from "./blog/PostGrid";
import CollectionsList from "./collection/CollectionsList";
import { EventGrid } from "./events/EventGrid";
import Image from "next/image"
export default function Home() {
  const carouselItems = games
    .filter((a) => a.status === "beta" || a.status === "mainnet")
    .map((game: Game) => ({
      alt: game.name,
      src: `/games/${game.id}/cover.webp`,
      description: game.description,
      href: `/games/${game.id}`,
      title: game.name,
    }));

  return (
    <PageLayout>
      <div className="my-4 flex w-fit flex-wrap p-1 text-xl">
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

      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Link href={item.href}>
                <div className="relative h-[700px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1900}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Partners />

      <div className="my-24">
        <hr />
        <h3 className="mb-4 text-xl">Events</h3>
        <EventGrid isHomepage={true} />
      </div>
      <hr />

      <h3 className="mb-4 text-xl">All Games</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game: Game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      <hr />
      <div className="my-24">
        <h3 className="mb-4 text-xl">News</h3>
        <PostGrid />
      </div>

      <hr className="my-8 border" />
      <div className="my-20">
        <h3 className="mb-4 text-xl">Featured Collections</h3>
        <CollectionsList />
      </div>
    </PageLayout>
  );
}
