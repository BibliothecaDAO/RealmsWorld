import { useEffect, useState } from "react";
import Image from "next/image";
import { Event } from "@/types";

import { Button } from "@realms-world/ui";

export const EventCard = ({ event }: { event: Event }) => {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(event.startDate);

    const endDate = new Date(event.endDate);
    setIsToday(today >= startDate && today <= endDate);
  }, [event.startDate, event.endDate]);

  return (
    <div className="border-4">
      <Image width={600} height={400} src={event.image} alt="" />
      <div className="bg-theme-gray-light p-4">
        <span className={`flex flex-shrink  px-2 py-1`}>
          <div
            className={`h-4 w-4 self-center rounded-full bg-green-600 ${isToday ? "animate-pulse" : ""}`}
          />
          <div className="self-center px-2">
            {event.startDate} to {event.endDate}
          </div>
        </span>
        <h5>{event.name}</h5>
        <p>{event.description}</p>
        <div className="mt-6 flex justify-between">
          <Button href={event.website} size={"xs"} variant="default">
            Play Game
          </Button>
          <Button href={"/events/" + event.slug} size={"xs"} variant="outline">
            More info
          </Button>
        </div>
      </div>
    </div>
  );
};
