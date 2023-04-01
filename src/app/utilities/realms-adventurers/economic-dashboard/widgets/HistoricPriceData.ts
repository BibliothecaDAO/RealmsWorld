import { ApolloQueryResult } from "@apollo/client";
import client from "../apolloClient";
import {
    GetHistoricPriceDataDocument,
    GetHistoricPriceDataQuery
} from "../../../../../generated/graphql";
import { Widget, WidgetType, WidgetViewData } from "./DashboardWidget";
import { LineViewData } from "./WidgetViewTypes";

export class HistoricPriceData extends Widget {

    public static widgetID: string = "historic-price-data";
    public static widgetName: string = "Historic Price Data";
    public static description: string = "Historic Price Data for different tokens";

    public static types = [WidgetType.Line];

    constructor() {
        super();
    }

    static async getViewData(type: WidgetType): Promise<WidgetViewData> {
        switch (type) {
            case WidgetType.Line:
                return await HistoricPriceData.getLineData();
            default:
                throw new Error("Invalid widget type");
        }
    }

    private static async getQueryData(): Promise<ApolloQueryResult<GetHistoricPriceDataQuery>> {
        return await client.query({
            //TODO: replace all values with user input
            query: GetHistoricPriceDataDocument, variables: {
                dateFrom: "2023-03-01",
                dateTo: "2023-04-01",
                tokenId: 1
            }
        });
    }

    public static async getLineData(): Promise<LineViewData> {
        const queryResult = await HistoricPriceData.getQueryData();

        return {
            type: WidgetType.Line,
            data: queryResult.data.exchangeRates
        };
    }
}