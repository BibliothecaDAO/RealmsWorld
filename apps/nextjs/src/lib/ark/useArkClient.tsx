"use client"

import React, { useContext, useEffect } from "react";
import type { ArkClient } from "./client";
import { marketPlaceClientBuilder, orderbookClientBuilder } from "./client";
import { ArkProvider } from "@ark-project/react";
import { getArkNetwork } from "@/constants/env";

export const ArkClientContext = React.createContext<ArkClientsContext>({
  marketplace: marketPlaceClientBuilder(fetch),
  orderbook: orderbookClientBuilder(fetch),
});

interface ArkClientsContext {
  marketplace: ArkClient;
  orderbook: ArkClient;
}

// https://starknet-react.com/docs/getting-started
// StarknetProvider is defined in Web3Provider
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

  const config = {
    starknetNetwork: getArkNetwork(),
    arkchainNetwork: getArkNetwork(),
  }

  return (
    <ArkProvider config={config}>
      <ArkClientContext.Provider value={{ marketplace, orderbook }}>
        {children}
      </ArkClientContext.Provider>
    </ArkProvider>
  );
}

export function useArkClient(): ArkClientsContext {
  return useContext(ArkClientContext);
}
