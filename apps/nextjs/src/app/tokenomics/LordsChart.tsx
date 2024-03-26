"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PureComponent } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export const data = [
  {
    name: "Development",
    value: 119940000,
    description: "Development account to be used over the next 7 years.",
  },
  {
    name: "Frontinus House",
    value: 39649999,
    description: "DAO Prop house allocation.",
  },
  {
    name: "Emmissions",
    value: 158863701,
    description: "Game emmissions to be distributed over next 7 years.",
  },
  {
    name: "DAO Locked",
    value: 10000000,
    description: "Reserved for OTC raise.",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {name} <br />
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class LordsChart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" maxHeight={500}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
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
