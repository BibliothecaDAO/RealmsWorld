import type { ChartConfig } from "@/components/ui/chart";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getVelordsSourceLabel } from "@/lib/velords-sources";
import {
  buildCumulativeRewardsData,
  buildLockParticipationData,
  buildRewardsMomentumData,
  buildSourceConcentrationData,
  buildSourceShareData,
  calculateProjectedPeriodTotal,
} from "@/lib/velords-trends";
import { formatNumber } from "@/utils/utils";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

interface WeeklyRewardRow {
  week: string;
  totalWei: string;
  bySender: Record<string, string>;
}

interface WeeklyLockRow {
  week: string;
  updates: number;
  uniqueWallets: number;
}

const baseChartConfig = {
  totalRewards: {
    label: "Weekly Rewards",
    color: "var(--color-chart-1)",
  },
  movingAvg4w: {
    label: "4w Avg",
    color: "var(--color-chart-2)",
  },
  top1Share: {
    label: "Top 1 Share %",
    color: "var(--color-chart-3)",
  },
  top3Share: {
    label: "Top 3 Share %",
    color: "var(--color-chart-4)",
  },
  activeSources: {
    label: "Active Sources",
    color: "var(--color-chart-5)",
  },
  updates: {
    label: "Lock Updates",
    color: "var(--color-chart-1)",
  },
  uniqueWallets: {
    label: "Unique Wallets",
    color: "var(--color-chart-2)",
  },
  updatesPerWallet: {
    label: "Updates/Wallet",
    color: "var(--color-chart-3)",
  },
  cumulativeRewards: {
    label: "Cumulative Rewards",
    color: "var(--color-chart-4)",
  },
} satisfies ChartConfig;

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function compact(value: number) {
  return Number.isFinite(value) ? compactFormatter.format(value) : "0";
}

function shortWeek(value: string) {
  return typeof value === "string" ? value.slice(5) : value;
}

const sourcePalette = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "hsl(208 94% 68%)",
  "hsl(12 84% 66%)",
] as const;

