import type { WalletWithStarknetFeatures } from "@starknet-io/get-starknet-core";
import { StarknetWalletApi } from "@starknet-io/get-starknet-core";
import { describe, expect, it } from "vitest";

import { dedupeConnectors, isCartridgeController } from "./connectWallet";

const wallet = (id: string, name = id) =>
  ({
    name,
    features: { [StarknetWalletApi]: { id } },
  }) as unknown as WalletWithStarknetFeatures;

describe("isCartridgeController", () => {
  it("matches any Controller wrapper by wallet id", () => {
    expect(isCartridgeController(wallet("controller", "Controller"))).toBe(
      true,
    );
    expect(isCartridgeController(wallet("argentX", "Argent X"))).toBe(false);
    expect(isCartridgeController(undefined)).toBe(false);
  });
});

describe("dedupeConnectors", () => {
  it("keeps the last wallet per id in first-seen order", () => {
    const selfRegistered = wallet("controller", "Controller");
    const argent = wallet("argentX", "Argent X");
    const extraWallet = wallet("controller", "Controller");

    expect(dedupeConnectors([selfRegistered, argent, extraWallet])).toEqual([
      extraWallet,
      argent,
    ]);
    expect(dedupeConnectors([selfRegistered, argent, extraWallet])[0]).toBe(
      extraWallet,
    );
  });
});
