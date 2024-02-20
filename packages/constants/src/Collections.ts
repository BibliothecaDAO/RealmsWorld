import { ChainId } from "./Chains";

export enum Collections {
  REALMS = "realms",
  BEASTS = "beasts",
  GOLDEN_TOKEN = "goldentoken",
  BLOBERT = "blobert",
}

export const CollectionAddresses: {
  readonly [key in Collections]: Partial<{ [key in ChainId]: string }>;
} = {
  [Collections.REALMS]: {
    [ChainId.MAINNET]: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    [ChainId.SEPOLIA]: "0x3dc98f83a0f3ad77d44a68c6d15e08378de3df25",
  },
  [Collections.BEASTS]: {
    [ChainId.SN_MAIN]:
      "0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
    [ChainId.SN_SEPOLIA]:
      "0x03065c1db93be057c40fe92c9cba7f898de8d3622693d128e4e97fdc957808a3",
  },
  [Collections.GOLDEN_TOKEN]: {
    [ChainId.SN_MAIN]:
      "0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d",
    [ChainId.SN_SEPOLIA]:
      "0x024f21982680442892d2f7ac4cee98c7d62708b04fdf9f8a0453415baca4b16f",
  },
  [Collections.BLOBERT]: {
    [ChainId.SN_MAIN]: "",
    [ChainId.SN_SEPOLIA]:
      "0x069d6a10a83f2f84b37aa1ab140d610845c6e02c255d87ba0a5f7175a98ffcfe",
  },
};
export const CollectionRoyalties: {
  readonly [key in Collections]: number;
} = {
  [Collections.REALMS]: 0,
  [Collections.BEASTS]: 500,
  [Collections.GOLDEN_TOKEN]: 500,
  [Collections.BLOBERT]: 500,
};
export const CollectionDisplayName = {
  [Collections.REALMS]: "Realms",
  [Collections.BEASTS]: "Beasts",
  [Collections.GOLDEN_TOKEN]: "Golden Token",
  [Collections.BLOBERT]: "Blobert",
};

export function getCollectionAddresses(
  collectionName: string,
): Partial<{ [key in ChainId]: string }> {
  const normalizedCollectionName = collectionName as Collections;
  return CollectionAddresses[normalizedCollectionName];
}

export function getCollectionFromAddress(
  address: string,
): Collections | undefined {
  for (const collection in CollectionAddresses) {
    const chainAddresses = CollectionAddresses[collection as Collections];
    for (const chainId in chainAddresses) {
      if (chainAddresses[chainId as ChainId] === address) {
        return collection as Collections;
      }
    }
  }
  return undefined;
}
