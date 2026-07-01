import EventSection from "./EventSection";
import { EventRecord } from "../../lib/events";

interface UpcomingEventsProps {
  events?: EventRecord[];
  loading?: boolean;
}

export default function UpcomingEvents({ events, loading }: UpcomingEventsProps) {
  return (
    <EventSection
      title="UPCOMING EVENTS"
      status="Upcoming"
      events={events}
      loading={loading}
    />
  );
}
