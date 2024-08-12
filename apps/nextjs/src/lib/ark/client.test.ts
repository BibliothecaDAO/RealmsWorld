import { ArkClient } from "./client";

describe('ArkClient', () => {
  it('should work', async () => {
    const client = new ArkClient(() => ({ json: () => Promise.resolve({}) }));
    expect(await client.fetch('shouldwork')).toEqual({});
  });
});
