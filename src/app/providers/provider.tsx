"use client";

import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, arbitrum, goerli } from "wagmi/chains";
//import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { publicProvider } from "wagmi/providers/public";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
  appName: "Atlas",
  projectId,
  chains,
});
const appInfo = {
  appName: "Atlas",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
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
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider appInfo={appInfo} chains={chains}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ReservoirKitProvider>
  );
}
