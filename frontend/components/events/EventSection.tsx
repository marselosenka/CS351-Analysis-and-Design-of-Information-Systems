import styles from "../../styles/HomePage.module.css";
import EventCard from "./EventCard";
import { EventRecord, EventStatus, toCardData } from "../../lib/events";

interface EventSectionProps {
  title: string;
  status: EventStatus;
  events?: EventRecord[];
  loading?: boolean;
}

export default function EventSection({
  title,
  status,
  events,
  loading = false,
}: EventSectionProps) {
  const source = events ?? [];
  const cards = source.filter((event) => event.status === status).map(toCardData);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {cards.length > 0 ? (
        <div className={styles.cardsGrid}>
          {cards.map((event) => (
            <EventCard
              key={`${event.title}-${event.dateLabel}`}
              event={event}
              badgeLabel={status}
            />
          ))}
        </div>
      ) : loading ? (
        <p>Loading {status.toLowerCase()} events...</p>
      ) : (
        <p>No {status.toLowerCase()} events yet.</p>
      )}
    </section>
  );
}
