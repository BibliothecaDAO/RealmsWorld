"use client"

import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider("mainnet"),
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
              apiKey: process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
            },
          ],
        }}
        theme={theme}
      >
        <WagmiConfig client={wagmiClient}>
          {children}
        </WagmiConfig>
      </ReservoirKitProvider>
  );
}
