export enum WidgetType {
    Pie = "pie",
    Line = "line",
    Table = "table",
    Text = "text"
}

export interface WidgetViewData {
    type: WidgetType;
    data: any;
}

export abstract class Widget {
    public static widgetID: string;
    public static widgetName: string;
    public static description: string = "";
    public static icon: string = "";
    public static types: WidgetType[];

    static getViewData(type: WidgetType): Promise<WidgetViewData> {
        throw new Error("Not implemented");
    }
}