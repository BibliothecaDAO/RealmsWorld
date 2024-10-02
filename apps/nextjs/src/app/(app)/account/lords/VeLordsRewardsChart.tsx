"use client"

import { Line, LineChart, CartesianGrid, YAxis, XAxis } from "recharts"
import LordsIcon from "@/icons/lords.svg";

import type { ChartConfig } from "@realms-world/ui/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@realms-world/ui/components/ui/chart"

const chartConfig = {
    total_amount: {
        label: "Lords",
        color: "hsl(36 88.9% 85.9%)",
        icon: LordsIcon
    },
    apy: {
        label: "APY %",
        color: "hsl(338.33 100% 78.82%)",
    },
} satisfies ChartConfig

export function VeLordsRewardsChart({ data, totalSupply }: { data?: { total_amount: string; week: string }[], totalSupply?: number }) {
    const parsedData = totalSupply ? data?.map(item => ({
        week: new Date(item.week).toISOString().split('T')[0], // Convert to YYYY-MM-DD
        total_amount: parseFloat(item.total_amount).toFixed(3),
        apy: parseInt(item.total_amount) * 52 / (totalSupply * 208) * 100
    })) : [];

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart data={parsedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="apy" dataKey="apy" label={{ value: "% APY", angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="total_amount" orientation="right" dataKey="total_amount" label={{ value: "Total Lords Rewards", angle: -90, position: 'outsideLeft', }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="total_amount" type="monotone" yAxisId="total_amount" stroke='var(--color-total_amount)' fill="var(--color-total_amount)" radius={4} activeDot={{ r: 8 }} />
                <Line dataKey="apy" type="monotone" yAxisId="apy" fill="var(--color-apy)" stroke='var(--color-apy)' radius={4} activeDot={{ r: 8 }} />
            </LineChart>
        </ChartContainer>
    )
}