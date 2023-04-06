"use client"
import React from "react";
import PieChart from "./PieChart"
import { PieViewData } from "../widgets/WidgetViewTypes";

const PieChartGrid: React.FC<PieViewData> = ({ data }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1">
            {data.map((resourceEntry, index) => (
                <div className="max-w-xs hover:shadow-lg transition-shadow duration-200" key={index}>
                    <PieChart data={resourceEntry.data} label={resourceEntry.resource} />
                </div>
            ))}
        </div>
    );
};

export default PieChartGrid;