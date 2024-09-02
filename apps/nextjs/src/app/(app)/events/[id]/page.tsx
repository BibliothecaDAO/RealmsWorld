import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/app/_components/PageLayout";
import React from "react";
import Markdoc from "@markdoc/markdoc";

import { games } from "@realms-world/constants";
import { Button } from "@realms-world/ui";
import { reader } from "@/utils/keystatic";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const name = games.find((game) => game.id === params.id)?.name ?? "Game";

  return {
    title: `${name}`,
    description: `${params.id} - Created for Adventurers by Bibliotheca DAO`,
  };
}


export default async function Page({ params }: { params: { id: string } }) {
  const event = await reader.collections.events.read(params.id);
  if (!event) {
    return <div>No Event Found</div>;
  }
  const { node } = await event.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  const renderable = Markdoc.transform(node);
  return (
    <PageLayout title={event.name}>
      {event.image && (
        <Image
          className="w-96"
          width={350}
          height={350}
          src={"/content/events/" + params.id + "/" + event.image}
          alt=""
        />
      )}
      <div className="py-4">
        <span className={`rounded border px-2 py-1 `}>
          {event.startDate ? new Date(event.startDate).toLocaleString() : ''} to {event.endDate ? new Date(event.endDate).toLocaleString() : ''}
        </span>
      </div>

      <div className="text-lg">{event.description}</div>
      <div className="prose prose-lg mx-auto mt-6 max-w-5xl px-6 pb-6 text-xl prose-headings:text-bright-yellow prose-p:font-thin prose-p:text-bright-yellow prose-a:text-flamingo prose-strong:text-bright-yellow prose-ul:text-bright-yellow md:mt-12">      {Markdoc.renderers.react(renderable, React)}
      </div>
      <hr className="my-8" />
      <Button asChild>
        <Link href="/events">Back to events</Link>
      </Button>
    </PageLayout>
  );
}
