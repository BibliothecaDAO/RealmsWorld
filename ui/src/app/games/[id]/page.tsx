import { games } from "@/constants/games";
import { Button } from "@/app/components/ui/button";
import { Metadata } from "next";
import { Tabs } from "@/app/components/Tabs";
import Image from "next/image";
import { useState } from "react";
import { ImageGallery } from "@/app/components/ImageGallery";

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
        <div className="text-xl leading-relaxed">

          {game?.longform}

        </div>
      )
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
      )
    },
  ]

  return (
    <main className="container px-4 mx-auto">


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-4">
        <ImageGallery images={game?.screenshots} />
        <div>
          <div className="flex space-x-2 uppercase">
            {game?.chains.map((a, i) => (
              <div key={i}>chain: {a}</div>
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
      </div>

    </main>
  );
}
