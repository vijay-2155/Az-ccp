"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:   "I joined AZ as a student attending events, never imagining that one day I’d lead the same community. This journey taught me that growth starts with simply showing up. Every late-night planning call, every successful event, and every team bonding moment became memories I’ll always cherish. AZ CCP was never just a community to me — it became home.",
    name:    "Anshika Vishwakarma",
    college: "Vignan's Institute of Information Technology, Vizag",
    photo:   "/testimonials/leads/anshika-vishwakarma.png",
    cohort:  "2025/26",
  },
  {
    quote:   "During my tenure, I managed multiple teams with 40+ members and worked on organizing coding-focused initiatives that encouraged students to explore DSA, competitive programming, and technical growth. One of the most rewarding parts of this journey was successfully organizing 4 major coding events with participation from 1000+ students, which significantly increased student engagement in coding activities across the campus.",
    name:    "Aryan Bhargava",
    college: "Kalinga Institute of Industrial Technology",
    photo:   "/testimonials/leads/aryan-bhargava.png",
    cohort:  "2025/26",
  },
  {
    quote:   "Being a part of AlgoZenith has been a really valuable experience for me. It gave me the opportunity to learn new technologies, work with amazing people, and grow both technically and personally. The environment is very supportive and motivating, and it truly encourages students to explore, create, and collaborate.",
    name:    "Himanshu Makhe",
    college: "S B Jain Institute of Technology Management and Research",
    photo:   "/testimonials/leads/himanshu-makhe.jpg",
    cohort:  "2025/26",
  },
  {
    quote:   "Leading the AlgoZenith CCP chapter was an amazing experience. I mentored students, organized coding sessions, and helped build a strong problem-solving culture on campus. The role enhanced my leadership, communication, and technical skills while allowing me to contribute meaningfully to a collaborative and motivated competitive programming community.",
    name:    "Aastik Das",
    college: "Indian Institute of Information Technology, Bhagalpur",
    photo:   "/testimonials/leads/astik-das.jpg",
    cohort:  "2025/26",
  },
  {
    quote:   "From handling responsibilities to managing community tasks and events, every experience helped me improve my communication, leadership, teamwork, and networking skills. It never felt like just another student community.. it felt like a space filled with motivated people who genuinely wanted to learn and help each other grow.",
    name:    "Neelam Reethika",
    college: "Vignan's Institute of Engineering for Women",
    photo:   "/testimonials/leads/neelam-reethika.jpg",
    cohort:  "2025/26",
  },
  {
    quote:   "From dreaming of hosting events to actually making them happen, AZ turned aspirations into reality. It taught me leadership, boosted my confidence, and proved that I can achieve anything I set my mind to.",
    name:    "Nehal Fatema",
    college: "Vignan's Institute of Information Technology",
    photo:   "/testimonials/nehal.png",
    cohort:  "2024/25",
  },
  {
    quote:   "Being a lead at AZ CCP was an experience like none other. I enhanced myself in leadership, built an entire team of talented people, and made awesome memories and connections with other AZ Leads.",
    name:    "Kabir Dafda",
    college: "Government Engineering College, Patan",
    photo:   "/testimonials/kabir.png",
    cohort:  "2024/25",
  },
];

const AUTO_MS = 5500;
const EXIT_MS = 320;

/* Ring geometry — wraps the active thumbnail avatar */
const R    = 34;
const CIRC = 2 * Math.PI * R;  // ≈ 213.6

type Slot = { id: number; index: number; exiting: boolean; cls: string };
let uid = 0;

