"use client";

import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider as StarkProvider } from "starknet";
import { WebWalletConnector } from "@argent/starknet-react-webwallet-connector";

enum StarknetChainId {
  SN_MAIN = "0x534e5f4d41494e",
  SN_GOERLI = "0x534e5f474f45524c49",
  SN_GOERLI2 = "0x534e5f474f45524c4932",
}
const starkConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
  new WebWalletConnector({
    url: "https://web.argent.xyz",
  }),
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
const testnetProvider = new StarkProvider({
  sequencer: {
    baseUrl: "https://alpha4.starknet.io",
    feederGatewayUrl: "https://alpha4.starknet.io/feeder_gateway",
    chainId: StarknetChainId.SN_GOERLI,
    gatewayUrl: "https://alpha4.starknet.io/gateway",
  },
});
const mainnetProvider = new StarkProvider({
  sequencer: {
    baseUrl: "https://alpha-mainnet.starknet.io",
    feederGatewayUrl: "https://alpha-mainnet.starknet.io/feeder_gateway",
    chainId: StarknetChainId.SN_MAIN,
    gatewayUrl: "https://alpha-mainnet.starknet.io/gateway",
  },
});
const projectId = "YOUR_PROJECT_ID";

export function Provider({ children }: any) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StarknetConfig
        autoConnect
        defaultProvider={
          process.env.NEXT_PUBLIC_IS_TESTNET ? testnetProvider : mainnetProvider
        }
        //@ts-ignore
        connectors={starkConnectors}
        // queryClient={queryClient}
      >
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
