"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the UI context's shape
interface UIContextValue {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isFilterOpen: boolean;
  toggleFilter: () => void;
}

// Create the UI context
const UIContext = createContext<UIContextValue | undefined>(undefined);

// Custom hook to use UI context
export const useUIContext = (): UIContextValue => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIContextProvider");
  }
  return context;
};

// UI Context Provider component
interface UIContextProviderProps {
  children: ReactNode;
}

export const UIContextProvider: React.FC<UIContextProviderProps> = ({
  children,
}) => {
  // State for sidebar
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle filter state
  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar,
    isFilterOpen,
    toggleFilter,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
