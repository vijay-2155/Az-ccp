import Link from "next/link";
import { prisma } from "@/lib/prisma";

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M7.5 2.5L9.5 4.5L4 10H2V8L7.5 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M6.5 3.5L8.5 5.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

export default async function AdminDashboard() {
  const [total, live, upcoming, past] = await Promise.all([
    prisma.event.count(),
    prisma.event.count({ where: { status: "live" } }),
    prisma.event.count({ where: { status: "upcoming" } }),
    prisma.event.count({ where: { status: "past" } }),
  ]);

  const recent = await prisma.event.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  const stats = [
    {
      label: "Total Events",
      value: total,
      accent: "#FFD60A",
      bg: "rgba(255,214,10,0.06)",
      border: "rgba(255,214,10,0.15)",
      glow: "rgba(255,214,10,0.12)",
    },
    {
      label: "Live Now",
      value: live,
      accent: "#EF4444",
      bg: "rgba(239,68,68,0.06)",
      border: "rgba(239,68,68,0.2)",
      glow: "rgba(239,68,68,0.1)",
    },
    {
      label: "Upcoming",
      value: upcoming,
      accent: "#22D3EE",
      bg: "rgba(34,211,238,0.06)",
      border: "rgba(34,211,238,0.15)",
      glow: "rgba(34,211,238,0.08)",
    },
    {
      label: "Completed",
      value: past,
      accent: "rgba(255,255,255,0.35)",
      bg: "rgba(255,255,255,0.03)",
      border: "rgba(255,255,255,0.08)",
      glow: "transparent",
    },
  ];

  return (
    <div className="space-y-10">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Overview
          </p>
          <h1
            className="text-2xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            Dashboard
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

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative rounded-2xl p-6 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
            }}
          >
            {/* Number */}
            <div
              className="text-5xl font-black mb-2 leading-none"
              style={{
                color: s.accent,
                fontFamily: "var(--font-unbounded)",
              }}
            >
              {String(s.value).padStart(2, "0")}
            </div>
            <p
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {s.label}
            </p>
            {/* Glow */}
            <div
              className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-2xl"
              style={{ background: s.glow }}
            />
          </div>
        ))}
      </div>

      {/* ── Recent events ───────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Activity
            </p>
            <h2
              className="text-base font-bold text-white"
              style={{ fontFamily: "var(--font-unbounded)" }}
            >
              Recent Events
            </h2>
          </div>
          <Link
            href="/admin/events"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
            style={{ color: "#FFD60A" }}
          >
            View all
            <IconArrow />
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {recent.length === 0 ? (
            <div className="py-16 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
              <p className="text-sm">No events yet.</p>
              <Link href="/admin/events/new" className="text-xs mt-2 block" style={{ color: "#FFD60A" }}>
                Create your first event →
              </Link>
            </div>
          ) : (
            recent.map((e, i) => (
              <div
                key={e.id}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/[0.02] group"
                style={{
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Status dot */}
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background:
                        e.status === "live" ? "#EF4444" :
                        e.status === "upcoming" ? "#22D3EE" :
                        "rgba(255,255,255,0.2)",
                      boxShadow:
                        e.status === "live" ? "0 0 8px rgba(239,68,68,0.6)" : "none",
                    }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{e.title}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {e.date} · {e.college}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span
                    className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-lg"
                    style={{
                      background:
                        e.status === "live" ? "rgba(239,68,68,0.12)" :
                        e.status === "upcoming" ? "rgba(34,211,238,0.12)" :
                        "rgba(255,255,255,0.06)",
                      color:
                        e.status === "live" ? "#EF4444" :
                        e.status === "upcoming" ? "#22D3EE" :
                        "rgba(255,255,255,0.35)",
                    }}
                  >
                    {e.status}
                  </span>
                  <Link
                    href={`/admin/events/${e.id}/edit`}
                    className="flex items-center gap-1.5 text-xs transition-colors opacity-0 group-hover:opacity-100"
                    style={{ color: "#FFD60A" }}
                  >
                    <IconEdit />
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
