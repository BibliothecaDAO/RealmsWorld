import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/app/(app)/games/GameCard";
import { reader } from "@/utils/keystatic";
import { Button } from "@realms-world/ui/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@realms-world/ui/components/ui/carousel";

import { PageLayout } from "../_components/PageLayout";
import { Partners } from "../_components/Partners";
import { BlogGrid } from "./blogs/BlogGrid";
import CollectionsList from "./collection/CollectionsList";
import { EventGrid } from "./events/EventGrid";

export default async function Home() {
  const games = await reader().collections.games.all();
  const carouselItems = games
    .filter((a) => a.entry.status === "beta" || a.entry.status === "mainnet")
    .map((game) => ({
      alt: game.entry.title,
      src: `/content/games/${game.slug}/${game.entry.coverImage}`,
      description: game.entry.description,
      href: `/games/${game.slug}`,
      title: game.entry.title,
    }));

  return (
    <PageLayout>
      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Link href={item.href}>
                <div className="relative h-[700px] border-b">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1900}
                    height={1200}
                    className="h-full w-full rounded object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 rounded bg-gradient-to-r from-black to-transparent p-8">
                    <h2 className="text-4xl">{item.title}</h2>
                    <p className="mb-4 text-xl">{item.description}</p>
                    <Button variant="outline">View game</Button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:left-8" />
        <CarouselNext className="right-2 sm:right-8" />
      </Carousel>
      <div className="px-4 sm:px-8">
        <Partners />

        <h2 className="mb-4 font-sans text-2xl sm:text-3xl">All Games</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <GameCard key={index} game={game.entry} slug={game.slug} />
          ))}
        </div>

        <div className="my-24">
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl">News</h2>
          <BlogGrid />
        </div>

        <div className="my-24">
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl">Events</h2>
          <EventGrid isHomepage={true} />
        </div>

        <hr className="my-8 border" />
        <div className="my-20">
          <h2 className="mb-4 font-sans text-2xl sm:text-3xl">
            Featured Collections
          </h2>
          <CollectionsList />
        </div>
      </div>
    </PageLayout>
  );
}
