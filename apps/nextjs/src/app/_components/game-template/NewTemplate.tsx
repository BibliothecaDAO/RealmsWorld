import Image from "next/image";
import Link from "next/link";

import {
    Button,
} from "@realms-world/ui";

export default function NewTemplate() {
    const heroBlobImage = "/amma/blobs.png";

    const companies = [
        { name: "realms", icon: "" },
        { name: "grugs lair", icon: "" },
        { name: "dojo", icon: "" },
    ];

    const howToPlayText = [
        "Envision a strategic Pokémon-like battle featuring our valiant Bloberts.",
        "These aren’t your average Blobs—they’re ready to clash with their unique traits. Outsmart your foes and claim victory!",
        "Our combat system is like rock-paper-scissors with an ancient twist. Each Blobert’s attributes—Attack, Defense, Speed, Strength—dictate the battle. Master strategy and foresight to triumph.",
        "Summon your own Bloberts and assemble a formidable team. Each one bears unique traits that can alter the course of battle. Challenge others, win, and expand your collection by claiming defeated Bloberts. Skill and strategy reign supreme.",
        "Enjoy witty quotes from the most cunning blobfish. It’s a blend of strategy and amusement in every skirmish.",
    ];

    const games = [
        { name: "Paveed" },
        { name: "Game" },
        { name: "Game" },
        { name: "Game" },
        { name: "Game" },
        { name: "Game" },
        { name: "Game" },
        { name: "Paveed the game" },
        { name: "Paveed" },
    ];

    return (
        <>
            <div
                className="md:justify-center md:items-center flex max-md:flex-col-reverse max-sm:text-center max-md:mt-20"
                style={{ minHeight: "75vh" }}
            >
                <div className="flex-1 ">
                    <h3 className="max-md:text-2xl text-5xl font-bold pb-10">
                        Whoa there!
                    </h3>
                    <p className="pb-2">
                        Compete against your friends against your friends in our new
                    </p>
                    <h1 className="max-md:text-4xl text-6xl font-bold md:ms-8 pb-10">
                        Blob Arena Game
                    </h1>
                    <Button
                        size={"lg"}
                        variant={"default"}
                        asChild
                        className="max-md:w-full "
                    >
                        <Link href="/">Fight</Link>
                    </Button>
                </div>
                <div className="">
                    <Image
                        src={heroBlobImage}
                        alt="Game hero image"
                        width={600}
                        height={600}
                        className="max-h-[3200px] w-auto max-w-[75%] object-contain md:ms-auto max-md:m-auto "
                    />
                </div>
            </div>

            <div className="border-y flex justify-center gap-6 md:gap-16  max-md:flex-col items-center font-bold py-12">
                {companies.map((company) => (
                    <div key={company.name} className="tracking-widest">
                        {company.name.toUpperCase()}
                    </div>
                ))}
            </div>

            <div className="py-20 text-center">
                <h2 className="max-md:text-2xl text-3xl font-bold pb-5">
                    Enter the Arena
                </h2>
                <Button
                    size={"lg"}
                    variant={"default"}
                    asChild
                    className="max-md:w-full "
                >
                    <Link href="/">♦ Play ♦</Link>
                </Button>
                <div className="flex justify-center pt-12">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/R-EQoXvPhUo?si=KUMZRVp5YlLvWoKw"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                        className="rounded "
                    ></iframe>
                </div>
            </div>

            <div className="text-center py-12 mx-auto md:px-20">
                <h1 className="max-md:text-2xl text-3xl font-bold pb-5">
                    How to play?
                </h1>
                {howToPlayText.map((text) => (
                    <p key={text} className="pb-10 ">
                        {text}
                    </p>
                ))}
                <h2 className="text-xl font-bold">Ready to dominate Blob Arena?</h2>
                <p className="pt-2 pb-5">
                    Hone your tactics, master your Bloberts, and brace for epic battles
                </p>
                <Button
                    size={"lg"}
                    variant={"default"}
                    asChild
                    className="max-md:w-full "
                >
                    <Link href="/">Fight</Link>
                </Button>
            </div>

            <div className="py-12 my-10 text-center border-y">
                <h3 className="text-2xl font-bold pb-5">
                    Hear what players have to say about Blob Arena
                </h3>
                <p className="pb-2 text-red-400	">🔧 Social proof screenshots 🔨</p>
            </div>

            <div className="max-sm:flex-col-reverse flex justify-center items-center py-12 gap-12">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 max-sm:pb-10">
                    {games.map((game) => (
                        <div
                            key={game.name}
                            className="border py-2 px-6 flex justify-center items-center text-center rounded"
                        >
                            {game.name}
                        </div>
                    ))}
                </div>
                <div className="flex-1 max-sm:text-center">
                    <h3 className="text-2xl font-bold pb-5">
                        More Games on Realms.World
                    </h3>
                    <p className="pb-2">
                        As a game studio there are many developing games in the ecosystem
                        you can play.
                    </p>
                </div>
            </div>

            <div className="footer"></div>
        </>
    );
}
