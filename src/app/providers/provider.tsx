"use client";

//import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, arbitrum, goerli } from "wagmi/chains";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
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
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const starkConnectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
];

/*const theme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});*/

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...(process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? [goerli] : [mainnet])],
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
  //TODO update wagmi config for testnet env NEXT_PUBLIC_IS_TESTNET once v1 ecosystem is ready
  return (
    <StarknetConfig connectors={starkConnectors}>
      {/*<ReservoirKitProvider
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
      >*/}
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
      {/*</ReservoirKitProvider>*/}
    </StarknetConfig>
  );
}
