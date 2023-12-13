import { ChainId } from "./Chains";

export enum Collections {
  REALMS = "Realms",
  BEASTS = "Beasts",
  GOLDEN_TOKEN = "Golden Token",
}

export const CollectionAddresses: {
  readonly [key in Collections]: Partial<{ [key in ChainId]: string }>;
} = {
  [Collections.REALMS]: {
    [ChainId.MAINNET]: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    [ChainId.GOERLI]: "0x3dc98f83a0f3ad77d44a68c6d15e08378de3df25",
  },
  [Collections.BEASTS]: {
    [ChainId.SN_MAIN]:
      "0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
    [ChainId.SN_GOERLI]:
      "0x071f603af70d1570600de027af3edae09a5869b7b6d38e27315a77d9db79f45e",
  },
  [Collections.GOLDEN_TOKEN]: {
    [ChainId.SN_MAIN]:
      "0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d",
    [ChainId.SN_GOERLI]:
      "0x003583470a8943479f8609192da4427cac45bdf66a58c84043c7ab2fc722c0c0",
  },
};
export const CollectionRoyalties: {
  readonly [key in Collections]: number;
} = {
  [Collections.REALMS]: 0,
  [Collections.BEASTS]: 500,
  [Collections.GOLDEN_TOKEN]: 500,
};
