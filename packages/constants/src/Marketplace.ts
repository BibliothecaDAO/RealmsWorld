import { ChainId } from "./Chains";
import { Collections } from "./Collections";

export const MarketplaceCollectionIds = {
  [Collections.BEASTS]: 2,
  [Collections.GOLDEN_TOKEN]: 1,
};

export const MarketplaceContract: Record<number | string, string> = {
  [ChainId.SN_MAIN]: "",
  [ChainId.SN_GOERLI]:
    "0x51e8ff6ca9f95c9d727c2ce51e2f19972f95619bcc72c7ee00b6831c7ef16f3",
};
