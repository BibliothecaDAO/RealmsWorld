// components/Overview.tsx
import React from "react";
import { Game } from "@/types";

import { Button } from "@realms-world/ui/components/ui/button";

interface OverviewProps {
  game: Game;
}

const GameOverview: React.FC<OverviewProps> = ({ game }) => {
  return (
    <main className="container mx-auto h-screen px-4">
      <div>
        <div className="flex space-x-2 uppercase">
          {game?.chains.map((a, i) => <div key={i}>chain:{a}</div>)}
          <div>|</div>
          <div>status: {game?.status}</div>
        </div>
        <h1>{game?.name}</h1>
        <p className="mb-4 text-3xl">{game?.description}</p>
        <div>
          <h5>Links</h5>
          {game?.links.whitepaper && (
            <Button className="mr-2" href={game?.links.whitepaper}>
              White paper
            </Button>
          )}
          <Button href={game?.links.website}>Website</Button>
        </div>

        <div>
          <h5>Tokens</h5>
          <div className="flex">
            {game?.compatibleTokens?.map((token, index) => (
              <Button href={`/collection/${token.contract}`} key={index}>
                {token.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GameOverview;
