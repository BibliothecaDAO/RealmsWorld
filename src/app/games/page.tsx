import { Game } from "@/types";
import { GameCard } from "../components/GameCard";
import { games } from "@/constants";

export const metadata = {
  title: 'Atlas - Games of the Realms',
  description: 'Various games in the onchain world of Realms - Created for adventurers by Bibliotheca DAO'
}

export default async function Page() {
  return (
    <main className="container mx-auto">
      <div className="container px-8 mx-auto">
        <h1>Onchain Gaming</h1>

        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game: Game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>
    </main>
  );
}
