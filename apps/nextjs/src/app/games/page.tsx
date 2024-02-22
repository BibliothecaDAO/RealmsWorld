import { GameCard } from "@/app/games/GameCard";

import type { Game } from "@realms-world/constants";
import { games } from "@realms-world/constants";

import { PageLayout } from "../_components/PageLayout";

export const metadata = {
  title: "Games of the Realms",
  description:
    "Fully Onchain Games in the Realms Autonomous World- Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  return (
    <PageLayout title="Games">
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game: Game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </PageLayout>
  );
}
