import { Collection, Game } from "@/types";
import { games } from "@/constants";
import { GameCard } from "./components/GameCard";
import { CollectionCard } from "./components/CollectionCard";
import { getCollections } from "./lib/reservoir/getCollections";

import DojoDark from "@/icons/mark-dark.svg"
import Starknet from "@/icons/starknet.svg"

export default async function Home() {
  const data = await getCollections([
    {
      contract: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    }
  ]);

  const collections: Collection[] = data.collections;
  const defaultImage = "/backgrounds/map.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <main className="z-0" style={backgroundImageStyle}>
      <div className="w-full h-screen -mt-24 sm:pl-32">
        <div className="container px-8 mx-auto pt-48">
          <h1 className="text-6xl font-sans">
            The <br /> Realms <br /> Autonomous <br /> World
          </h1>
          <div className="flex my-2">
            <span className="align-center">Powered by Dojo</span>
            
            <DojoDark className="w-10 px-1" /><span className="px-1">on</span>  <Starknet className="w-8 px-1" />
          </div>

          <hr className="border" />

          <div className="my-20 ">
            <h3 className="mb-8">Games</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {games.map((game: Game, index) => (
                <GameCard key={index} game={game} />
              ))}
            </div>
          </div>
          <hr className="border my-8" />
          <div className="my-20 ">

            <h3 className="mb-8">Featured Collections</h3>
            <div className="grid w-full grid-cols-2 gap-3">
              {collections.map((collection: Collection, index) => {
                return <CollectionCard collection={collection} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
