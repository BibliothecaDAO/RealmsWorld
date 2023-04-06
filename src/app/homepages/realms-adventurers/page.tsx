import { games } from "@/constants/games";
import TabbedView from "@/app/components/TabbedView";
import Overview from "./components/GameOverview";
import EconomicDashboard from "./components/EconomicDashboard";
import Image from "next/legacy/image";

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
        <main className="container h-screen px-4 mx-auto">
            <div className="relative w-full h-64">
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