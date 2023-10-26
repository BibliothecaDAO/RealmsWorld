import Link from "next/link";
import { CollectionCard } from "@/app/_components/CollectionCard";
import { Carousel } from "@/app/_components/ui/carousel";
import { GameCard } from "@/app/games/GameCard";
import { games } from "@/constants";
import DojoDark from "@/icons/mark-dark.svgr";
import RWLogo from "@/icons/rw-logo.svgr";
import Starknet from "@/icons/starknet.svgr";
import { getCollections } from "@/lib/reservoir/getCollections";
import type { Collection, Game } from "@/types";

//import { AuthShowcase } from "./_components/auth-showcase";

export default async function Home() {
  const data = await getCollections([
    {
      contract: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    },
  ]);

  const collections: Collection[] = data.collections;
  /*const defaultImage = "/backgrounds/map.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(42,43,36, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };*/

  return (
    <div className="container mx-auto mt-12">
      <h1 className="font-sans text-4xl md:text-6xl">
        <RWLogo className="h-32" />
      </h1>
      <div className="bg-dark-green my-2 flex w-fit p-1 text-xl">
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
      {/*<AuthShowcase />*/}

      <hr className="border" />

      <div className="my-10 ">
        <h3 className="mb-8">Games</h3>
        {/*<Carousel
          className="bg-dark-green left-0 top-0 h-[600px] w-4/5"
          images={games.map((game: Game, index) => ({
            alt: game.name,
            src: `/games/${game.id}/cover.webp`,
          }))}
          cover
          options={{
            loop: true,
          }}
          autoPlay
        />*/}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game: Game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>
      <hr className="my-8 border" />
      <div className="my-20 ">
        <h3 className="mb-8">Featured Collections</h3>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {collections?.map((collection: Collection, index) => {
            return <CollectionCard collection={collection} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
