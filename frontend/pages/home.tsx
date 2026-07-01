import styles from "../styles/HomePage.module.css";
import LiveEvents from "../components/events/LiveEvents";
import UpcomingEvents from "../components/events/UpcomingEvents";
import Navbar from "../components/layout/Navbar";
import EventFiltersBar from "../components/events/EventFiltersBar";
import { featuredGames } from "../lib/events";
import PageMeta from "../components/seo/PageMeta";
import { useEvents } from "../hooks/useEvents";

export default function HomePage() {
  const { events, loading } = useEvents();

  return (
    <>
      <PageMeta
        title="Home - eSports System"
        description="See live and upcoming eSports events, browse featured games, and explore the platform."
      />
      <div className={`${styles.pageWrapper} ${styles.bodyBackground}`}>
        <Navbar />
        <EventFiltersBar games={featuredGames} />
        <LiveEvents events={events} loading={loading} />
        <UpcomingEvents events={events} loading={loading} />
      </div>
    </>
  );
}
