import { describe, it, expect } from "vitest"
import { ArkClient } from "./client";

describe('ArkClient', () => {
  it('should work', async () => {
    const client = new ArkClient(() => ({ json: () => Promise.resolve({}) }), 'http://localhost:9999');
    expect(await client.fetch('shouldwork')).toEqual({});
  });
});
