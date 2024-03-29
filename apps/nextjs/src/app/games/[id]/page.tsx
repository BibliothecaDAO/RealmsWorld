import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StatusDot } from "@/app/_components/StatusDot";
import { ChevronLeft } from "lucide-react";

import { CHAIN_IDS_TO_NAMES, games, Tokens } from "@realms-world/constants";
import {
  Badge,
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
  const name = games.find((game) => game.id === params.id)?.name ?? "Game";

  return {
    title: `${name}`,
    description: `${params.id} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const game = games.find((game) => game.id === params.id);

  const screenshotList = new Array(game?.screenshotLength);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const list = [...screenshotList].map((image, index) => ({
    src: `/games/${params.id}/screenshots/${index + 1}.png`,
    alt: `${game?.name} Screenshot ${index + 1}`,
  }));

  const tabs = [
    {
      name: "Details",
      content: <div className=" leading-relaxed">{game?.longform}</div>,
    },

    {
      name: "Assets",
      content: (
        <div>
          <div className="flex gap-x-2">
            <div className="flex flex-wrap">
              {game?.tokens?.map((token, index) =>
                token === Tokens.LORDS ? (
                  <Button
                    href="https://app.avnu.fi/en?amount=100&tokenFrom=0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49&tokenTo=0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
                    key={index}
                  >
                    {token}
                  </Button>
                ) : (
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  <Button href={`/tokens/${token}`} key={index}>
                    {token}
                  </Button>
                ),
              )}
              {game?.collections?.map((collection, index) => (
                <Button href={`/collection/${collection}`} key={index}>
                  {collection}
                </Button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const gameIconPng = `/games/${game?.id}/icon.png`;

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
    imageName = `/games/${game?.id}/icon.svg`;
  }

  const tableData = [
    { key: "Studio", value: game?.developer },
    { key: "Status", value: game?.status },
    {
      key: "Chain",
      value: (
        <div className="flex justify-end">
          {" "}
          {game?.chains.map((a, i) =>
            String(a) === "420" ? (
              <Link key={i} href="/network" className=" h-full self-center">
                {" "}
                <Badge
                  key={i}
                  variant={"outline"}
                  className="h-full hover:bg-bright-yellow hover:text-theme-gray"
                >
                  {CHAIN_IDS_TO_NAMES[a].replace(/_/g, " ")}
                </Badge>
              </Link>
            ) : (
              <Badge key={i} variant={"outline"}>
                {CHAIN_IDS_TO_NAMES[a].replace(/_/g, " ")}
              </Badge>
            ),
          )}
        </div>
      ),
    },
    {
      key: "Category",
      value: (
        <div className="flex flex-wrap justify-end">
          {game?.genres?.map((a, i) => (
            <Badge key={i} variant={"outline"}>
              {a}
            </Badge>
          ))}
        </div>
      ),
    },
    { key: "Token", value: game?.tokens },
    {
      key: "White Paper",
      value: (
        <>
          {" "}
          {game?.links.whitepaper ? (
            <Button
              size={"xs"}
              variant={"outline"}
              className="w-full"
              href={game?.links.whitepaper}
            >
              White paper
            </Button>
          ) : (
            "No whitepaper available"
          )}
        </>
      ),
    },
    {
      key: "Mainnet",
      value: (
        <>
          {" "}
          {game?.links.mainnet && (
            <Button
              size={"xs"}
              variant={"outline"}
              href={game?.links.mainnet}
              className="w-full"
            >
              Mainnet build
            </Button>
          )}
        </>
      ),
    },
    {
      key: "Testnet",
      value: (
        <>
          {" "}
          {game?.links.testnet && (
            <Button
              size={"xs"}
              variant={"outline"}
              href={game?.links.testnet}
              className="w-full"
            >
              Testnet Build
            </Button>
          )}
        </>
      ),
    },
    {
      key: "Homepage",
      value: (
        <>
          {" "}
          {game?.links.homepage && (
            <Button
              size={"xs"}
              variant={"outline"}
              href={game?.links.homepage}
              className="w-full"
            >
              {game?.name}
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <main className="container mx-auto px-4 ">
      <div>
        <Button
          size={"xs"}
          className=" justify-start"
          variant={"ghost"}
          href="/games"
        >
          <ChevronLeft className="w-4 self-center" /> back to games
        </Button>
      </div>

      <div className="flex flex-wrap">
        <div className="mb-4 w-full">
          <h1>{game?.name}</h1>
        </div>

        <div className="mb-8 flex w-full space-x-2 font-sans uppercase">
          <Badge variant={"outline"}>
            {StatusDot(game?.status)}
            {game?.status}
          </Badge>
        </div>

        {game && (
          <>
            <div className="w-full sm:w-9/12 sm:pr-8">
              {game.screenshotLength && (
                <Carousel
                  className="h-96 w-full sm:max-h-[750px] sm:min-h-[750px]"
                  images={list}
                  autoPlay
                  showPreview
                  cover
                />
              )}
            </div>

            <div className="pl-4 sm:w-3/12">
              <div className="flex justify-center py-8">
                <Image alt="" src={imageName} width={250} height={100} />
              </div>

              <div className="flex-col space-y-2">
                {game?.links.homepage && (
                  <Button
                    size={"lg"}
                    variant={"default"}
                    href={game?.links.homepage}
                    className="w-full"
                  >
                    Play {game?.name}
                  </Button>
                )}

                <table className="w-full divide-y py-8 text-sm capitalize">
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-2 py-2 font-sans text-bright-yellow/70">
                        {data.key}
                      </td>
                      <td className=" whitespace-nowrap px-2 py-2 text-right ">
                        {data.value}
                      </td>
                    </tr>
                  ))}
                </table>
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
