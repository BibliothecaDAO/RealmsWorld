import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import { StarknetWalletApi } from "@starknet-io/get-starknet-core";

const LAST_CONNECTED_WALLET_KEY = "starknetLastConnectedWallet";
const AUTO_RECONNECT_DISABLED_KEY = "starknetAutoReconnectDisabled";

// localStorage is unavailable during SSR and can throw in locked-down browsers.
const readStorage = (key: string): string | null => {
  try {
    return typeof window === "undefined" ? null : localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string | null) => {
  try {
    if (typeof window === "undefined") return;
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch {
    // Persisting wallet preferences is best effort.
  }
};

export const getLastConnectedWalletName = () =>
  readStorage(LAST_CONNECTED_WALLET_KEY);

/** Remembers a manually connected wallet and re-enables auto-reconnect. */
export const setLastConnectedWallet = (walletName: string) => {
  writeStorage(LAST_CONNECTED_WALLET_KEY, walletName);
  writeStorage(AUTO_RECONNECT_DISABLED_KEY, null);
};

/** Called on explicit disconnect; the last wallet name is kept for "Recently used". */
export const disableAutoReconnect = () => {
  writeStorage(AUTO_RECONNECT_DISABLED_KEY, "true");
};

export const isAutoReconnectDisabled = () =>
  readStorage(AUTO_RECONNECT_DISABLED_KEY) === "true";

export const getLastConnector = (
  connectors: WalletWithStarknetFeatures[],
): WalletWithStarknetFeatures | null => {
  const lastWalletName = getLastConnectedWalletName();
  if (lastWalletName) {
    const connector = connectors.find((item) => item.name === lastWalletName);
    return connector ?? null;
  }
  return null;
};

export const getConnectorIcon = (
  connector: WalletWithStarknetFeatures | undefined,
) => {
  if (!connector) return "";
  return connector.icon;
};

const CARTRIDGE_CONTROLLER_WALLET_ID = "controller";

const getWalletId = (connector: WalletWithStarknetFeatures) =>
  connector.features[StarknetWalletApi]?.id;

/**
 * Matches by wallet id rather than object identity: Controller also registers
 * its own wallet-standard wrapper on construction, so a connected Controller
 * may be either that wrapper or the one passed to `extraWallets`.
 */
export const isCartridgeController = (
  connector: WalletWithStarknetFeatures | undefined,
) =>
  connector !== undefined &&
  getWalletId(connector) === CARTRIDGE_CONTROLLER_WALLET_ID;

/**
 * Drops repeated wallets (same wallet id), keeping the last occurrence so
 * `extraWallets` win over self-registered copies, in first-seen order.
 */
export const dedupeConnectors = (
  connectors: WalletWithStarknetFeatures[],
): WalletWithStarknetFeatures[] => {
  const byId = new Map<string, WalletWithStarknetFeatures>();
  for (const connector of connectors) {
    byId.set(getWalletId(connector) ?? connector.name, connector);
  }
  return [...byId.values()];
};
