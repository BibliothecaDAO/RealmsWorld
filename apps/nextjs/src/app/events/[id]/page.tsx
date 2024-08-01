import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "@/app/_components/PageLayout";
import { events } from "@/constants/events";

import { games } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

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

export default function Page({ params }: { params: { id: string } }) {
  const event = events.find((event) => event.slug === params.id);

  return (
    <PageLayout title={event?.name ?? ""}>
      {event?.image && (
        <Image
          className="w-96"
          width={350}
          height={350}
          src={event.image}
          alt=""
        />
      )}
      <div className="py-4">
        <span className={`rounded border px-2 py-1 `}>
          {event?.startDate} to {event?.endDate}
        </span>
      </div>

      {event?.slug == "paved" ? (
        <div className="prose prose-lg mx-auto mt-6 max-w-5xl px-6 pb-6 text-xl prose-headings:text-bright-yellow prose-p:font-thin prose-p:text-bright-yellow prose-a:text-flamingo prose-strong:text-bright-yellow prose-ul:text-bright-yellow md:mt-12">
          <p>
            In Realms World&apos;s Paved game, players compete for high scores
            by laying tiles to form an expanding medieval landscape.
          </p>
          <p>
            Built on Starknet and powered by Dojo - pave your way to victory in
            an onchain strategy game like no other.
          </p>
          <h3>There is a 2,500 $Lords tournament</h3>
          <p>
            The player with the best score will be the tournament&apos;s Lord of
            the Board. There are nine prizes to be won by players.
          </p>
          <ul>
            <li>⚒️ First place: 1000 $Lords - aka Lord of the Board</li>
            <li>⚒️ Second place: 500 $Lords</li>
            <li>⚒️ Third place: 300 $Lords</li>
            <li>⚒️ Fastest game in the top 10: 200 $Lords</li>
            <li>⚒️ 5 randomly selected players: 100 $Lords</li>
          </ul>
          <br />
          <h3>Gameplay</h3>
          <p>
            In the single player mode, the player has 72 tiles to lay and score
            as many points as possible in the process.
          </p>
          <p>
            As tiles are laid, Cities, Roads, Wonders & Forests are formed and
            developed. Placing your Characters on these tiles gives you the
            opportunity to accumulate points - scored when structures are
            completed.
          </p>
          <p>
            Link to play: <a href="https://paved.gg/">https://paved.gg/</a>
          </p>
          <p>
            Game guide - for detail and tips:{" "}
            <a href="https://docs.paved.gg/">https://docs.paved.gg/</a>{" "}
          </p>
          <p>Will you be Lord of the Board? Pave now.</p>
        </div>
      ) : (
        <div className="text-lg">{event?.description}</div>
      )}

      <hr className="my-8" />
      <Button asChild>
        <Link href="/events">Back to events</Link>
      </Button>
    </PageLayout>
  );
}
