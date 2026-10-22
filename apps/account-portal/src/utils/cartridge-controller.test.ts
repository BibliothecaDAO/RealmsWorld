import { StandardDisconnect } from "@starknet-io/get-starknet-core";
import { beforeEach, describe, expect, it, vi } from "vitest";

const innerDisconnect = vi.fn<() => Promise<void>>();

vi.mock("env", () => ({ env: { VITE_PUBLIC_SLOT: "test" } }));
vi.mock("@cartridge/controller", () => ({
  default: class {
    asWalletStandard() {
      return {
        version: "1.0.0",
        name: "Controller",
        icon: "",
        chains: [],
        accounts: [],
        features: {
          [StandardDisconnect]: { version: "1.0.0", disconnect: innerDisconnect },
        },
      };
    }
  },
}));

const { cartridgeControllerWallet } = await import("./cartridge-controller");
const disconnect = () =>
  cartridgeControllerWallet.features[StandardDisconnect].disconnect();

describe("cartridgeControllerWallet disconnect", () => {
  beforeEach(() => {
    innerDisconnect.mockReset();
  });

  it("treats starknet.js's empty accountsChanged crash as success", async () => {
    innerDisconnect.mockRejectedValue(
      new TypeError(
        "Cannot read properties of undefined (reading 'toLowerCase')",
      ),
    );
    await expect(disconnect()).resolves.toBeUndefined();
  });

  it("still surfaces other disconnect errors", async () => {
    innerDisconnect.mockRejectedValue(new Error("keychain unavailable"));
    await expect(disconnect()).rejects.toThrow("keychain unavailable");
  });
});
