import type { Collections, Game } from "@realms-world/constants";

export const getGamesByContract = (games: Game[], contractAddress: string) => {
  return games.filter((game: any) => {
    return game.collections.some(
      (collection: Collections) => collection === contractAddress,
    );
  });
};