export default function TestimonialsCarousel() {
  const count    = testimonials.length;
  const busyRef  = useRef(false);
  const pauseRef = useRef(false);
  const t0Ref    = useRef<number | null>(null);

  /*
   * ringRef lives on an always-mounted SVG outside the slot system.
   * It never unmounts during card transitions → no stuck progress.
   */
  const ringRef = useRef<SVGCircleElement>(null);

  const [current, setCurrent] = useState(0);
  const [slots,   setSlots]   = useState<Slot[]>([
    { id: uid++, index: 0, exiting: false, cls: "" },
  ]);

  /* ── Navigate ───────────────────────────────────────────────── */
  const go = useCallback((dir: "next" | "prev" | number) => {
    if (busyRef.current) return;
    busyRef.current = true;
    t0Ref.current   = null;

    const nextIdx =
      typeof dir === "number"
        ? dir
        : dir === "next"
        ? (current + 1) % count
        : (current - 1 + count) % count;

    const forward  = nextIdx > current || (current === count - 1 && nextIdx === 0);
    const exitCls  = forward ? "slide-out-left"   : "slide-out-right";
    const enterCls = forward ? "slide-from-right" : "slide-from-left";

    setSlots(prev => [
      ...prev.map(s => s.exiting ? s : { ...s, exiting: true, cls: exitCls }),
      { id: uid++, index: nextIdx, exiting: false, cls: enterCls },
    ]);
    setCurrent(nextIdx);

    setTimeout(() => {
      setSlots(s => s.filter(x => !x.exiting));
      busyRef.current = false;
    }, EXIT_MS + 20);
  }, [current, count]);

  const goNext = useCallback(() => go("next"), [go]);
  const goPrev = useCallback(() => go("prev"), [go]);

  /* ── RAF drives the stable ring (never unmounts) ────────────── */
  useEffect(() => {
    let handle: number;

    const tick = (now: number) => {
      if (pauseRef.current) return;
      if (t0Ref.current === null) t0Ref.current = now;
      const elapsed = now - t0Ref.current;
      const pct     = Math.min(elapsed / AUTO_MS, 1);

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(CIRC * (1 - pct));
      }

      if (elapsed >= AUTO_MS) { goNext(); return; }
      handle = requestAnimationFrame(tick);
    };

    /* Reset the ring arc immediately on slide change */
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = String(CIRC);
    }

    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle);
  }, [current, goNext]);

  const pause  = () => { pauseRef.current = true; };
  const resume = () => { pauseRef.current = false; t0Ref.current = null; };

  return (
    <div
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* ══ Card stage ══════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          border:     "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(145deg,#111320 0%,#0D0F1A 100%)",
          minHeight:  360,
        }}
      >
        {slots.map(slot => {
          const t = testimonials[slot.index];
          return (
            <div
              key={slot.id}
              className={`${slot.exiting ? "absolute inset-0 z-0" : "relative z-10"} ${slot.cls} flex flex-col md:flex-row`}
              style={{ willChange: "transform, opacity, filter", minHeight: 360 }}
            >

              {/* ── Left: large photo panel ─────────────────── */}
              <div
                className="relative md:w-56 lg:w-64 flex-shrink-0 overflow-hidden"
                style={{ minHeight: 220 }}
              >
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  loading="lazy"
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
                {/* Dark veil for text legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(5,6,15,0.85) 0%, rgba(5,6,15,0.2) 55%, transparent 100%)",
                  }}
                />
                {/* Vertical right-edge fade blending into card body */}
                <div
                  className="absolute inset-y-0 right-0 w-16 hidden md:block"
                  style={{ background: "linear-gradient(to right, transparent, #111320)" }}
                />
                {/* Name + college over photo */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:pr-8">
                  <div
                    className="font-display font-bold text-white leading-tight"
                    style={{ fontSize: "0.95rem", letterSpacing: "0.02em" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="mt-1 leading-snug"
                    style={{
                      fontSize:    "0.62rem",
                      color:       "#FFD60A",
                      opacity:     0.75,
                      letterSpacing: "0.05em",
                      lineHeight:  1.45,
                      maxWidth:    "90%",
                    }}
                  >
                    {t.college}
                  </div>
                </div>
              </div>

              {/* ── Right: quote area ───────────────────────── */}
              <div className="flex-1 relative flex flex-col p-7 md:p-9 overflow-hidden">

                {/* AZ logo ghost watermark */}
                <div
                  className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="relative" style={{ width: 200, height: 200, opacity: 0.028 }}>
                    <Image
                      src="/brand/az-logo.png"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>

                {/* Slide counter — top right */}
                <div
                  className="relative z-10 self-end mb-4 font-display font-bold tabular-nums"
                  style={{ fontSize: "0.65rem", color: "rgba(255,214,10,0.4)", letterSpacing: "0.15em" }}
                >
                  {String(slot.index + 1).padStart(2, "0")}
                  <span style={{ opacity: 0.35 }}> / </span>
                  {String(count).padStart(2, "0")}
                </div>

                {/* Decorative quote mark */}
                <span
                  className="relative z-10 font-display leading-none select-none block"
                  style={{ fontSize: "4.5rem", color: "rgba(255,214,10,0.1)", lineHeight: 1, marginBottom: -8 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Quote */}
                <p
                  className="relative z-10 flex-1 text-white/82 leading-relaxed font-light"
                  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.85 }}
                >
                  {t.quote}
                </p>

                {/* Bottom accent */}
                <div
                  className="relative z-10 mt-6 h-px"
                  style={{ background: "linear-gradient(90deg,rgba(255,214,10,0.18),rgba(255,255,255,0.04),transparent)" }}
                />

                {/* AZ tag with year */}
                <div className="relative z-10 mt-4 flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#FFD60A", boxShadow: "0 0 6px rgba(255,214,10,0.6)" }}
                  />
                  <span
                    className="font-display uppercase tracking-widest"
                    style={{ fontSize: "0.55rem", color: "rgba(255,214,10,0.55)" }}
                  >
                    AZ Campus Lead &mdash; {t.cohort}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ Controls: avatar thumbnails + arrows ════════════════════ */}
      <div className="flex items-center justify-between mt-5 gap-4">

        {/* Avatar row — clicking navigates; active carries the stable ring */}
        <div className="flex items-center gap-3">
          {testimonials.map((t, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`View ${t.name}`}
                className="relative flex-shrink-0 transition-all duration-400"
                style={{
                  width:   isActive ? 64 : 48,
                  height:  isActive ? 64 : 48,
                  opacity: isActive ? 1 : 0.42,
                  /* spring-like size change */
                  transition: "width 0.45s cubic-bezier(0.34,1.56,0.64,1), height 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
                }}
              >
                {/* Stable SVG ring — only visible on active; ref NEVER unmounts */}
                {isActive && (
                  <svg
                    width="64" height="64"
                    viewBox="0 0 72 72"
                    className="absolute inset-0"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <defs>
                      <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#FFD60A" />
                        <stop offset="100%" stopColor="#FF8C00" />
                      </linearGradient>
                    </defs>
                    {/* Track */}
                    <circle cx="36" cy="36" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
                    {/* Animated arc — ref lives here, always mounted */}
                    <circle
                      ref={ringRef}
                      cx="36" cy="36" r={R}
                      fill="none"
                      stroke="url(#ring-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC}
                      style={{ transition: "none" }}
                    />
                  </svg>
                )}

                {/* Avatar photo */}
                <div
                  className="absolute rounded-full overflow-hidden"
                  style={{
                    inset:     isActive ? 6 : 2,
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(255,214,10,0.35), 0 4px 16px rgba(0,0,0,0.5)"
                      : "0 2px 8px rgba(0,0,0,0.4)",
                    transition: "inset 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
                  }}
                >
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    loading="lazy"
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2">
          {(["prev", "next"] as const).map(dir => (
            <button
              key={dir}
              onClick={dir === "next" ? goNext : goPrev}
              aria-label={dir === "next" ? "Next" : "Previous"}
              className="w-9 h-9 flex items-center justify-center rounded-full"
              style={{
                background: "rgba(17,19,32,0.8)",
                border:     "1px solid rgba(255,255,255,0.08)",
                color:      "#5A6278",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,214,10,0.35)";
                el.style.color       = "#FFD60A";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.color       = "#5A6278";
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path
                  strokeLinecap="round" strokeLinejoin="round"
                  d={dir === "prev" ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"}
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
