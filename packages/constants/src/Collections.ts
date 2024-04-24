import { ChainId } from "./Chains";
import { Studios } from "./Studios";

export enum Collections {
  REALMS = "realms",
  BEASTS = "beasts",
  GOLDEN_TOKEN = "goldentoken",
  BLOBERT = "blobert",
  BANNERS = 'banners'
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
    [ChainId.SN_MAIN]:
      "0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",
    [ChainId.SN_SEPOLIA]:
      "0x007075083c7f643a2009cf1dfa28dfec9366f7d374743c2e378e03c01e16c3af",
  },
  [Collections.BANNERS]: {
    [ChainId.SN_MAIN]:
      "0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1",
    [ChainId.SN_SEPOLIA]:
      "",
  },
};
export const CollectionDetails: {
  readonly [key in Collections]: {
    royalties: number;
    displayName: string;
    developer: Studios;
  };
} = {
  [Collections.REALMS]: {
    royalties: 0,
    displayName: "Realms",
    developer: Studios.BIBLIO_DAO,
  },
  [Collections.BEASTS]: {
    royalties: 500,
    displayName: "Beasts",
    developer: Studios.BIBLIO_DAO,
  },
  [Collections.GOLDEN_TOKEN]: {
    royalties: 500,
    displayName: "Golden Token",
    developer: Studios.BIBLIO_DAO,
  },
  [Collections.BLOBERT]: {
    royalties: 500,
    displayName: "Blobert",
    developer: Studios.BIBLIO_DAO,
  },
  [Collections.BANNERS]: {
    royalties: 500,
    displayName: "Pixel Banners (for Adventurers)",
    developer: Studios.BANNERS_FOR_ADVENTURERS,
  },
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
