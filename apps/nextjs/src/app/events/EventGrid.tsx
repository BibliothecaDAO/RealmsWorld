"use client";

import { events } from "@/constants/events";

import { EventCard } from "./EventCard";


interface EventGridProps {
  isHomepage?: boolean;
}

export const EventGrid = ({ isHomepage }: EventGridProps) => {
  const currentDate = new Date();

  const upcomingEvents = events.filter(event => new Date(event.startDate) > currentDate);
  const pastEvents = events.filter(event => new Date(event.endDate) < currentDate);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
      {!isHomepage && (
        <div>
          <h2 className="text-xl font-bold mb-2">Past Events</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {pastEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
