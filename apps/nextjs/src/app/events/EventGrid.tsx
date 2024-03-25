"use client";

import { events } from "@/constants/events";

import { EventCard } from "./EventCard";

export const EventGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {events.map((event) => (
        <EventCard event={event} />
      ))}
    </div>
  );
};
