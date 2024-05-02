"use client";

import type { ReactElement } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { darkTheme, ReservoirKitProvider } from "@reservoir0x/reservoir-kit-ui";
import {
  mainnet as starkMainnet,
  sepolia as starkSepolia,
} from "@starknet-react/chains";
import {
  blastProvider,
  StarknetConfig,
  publicProvider as starkPublicProvider,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { TransferLogProvider } from "./TransferLogProvider";

const starkProvider = process.env.NEXT_PUBLIC_BLAST_API
  ? blastProvider({
      apiKey: process.env.NEXT_PUBLIC_BLAST_API,
    })
  : starkPublicProvider();
const starkConnectors = [
  new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
  new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
  new WebWalletConnector({
    url: "https://web.argent.xyz",
  }),
  new ArgentMobileConnector(),
];
const isTestnet = process.env.NEXT_PUBLIC_IS_TESTNET === "true";

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

export const config = getDefaultConfig({
  appName: "Realms.World",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [isTestnet ? sepolia : mainnet],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});

export function Provider({ children }: { children: ReactElement }) {
  return (
    <StarknetConfig
      autoConnect
      chains={[
        ...(process.env.NEXT_PUBLIC_IS_TESTNET === "true"
          ? [starkSepolia]
          : [starkMainnet]),
      ]}
      provider={starkProvider}
      connectors={starkConnectors}
    >
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <TransferLogProvider>
            <ReservoirKitProvider
              options={{
                apiKey: process.env.RESERVOIR_API_KEY,
                chains: [
                  {
                    id: 1,
                    name: "mainnet",
                    baseApiUrl: "https://api.reservoir.tools",
                    active: true,
                  },
                  {
                    id: 11155111,
                    name: "sepolia",
                    baseApiUrl: "https://api-sepolia.reservoir.tools",
                    active: true,
                  },
                ],
              }}
              theme={theme}
            >
            {children}
            </ReservoirKitProvider>
          </TransferLogProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </StarknetConfig>
  );
}
