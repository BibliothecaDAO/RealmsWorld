import { Game } from "@/types";
import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link
      className="relative flex flex-col items-center justify-center p-4 space-y-4 text-center duration-300 shadow-xl backdrop-grayscale h-72  hover:opacity-80  group border"
      href={`/games/${game.id}`} // navigate to a custom game homepage if one is specified, default page otherwise
    >
      <Image
        src={game.image}
        alt={game.name}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 transition-all duration-300 brightness-50  hover:filter-none"
      />
      <div className="relative z-10">
        <h4>{game.name}</h4>
        <p className="text-lg font-semibold">{game.description}</p>
      </div>
      <div className="z-10 invisible duration-300 opacity-0 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
        <Button variant={"default"}>Explore</Button>
      </div>
    </Link>
  );
};
