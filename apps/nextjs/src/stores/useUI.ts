"use client";

import type { ReactNode } from "react";
import React from "react";
import { ModalProvider } from "@/providers/ModalProvider";
import { createStore } from "zustand/vanilla";

// Define the store's shape
export interface UIState {
  isSidebarOpen: boolean;
  isFilterOpen: boolean;
  isGrid: boolean;
  isAccountOpen: boolean;
  isStarknetLoginOpen: boolean;
  isStakingMigrationOpen: boolean;
}

export interface UIActions {
  toggleSidebar: () => void;
  toggleFilter: () => void;
  toggleGrid: () => void;
  toggleAccount: () => void;
  toggleStarknetLogin: () => void;
  toggleStakingMigration: () => void;
}

export type UIStore = UIActions & UIState;
// Define initial state
export const initialState: UIState = {
  isSidebarOpen: false,
  isFilterOpen: false,
  isGrid: true,
  isAccountOpen: false,
  isStarknetLoginOpen: false,
  isStakingMigrationOpen: false,
};
// Create the store using zustand
export const createUIStore = (initState: UIState = initialState) => {
  return createStore<UIStore>((set) => ({
    ...initState,
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
    toggleGrid: () => set((state) => ({ isGrid: !state.isGrid })),
    toggleAccount: () =>
      set((state) => ({ isAccountOpen: !state.isAccountOpen })),
    toggleStarknetLogin: () =>
      set((state) => ({ isStarknetLoginOpen: !state.isStarknetLoginOpen })),
    toggleStakingMigration: () =>
      set((state) => ({ isStakingMigrationOpen: !state.isStakingMigrationOpen })),
  }));
};

// Export the useUIStore hook for components to access the store
