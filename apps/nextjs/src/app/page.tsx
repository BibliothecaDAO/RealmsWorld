import Link from "next/link";
import { GameCard } from "@/app/games/GameCard";
import DojoDark from "@/icons/mark-dark.svg";
import Starknet from "@/icons/starknet.svg";

import type { Game } from "@realms-world/constants";
import { games } from "@realms-world/constants";
import { Button, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@realms-world/ui";

import { PageLayout } from "./_components/PageLayout";
import { Partners } from "./_components/Partners";
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
      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Link href={item.href}>
                <div className="relative h-[700px] border rounded">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1900}
                    height={1200}
                    className="h-full w-full object-cover rounded"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black to-transparent p-8 rounded">
                    <h2 className="text-4xl">{item.title}</h2>
                    <p className="text-xl mb-4">{item.description}</p>
                    <Button variant="outline">View game</Button>
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




      <h2 className="mb-4 text-2xl sm:text-3xl font-sans">All Games</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game: Game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>


      <div className="my-24">
        <h2 className="mb-4 text-2xl sm:text-3xl font-sans">News</h2>
        <PostGrid />
      </div>

      <div className="my-24">

        <h2 className="mb-4 text-2xl sm:text-3xl font-sans">Events</h2>
        <EventGrid isHomepage={true} />
      </div>

      <hr className="my-8 border" />
      <div className="my-20">
        <h2 className="mb-4 text-2xl sm:text-3xl font-sans">Featured Collections</h2>
        <CollectionsList />
      </div>
    </PageLayout>
  );
}