export function VelordsTrendsPanel({
  rewardsWeekly,
  lockWeekly,
  isRewardsLoading,
  isLocksLoading,
}: {
  rewardsWeekly: WeeklyRewardRow[];
  lockWeekly: WeeklyLockRow[];
  isRewardsLoading?: boolean;
  isLocksLoading?: boolean;
}) {
  const rewardsMomentum = useMemo(
    () => buildRewardsMomentumData(rewardsWeekly),
    [rewardsWeekly],
  );

  const sourceShareData = useMemo(() => {
    const { points, sourceKeys } = buildSourceShareData(rewardsWeekly, 5);

    const sourceSeries = sourceKeys.map((rawKey, index) => {
      const key = rawKey === "other" ? "other" : `source_${index}`;
      return {
        rawKey,
        key,
        label: rawKey === "other" ? "Other" : getVelordsSourceLabel(rawKey),
        color: sourcePalette[index % sourcePalette.length],
      };
    });

    const chartPoints = points.map((point) => {
      const next: Record<string, number | string> = {
        week: point.week,
      };

      for (const series of sourceSeries) {
        next[series.key] = Number(point[series.rawKey] ?? 0);
      }

      return next;
    });

    return {
      points: chartPoints,
      sourceSeries,
    };
  }, [rewardsWeekly]);

  const sourceShareConfig = useMemo(() => {
    const dynamicConfig: ChartConfig = {};

    for (const source of sourceShareData.sourceSeries) {
      dynamicConfig[source.key] = {
        label: source.label,
        color: source.color,
      };
    }

    return dynamicConfig;
  }, [sourceShareData.sourceSeries]);

  const concentrationPoints = useMemo(
    () => buildSourceConcentrationData(rewardsWeekly),
    [rewardsWeekly],
  );

  const lockParticipationPoints = useMemo(
    () => buildLockParticipationData(lockWeekly),
    [lockWeekly],
  );

  const cumulativePoints = useMemo(
    () => buildCumulativeRewardsData(rewardsWeekly),
    [rewardsWeekly],
  );

  const projectedPeriodTotal = useMemo(
    () => calculateProjectedPeriodTotal(rewardsWeekly),
    [rewardsWeekly],
  );

  const latestUpdatesPerWallet =
    lockParticipationPoints.at(-1)?.updatesPerWallet ?? 0;

  const isLoading = Boolean(
    (isRewardsLoading ?? false) || (isLocksLoading ?? false),
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trends</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Loading trends...
        </CardContent>
      </Card>
    );
  }

  if (rewardsWeekly.length === 0 && lockWeekly.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trends</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          No trend data is available for this period.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Rewards Momentum</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer
            config={baseChartConfig}
            className="!aspect-auto h-[280px] w-full sm:h-[320px]"
          >
            <ComposedChart data={rewardsMomentum}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                minTickGap={40}
                tickFormatter={shortWeek}
              />
              <YAxis width={44} tickLine={false} tickFormatter={compact} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={
                  <ChartLegendContent className="flex-wrap gap-x-4 gap-y-1" />
                }
              />
              <Bar
                dataKey="totalRewards"
                fill="var(--color-totalRewards)"
                radius={[4, 4, 0, 0]}
              />
              <Line
                dataKey="movingAvg4w"
                type="monotone"
                stroke="var(--color-movingAvg4w)"
                strokeWidth={2.5}
                dot={false}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Source Share Over Time</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer
            config={sourceShareConfig}
            className="!aspect-auto h-[280px] w-full sm:h-[320px]"
          >
            <AreaChart data={sourceShareData.points}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                minTickGap={40}
                tickFormatter={shortWeek}
              />
              <YAxis width={36} tickLine={false} domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={
                  <ChartLegendContent className="flex-wrap gap-x-4 gap-y-1" />
                }
              />
              {sourceShareData.sourceSeries.map((source) => (
                <Area
                  key={source.key}
                  dataKey={source.key}
                  stackId="sourceShare"
                  type="monotone"
                  fill={source.color}
                  stroke={source.color}
                  fillOpacity={0.7}
                  strokeWidth={1.5}
                />
              ))}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Source Concentration</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer
            config={baseChartConfig}
            className="!aspect-auto h-[280px] w-full sm:h-[320px]"
          >
            <ComposedChart data={concentrationPoints}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                minTickGap={40}
                tickFormatter={shortWeek}
              />
              <YAxis
                yAxisId="share"
                width={36}
                tickLine={false}
                domain={[0, 100]}
              />
              <YAxis
                yAxisId="count"
                width={28}
                tickLine={false}
                orientation="right"
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={
                  <ChartLegendContent className="flex-wrap gap-x-4 gap-y-1" />
                }
              />
              <Line
                dataKey="top1Share"
                yAxisId="share"
                stroke="var(--color-top1Share)"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                dataKey="top3Share"
                yAxisId="share"
                stroke="var(--color-top3Share)"
                strokeWidth={2.5}
                dot={false}
              />
              <Bar
                dataKey="activeSources"
                yAxisId="count"
                fill="var(--color-activeSources)"
                opacity={0.3}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lock Participation Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground mb-3 px-4 text-sm sm:px-0">
            Latest updates per active wallet:{" "}
            {formatNumber(latestUpdatesPerWallet, 2)}
          </div>
          <ChartContainer
            config={baseChartConfig}
            className="!aspect-auto h-[280px] w-full sm:h-[320px]"
          >
            <ComposedChart data={lockParticipationPoints}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                minTickGap={40}
                tickFormatter={shortWeek}
              />
              <YAxis yAxisId="count" width={36} tickLine={false} />
              <YAxis
                yAxisId="ratio"
                width={36}
                tickLine={false}
                orientation="right"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={
                  <ChartLegendContent className="flex-wrap gap-x-4 gap-y-1" />
                }
              />
              <Line
                dataKey="updates"
                yAxisId="count"
                stroke="var(--color-updates)"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                dataKey="uniqueWallets"
                yAxisId="count"
                stroke="var(--color-uniqueWallets)"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                dataKey="updatesPerWallet"
                yAxisId="ratio"
                stroke="var(--color-updatesPerWallet)"
                strokeWidth={2.5}
                dot={false}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cumulative Rewards Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground mb-3 px-4 text-sm sm:px-0">
            Projected period total: {formatNumber(projectedPeriodTotal, 2)}{" "}
            LORDS
          </div>
          <ChartContainer
            config={baseChartConfig}
            className="!aspect-auto h-[280px] w-full sm:h-[320px]"
          >
            <LineChart data={cumulativePoints}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                minTickGap={40}
                tickFormatter={shortWeek}
              />
              <YAxis width={44} tickLine={false} tickFormatter={compact} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend
                content={
                  <ChartLegendContent className="flex-wrap gap-x-4 gap-y-1" />
                }
              />
              <ReferenceLine
                y={projectedPeriodTotal}
                stroke="var(--color-top3Share)"
                strokeDasharray="4 4"
              />
              <Line
                dataKey="cumulativeRewards"
                stroke="var(--color-cumulativeRewards)"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
