"use client";

import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, arbitrum } from "wagmi/chains";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const chains = [mainnet, arbitrum];

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

export function Provider({ children }: any) {
  return (
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
        client={createClient(
          getDefaultClient({
            appName: "RAW: Atlas",
            alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API,
            chains,
          })
        )}
      >
        <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
      </WagmiConfig>
    </ReservoirKitProvider>
  );
}
