"use client"

import React, { useContext, useEffect } from "react";
import type { ArkClient } from "./client";
import { marketPlaceClientBuilder, orderbookClientBuilder } from "./client";

export const ArkClientContext = React.createContext<ArkClientsContext>({
  marketplace: marketPlaceClientBuilder(fetch),
  orderbook: orderbookClientBuilder(fetch),
});

interface ArkClientsContext {
  marketplace: ArkClient;
  orderbook: ArkClient;
}

export function ArkClientProvider({ children }: { children: React.ReactNode }) {
  const [{ marketplace, orderbook }, setClients] = React.useState<ArkClientsContext>({
    marketplace: marketPlaceClientBuilder(fetch),
    orderbook: orderbookClientBuilder(fetch),
  });
  const [initialized, setInitialized] = React.useState(false);

  useEffect(() => {
    const marketplace = marketPlaceClientBuilder(window.fetch.bind(window));
    const orderbook = orderbookClientBuilder(window.fetch.bind(window));
    setClients({ marketplace, orderbook });
    setInitialized(true);
  }, [])
  if (!initialized) return null;

  return (
    <ArkClientContext.Provider value={{ marketplace, orderbook }}>
      {children}
    </ArkClientContext.Provider>
  );
}

export function useArkClient(): ArkClientsContext {
  return useContext(ArkClientContext);
}
