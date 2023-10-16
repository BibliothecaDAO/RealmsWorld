"use client";

import React, { useEffect, useMemo, useState } from "react";

import { WidgetType, WidgetViewData } from "../widgets/DashboardWidget";
import WidgetList from "../widgets/WidgetList";
import {
  LineViewData,
  PieViewData,
  TextViewData,
} from "../widgets/WidgetViewTypes";
import LineChart from "./LineChart";
import PieChartGrid from "./PieChartGrid";
import Table from "./Table";
import TextViewGrid from "./TextViewGrid";

interface TabsProps {
  initialActiveTab: string;
  initialViewType: WidgetType;
}

const WidgetTabs: React.FC<TabsProps> = ({
  initialActiveTab,
  initialViewType,
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [content, setContent] = useState<React.ReactNode>();
  const [viewType, setViewType] = useState<WidgetType>(initialViewType);

  const availableViewTypes = useMemo(
    () =>
      WidgetList.find((tab) => tab.widget.widgetName === activeTab)?.widget
        .types ||
      WidgetList.find((tab) => tab.widget.widgetName === initialActiveTab)
        ?.widget.types,
    [activeTab],
  );

  useEffect(() => {
    const fetchData = async () => {
      const activeWidget = WidgetList.find(
        (tab) => tab.widget.widgetName === activeTab,
      )?.widget;
      if (!activeWidget) return;

      const viewData = await activeWidget.getViewData(viewType);
      updateContent(viewData);
    };

    fetchData();
  }, [activeTab, viewType]);

  const updateContent = (viewData: WidgetViewData) => {
    const contentMap: Record<WidgetType, React.ReactNode> = {
      [WidgetType.Table]: <Table data={viewData.data} />,
      [WidgetType.Pie]: <PieChartGrid {...(viewData as PieViewData)} />,
      [WidgetType.Text]: <TextViewGrid {...(viewData as TextViewData)} />,
      [WidgetType.Line]: <LineChart {...(viewData as LineViewData)} />,
    };

    setContent(contentMap[viewType]);
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    const activeWidget = WidgetList.find(
      (tab) => tab.widget.widgetName === tabName,
    );
    if (activeWidget) {
      setViewType(activeWidget.defaultView);
    }
  };

  const handleViewTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setViewType(event.target.value as WidgetType);
  };

  return (
    <div>
      <div className="tab-container">
        {WidgetList.map((tab) => (
          <button
            key={tab.widget.widgetName}
            onClick={() => handleTabChange(tab.widget.widgetName)}
            className={`tab-button ${
              activeTab === tab.widget.widgetName ? "active" : "inactive"
            }`}
          >
            {tab.widget.widgetName}
          </button>
        ))}
      </div>
      <h4>
        {
          WidgetList.find((tab) => tab.widget.widgetName === activeTab)?.widget
            .description
        }
      </h4>
      <p>Select Visualization Type:</p>
      <select
        id="viewTypeSelector"
        value={viewType}
        onChange={handleViewTypeChange}
        className="mb-2 mt-2 bg-blue-200 text-black"
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
