import type { Metadata } from "next";
import { PageLayout } from "@/app/_components/PageLayout";
import { events } from "@/constants/events";

import { games } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

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
  const event = events.find((event) => event.slug === params.id);

  return (
    <PageLayout title={event?.name ?? ""}>
      <img className="w-96" src={event?.image} alt="" />
      <div className="py-4">
        <span className={`rounded border px-2 py-1 `}>
          {event?.startDate} to {event?.endDate}
        </span>
      </div>

      <div className="text-lg">{event?.description}</div>

      <hr className="my-8" />
      <Button href="/events">Back to events</Button>
    </PageLayout>
  );
}
