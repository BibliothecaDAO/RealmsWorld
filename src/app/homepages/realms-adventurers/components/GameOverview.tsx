// components/Overview.tsx
import React from "react";
import { Button } from "@/app/components/ui/button";
import { Game } from "@/types";

interface OverviewProps {
    game: Game;
}

const GameOverview: React.FC<OverviewProps> = ({ game }) => {

    return (
        <main className="container h-screen px-4 mx-auto">
            <div>
                <div className="flex space-x-2 uppercase">
                    {game?.chains.map((a, i) => (
                        <div key={i}>chain:{a}</div>
                    ))}
                    <div>|</div>
                    <div>status: {game?.status}</div>
                </div>
                <h1>{game?.name}</h1>
                <p className="mb-4 text-3xl">{game?.description}</p>
                <div>
                    <h5>Links</h5>
                    <Button href={game?.links.whitepaper}>White paper</Button>
                    <Button href={game?.links.website}>Website</Button>
                </div>

                <div>
                    <h5>Tokens</h5>
                    <div className="flex">
                        {game?.compatibleTokens.map((token, index) => (
                            <Button href={`/collection/${token.contract}`} key={index}>
                                {token.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* <div className="flex my-4">
          {game?.screenshots.map((screenshot, index) => (
            <Image
              key={index}
              alt={screenshot.alt}
              src={screenshot.src}
              width={500}
              height={500}
              className="w-full rounded sm:1/2"
            />
          ))}
        </div> */}
            </div>
        </main>
    );
};

export default GameOverview;