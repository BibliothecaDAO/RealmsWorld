import WidgetTabs from "./WidgetTabs";
import { EconomyResourceTotals } from "../widgets/EconomyResourceTotals";

export const metadata = {
    title: "Realms: Eternum Economic Dashboard",
    description: "Economic Dashboard for Realms: Eternum"
};

export default function EconomicDashboard() {

    return (
        <main className="container px-4">
            <WidgetTabs initialActiveTab={EconomyResourceTotals.widgetName}
                initialViewType={EconomyResourceTotals.types[0]}
            />
        </main>
    );
}