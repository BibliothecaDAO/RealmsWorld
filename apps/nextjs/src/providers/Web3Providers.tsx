"use client";

import type { ReactElement } from "react";
import ControllerConnector from "@cartridge/connector/controller";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { darkTheme, ReservoirKitProvider } from "@reservoir0x/reservoir-kit-ui";
import {
  mainnet as starkMainnet,
  sepolia as starkSepolia,
} from "@starknet-react/chains";
import {
  //argent,
  blastProvider,
  //braavos,
  StarknetConfig,
  publicProvider as starkPublicProvider,
  //useInjectedConnectors,
} from "@starknet-react/core";
import { env } from "env";
import { constants } from "starknet";
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";
import { http, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { TransferLogProvider } from "./TransferLogProvider";

const starkProvider = env.NEXT_PUBLIC_BLAST_API
  ? blastProvider({
      apiKey: env.NEXT_PUBLIC_BLAST_API,
    })
  : starkPublicProvider();

const isTestnet = env.NEXT_PUBLIC_IS_TESTNET === "true";
const theme = "eternum";
const slot = "realms-world-04";
const namespace = "eternum";
const colorMode = "dark";

const cartridgeController = new ControllerConnector({
  policies: [],
  rpc:
    "https://api.cartridge.gg/x/starknet/" +
    (isTestnet ? "sepolia" : "mainnet"),
  theme,
  colorMode,
  namespace,
  slot,
});

const starkConnectors = isInArgentMobileAppBrowser()
  ? [
      ArgentMobileConnector.init({
        options: {
          url: typeof window !== "undefined" ? window.location.href : "",
          dappName: "Realms.World",
          chainId: isTestnet
            ? constants.NetworkName.SN_SEPOLIA
            : constants.NetworkName.SN_MAIN,
        },
      }),
    ]
  : [
      cartridgeController,
      new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
      new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
      ArgentMobileConnector.init({
        options: {
          url: typeof window !== "undefined" ? window.location.href : "",
          dappName: "Realms.World",
          chainId: isTestnet
            ? constants.NetworkName.SN_SEPOLIA
            : constants.NetworkName.SN_MAIN,
        },
      }),
      new WebWalletConnector({
        url: "https://web.argent.xyz",
      }),
    ];

const reservoirTheme = darkTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
});

export const config = getDefaultConfig({
  appName: "Realms.World",
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [isTestnet ? sepolia : mainnet],
  ssr: true,
  transports: isTestnet ? { [sepolia.id]: http() } : { [mainnet.id]: http() },
});

export function Web3Providers({ children }: { children: ReactElement }) {
  /*const { connectors: starkConnectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "always",
    // Randomize the order of the connectors.
    order: "alphabetical",
  });*/
  return (
    <StarknetConfig
      chains={[
        ...(env.NEXT_PUBLIC_IS_TESTNET === "true"
          ? [starkSepolia]
          : [starkMainnet]),
      ]}
      provider={starkProvider}
      connectors={starkConnectors}
      autoConnect
    >
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <TransferLogProvider>
            <ReservoirKitProvider
              options={{
                apiKey: env.NEXT_PUBLIC_RESERVOIR_API_KEY,
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
              theme={reservoirTheme}
            >
              {children}
            </ReservoirKitProvider>
          </TransferLogProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </StarknetConfig>
  );
}
