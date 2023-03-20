"use client";

import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { getDefaultProvider } from "ethers";
import { mainnet, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API || "" }),
    publicProvider(),
  ]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

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
            default: true,
            apiKey: process.env.RESERVOIR_API_KEY,
          },
        ],
      }}
      theme={theme}
    >
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
    </ReservoirKitProvider>
  );
}
