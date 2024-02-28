/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RouterOutputs } from "@realms-world/api";
import type { Collections, Game } from "@realms-world/constants";
import { CollectionAddresses } from "@realms-world/constants";

export const getGamesByContract = (
  games: Game[],
  contractAddress: string,
): Game[] => {
  return (
    games.filter((game: Game) => {
      return game.collections?.some(
        (collection: Collections) => collection === contractAddress,
      );
    }) || []
  );
};

export function findCollectionKeyByAddress(
  address: string,
): keyof Collections | null {
  for (const collectionKey in CollectionAddresses) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const chainAddresses = (CollectionAddresses as any)[collectionKey];
    for (const chainId in chainAddresses) {
      if (chainAddresses[chainId] === address) {
        return collectionKey as keyof Collections;
      }
    }
  }
  return null; // Address not found in any collection
}

export function findLowestPriceActiveListing(
  listings: RouterOutputs["erc721MarketEvents"]["all"]["items"],
  owner?: string | null,
) {
  const activeListings = listings?.filter(
    (listing: any) =>
      listing.active &&
      listing.created_by === owner &&
      listing.expiration > Math.floor(Date.now() / 1000),
  );

  const lowestPriceActiveListing = activeListings?.reduce(
    (minPriceListing, currentListing) =>
      (currentListing.price ?? 0) < (minPriceListing?.price ?? 0)
        ? currentListing
        : minPriceListing,
    activeListings[0],
  );

  return lowestPriceActiveListing;
}
