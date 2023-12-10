"use client";

import { darkTheme, ReservoirKitProvider } from "@reservoir0x/reservoir-kit-ui";
import {
  goerli as starkGoerli,
  mainnet as starkMainnet,
} from "@starknet-react/chains";
import {
  blastProvider,
  StarknetConfig,
  publicProvider as starkPublicProvider,
} from "@starknet-react/core";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

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

const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

const { chains } = configureChains(
  [...(process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? [goerli] : [mainnet])],
  [publicProvider()],
);

export function Provider({ children }: any) {
  return (
    <StarknetConfig
      autoConnect
      chains={[
        ...(process.env.NEXT_PUBLIC_IS_TESTNET === "true"
          ? [starkGoerli]
          : [starkMainnet]),
      ]}
      provider={starkProvider}
      connectors={starkConnectors}
    >
      <WagmiConfig
        config={createConfig(
          getDefaultConfig({
            appName: "Realms.World",
            alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API,
            chains,
            walletConnectProjectId:
              process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
          }),
        )}
      >
        <ConnectKitProvider theme="midnight">
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
                    id: 5,
                    name: "goerli",
                    baseApiUrl: "https://api-goerli.reservoir.tools",
                    active: true,
                  },
                ],
              }}
              theme={theme}
            >
              {children}
            </ReservoirKitProvider>
          </TransferLogProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </StarknetConfig>
  );
}
