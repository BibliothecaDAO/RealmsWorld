/*import { promises as fs } from "fs";
import path from "path";*/
import type { Metadata } from "next";

import { CHAIN_IDS_TO_NAMES, games } from "@realms-world/constants";
import {
  Button,
  Carousel,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

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

  /*const dirRelativeToPublicFolder = `games/${params.id}/screenshots`;
  const dir = path.resolve("public", dirRelativeToPublicFolder);
  const screenshotFiles = await fs.readdir(path.join(dir));
  const screenshotList = screenshotFiles.map((image, index) => ({
    src: `/games/${params.id}/screenshots/${image}`,
    alt: `${game?.name} Screenshot ${index}`,
  }));*/ //TODO not working in Vercel production

  const screenshotList = new Array(game?.screenshotLength);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const list = [...screenshotList].map((image, index) => ({
    src: `/games/${params.id}/screenshots/${index + 1}.png`,
    alt: `${game?.name} Screenshot ${index + 1}`,
  }));

  const tabs = [
    {
      name: "Details",
      content: <div className="text-xl leading-relaxed">{game?.longform}</div>,
    },

    {
      name: "Assets",
      content: (
        <div>
          <div className="flex gap-x-2">
            {game?.tokens?.map((token, index) => (
              <Button href={`/tokens/${token}`} key={index}>
                {token}
              </Button>
            ))}
            {game?.collections?.map((collection, index) => (
              <Button href={`/collection/${collection}`} key={index}>
                {collection}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="container mx-auto px-4 ">
      <div className="my-4 grid grid-cols-1 gap-8 sm:min-h-[500px] sm:grid-cols-2">
        {game && (
          <>
            {game.screenshotLength && (
              <Carousel
                className="h-full min-h-[350px]"
                images={list}
                autoPlay
                showPreview
              />
            )}
            <div>
              <div className="flex space-x-2 uppercase">
                {game?.chains.map((a, i) => (
                  <div key={i}>
                    chain: {CHAIN_IDS_TO_NAMES[a].replace(/_/g, " ")}
                  </div>
                ))}
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
                {game?.links.homepage && (
                  <Button
                    size={"xs"}
                    variant={"outline"}
                    href={game?.links.homepage}
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
                    className="rounded border bg-dark-green p-4"
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
