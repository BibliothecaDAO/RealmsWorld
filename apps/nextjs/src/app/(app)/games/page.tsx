import type { Metadata } from "next";
import { GameCard } from "@/app/(app)/games/GameCard";
import { reader } from "@/utils/keystatic";
import { env } from 'env'

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
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <GameCard key={index} game={game.entry} slug={game.slug} />
        ))}
        {`
    \n1:${env.NEXT_PUBLIC_ALCHEMY_API}
    \n2:${env.NEXT_PUBLIC_APIBARA_HANDLE}
    \n3:${env.NEXT_PUBLIC_BLAST_API}
    \n4:${env.NEXT_PUBLIC_ETHERSCAN_URL}
    \n5:${env.NEXT_PUBLIC_ETHPLORER_APIKEY}
    \n6:${env.NEXT_PUBLIC_REALMS_BRIDGE_SUBGRAPH_NAME}
    \n7:${env.NEXT_PUBLIC_REALMS_LEGACY_REWARD_SUBGRAPH_NAME}
    \n8:${env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME}
    \n9:${env.NEXT_PUBLIC_RESERVOIR_API_KEY}
    \n10:${env.NEXT_PUBLIC_STARKSCAN_URL}
    \n12:${env.NEXT_PUBLIC_SUBGRAPH_NAME}
    \n13:${env.NEXT_PUBLIC_VOYAGER_URL} `}
      </div>
      <div>

      </div>
    </PageLayout>

  );
}
