import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link
      className="group relative flex h-72 flex-col items-center justify-center space-y-4 border p-4 text-center shadow-xl  backdrop-grayscale  duration-300 hover:opacity-80"
      href={`/games/${game.id}`} // navigate to a custom game homepage if one is specified, default page otherwise
    >
      <Image
        src={game.image}
        alt={game.name}
        layout="fill"
        objectFit="cover"
        width={500}
        height={300}
        className="bg-medium-dark-green absolute inset-0 z-0 brightness-50 transition-all duration-300 hover:filter-none"
      />
      <div className="relative z-10">
        <h4>{game.name}</h4>
        <p className="text-lg font-semibold">{game.description}</p>
      </div>
      <div className="invisible z-10 opacity-0 duration-300 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
        <Button variant={"default"}>Explore</Button>
      </div>
    </Link>
  );
};
