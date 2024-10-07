import type { Metadata } from "next";
import { GameCard } from "@/app/(app)/games/GameCard";
import { reader } from "@/utils/keystatic";

import { PageLayout } from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Games of the Realms",
  description:
    "Fully Onchain Games in the Realms Autonomous World- Created for adventurers by Bibliotheca DAO",
};

export default async function Page() {
  const games = await reader.collections.games.all();
  return (
    <PageLayout title="Onchain Games">
      <div className="mt-8 grid grid-cols-1 gap-4 px-4 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <GameCard key={index} game={game.entry} slug={game.slug} />
        ))}
      </div>
      <div></div>
    </PageLayout>
  );
}
