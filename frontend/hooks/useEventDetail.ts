import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import { EventRecord } from "../lib/events";

export function useEventDetail(eventId?: string | null, enabled = true) {
  const [event, setEvent] = useState<EventRecord | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let cancelled = false;

    async function loadEvent() {
      setLoading(true);

      if (!eventId) {
        setEvent(null);
        setRelatedEvents([]);
        setLoading(false);
        return;
      }

      const events = await fetchJson<EventRecord[]>("/events").catch(() => []);
      if (cancelled) {
        return;
      }

      const current = events.find((item) => String(item.id) === eventId) || events[0] || null;

      setEvent(current);
      setRelatedEvents(events);
      setLoading(false);
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [enabled, eventId]);

  return { event, relatedEvents, loading };
}
