"use client";

import type { UIStore } from "@/stores/useUI";
import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import { createContext, useContext, useState } from "react";
import { createUIStore, initialState } from "@/stores/useUI";
import { useStore } from "zustand";

export const UIStoreContext = createContext<StoreApi<UIStore> | null>(null);

export interface UIStoreProviderProps {
  children: ReactNode;
}

export const UIStoreProvider = ({ children }: UIStoreProviderProps) => {
  const [store] = useState(() => createUIStore(initialState));

  return (
    <UIStoreContext.Provider value={store}>{children}</UIStoreContext.Provider>
  );
};

export const useUIStore = <T,>(selector: (store: UIStore) => T): T => {
  const uIStoreContext = useContext(UIStoreContext);

  if (!uIStoreContext) {
    throw new Error(`useUIStore must be use within UIStoreProvider`);
  }

  return useStore(uIStoreContext, selector);
};
