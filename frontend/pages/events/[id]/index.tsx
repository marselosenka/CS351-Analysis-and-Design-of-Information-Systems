import { useRouter } from "next/router";
import PageMeta from "../../../components/seo/PageMeta";
import EventDetail from "../../../components/events/EventDetail";
import { useEventDetail } from "../../../hooks/useEventDetail";

export default function EventPageWrapper() {
  const router = useRouter();
  const eventId = typeof router.query.id === "string" ? router.query.id : null;
  const { event, relatedEvents, loading } = useEventDetail(eventId, router.isReady);

  return (
    <>
      <PageMeta
        title={event ? `${event.title} - eSports System` : "Events - eSports System"}
        description={
          event
            ? `View details, schedule, and related events for ${event.title}.`
            : "View event details and related eSports events."
        }
      />
      {loading ? (
        <main>Loading event...</main>
      ) : event ? (
        <EventDetail event={event} relatedEvents={relatedEvents} />
      ) : (
        <main>No events found.</main>
      )}
    </>
  );
}
