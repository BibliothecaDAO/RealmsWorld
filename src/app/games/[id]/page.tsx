import { games } from "@/constants/games";
import { Button } from "@/app/components/ui/button";
import { Metadata } from "next";
import { Tabs } from "@/app/components/Tabs";
import Image from "next/image";

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Atlas - Homepage for: ${params.id}`,
    description: `${params.id} - Created for Adventurers by Bibliotheca DAO`
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const game = games.find((game) => game.id === params.id);

  const tabs = [
    {
      name: "Details",
      content: (
        <div className="flex space-x-8">
          <div className="w-1/2 text-xl">
            {game?.longform}
          </div>
          <div className="w-1/2">
            <div className="flex flex-col my-4">
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
            </div>
          </div>
        </div>
      )
    },
    {
      name: "Tokens",
      content: (
        <div>
          <div className="flex">
            {game?.compatibleTokens.map((token, index) => (
              <Button href={`/collection/${token.contract}`} key={index}>
                {token.name}
              </Button>
            ))}
          </div>
        </div>
      )
    },
  ]

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
        <div>
          <Button size={'xs'} variant={'outline'} className="mr-2" href={game?.links.whitepaper}>White paper</Button>
          <Button size={'xs'} variant={'outline'} href={game?.links.website}>Website</Button>
        </div>

        <Tabs tabs={tabs} />
      </div>
    </main>
  );
}