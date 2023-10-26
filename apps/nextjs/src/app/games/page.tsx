import { GameCard } from "@/app/games/GameCard";
import { games } from "@/constants";
import type { Game } from "@/types";

export const metadata = {
  title: "Games of the Realms",
  description:
    "Fully Onchain Games in the Realms Autonomous World- Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
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
  );
}
