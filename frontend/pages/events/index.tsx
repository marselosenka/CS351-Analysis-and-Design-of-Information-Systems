import Link from "next/link";
import { formatStableDateLabel } from "../../lib/events";
import PageMeta from "../../components/seo/PageMeta";
import { useEvents } from "../../hooks/useEvents";

export default function EventsPage() {
  const { events, loading } = useEvents();

  return (
    <>
      <PageMeta
        title="Events - eSports System"
        description="Browse all upcoming and live eSports events currently available in the system."
      />
      <main>
        <h1>Events</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ol>
            {events.map((event) => (
              <li key={event.id}>
                <Link href={`/events/${event.id}`}>
                  {event.title} - {formatStableDateLabel(event.date)} ({event.status})
                </Link>
              </li>
            ))}
          </ol>
        )}

        <Link style={{ marginTop: "50px" }} href="/home">
          Go Back To Home Page
        </Link>
      </main>
    </>
  );
}
