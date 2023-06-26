import { formatEther } from 'viem'
import { ApolloQueryResult } from "@apollo/client";
import client from "../apolloClient";
import {
    GetEconomyLpResourceTotalsDocument,
    GetEconomyLpResourceTotalsQuery
} from "@/generated/graphql"
import { Widget, WidgetType, WidgetViewData } from "./DashboardWidget";
import { TableViewData, PieViewData } from "./WidgetViewTypes";

export class EconomyLPResourceTotals extends Widget {

    public static widgetID: string = "economy-lp-resource-totals";
    public static widgetName: string = "Economy LP Resource Totals";
    public static description: string = "View of the total amount of each LP resource minted and burned";

    public static types = [WidgetType.Table, WidgetType.Pie];

    constructor() {
        super();
    }

    static async getViewData(type: WidgetType): Promise<WidgetViewData> {
        switch (type) {
            case WidgetType.Table:
                return await EconomyLPResourceTotals.getTableData();
            case WidgetType.Pie:
                return await EconomyLPResourceTotals.getPieData();
            default:
                throw new Error("Invalid widget type");
        }
    }

    static async getPieData(): Promise<WidgetViewData> {
        const queryResult = await EconomyLPResourceTotals.getQueryData();
        const data = EconomyLPResourceTotals.transformToPieData(queryResult);

        return {
            type: WidgetType.Pie,
            data
        };
    }

    private static transformToPieData(queryResult: ApolloQueryResult<GetEconomyLpResourceTotalsQuery>): PieViewData["data"] {
        return queryResult?.data.economyLpResourceMintedTotals.map((resource: any) => {
            const burntAmount = queryResult.data.economyLpResourceBurnedTotals.find((x: any) => x.resourceId === resource.resourceId)?.amount || 0;
            const mintedAmount = resource.amount;
            return {
                resource: resource.resourceName,
                data: {
                    labels: ["Minted", "Burnt"],
                    datasets: [
                        {
                            data: [parseFloat(formatEther(mintedAmount)), parseFloat(formatEther(BigInt(burntAmount)))],
                            backgroundColor: ["#36A2EB", "#FF6384"],
                            hoverBackgroundColor: ["#36A2EB", "#FF6384"]
                        }
                    ]
                }
            };
        });
    }

    private static async getQueryData(): Promise<ApolloQueryResult<GetEconomyLpResourceTotalsQuery>> {
        return await client.query({ query: GetEconomyLpResourceTotalsDocument });
    }

    static async getTableData(): Promise<TableViewData> {

        let tableData: TableViewData = {
            type: WidgetType.Table,
            data: []
        }

        const queryResult = await EconomyLPResourceTotals.getQueryData();

        tableData.data = queryResult?.data.economyLpResourceMintedTotals.map((resource) => {
            return {
                id: resource.resourceId,
                resource: resource.resourceName,
                minted: +formatEther(BigInt(resource.amount)).toLocaleString(),
                burnt: +formatEther(
                    BigInt(queryResult.data.economyLpResourceBurnedTotals.find((x) => x.resourceId === resource.resourceId)?.amount || 0)
                ).toLocaleString(),
            }
        });
        return tableData;
    }
}