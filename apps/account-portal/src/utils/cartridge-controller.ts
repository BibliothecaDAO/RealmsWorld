import Controller from "@cartridge/controller";
import { env } from "env";

import { expectedStarknetChainId } from "./starknet-chain";

// Module-level singleton so `extraWallets` keeps a stable identity. The
// Controller constructor guards every `window` access and `lazyload` defers the
// keychain iframe until first use, so creating it during SSR is safe.
const controller = new Controller({
  slot: env.VITE_PUBLIC_SLOT,
  defaultChainId: expectedStarknetChainId,
  chains: [
    { rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia/rpc/v0_9" },
    { rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet/rpc/v0_9" },
  ],
  lazyload: true,
});

export const cartridgeControllerWallet = controller.asWalletStandard();
