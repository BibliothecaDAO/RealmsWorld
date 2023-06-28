import { WidgetType, WidgetViewData } from "./DashboardWidget";
import { ChartData } from "chart.js";

export interface TableViewData extends WidgetViewData {
    type: WidgetType.Table;
    headers?: Headers;
    data: {
        id: number;
        resource: string;
        minted: number;
        burnt: number;
    }[]
};

export interface PieViewData extends WidgetViewData {
    type: WidgetType.Pie;
    data: {
        resource: string;
        data: ChartData<"pie">;
    }[];
};

export interface TextViewData extends WidgetViewData {
    type: WidgetType.Text;
    data: {
        label: string;
        value: string;
    }[];
}

export interface LineViewData extends WidgetViewData {
    type: WidgetType.Line;
    data: any
}