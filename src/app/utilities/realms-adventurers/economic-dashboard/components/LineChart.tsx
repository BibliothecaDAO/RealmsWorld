// LineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { LineViewData } from "../widgets/WidgetViewTypes";

interface ExchangeRate {
    date: string;
    hour: number;
    tokenId: number;
    amount: number;
    buyAmount: number;
    sellAmount: number;
}

interface LineChartProps {
    data: ExchangeRate[];
    label?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, label }) => {
    const chartData: ChartData<"line"> = {
        labels: data.map((item) => `${item.date} ${item.hour}:00`),
        datasets: [
            {
                label: "Amount",
                data: data.map((item) => item.amount),
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
            },
            {
                label: "Buy Amount",
                data: data.map((item) => item.buyAmount),
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
            },
            {
                label: "Sell Amount",
                data: data.map((item) => item.sellAmount),
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Amount",
                },
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
            {label && <div className="text-center">{label}</div>}
        </div>
    );
};

export default LineChart;