import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/app/_components/PageLayout";
import { SocialIcons } from "@/app/_components/SocialIcons";
import { GameCard } from "@/app/games/GameCard";
import { ChevronLeft } from "lucide-react";

import type { Game } from "@realms-world/constants";
import { getGamesByStudio, studios } from "@realms-world/constants";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const name = Object.values(studios).find(
    (studio) => studio.id === params.id,
  )?.name;

  return {
    title: `${name}`,
    description: `${name} Profile - A game studio of the Realms Autonomous World`,
    openGraph: {
      title: `${name}`,
      description: `${name} Profile - A studio of the Realms Autonomous World`,
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const studioId = params.id as keyof typeof studios;
  const studio = studios[studioId];
  if (!studio) return;
  const studioGames = getGamesByStudio(studioId);
  const tabs = [
    {
      name: "Details",
      content: <div className="leading-relaxed">{studio.longform}</div>,
    },
  ];

  const tableData = [
    {
      key: "Homepage",
      value: (
        <>
          {studio.links.homepage && (
            <Link href={studio.links.homepage}>
              <Button size={"xs"} variant={"outline"} className="w-full">
                {studio.name}
              </Button>
            </Link>
          )}
        </>
      ),
    },
    {
      key: "Description",
      value: <>{studio.description}</>,
    },
  ];

  return (
    <PageLayout>
      <div>
        <Link href="/studios">
          <Button size={"xs"} className="justify-start" variant={"ghost"}>
            <ChevronLeft className="w-4 self-center" /> back to studios
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-x-10">
        <div className="mb-4 w-full">
          <h1 className="mb-2 text-3xl font-bold">{studio.name}</h1>
          <hr />
        </div>

        <div className="mb-6 pl-4 sm:w-3/12">
          <div className="flex justify-center py-8">
            <Image
              alt=""
              src={`/studios/${studio.id}/logo.${studio.logoFormat}`}
              width={250}
              height={100}
            />
          </div>
          <SocialIcons
            github={studio.links.github}
            telegram={studio.links.telegram}
            website={studio.links.homepage}
            x={studio.links.twitter}
            discord={studio.links.discord}
          />

          <div className="mb-2 flex-col space-y-2">
            <table className="w-full divide-y py-8 text-sm capitalize">
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-2 py-2 font-sans text-bright-yellow/70">
                      {data.key}
                    </td>
                    <td className="px-2 py-2 text-right">{data.value}</td>
                  </tr>
                ))}
              </tbody>
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
                className="rounded border bg-background p-4"
                value={tab.name}
                key={index}
              >
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="flex-1 grow">
          <h4>Games</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {studioGames.map((game: Game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
