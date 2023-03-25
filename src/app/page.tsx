import { getData } from "@/functions";
import { Collection, Game } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/constants";
import { Canvas } from "@react-three/fiber";
import {
  SoftShadows,
  Float,
  CameraControls,
  Sky,
  PerformanceMonitor,
} from "@react-three/drei";
import { LandingScene } from "./LandingScene";
import { GameCard } from "./components/GameCard";

export default async function Home() {
  const data = await getData(
    {
      contracts: [
        {
          contract: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
        },
        {
          contract: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
        },
        {
          contract: "0x8db687aceb92c66f013e1d614137238cc698fedb",
        },
        {
          contract: "0x86f7692569914b5060ef39aab99e62ec96a6ed45",
        },
        {
          contract: "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40",
        },
      ],
    },
    "collection"
  );

  const collections: Collection[] = data.collections;
  const defaultImage = "/backgrounds/map.png";

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(32, 32, 32, 1)), url(${defaultImage}), url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <main className="z-0" style={backgroundImageStyle}>
      <div className="w-full h-screen -mt-24 sm:pl-32">
        <div className="container px-8 mx-auto pt-72">
          <h1>Atlas</h1>
          <p className="text-2xl">
            Your window into the onchain world of Realms.
          </p>

          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game: Game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
