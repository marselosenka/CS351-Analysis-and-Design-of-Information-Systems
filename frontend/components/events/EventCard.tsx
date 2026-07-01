import Image from "next/image";
import styles from "../../styles/HomePage.module.css";
import { EventCardData, resolveEventImagePath } from "../../lib/events";

interface EventCardProps {
  event: EventCardData;
  badgeLabel: string;
}

export default function EventCard({ event, badgeLabel }: EventCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardImageWrap}>
        <Image
          src={resolveEventImagePath(event.image)}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={styles.cardImage}
        />
      </div>
      <span className={styles.liveTag}>{badgeLabel}</span>
      <div className={styles.cardBody}>
        <h3>{event.title}</h3>
        <p className={styles.cardGame}>Game: {event.game}</p>
        <div className={styles.cardMeta}>
          <span>{event.dateLabel}</span>
          <span className={styles.cardPrice}>{event.priceLabel}</span>
        </div>
      </div>
    </article>
  );
}
