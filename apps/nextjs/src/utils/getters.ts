export const getGamesByContract = (games: any, contractAddress: string) => {
    return games.filter((game: any) => {
        return game.compatibleTokens.some((token: any) => token.contract === contractAddress);
    });
};