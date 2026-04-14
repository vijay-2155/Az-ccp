import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "../../EventForm";

const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id: Number(id) } });
  if (!event) notFound();

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
          Edit · #{event.id}
        </p>
        <h1
          className="text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-unbounded)" }}
        >
          {event.title}
        </h1>
      </div>
      <EventForm
        mode="edit"
        eventId={event.id}
        initial={{
          status: event.status,
          title: event.title,
          type: event.type,
          date: event.date,
          time: event.time,
          location: event.location,
          college: event.college,
          description: event.description,
          body: event.body,
          image: event.image,
          gallery: event.gallery,
          galleryUrl: event.galleryUrl ?? "",
          link: event.link ?? "",
        }}
      />
    </div>
  );
}
