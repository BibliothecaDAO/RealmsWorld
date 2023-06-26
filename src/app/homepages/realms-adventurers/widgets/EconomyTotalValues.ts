import { formatEther } from 'viem'
import { ApolloQueryResult } from "@apollo/client";
import client from "../apolloClient";
import {
    GetEconomyTotalValuesDocument,
    GetEconomyTotalValuesQuery
} from "@/generated/graphql";
import { Widget, WidgetType, WidgetViewData } from "./DashboardWidget";
import { TextViewData } from "./WidgetViewTypes";

export class EconomyTotalValues extends Widget {

    public static widgetID: string = "economy-total-values";
    public static widgetName: string = "Economy Summary View";
    public static description: string = "Summary view of the Economy";

    public static types = [WidgetType.Text];

    constructor() {
        super();
    }

    static async getViewData(type: WidgetType): Promise<WidgetViewData> {
        switch (type) {
            case WidgetType.Text:
                return await EconomyTotalValues.getTextData();
            default:
                throw new Error("Invalid widget type");
        }
    }

    private static async getQueryData(): Promise<ApolloQueryResult<GetEconomyTotalValuesQuery>> {
        return await client.query({ query: GetEconomyTotalValuesDocument });
    }

    public static async getTextData(): Promise<TextViewData> {
        const queryResult = await EconomyTotalValues.getQueryData();

        return {
            type: WidgetType.Text,
            data: [
                {
                    label: "Settled Realms",
                    value: queryResult.data.economySettledRealmsTotal.toString()
                },
                {
                    label: "Exchange $LORDS Purchased Total",
                    value: parseFloat(formatEther(BigInt(queryResult.data.economyExchangeLordsPurchasedTotal))).toFixed(4).toString()
                }
            ]
        };
    }
}