import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, TYPE_COLORS, STATUS_CONFIG } from "@/data/events";
import DriveGallery from "@/components/DriveGallery";

/* Pre-render all event pages at build time */
export function generateStaticParams() {
  return events.map(e => ({ id: String(e.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find(e => e.id === Number(id));
  if (!event) return { title: "Event Not Found" };
  return {
    title:       `${event.title} | AZ CCP`,
    description: event.description,
  };
}

/* ── Icon helpers ─────────────────────────────────────────────────────────── */
function CalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find(e => e.id === Number(id));
  if (!event) notFound();

  const sc     = STATUS_CONFIG[event.status];
  const tc     = TYPE_COLORS[event.type] ?? { bg: "rgba(255,255,255,0.08)", text: "#9CA3AF" };
  const isPast = event.status === "past";

  return (
    <div style={{ background: "#05060F", minHeight: "100vh" }}>

      {/* ══ Slim top nav bar ══════════════════════════════════════════════ */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-6 h-14"
        style={{ background: "rgba(5,6,15,0.88)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}
      >
        <Link
          href="/#events"
          className="flex items-center gap-2 font-display text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: "#5A6278" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All Events
        </Link>

        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-md overflow-hidden border border-white/10">
            <Image src="/brand/az-logo.png" alt="AZ" fill className="object-contain p-0.5" />
          </div>
          <span className="font-display font-bold text-xs text-white hidden sm:block">
            AZ <span style={{ color: "#FFD60A" }}>CCP</span>
          </span>
        </Link>
      </div>

      {/* ══ Cinematic hero image ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 52vh, 520px)" }}>
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ filter: isPast ? "grayscale(40%) brightness(0.6)" : "brightness(0.55)" }}
        />

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0" style={{
          background: [
            "linear-gradient(to bottom, rgba(5,6,15,0.3) 0%, transparent 30%, transparent 55%, #05060F 100%)",
            "linear-gradient(to right, rgba(5,6,15,0.6) 0%, transparent 60%)",
          ].join(", "),
        }} />

        {/* AZ logo watermark in hero */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.05, width: 280, height: 280 }}>
          <Image src="/brand/az-logo.png" alt="" fill className="object-contain" sizes="280px" />
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
                style={{ background: "rgba(5,6,15,0.65)", border: `1px solid ${sc.borderColor}` }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: sc.dotColor, flexShrink: 0,
                  boxShadow: event.status === "live" ? `0 0 8px ${sc.dotColor}` : "none",
                }} />
                <span className="font-display font-bold tracking-widest uppercase" style={{ fontSize: "0.6rem", color: sc.dotColor }}>
                  {sc.label}
                </span>
              </div>
              <span
                className="px-3 py-1.5 rounded-full font-display font-semibold tracking-wider uppercase backdrop-blur-md"
                style={{ fontSize: "0.6rem", background: tc.bg, color: tc.text, border: `1px solid ${tc.text}30` }}
              >
                {event.type}
              </span>
              {event.status === "live" && (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-bold tracking-widest uppercase"
                  style={{ fontSize: "0.6rem", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#EF4444" }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
                  On Air
                </span>
              )}
            </div>

            <h1
              className="font-display font-black text-white leading-[0.9]"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
            >
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ══ Body ══════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 xl:gap-16 items-start">

          {/* ── Left: main content ─────────────────────────────────────── */}
          <div>
            {/* About */}
            <div className="mb-10">
              <div className="section-tag mb-4">About This Event</div>
              <p className="text-white/75 leading-[1.9] font-light" style={{ fontSize: "1.05rem" }}>
                {event.body}
              </p>
            </div>

            {/* ── Past: Gallery ─────────────────────────────────────────── */}
            {isPast && event.gallery.length > 0 && (
              <div>
                {/* Gallery header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="section-tag mb-1">Recap</div>
                    <h2 className="font-display font-black text-2xl md:text-3xl text-white">
                      Event <span className="text-gradient-gold">Gallery</span>
                    </h2>
                  </div>
                  {event.galleryUrl && (
                    <a
                      href={event.galleryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-display font-semibold tracking-wide transition-all duration-200"
                      style={{
                        fontSize:    "0.72rem",
                        color:       "#FFD60A",
                        border:      "1px solid rgba(255,214,10,0.25)",
                        borderRadius: "100px",
                        padding:     "8px 16px",
                        background:  "rgba(255,214,10,0.04)",
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Full Gallery
                    </a>
                  )}
                </div>

                {/* Gallery — Drive if galleryUrl set, else static grid */}
                {event.galleryUrl ? (
                  <DriveGallery folderUrl={event.galleryUrl} />
                ) : event.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {event.gallery.slice(0, 4).map((src, i) => (
                      <div
                        key={i}
                        className="relative rounded-xl overflow-hidden"
                        style={{
                          height: i === 0 ? 260 : 180,
                          gridColumn: i === 0 ? "1 / -1" : "auto",
                        }}
                      >
                        <Image
                          src={src}
                          alt={`${event.title} gallery ${i + 1}`}
                          fill
                          loading="lazy"
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 600px"
                          style={{ filter: "brightness(0.82)" }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(145deg,rgba(5,6,15,0.15),transparent)" }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Drive CTA */}
                {event.galleryUrl && (
                  <a
                    href={event.galleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-between w-full rounded-xl px-5 py-4 group transition-all duration-200"
                    style={{
                      background:  "linear-gradient(145deg,#111320,#0D0F1A)",
                      border:      "1px solid rgba(255,214,10,0.12)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Drive icon */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.15)" }}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FFD60A" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-display font-semibold text-white text-sm">View Full Gallery</div>
                        <div className="font-display text-[0.62rem] tracking-widest uppercase mt-0.5" style={{ color: "#3A4058" }}>
                          Google Drive · All Photos
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "#FFD60A" }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ── Right: details sidebar ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-20">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(145deg,#111320,#0D0F1A)",
                border:     "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="section-tag mb-5">Event Details</div>

              <div className="space-y-4">
                {[
                  { icon: <CalIcon />,   label: "Date",     value: event.date     },
                  { icon: <ClockIcon />, label: "Time",     value: event.time     },
                  { icon: <PinIcon />,   label: "Venue",    value: event.location },
                  { icon: <GlobeIcon />, label: "Chapter",  value: event.college  },
                ].map(row => (
                  <div key={row.label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(255,255,255,0.04)", color: "#5A6278" }}
                    >
                      {row.icon}
                    </div>
                    <div>
                      <div className="font-display text-[0.58rem] tracking-widest uppercase mb-0.5" style={{ color: "#3A4058" }}>
                        {row.label}
                      </div>
                      <div className="text-white text-sm font-medium leading-snug">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 h-px" style={{ background: "linear-gradient(90deg,rgba(255,214,10,0.12),rgba(255,255,255,0.03),transparent)" }} />

              {/* CTA */}
              {event.link ? (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="az-btn-gold w-full justify-center"
                >
                  {event.status === "live" ? "Join Live Now" : "Register for Free"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <div
                  className="w-full flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-wider text-sm py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "#3A4058" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Event Completed
                </div>
              )}

              {/* Contact nudge */}
              <p className="mt-4 text-center font-display text-[0.6rem] tracking-widest uppercase" style={{ color: "#2A3048" }}>
                Questions?{" "}
                <a href="mailto:campusconnect@algozenit.com" style={{ color: "#3A4058", textDecoration: "underline" }}>
                  Email us
                </a>
              </p>
            </div>

            {/* Back link */}
            <Link
              href="/#events"
              className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl py-3 font-display text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#3A4058", border: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
