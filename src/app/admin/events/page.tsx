import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteEventButton from "./DeleteEventButton";

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconExternal = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4.5M9.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M8 2.5L10.5 5L5 10.5H2.5V8L8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M7 3.5L9.5 6" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const TYPE_COLOR: Record<string, string> = {
  Workshop: "#22D3EE",
  Contest: "#FFD60A",
  Hackathon: "#A78BFA",
  Seminar: "#34D399",
  Ideathon: "#FB923C",
};

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { id: "desc" } });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Manage
          </p>
          <h1
            className="text-2xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            Events
            <span
              className="ml-3 text-sm font-normal align-middle px-2.5 py-1 rounded-lg"
              style={{
                background: "rgba(255,214,10,0.1)",
                color: "#FFD60A",
                fontFamily: "var(--font-outfit)",
              }}
            >
              {events.length}
            </span>
          </h1>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #FFD60A 0%, #F0B800 100%)",
            color: "#000",
            fontFamily: "var(--font-unbounded)",
            fontSize: "11px",
            letterSpacing: "0.05em",
            boxShadow: "0 4px 24px rgba(255,214,10,0.25)",
          }}
        >
          <IconPlus />
          New Event
        </Link>
      </div>

      {/* Events list */}
      {events.length === 0 ? (
        <div
          className="rounded-2xl py-20 text-center"
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            No events yet
          </p>
          <Link
            href="/admin/events/new"
            className="text-sm font-medium"
            style={{ color: "#FFD60A" }}
          >
            Create your first event →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {events.map((e) => (
            <div
              key={e.id}
              className="group flex items-center gap-5 rounded-2xl px-6 py-5 transition-all duration-200 hover:border-white/10"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Status indicator */}
              <div className="shrink-0 flex flex-col items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background:
                      e.status === "live" ? "#EF4444" :
                      e.status === "upcoming" ? "#22D3EE" :
                      "rgba(255,255,255,0.15)",
                    boxShadow: e.status === "live" ? "0 0 10px rgba(239,68,68,0.7)" : "none",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-sm font-semibold text-white">{e.title}</p>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded"
                    style={{
                      background: `${TYPE_COLOR[e.type] ?? "#888"}1A`,
                      color: TYPE_COLOR[e.type] ?? "#888",
                    }}
                  >
                    {e.type}
                  </span>
                </div>
                <p className="text-xs mt-1 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {e.date} · {e.time} · {e.college}
                </p>
              </div>

              {/* Status badge */}
              <span
                className="hidden md:inline-block text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-lg shrink-0"
                style={{
                  background:
                    e.status === "live" ? "rgba(239,68,68,0.12)" :
                    e.status === "upcoming" ? "rgba(34,211,238,0.12)" :
                    "rgba(255,255,255,0.06)",
                  color:
                    e.status === "live" ? "#EF4444" :
                    e.status === "upcoming" ? "#22D3EE" :
                    "rgba(255,255,255,0.3)",
                }}
              >
                {e.status}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  href={`/events/${e.id}`}
                  target="_blank"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/8"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <IconExternal />
                  View
                </Link>
                <Link
                  href={`/admin/events/${e.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-[rgba(255,214,10,0.1)]"
                  style={{ color: "#FFD60A" }}
                >
                  <IconEdit />
                  Edit
                </Link>
                <DeleteEventButton id={e.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
