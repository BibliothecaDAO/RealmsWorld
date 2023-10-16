"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { ChartData } from "chart.js";

const PieChart: React.FC<{ data: ChartData<"pie">, label?: string }> = ({ data, label }) => {

    return (
        <div>
            <Pie data={data} options={
                {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                }
            } />
            {label && <div className="text-center font-bold">{label}</div>}
        </div>
    );
};

export default PieChart;