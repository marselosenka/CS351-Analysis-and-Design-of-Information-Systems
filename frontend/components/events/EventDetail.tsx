import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/EventPage.module.css";
import {
  EventRecord,
  formatStableDateLabel,
  resolveEventImagePath,
} from "../../lib/events";

function parseMaybeJson<T>(value: T | string): T {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
}

function formatDateLabel(value: string) {
  return formatStableDateLabel(value);
}

function formatPriceLabel(price: number) {
  return price === 0 ? "FREE OF CHARGE" : `EUR ${price}`;
}

interface EventDetailProps {
  event: EventRecord;
  relatedEvents?: EventRecord[];
}

export default function EventDetail({ event, relatedEvents = [] }: EventDetailProps) {
  const teamsValue = parseMaybeJson<string[] | string>(event.teams);
  const scheduleValue = parseMaybeJson<{ time: string; activity: string }[] | string>(
    event.schedule
  );
  const teams = Array.isArray(teamsValue) ? teamsValue : [];
  const schedule = Array.isArray(scheduleValue) ? scheduleValue : [];
  const heroImage = resolveEventImagePath(event.wallpaper);
  const related = relatedEvents.filter((item) => item.id !== event.id).slice(0, 3);

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <span className={styles.heroTag}>{event.status === "Live" ? "LIVE NOW" : "UPCOMING"}</span>
        <h1 className={styles.heroTitle}>{event.title}</h1>
        <div className={styles.heroMeta}>
          <span className={styles.pill}>{event.game}</span>
          <span className={styles.pill}>{formatDateLabel(event.date)}</span>
          <span className={styles.pill}>
            {event.startTime} ({event.timezone})
          </span>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.primaryBtn} type="button">
            Watch Now
          </button>
          <button className={styles.outlineBtn} type="button">
            Favorite
          </button>
        </div>
        <button className={styles.freeBadge} type="button">
          {formatPriceLabel(event.price)}
        </button>
      </section>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.videoContainer}>
            <Image
              src={heroImage}
              alt={event.title}
              width={1280}
              height={720}
              className={styles.videoPlaceholder}
            />
            <div className={styles.videoFooter}>
              <span className={styles.viewers}>Live event preview</span>
              <button className={styles.shareBtn} type="button">
                Share
              </button>
            </div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>EVENT DESCRIPTION</h2>
            <p className={styles.paragraph}>{event.description}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>TEAMS</h2>
            <div className={styles.teamsRow}>
              {teams.length > 0 ? (
                teams.map((team) => (
                  <div key={team} className={styles.teamCard}>
                    <div className={styles.teamAvatar}>{team.slice(0, 2).toUpperCase()}</div>
                    <div className={styles.teamName}>{team}</div>
                    <button className={styles.outlineBtn} type="button">
                      VIEW TEAM
                    </button>
                  </div>
                ))
              ) : (
                <p>No teams available for this event.</p>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>SCHEDULE</h2>
            <ul className={styles.scheduleList}>
              {schedule.length > 0 ? (
                schedule.map((item) => (
                  <li key={`${item.time}-${item.activity}`} className={styles.scheduleItem}>
                    <span className={styles.scheduleTime}>{item.time}</span>
                    <span className={styles.scheduleDesc}>{item.activity}</span>
                  </li>
                ))
              ) : (
                <li className={styles.scheduleItem}>
                  <span className={styles.scheduleDesc}>No schedule available.</span>
                </li>
              )}
            </ul>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <h3 className={styles.sidebarTitle}>RELATED EVENTS</h3>
            <ul className={styles.relatedList}>
              {related.length > 0 ? (
                related.map((item) => (
                  <li key={item.id} className={styles.relatedItem}>
                    <Image
                      src={resolveEventImagePath(item.wallpaper)}
                      alt={item.title}
                      width={128}
                      height={72}
                      className={styles.relatedThumb}
                    />
                    <div>
                      <strong>{item.title}</strong>
                      <div className={styles.relatedTag}>{item.game}</div>
                    </div>
                  </li>
                ))
              ) : (
                <li>No related events.</li>
              )}
            </ul>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sidebarTitle}>VIEW DETAILS</h3>
            <div className={styles.analyticsItem}>
              <strong>Status</strong>
              <p>{event.status}</p>
            </div>
            <div className={styles.analyticsItem}>
              <strong>Timezone</strong>
              <p>{event.timezone}</p>
            </div>
            <Link href="/events">Back to events</Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
