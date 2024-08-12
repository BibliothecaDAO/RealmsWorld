import { describe, it, mock, expect } from "bun:test"
import { erc721Tokens } from "@/constants";
import { ChainType } from "@/constants/tokens";
import { getCollections } from "./getCollection";
import { ArkClient } from "./client";

describe('ArkApi', () => {
  const fetchMock = mock(() => ({ json: () => Promise.resolve({}) }))
  const client = new ArkClient(fetchMock);

  it('should get collections', async () => {
    const collectionAddress = erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN] as string
    const response = await getCollections({ client, collectionAddress })

    expect(fetchMock.mock.calls.length).toBe(1)
  });
});
