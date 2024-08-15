import { describe, it, vi, expect, beforeEach } from "vitest"
import { erc721Tokens } from "@/constants";
import { ChainType } from "@/constants/tokens";
import { getCollections } from "./getCollection";
import type { Fetcher } from "./client";
import { ArkClient } from "./client";
import { getCollectionActivity } from "./getCollectionActivity";

describe('ArkApi', () => {
  let fetchMock: Fetcher<any>;
  let client: ArkClient;
  beforeEach(() => {
    fetchMock = vi.fn(() => ({ json: () => Promise.resolve({}) })) as Fetcher<any>;
    client = new ArkClient(fetchMock);
  });

  it('should get collections', async () => {
    const collectionAddress = erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN] as string
    const _ = await getCollections({ client, collectionAddress })

    expect(fetchMock.mock.calls.length).toBe(1)
  });

  it('should get collections activity', async () => {
    const collectionAddress = erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN] as string
    const _ = await getCollectionActivity({ client, collectionAddress, page: 10 })

    expect(fetchMock.mock.calls.length).toBe(1)
  });
});
