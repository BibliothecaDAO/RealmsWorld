"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the UI context's shape
interface UIContextValue {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isFilterOpen: boolean;
  toggleFilter: () => void;
  isGrid: boolean;
  toggleGrid: () => void;
  isAccountOpen: boolean;
  toggleAccount: () => void;
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
  const [isAccountOpen, setAccountOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [isGrid, setGrid] = useState<boolean>(true);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle sidebar state
  const toggleAccount = () => {
    setAccountOpen(!isAccountOpen);
  };

  // Function to toggle filter state
  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  // Function to toggle grid state
  const toggleGrid = () => {
    setGrid(!isGrid);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar,
    isAccountOpen,
    toggleAccount,
    isFilterOpen,
    toggleFilter,
    isGrid,
    toggleGrid,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
