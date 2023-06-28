"use client";
import React, { useState } from "react";
import "./TabbedView.css";

interface TabInfo {
    name: string;
    component: React.ReactNode;
}

interface TabbedViewProps {
    tabs: TabInfo[];
    initialActiveTab: string;
}

const TabbedView: React.FC<TabbedViewProps> = ({ tabs, initialActiveTab }) => {
    const [activeTab, setActiveTab] = useState(initialActiveTab);
    const activeComponent = tabs.find((tab) => tab.name === activeTab)?.component;

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <div className="tab-container">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => handleTabChange(tab.name)}
                        className={`tab-button ${activeTab === tab.name ? "active" : "inactive"
                            }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            {activeComponent}
        </div>
    );
};

export default TabbedView;