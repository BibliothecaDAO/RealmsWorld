import { describe, expect, it } from "vitest";

import { ArkClient } from "./client";

describe("ArkClient", () => {
  it("should work", async () => {
    const client = new ArkClient(
      // @ts-expect-error testing mock may not cause type errors...
      () => ({ json: () => Promise.resolve({}) }),
      "http://localhost:9999",
    );
    expect(await client.fetch("shouldwork")).toEqual({});
  });
});
