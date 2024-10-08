import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StatusDot } from "@/app/_components/StatusDot";
import { reader } from "@/utils/keystatic";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";

import { Button } from "@realms-world/ui/components/ui/button";
import { Badge } from "@realms-world/ui/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@realms-world/ui/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@realms-world/ui/components/ui/carousel";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@realms-world/ui/components/ui/tabs";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let game = await reader().collections.games.read(params.slug);
  return {
    title: `${game?.title}`,
    description: `${params.slug} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const keyStaticGame = await reader().collections.games.read(params.slug);

  if (!keyStaticGame) return;
  const { node } = await keyStaticGame.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }
  const renderable = Markdoc.transform(node);
  const screenshotList = keyStaticGame?.screenshots;
  const list = [...screenshotList].map((image, index) => ({
    src: `/content/games/${params.slug}/${image}`,
    alt: `${keyStaticGame?.title} Screenshot ${index}`,
  }));

  // grab studio via developer slug from game so we can spit out the studio's title instead of its slug
  const studio = await reader().collections.studios.read(
    keyStaticGame?.developer || "",
  );

  const tabs = [
    {
      name: "Details",
      content: (
        <div className="leading-relaxed">
          {Markdoc.renderers.react(renderable, React)}
        </div>
      ),
    },

    {
      name: "Assets",
      content: (
        <div>
          <div className="flex gap-x-2">
            <div className="flex flex-wrap">
              {keyStaticGame?.tokens?.map((token, index) => (
                //token === Tokens.LORDS ? (
                <Link href="/swap">
                  <Button key={index}>{token}</Button>
                </Link>
                /*) : (
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  <Button href={`/tokens/${token}`} key={index}>
                    {token}
                  </Button>
                ),*/
              ))}
              {keyStaticGame?.collections?.map((collection, index) => (
                <Link href={`/collection/${collection}`}>
                  <Button key={index}>{collection}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const tableData = [
    {
      key: "Studio",
      value: (
        <Link href={`/studios/${keyStaticGame?.developer ?? ""}`}>
          {studio?.title}
        </Link>
      ),
    },
    { key: "Status", value: keyStaticGame?.status },
    {
      key: "Chain",
      value: (
        <div className="flex justify-end">
          {keyStaticGame?.chains.map((a, i) =>
            String(a) === "420" ? (
              <Link key={i} href="/network" className="h-full self-center">
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
          {keyStaticGame?.genres?.map((a, i) => (
            <Badge key={i} variant={"outline"}>
              {a}
            </Badge>
          ))}
        </div>
      ),
    },
    { key: "Token", value: keyStaticGame?.tokens },
    {
      key: "White Paper",
      value: (
        <>
          {keyStaticGame?.whitepaper ? (
            <Button size={"xs"} variant={"outline"} asChild className="w-full">
              <Link href={keyStaticGame?.whitepaper}>White paper</Link>
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
          {keyStaticGame?.links.mainnet && (
            <Button size={"xs"} variant={"outline"} asChild className="w-full">
              <Link href={keyStaticGame?.links.mainnet}> Mainnet build</Link>
            </Button>
          )}
        </>
      ),
    },
    {
      key: "Testnet",
      value: (
        <>
          {keyStaticGame?.links.testnet && (
            <Button size={"xs"} variant={"outline"} asChild className="w-full">
              <Link href={keyStaticGame?.links.testnet}>Testnet Build</Link>
            </Button>
          )}
        </>
      ),
    },
    {
      key: "Homepage",
      value: (
        <>
          {keyStaticGame?.links.homepage && (
            <Button size={"xs"} variant={"outline"} asChild className="w-full">
              <Link href={`${keyStaticGame?.links.homepage}`}>
                {" "}
                {keyStaticGame?.title}
              </Link>
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <main className="container mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/games">Games</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-wrap">
        <div className="my-4 w-full">
          <h1 className="text-3xl sm:text-5xl">{keyStaticGame?.title}</h1>
        </div>

        <div className="mb-8 flex w-full space-x-2 font-sans uppercase">
          <Badge variant={"outline"}>
            {StatusDot(keyStaticGame?.status)}
            {keyStaticGame?.status}
          </Badge>
        </div>

        {keyStaticGame && (
          <>
            <div className="w-full px-12 sm:w-9/12 sm:pr-8">
              {keyStaticGame.screenshots.length && (
                <Carousel className="w-full sm:h-96 sm:max-h-[750px] sm:min-h-[750px]">
                  <CarouselContent>
                    {list.map((image, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1096}
                          height={750}
                          className="h-full w-full rounded border object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>

            <div className="pl-4 sm:w-3/12">
              <div className="flex justify-center py-8">
                <Image
                  alt=""
                  src={`/content/games/${params.slug}/${keyStaticGame?.icon}`}
                  width={250}
                  height={100}
                />
              </div>

              <div className="flex-col space-y-2">
                {keyStaticGame?.playable && keyStaticGame?.links.homepage && (
                  <Button
                    size={"lg"}
                    variant={"default"}
                    asChild
                    className="w-full"
                  >
                    <Link href={`${keyStaticGame?.links.homepage}`}>
                      {" "}
                      Play {keyStaticGame?.title}
                    </Link>
                  </Button>
                )}

                <table className="w-full divide-y py-8 text-sm capitalize">
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-2 py-2 font-sans text-bright-yellow/70">
                        {data.key}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-right">
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
                    className="rounded border bg-background p-4"
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

export async function generateStaticParams() {
  const gameSlugs = await reader().collections.games.list();
  return gameSlugs.map((gameSlug) => ({ slug: gameSlug }));
}
