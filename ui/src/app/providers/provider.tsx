"use client";

import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const starkConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...(process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? [goerli] : [mainnet])],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";

export function Provider({ children }: any) {
  const [queryClient] = useState(() => new QueryClient());

  //TODO update wagmi config for testnet env NEXT_PUBLIC_IS_TESTNET once v1 ecosystem is ready
  return (
    <QueryClientProvider client={queryClient}>
      <StarknetConfig autoConnect connectors={starkConnectors}>
        <ReservoirKitProvider
          options={{
            chains: [
              {
                id: 1,
                baseApiUrl: "https://api.reservoir.tools",
                active: true,
                apiKey: process.env.RESERVOIR_API_KEY,
              },
            ],
          }}
          theme={theme}
        >
          <WagmiConfig
            config={createConfig(
              getDefaultConfig({
                appName: "RAW: Atlas",
                alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API,
                chains,
                walletConnectProjectId:
                  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
              })
            )}
          >
            <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
          </WagmiConfig>
        </ReservoirKitProvider>
      </StarknetConfig>
    </QueryClientProvider>
  );
}
