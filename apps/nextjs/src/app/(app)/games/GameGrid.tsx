
import { GameCard } from "./GameCard";
import { reader } from "@/utils/keystatic";

export const GameGrid = async () => {
    const games = await reader.collections.games.all();


    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game, index) => (
                <GameCard key={index} game={game.entry} slug={game.slug} />
            ))}
        </div>
    );
};
