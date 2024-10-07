"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PureComponent } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["rgb(42, 43, 36)", "rgb(251, 225, 187, 0.3)", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fbe1bb"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {name} <br />
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface LordsChartProps {
  accounts: Record<string, {
    name: string;
    address: string;
    value: number;
}>;
}
export default class LordsChart extends PureComponent<LordsChartProps> {
  render() {
    const {accounts} = this.props
    return (
      <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
        <PieChart width={400} height={400}>
          <Pie
            data={Object.values(accounts)}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {Object.values(accounts).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                name={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
