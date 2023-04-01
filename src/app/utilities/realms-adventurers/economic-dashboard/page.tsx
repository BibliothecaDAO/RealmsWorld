import Tabs from "./components/Tabs";
import { games } from "@/constants/games";
import Image from "next/legacy/image";
import { EconomyResourceTotals } from "./widgets/EconomyResourceTotals";
import { WidgetType } from "./widgets/DashboardWidget";
import PieChartGrid from "./components/PieChartGrid";
import { PieViewData } from "./widgets/WidgetViewTypes";

export const metadata = {
    title: "Realms: Eternum Economic Dashboard",
    description: "Economic Dashboard for Realms: Eternum"
};

export default async function HomePage() {

    const pieViewData = await EconomyResourceTotals.getViewData(WidgetType.Pie);

    return (
        <main className="container h-screen px-4 mx-auto ml-32">
            <div className="relative w-full h-64">
                <Image
                    src={games[0].image}
                    alt="Realms Eternum Header image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <h1 className="text-center">Realms: Eternum Economic Dashboard</h1>
            <Tabs initial={<PieChartGrid {...pieViewData as PieViewData} />}
                initialActiveTab={EconomyResourceTotals.widgetName}
                initialViewType={EconomyResourceTotals.types[0]}
            />
        </main>
    );
}