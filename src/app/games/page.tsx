import { getData } from "@/functions";
import { Collection, Game } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";
import Link from "next/link";
import { GameCard } from "../components/GameCard";
import { games } from "@/constants";

export default async function Page() {
  return (
    <main className="container mx-auto">
      <div className="container px-8 mx-auto">
        <h1>Onchain Gaming</h1>

        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game: Game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </div>
    </main>
  );
}
