"use client";

import type { ReactElement } from "react";
import { env } from "@/env";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
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
import { ArgentMobileConnector } from "starknetkit/argentMobile";
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

const starkConnectors = [
  new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
  new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
  new WebWalletConnector({
    url: "https://web.argent.xyz",
  }),
  new ArgentMobileConnector(),
];

const isTestnet = env.NEXT_PUBLIC_IS_TESTNET === "true";

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
      autoConnect
      chains={[
        ...(env.NEXT_PUBLIC_IS_TESTNET === "true"
          ? [starkSepolia]
          : [starkMainnet]),
      ]}
      provider={starkProvider}
      connectors={starkConnectors}
    >
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <TransferLogProvider>
            {children}
          </TransferLogProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </StarknetConfig>
  );
}
