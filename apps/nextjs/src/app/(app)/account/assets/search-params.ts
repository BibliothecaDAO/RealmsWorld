import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const walletCollectionFilterKey = "collection";
export const walletCollectionFilterParser = parseAsString;

export const walletPageSearchParamsCache = createSearchParamsCache({
  [walletCollectionFilterKey]: walletCollectionFilterParser,
});
