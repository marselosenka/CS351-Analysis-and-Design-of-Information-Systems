import CreateNewEvent from "../components/events/CreateNewEvent";
import PageMeta from "../components/seo/PageMeta";

export default function CreateEventPage() {
  return (
    <>
      <PageMeta
        title="Create New Event - eSports System"
        description="Create and publish new eSports events with teams, schedules, and event details."
      />
      <CreateNewEvent />
    </>
  );
}
