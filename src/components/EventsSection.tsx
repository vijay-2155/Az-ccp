"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AZWatermark from "@/components/AZWatermark";
import { events, TYPE_COLORS, STATUS_CONFIG, type AZEvent } from "@/data/events";

type Tab = "all" | "live" | "upcoming" | "past";
const TABS: { key: Tab; label: string }[] = [
  { key: "all",      label: "All Events" },
  { key: "live",     label: "Live"       },
  { key: "upcoming", label: "Upcoming"   },
  { key: "past",     label: "Past"       },
];

/* ─── Small icons ───────────────────────────────────────────────────────────── */
const CalIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const PinIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

/* ─── Event Card ────────────────────────────────────────────────────────────── */
function EventCard({ event }: { event: AZEvent }) {
  const sc  = STATUS_CONFIG[event.status];
  const tc  = TYPE_COLORS[event.type] ?? { bg: "rgba(255,255,255,0.08)", text: "#9CA3AF" };
  const isPast = event.status === "past";

  return (
    <article
      className="rounded-2xl overflow-hidden flex flex-col group"
      style={{
        background: "linear-gradient(145deg,#111320,#0D0F1A)",
        border:     `1px solid ${sc.borderColor}`,
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform  = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = event.status === "live"
          ? "0 20px 56px rgba(0,0,0,0.7), 0 0 40px rgba(239,68,68,0.1)"
          : "0 20px 56px rgba(0,0,0,0.6), 0 0 32px rgba(255,214,10,0.06)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform  = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* ── Banner image ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          style={{ filter: isPast ? "grayscale(55%) brightness(0.75)" : "brightness(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(5,6,15,0.1) 0%, rgba(17,19,32,0.98) 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md"
            style={{ background: "rgba(5,6,15,0.55)", border: `1px solid ${sc.borderColor}` }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: sc.dotColor, flexShrink: 0,
              boxShadow:   event.status === "live" ? `0 0 8px ${sc.dotColor}` : "none",
              animation:   event.status === "live" ? "glow-pulse 1.2s ease-in-out infinite" : undefined,
            }} />
            <span className="font-display font-semibold tracking-widest uppercase" style={{ fontSize: "0.58rem", color: sc.dotColor }}>
              {sc.label}
            </span>
          </div>
          <span
            className="font-display font-semibold tracking-wider uppercase px-2.5 py-1.5 rounded-full backdrop-blur-md"
            style={{ fontSize: "0.58rem", background: tc.bg, color: tc.text, border: `1px solid ${tc.text}26` }}
          >
            {event.type}
          </span>
        </div>
        {event.status === "live" && (
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", animation: "glow-pulse 0.9s ease-in-out infinite" }} />
            <span className="font-display text-[0.55rem] text-red-400 font-bold tracking-widest uppercase">On Air</span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-5 pt-4 pb-3 flex flex-col gap-2.5 flex-1">
        <h3 className="font-display font-bold text-sm text-white leading-snug">{event.title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed font-light line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
          {[
            { icon: <CalIcon />,   text: event.date     },
            { icon: <ClockIcon />, text: event.time     },
            { icon: <PinIcon />,   text: event.location },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1 text-[0.67rem]" style={{ color: "#5A6278" }}>
              {icon}{text}
            </span>
          ))}
        </div>
        <span className="font-display tracking-widest uppercase" style={{ fontSize: "0.58rem", color: "#2A3048" }}>
          {event.college}
        </span>
      </div>

      {/* ── CTAs ── */}
      <div className="px-5 pb-5 flex flex-col gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 14 }}>
        {event.link ? (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="az-btn-gold w-full justify-center"
            style={{ fontSize: "0.75rem", padding: "10px 20px" }}
          >
            {event.status === "live" ? "Join Now →" : "Register →"}
          </a>
        ) : null}

        <Link
          href={`/events/${event.id}`}
          className="w-full flex items-center justify-center gap-1.5 rounded-full font-display font-semibold tracking-wide transition-colors duration-200"
          style={{
            fontSize:   "0.72rem",
            padding:    "10px 20px",
            background: "rgba(255,255,255,0.03)",
            border:     "1px solid rgba(255,255,255,0.08)",
            color:      isPast ? "#5A6278" : "#9AA3BA",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,214,10,0.25)";
            (e.currentTarget as HTMLElement).style.color       = "#FFD60A";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.color       = isPast ? "#5A6278" : "#9AA3BA";
          }}
        >
          {isPast ? "View Recap →" : "View Details →"}
        </Link>
      </div>
    </article>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────────── */
export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const filtered = activeTab === "all" ? events : events.filter(e => e.status === activeTab);
  const counts: Record<Tab, number> = {
    all:      events.length,
    live:     events.filter(e => e.status === "live").length,
    upcoming: events.filter(e => e.status === "upcoming").length,
    past:     events.filter(e => e.status === "past").length,
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden" style={{ background: "#0D0F1A" }}>
      <AZWatermark size={460} opacity={0.02} rotate={-18} className="-top-10 -left-20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="section-tag mb-3">Chapter Events</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
              What&apos;s <span className="text-gradient-gold">Happening</span>
            </h2>
          </div>
          {counts.live > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full self-start sm:self-auto"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", boxShadow: "0 0 8px rgba(239,68,68,0.8)", animation: "glow-pulse 1.2s ease-in-out infinite", flexShrink: 0 }} />
              <span className="font-display text-xs text-red-400 tracking-widest uppercase font-semibold">{counts.live} Live Now</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-10 p-1 rounded-full w-fit flex-wrap"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-display text-xs font-semibold tracking-widest uppercase transition-all duration-250"
                style={{ background: isActive ? "#FFD60A" : "transparent", color: isActive ? "#05060F" : "#5A6278", boxShadow: isActive ? "0 0 20px rgba(255,214,10,0.25)" : "none" }}
              >
                {tab.label}
                <span className="rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-black"
                  style={{ fontSize: "0.55rem", background: isActive ? "rgba(5,6,15,0.2)" : "rgba(255,255,255,0.07)", color: isActive ? "#05060F" : "#3A4058" }}>
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 font-display text-sm tracking-widest uppercase" style={{ color: "#3A4058" }}>
            No events in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        )}

        <div className="mt-14 text-center">
          <p className="text-sm mb-5" style={{ color: "#3A4058" }}>Want your chapter&apos;s event listed here?</p>
          <a href="mailto:campusconnect@algozenit.com" className="az-btn-outline !text-sm">Submit Your Event</a>
        </div>
      </div>
    </section>
  );
}
