
import Image from "next/image";
import Link from "next/link";
import type { CollectionEntry } from "@/utils/keystatic";
import { Badge, Button, Card, CardContent } from "@realms-world/ui";

export const EventCard = ({ event, slug }: { event: CollectionEntry<'events'>, slug: string }) => {


  const today = new Date();
  const start = new Date(event.startDate || '');
  const end = new Date(event.endDate || '');
  const isToday = today >= start && today <= end;

  return (
    <Card>
      <Link href={"/events/" + slug}>
        <Image
          width={600}
          height={400}
          className="min-h-[400px] object-cover"
          src={'/content/events/' + slug + '/' + event.image}
          alt=""
        />
      </Link>
      <CardContent className="flex h-56 flex-col p-4">
        <div>
          <Badge variant={"outline"}>
            <div
              className={`h-3 w-3 self-center rounded-full bg-green-600 ${isToday ? "animate-pulse" : ""}`}
            />
            <div className="self-center px-2">
              {new Date(event?.startDate || '').toLocaleDateString()} to {new Date(event?.endDate || '').toLocaleDateString()}
            </div>
          </Badge>
        </div>

        <h5 className="mb-3 text-2xl font-display">{event.name}</h5>
        <p>{event.description}</p>
        <div className="mt-auto flex w-full justify-between self-end">
          <Button asChild size={"xs"} variant="default">
            {event.website && <Link href={event.website}>
              {" "}
              {event.type.includes("play") ? "Play Game" : "Mint"}
            </Link>}
          </Button>
          <Button asChild size={"xs"} variant="outline">
            <Link href={"/events/" + slug}>More info</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
