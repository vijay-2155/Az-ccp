import Link from "next/link";
import EventForm from "../EventForm";

const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function NewEventPage() {
  return (
    <div className="space-y-7">
      <div>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-xs mb-4 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <IconBack />
          Back to events
        </Link>
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Create
        </p>
        <h1
          className="text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-unbounded)" }}
        >
          New Event
        </h1>
      </div>
      <EventForm mode="create" />
    </div>
  );
}
