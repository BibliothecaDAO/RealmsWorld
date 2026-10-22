import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import { StandardDisconnect } from "@starknet-io/get-starknet-core";
import Controller from "@cartridge/controller";
import { env } from "env";

import { expectedStarknetChainId } from "./starknet-chain";

// Module-level singleton so `extraWallets` keeps a stable identity. The
// Controller constructor guards every `window` access and `lazyload` defers the
// keychain iframe until first use, so creating it during SSR is safe.
export const cartridgeController = new Controller({
  slot: env.VITE_PUBLIC_SLOT,
  defaultChainId: expectedStarknetChainId,
  chains: [
    { rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia/rpc/v0_9" },
    { rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet/rpc/v0_9" },
  ],
  lazyload: true,
});

const controllerWallet = cartridgeController.asWalletStandard();

/**
 * Controller's account extends starknet.js `WalletAccount`, whose
 * `accountsChanged` handler runs `res[0].toLowerCase()` and so throws on the
 * empty list Controller emits as the last step of `disconnect()`. By then the
 * session, keychain and wallet-standard state are already cleared, so treat
 * that specific error as a successful disconnect.
 */
const isEmptyAccountsChangedError = (error: unknown) =>
  error instanceof TypeError && error.message.includes("toLowerCase");

async function disconnect() {
  try {
    await controllerWallet.features[StandardDisconnect].disconnect();
  } catch (error) {
    if (!isEmptyAccountsChangedError(error)) throw error;
  }
}

// Getters, not a spread: `accounts` and `chains` must stay live.
export const cartridgeControllerWallet: WalletWithStarknetFeatures = {
  get version() {
    return controllerWallet.version;
  },
  get name() {
    return controllerWallet.name;
  },
  get icon() {
    return controllerWallet.icon;
  },
  get chains() {
    return controllerWallet.chains;
  },
  get accounts() {
    return controllerWallet.accounts;
  },
  get features() {
    return {
      ...controllerWallet.features,
      [StandardDisconnect]: { version: "1.0.0", disconnect },
    };
  },
};
