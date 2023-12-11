import { ChainId } from "./Chains";
import { Collections } from "./Collections";

export const MarketplaceCollectionIds = {
  [Collections.BEASTS]: 2,
  [Collections.GOLDEN_TOKEN]: 1,
};

export const MarketplaceContract: Record<number | string, string> = {
  [ChainId.SN_MAIN]: "",
  [ChainId.SN_GOERLI]:
    "0x07724c0cc6d78237b0c6103eb545c4f8560389145d87e02057c093bc9c275cd0",
};
