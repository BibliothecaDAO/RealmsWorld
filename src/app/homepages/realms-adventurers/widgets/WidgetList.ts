import { EconomyResourceTotals } from "./EconomyResourceTotals";
import { WidgetType } from "./DashboardWidget";
import { EconomyLPResourceTotals } from "./EconomyLPResourceTotals";
import { EconomyTotalValues } from "./EconomyTotalValues";
import { HistoricPriceData } from "./HistoricPriceData";

const WidgetList = [
    {
        widget: EconomyResourceTotals,
        defaultView: WidgetType.Pie
    },
    {
        widget: EconomyLPResourceTotals,
        defaultView: WidgetType.Table
    },
    {
        widget: EconomyTotalValues,
        defaultView: WidgetType.Text
    },
    {
        widget: HistoricPriceData,
        defaultView: WidgetType.Line
    }
];

export default WidgetList;