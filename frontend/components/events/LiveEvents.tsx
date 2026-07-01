import EventSection from "./EventSection";
import { EventRecord } from "../../lib/events";

interface LiveEventsProps {
  events?: EventRecord[];
  loading?: boolean;
}

export default function LiveEvents({ events, loading }: LiveEventsProps) {
  return (
    <EventSection
      title="LIVE EVENTS"
      status="Live"
      events={events}
      loading={loading}
    />
  );
}
