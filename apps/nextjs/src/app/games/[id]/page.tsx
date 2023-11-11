import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import { Button } from "@/app/_components/ui/button";
import { Carousel } from "@/app/_components/ui/carousel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { games } from "@/constants/games";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `${params.id} Homepage`,
    description: `${params.id} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const game = games.find((game) => game.id === params.id);

  /* const dirRelativeToPublicFolder = `games/${params.id}/screenshots`;
  const dir = path.resolve("public", dirRelativeToPublicFolder);
  const screenshotFiles = await fs.readdir(path.join(dir));
  const screenshotList = screenshotFiles.map((image, index) => ({
    src: `/games/${params.id}/screenshots/${image}`,
    alt: `${game?.name} Screenshot ${index}`,
  }));*/ //TODO not working in Vercel production

  const tabs = [
    {
      name: "Details",
      content: <div className="text-xl leading-relaxed">{game?.longform}</div>,
    },

    {
      name: "Tokens",
      content: (
        <div>
          <div className="flex">
            {game?.compatibleTokens?.map((token, index) => (
              <Button href={`/collection/${token.contract}`} key={index}>
                {token.name}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="container mx-auto px-4 ">
      <div className="my-4 grid min-h-[400px] grid-cols-1 gap-8 sm:grid-cols-2">
        {game && (
          <>
            {game.screenshots && (
              <Carousel
                className="h-full"
                images={game.screenshots}
                autoPlay
                showPreview
              />
            )}
            <div>
              <div className="flex space-x-2 uppercase">
                {game?.chains.map((a, i) => <div key={i}>chain: {a}</div>)}
                <div>|</div>
                <div>status: {game?.status}</div>
              </div>
              <h1>{game?.name}</h1>
              <div>
                {game?.links.whitepaper && (
                  <Button
                    size={"xs"}
                    variant={"outline"}
                    className="mr-2"
                    href={game?.links.whitepaper}
                  >
                    White paper
                  </Button>
                )}
                {game?.links.website && (
                  <Button
                    size={"xs"}
                    variant={"outline"}
                    href={game?.links.website}
                    className="mr-2"
                  >
                    Website
                  </Button>
                )}
                {game?.links.mainnet && (
                  <Button
                    size={"xs"}
                    variant={"outline"}
                    href={game?.links.mainnet}
                    className="mr-2"
                  >
                    Mainnet
                  </Button>
                )}
                {game?.links.testnet && (
                  <Button
                    size={"xs"}
                    variant={"outline"}
                    href={game?.links.testnet}
                  >
                    Testnet
                  </Button>
                )}
              </div>

              <Tabs defaultValue={tabs[0]?.name}>
                <TabsList>
                  {tabs.map((tab, index) => (
                    <TabsTrigger value={tab.name} key={index}>
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tabs.map((tab, index) => (
                  <TabsContent
                    className="bg-dark-green rounded border p-4"
                    value={tab.name}
                    key={index}
                  >
                    {tab.content}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
