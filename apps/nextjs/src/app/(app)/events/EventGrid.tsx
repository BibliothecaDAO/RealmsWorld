import { EventCard } from "./EventCard";
import { reader } from "@/utils/keystatic";

interface EventGridProps {
  isHomepage?: boolean;
}

export const EventGrid = async ({ isHomepage }: EventGridProps) => {
  const currentDate = new Date();
  const events = await reader().collections.events.all();

  const upcomingEvents = events.filter(
    (event) =>
      event.entry.startDate && new Date(event.entry.startDate) > currentDate,
  );
  const pastEvents = events.filter(
    (event) =>
      event.entry.endDate && new Date(event.entry.endDate) < currentDate,
  );

  return (
    <div>
      {upcomingEvents.length ? (
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-bold">Upcoming Events</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} event={event.entry} slug={event.slug} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-bold">
            Check back soon for upcoming events!
          </h2>
        </div>
      )}
      {!isHomepage && (
        <div>
          <h2 className="mb-2 text-xl font-bold">Past Events</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {pastEvents.map((event, index) => (
              <EventCard key={index} event={event.entry} slug={event.slug} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
