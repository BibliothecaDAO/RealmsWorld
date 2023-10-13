"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { ModalProvider } from "@/app/providers/ModalProvider";

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
  isStarknetLoginOpen: boolean;
  toggleStarknetLogin: () => void;
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
  const [isStarknetLoginOpen, setStarknetLoginOpen] = useState<boolean>(false);

  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [isGrid, setGrid] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleAccount = () => {
    setAccountOpen(!isAccountOpen);
  };

  const toggleStarknetLogin = () => {
    setStarknetLoginOpen(!isStarknetLoginOpen);
  };

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const toggleGrid = () => {
    setGrid(!isGrid);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar,
    isAccountOpen,
    toggleAccount,
    isStarknetLoginOpen,
    toggleStarknetLogin,
    isFilterOpen,
    toggleFilter,
    isGrid,
    toggleGrid,
  };

  return (
    <UIContext.Provider value={value}>
      <ModalProvider>{children}</ModalProvider>
    </UIContext.Provider>
  );
};
