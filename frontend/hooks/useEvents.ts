import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import { EventRecord } from "../lib/events";

export function useEvents() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      setLoading(true);

      const data = await fetchJson<EventRecord[]>("/events").catch(() => []);
      if (!cancelled) {
        setEvents(data);
        setLoading(false);
      }
    }

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return { events, loading };
}
