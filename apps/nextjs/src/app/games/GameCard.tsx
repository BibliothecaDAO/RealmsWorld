import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

import type { Game } from "@realms-world/constants";

interface GameCardProps {
  game: Game;
}

export const GameCard = async ({ game }: GameCardProps) => {
  const gameIconPng = `/games/${game.id}/icon.png`;

  const isImageFound = async (imageName: string) => {
    return await fetch(
      (process.env.VERCEL_URL ?? "http://localhost:3000") + imageName,
      {
        method: "HEAD",
      },
    );
  };
  let imageName;
  const result = await isImageFound(gameIconPng);
  if (result.status === 200) {
    imageName = gameIconPng;
  } else {
    imageName = `/games/${game.id}/icon.svg`;
  }

  return (
    <Link
      className="group relative flex h-72 flex-col items-center justify-center space-y-4 border p-4 text-center shadow-xl  duration-300 hover:opacity-80"
      href={`/games/${game.id}`} // navigate to a custom game homepage if one is specified, default page otherwise
    >
      <Image
        src={`/games/${game.id}/cover.webp`}
        alt={game.name}
        layout="fill"
        className=" inset-0 z-0 brightness-75 transition-all duration-300 hover:filter-none"
      />
      <div className="relative">
        <Image
          src={imageName}
          alt={game.name}
          width={400}
          height={200}
          className=""
        />
        <p className="text-lg font-semibold">{game.description}</p>
      </div>
      {/*<div className="invisible z-10 opacity-0 duration-300 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
        <Button variant={"default"}>Explore</Button>
  </div>*/}
    </Link>
  );
};
