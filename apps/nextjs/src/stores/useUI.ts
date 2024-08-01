"use client";

import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { createStore } from "zustand/vanilla";

import type { ChainId } from "@realms-world/constants";

export interface NftBridgeModalProps {
  selectedTokenIds: string[];
  sourceChain: ChainId;
  //isTestnet?: boolean;
  onClose?: () => void;
  // onNftSelect: (nft: NftData) => void;
}

// Define the store's shape
export interface UIState {
  isSidebarOpen: boolean;
  isFilterOpen: boolean;
  isGrid: boolean;
  isAccountOpen: boolean;
  isStarknetLoginOpen: boolean;
  isStakingMigrationOpen: boolean;
  isNftBridgeOpen: boolean;
  nftBridgeModalProps: NftBridgeModalProps;
}

export interface UIActions {
  toggleSidebar: () => void;
  toggleFilter: () => void;
  toggleGrid: () => void;
  toggleAccount: () => void;
  toggleStarknetLogin: () => void;
  toggleStakingMigration: () => void;
  toggleNftBridge: () => void;
  setNftBridgeModalProps: (props: NftBridgeModalProps) => void;
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
  isNftBridgeOpen: false,
  nftBridgeModalProps: {
    selectedTokenIds: [],
    sourceChain: SUPPORTED_L1_CHAIN_ID,
  },
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
      set((state) => ({
        isStakingMigrationOpen: !state.isStakingMigrationOpen,
      })),
    toggleNftBridge: () =>
      set((state) => ({
        isNftBridgeOpen: !state.isNftBridgeOpen,
      })),
    setNftBridgeModalProps: (props: NftBridgeModalProps) =>
      set({ nftBridgeModalProps: props }),
  }));
};
