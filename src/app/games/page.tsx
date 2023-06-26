import { Game } from "@/types";
import { GameCard } from "@/app/components/GameCard";
import { games } from "@/constants";
import { motion } from "framer-motion";

export const metadata = {
  title: "Atlas - Games of the Realms",
  description:
    "Various games in the onchain world of Realms - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(/backgrounds/dummy_background.png), url(/backgrounds/dummy_background.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="w-full h-full bg-theme-gray">
      <div className="w-full -mt-24 h-96" style={backgroundImageStyle} />
      <div className="sm:pl-32 ">
        <main className="container mx-auto">
          <div className="container px-8 mx-auto">
            <h1>Realms Autonomous World</h1>

            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {games.map((game: Game, index) => (
                <GameCard key={index} game={game} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
