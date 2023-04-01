import { formatEther } from "ethers/lib/utils.js";
import { ApolloQueryResult } from "@apollo/client";
import client from "../apolloClient";
import {
    GetEconomyResourceTotalsDocument, GetEconomyResourceTotalsQuery
} from "../../../../../generated/graphql";
import { Widget, WidgetType, WidgetViewData } from "./DashboardWidget";
import { TableViewData, PieViewData } from "./WidgetViewTypes";

export class EconomyResourceTotals extends Widget {

    public static widgetID: string = "economy-resource-totals";
    public static widgetName: string = "Economy Resource Totals";
    public static description: string = "View of the total amount of each resource minted and burned";
    public static types = [WidgetType.Pie, WidgetType.Table];

    constructor() {
        super();
    }

    static async getViewData(type: WidgetType): Promise<WidgetViewData> {
        switch (type) {
            case WidgetType.Table:
                return await EconomyResourceTotals.getTableData();
            case WidgetType.Pie:
                return await EconomyResourceTotals.getPieData();
            default:
                throw new Error("Invalid widget type");
        }
    }

    static async getPieData(): Promise<WidgetViewData> {
        const queryResult = await EconomyResourceTotals.getQueryData();
        const data = EconomyResourceTotals.transformToPieData(queryResult);

        return {
            type: WidgetType.Pie,
            data
        };
    }

    private static transformToPieData(queryResult: ApolloQueryResult<GetEconomyResourceTotalsQuery>): PieViewData["data"] {
        return queryResult?.data.economyResourceMintedTotals.map((resource: any) => {
            const burntAmount = queryResult.data.economyResourceBurnedTotals.find((x: any) => x.resourceId === resource.resourceId)?.amount || 0;
            const mintedAmount = resource.amount;
            return {
                resource: resource.resourceName,
                data: {
                    labels: ["Minted", "Burnt"],
                    datasets: [
                        {
                            data: [parseFloat(formatEther(mintedAmount)), parseFloat(formatEther(burntAmount))],
                            backgroundColor: ["#36A2EB", "#FF6384"],
                            hoverBackgroundColor: ["#36A2EB", "#FF6384"]
                        }
                    ]
                }
            };
        });
    }

    private static async getQueryData(): Promise<ApolloQueryResult<GetEconomyResourceTotalsQuery>> {
        return await client.query({ query: GetEconomyResourceTotalsDocument });
    }

    static async getTableData(): Promise<TableViewData> {

        let tableData: TableViewData = {
            type: WidgetType.Table,
            data: []
        }

        const queryResult = await EconomyResourceTotals.getQueryData();

        tableData.data = queryResult?.data.economyResourceMintedTotals.map((resource) => {
            return {
                id: resource.resourceId,
                resource: resource.resourceName,
                minted: +formatEther(resource.amount).toLocaleString(),
                burnt: +formatEther(
                    queryResult.data.economyResourceBurnedTotals.find((x) => x.resourceId === resource.resourceId)?.amount || 0
                ).toLocaleString(),
            }
        });
        return tableData;
    }
}