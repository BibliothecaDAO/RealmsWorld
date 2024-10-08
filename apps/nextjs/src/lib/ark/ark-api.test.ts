/* eslint-disable @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-explicit-any */
import { erc721Tokens } from "@/constants";
import { ChainType } from "@/constants/tokens";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Fetcher } from "./client";
import { ArkClient } from "./client";
import { getCollections } from "./getCollection";
import { getCollectionActivity } from "./getCollectionActivity";
import { getCollectionSearch } from "./getCollectionSearch";
import { getCollectionTokens } from "./getCollectionTokens";
import { getPortfolioActivity } from "./getPortfolioActivity";
import { getPortfolioCollections } from "./getPortfolioCollections";
import { getPortfolioTokens } from "./getPortfolioTokens";
import { getPrices } from "./getPrices";
import { getSystemStatus } from "./getSystemStatus";
import { getToken } from "./getToken";
import { getTokenActivity } from "./getTokenActivity";
import { getTokenMarketdata } from "./getTokenMarketdata";
import { getTokenOffers } from "./getTokenOffers";

// import { getPrices } from "./getPrices";
// import { Mobula } from "mobula-sdk";

// vi.spyOn(Mobula, 'Mobula').mockImplementation(() => ({
//   multiDataResponse: {
//     data: {
//       ethereum: {
//         price: 0.001,
//       },
//       starknet: {
//         price: 0.002,
//       }
//     },
//   },
// })
// );

vi.mock("mobula-sdk", () => {
  return {
    Mobula: vi.fn().mockImplementation(() => {
      return {
        fetchMultipleAssetMarketData: vi.fn().mockImplementation(() =>
          Promise.resolve({
            multiDataResponse: {
              data: {
                ethereum: { price: 0.001 },
                starknet: { price: 0.002 },
              },
            },
          }),
        ),
      };
    }),
  };
});

describe("ArkApi", () => {
  let fetchMock: Mock<Fetcher<any>>;
  let client: ArkClient;
  beforeEach(() => {

    // @ts-expect-error testing mock may not cause type errors...
    fetchMock = vi.fn(() => ({
      json: () => Promise.resolve({}),
    }));
    client = new ArkClient(fetchMock, "http://localhost:9999");
  });

  it("should get collections", async () => {
    const collectionAddress =
      erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN]!;
    await getCollections({ client, collectionAddress });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get collections activity", async () => {
    const collectionAddress =
      erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN]!;
    await getCollectionActivity({
      client,
      collectionAddress,
      page: 10,
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should search collections", async () => {
    await getCollectionSearch({ client, query: "Beast" });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get collection tokens", async () => {
    const collectionAddress =

      erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN]!;
    await getCollectionTokens({ client, collectionAddress });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get portfolio activity", async () => {
    await getPortfolioActivity({
      client,
      walletAddress: "0x1234567890123456789012345678901234567890",
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get portfolio collections", async () => {
    await getPortfolioCollections({
      client,
      walletAddress: "0x1234567890123456789012345678901234567890",
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get portfolio tokens", async () => {
    const collectionAddress =
      erc721Tokens.beasts.contractAddresses.L2[ChainType.L2.MAIN]!;
    await getPortfolioTokens({
      client,
      walletAddress: "0x1234567890123456789012345678901234567890",
      collectionAddress,
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get prices", async () => {
    const prices = await getPrices();

    expect(prices).toStrictEqual({
      ethereum: { price: 0.001 },
      starknet: { price: 0.002 },
    });
  });

  it("should get system status", async () => {
    await getSystemStatus({ client });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get token", async () => {
    await getToken({
      client,
      contractAddress: "0x1234567890123456789012345678901234567890",
      tokenId: 0,
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get token activity", async () => {
    await getTokenActivity({
      client,
      contractAddress: "0x1234567890123456789012345678901234567890",
      tokenId: 0,
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get token marketdata", async () => {
    await getTokenMarketdata({
      client,
      contractAddress: "0x1234567890123456789012345678901234567890",
      tokenId: 0,
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });

  it("should get token offers", async () => {
    await getTokenOffers({
      client,
      contractAddress: "0x1234567890123456789012345678901234567890",
      tokenId: 0,
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });
});
