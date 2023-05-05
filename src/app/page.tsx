import { Collection, Game } from "@/types";
import { games } from "@/constants";
import { GameCard } from "./components/GameCard";
import { CollectionCard } from "./components/CollectionCard";
import { getCollections } from "./lib/reservoir/getCollections";

export default async function Home() {
  const data = await getCollections([
    {
      contract: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    },
    {
      contract: "0x8db687aceb92c66f013e1d614137238cc698fedb",
    },
    {
      contract: "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40",
    },
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
        <div className="container px-8 mx-auto pt-72">
          <h1>
            Your window into the <br /> Realms Autonomous World
          </h1>
          <hr className="mt-8 border-white/40" />

          <h5>World Games</h5>
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game: Game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
          <hr className="mt-8 border-white/40" />
          <h5>World Collections</h5>
          <div className="grid w-full grid-cols-1 gap-3">
            {collections.map((collection: Collection, index) => {
              return <CollectionCard collection={collection} key={index} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
