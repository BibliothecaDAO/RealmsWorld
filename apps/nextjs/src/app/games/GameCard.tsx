import Image from "next/image";
import Link from "next/link";

import type { Game } from "@realms-world/constants";

interface GameCardProps {
  game: Game;
}

export const GameCard = async ({ game }: GameCardProps) => {
  const gameIconPng = `/games/${game.id}/icon.png`;

  const isImageFound = async (imageName: string) => {
    return await fetch(
      (process.env.VERCEL_URL
        ? "https://" + process.env.VERCEL_URL
        : "http://localhost:3000") + imageName,
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
      className="group relative flex h-80 flex-col items-center justify-center border text-center shadow-xl  duration-300 hover:opacity-80"
      href={`/games/${game.id}`} // navigate to a custom game homepage if one is specified, default page otherwise
    >
      <Image
        src={`/games/${game.id}/cover.webp`}
        alt={game.name}
        width={800}
        height={400}
        className="absolute bottom-0 top-0 h-full w-full object-fill brightness-75 transition-all duration-300 hover:filter-none"
      />
      <div className="relative flex h-full max-w-full flex-col items-center justify-center  object-contain">
        <Image
          src={imageName}
          alt={game.name}
          width={300}
          height={150}
          className="max-h-[180px] w-auto max-w-[75%] object-contain"
        />
        <p className="mt-2  text-lg font-semibold">{game.description}</p>
      </div>
      {/*<div className="invisible z-10 opacity-0 duration-300 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
        <Button variant={"default"}>Explore</Button>
  </div>*/}
    </Link>
  );
};
