"use client";
import React, { useState, useEffect, useMemo } from "react";
import { WidgetType, WidgetViewData } from "../widgets/DashboardWidget";
import { PieViewData, TextViewData, LineViewData } from "../widgets/WidgetViewTypes";
import Table from "./Table";
import PieChartGrid from "./PieChartGrid";
import TextViewGrid from "./TextViewGrid";
import LineChart from "./LineChart";
import WidgetList from "../widgets/WidgetList";
import "@/app/components/TabbedView.css";

interface TabsProps {
    initialActiveTab: string;
    initialViewType: WidgetType;
}

const WidgetTabs: React.FC<TabsProps> = ({ initialActiveTab, initialViewType }) => {
    const [activeTab, setActiveTab] = useState(initialActiveTab);
    const [content, setContent] = useState<React.ReactNode>();
    const [viewType, setViewType] = useState<WidgetType>(initialViewType);

    const availableViewTypes = useMemo(() => (
        WidgetList.find((tab) => tab.widget.widgetName === activeTab)?.widget.types ||
        WidgetList.find((tab) => tab.widget.widgetName === initialActiveTab)?.widget.types
    ), [activeTab]);

    useEffect(() => {
        const fetchData = async () => {
            const activeWidget = WidgetList.find((tab) => tab.widget.widgetName === activeTab)?.widget;
            if (!activeWidget) return;

            const viewData = await activeWidget.getViewData(viewType);
            updateContent(viewData);
        };

        fetchData();
    }, [activeTab, viewType]);

    const updateContent = (viewData: WidgetViewData) => {
        const contentMap: Record<WidgetType, React.ReactNode> = {
            [WidgetType.Table]: <Table data={viewData.data} />,
            [WidgetType.Pie]: <PieChartGrid {...viewData as PieViewData} />,
            [WidgetType.Text]: <TextViewGrid {...viewData as TextViewData} />,
            [WidgetType.Line]: <LineChart {...viewData as LineViewData} />
        };

        setContent(contentMap[viewType]);
    };

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
        const activeWidget = WidgetList.find((tab) => tab.widget.widgetName === tabName);
        if (activeWidget) {
            setViewType(activeWidget.defaultView);
        }
    };

    const handleViewTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setViewType(event.target.value as WidgetType);
    };

    return (
        <div>
            <div className="tab-container">
                {WidgetList.map((tab) => (
                    <button
                        key={tab.widget.widgetName}
                        onClick={() => handleTabChange(tab.widget.widgetName)}
                        className={`tab-button ${activeTab === tab.widget.widgetName ? "active" : "inactive"
                            }`}
                    >
                        {tab.widget.widgetName}
                    </button>
                ))}
            </div>
            <h4>
                {WidgetList.find((tab) => tab.widget.widgetName === activeTab)?.widget
                    .description}
            </h4>
            <p>Select Visualization Type:</p>
            <select
                id="viewTypeSelector"
                value={viewType}
                onChange={handleViewTypeChange}
                className="mt-2 mb-2 bg-blue-200 text-black"
            >
                {availableViewTypes?.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {content}
        </div>
    );
};

export default WidgetTabs;