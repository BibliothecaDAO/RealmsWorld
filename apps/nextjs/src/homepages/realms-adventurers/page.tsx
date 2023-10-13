import Image from "next/legacy/image";
import TabbedView from "@/app/_components/TabbedView";
import { games } from "@/constants/games";

import EconomicDashboard from "./components/EconomicDashboard";
import Overview from "./components/GameOverview";

export const metadata = {
  title: "Atlas - Homepage for Realms: Eternum",
  description:
    "Homepage for Realms: Eternum with Game Overview and Economic Dashboard - Created for adventurers by Bibliotheca DAO",
};

export default function HomePage() {
  const game = games.find((game) => game.id === "realms-adventurers");

  if (!game) {
    return;
  }

  const tabs = [
    { name: "Overview", component: <Overview game={game} /> },
    { name: "Economics", component: <EconomicDashboard /> },
  ];

  return (
    <main className="container mx-auto h-screen px-4">
      <div className="relative h-64 w-full">
        <Image
          src={game.image}
          alt="Realms Eternum Header image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <TabbedView tabs={tabs} initialActiveTab="Overview" />
    </main>
  );
}
