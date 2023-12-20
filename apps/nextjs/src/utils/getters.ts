import type { ChainId, Collections, Game } from "@realms-world/constants";
import { CollectionAddresses } from "@realms-world/constants";

export const getGamesByContract = (games: Game[], contractAddress: string) => {
  return games.filter((game: any) => {
    return game.collections.some(
      (collection: Collections) => collection === contractAddress,
    );
  });
};

export function findCollectionKeyByAddress(
  address: string,
): keyof Collections | null {
  for (const collectionKey in CollectionAddresses) {
    const chainAddresses = (CollectionAddresses as any)[collectionKey];
    for (const chainId in chainAddresses) {
      if (chainAddresses[chainId] === address) {
        return collectionKey as keyof Collections;
      }
    }
  }
  return null; // Address not found in any collection
}
