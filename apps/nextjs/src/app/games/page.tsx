import { GameCard } from "@/app/games/GameCard";
import { games } from "@/constants";
import type { Game } from "@/types";

export const metadata = {
  title: "Games of the Realms",
  description:
    "Various games in the onchain world of Realms - Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(42,43,36, 1)), url(/backgrounds/dummy_background.png), url(/backgrounds/dummy_background.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="bg-dark-green h-full w-full">
      <div
        className="-mt-24 h-72 w-full sm:h-96"
        style={backgroundImageStyle}
      />
      <div className="sm:pl-32 ">
        <main className="container mx-auto">
          <div className="container mx-auto px-8">
            <h1>Realms Autonomous World</h1>

            <hr className="my-8 border" />

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
