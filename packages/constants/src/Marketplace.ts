import { ChainId } from "./Chains";
import { Collections } from "./Collections";

export const MarketplaceCollectionIds = {
  [Collections.BEASTS]: 2,
  [Collections.GOLDEN_TOKEN]: 1,
};

export const MarketplaceContract: Record<number | string, string> = {
  [ChainId.SN_MAIN]: "",
  [ChainId.SN_SEPOLIA]:
    "0x0297e088cd7777bebda7024e2dde81e9b745f41e5de0589c91de5caa885d9c32",
};
