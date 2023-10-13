import Link from "next/link";
import { CollectionCard } from "@/app/_components/CollectionCard";
import { Carousel } from "@/app/_components/ui/carousel";
import { GameCard } from "@/app/games/GameCard";
import { games } from "@/constants";
import DojoDark from "@/icons/mark-dark.svgr";
import Starknet from "@/icons/starknet.svgr";
import { getCollections } from "@/lib/reservoir/getCollections";
import type { Collection, Game } from "@/types";

import { AuthShowcase } from "./_components/auth-showcase";

export default async function Home() {
  const data = await getCollections([
    {
      contract: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    },
  ]);

  const collections: Collection[] = data.collections;
  const defaultImage = "/backgrounds/map.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(42,43,36, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <main className="z-0" /*style={backgroundImageStyle}*/>
      {/*<Carousel
        className="h-screen w-screen top-0 left-0 absolute"
        images={[
          { alt: "First", src: "/backgrounds/bridge.png" },
          { alt: "First", src: defaultImage },
        ]}
        cover
        options={{
          loop: true,
        }}
        autoPlay
      />*/}
      <div className="w-full pt-24 sm:pl-32">
        <div className="container relative z-30 mx-auto px-8">
          <h1 className="font-sans text-4xl md:text-6xl">
            Realms <br /> Autonomous <br /> World.
          </h1>
          <div className="my-2 flex">
            <span className="align-center">Powered by </span>
            <Link href={"https://dojoengine.org/"}>
              <DojoDark className="w-10 px-1" />
            </Link>
            <span className="px-1">on</span>{" "}
            <Link href={"https://www.starknet.io/en"}>
              <Starknet className="w-8 px-1" />
            </Link>
          </div>
          {/*<AuthShowcase />*/}

          <hr className="border" />

          <div className="my-20 ">
            <h3 className="mb-8">Games</h3>
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
      </div>
    </main>
  );
}
