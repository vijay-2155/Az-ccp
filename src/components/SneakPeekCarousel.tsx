"use client";

import {
  useRef, useState, useEffect, useCallback, useLayoutEffect,
} from "react";
import Image from "next/image";

const gallery = [
  {
    src:     "/gallery/iit-kanpur-community.jpg",
    alt:     "IIT Kanpur community",
    caption: "IIT Kanpur Chapter",
    college: "Indian Institute of Technology, Kanpur",
  },
  {
    src:     "/gallery/viit-coding-contest.jpg",
    alt:     "Coding contest at VIIT",
    caption: "Coding Contest",
    college: "Vignan's Institute of Information Technology",
  },
  {
    src:     "/gallery/viit-design-decode.jpg",
    alt:     "Design Decode event at VIIT",
    caption: "Design Decode",
    college: "Vignan's Institute of Information Technology",
  },
  {
    src:     "/gallery/kiit-dark-route.jpg",
    alt:     "Dark Route event at KIIT",
    caption: "Dark Route",
    college: "Kalinga Institute of Industrial Technology",
  },
  {
    src:     "/gallery/kiit-code-kurukshetra.jpeg",
    alt:     "Code Kurukshetra at KIIT",
    caption: "Code Kurukshetra",
    college: "Kalinga Institute of Industrial Technology",
  },
  {
    src:     "/gallery/viit-cp-dsa-session.jpg",
    alt:     "CP & DSA Session at VIIT",
    caption: "CP & DSA Session",
    college: "Vignan's Institute of Engineering for Women",
  },
  {
    src:     "/gallery/viit-ideathon-view.jpg",
    alt:     "Ideathon at VIIT",
    caption: "Ideathon",
    college: "Vignan's Institute of Engineering for Women",
  },
  {
    src:     "/gallery/iiit-bhagalpur-ideathon.jpg",
    alt:     "Ideathon at IIIT Bhagalpur",
    caption: "Ideathon",
    college: "Indian Institute of Information Technology, Bhagalpur",
  },
  {
    src:     "/gallery/iiit-bhagalpur-intro-cp-dsa.jpg",
    alt:     "Intro to CP & DSA at IIIT Bhagalpur",
    caption: "Intro to CP & DSA",
    college: "Indian Institute of Information Technology, Bhagalpur",
  },
  {
    src:     "/gallery/viit-chrome-hackathon.jpeg",
    alt:     "Chrome Extensions Hackathon at VIIT",
    caption: "Chrome Extensions Hackathon",
    college: "Vignan's Institute of Information Technology",
  },
  {
    src:     "/gallery/bbdit-web-dev-workshop.jpg",
    alt:     "Web Dev Workshop at BBDIT",
    caption: "Web Dev Workshop",
    college: "Babu Banarasi Das Institute of Technology & Management",
  },
];

const CARD_W    = 300;   // fixed card width (px)
const CARD_H    = 210;   // fixed card height (px)
const GAP       = 20;    // gap between cards (px)
const STEP      = CARD_W + GAP;
const AUTO_MS   = 3200;  // auto-advance interval

export default function SneakPeekCarousel() {
  const count        = gallery.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef      = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pausedRef    = useRef(false);

  const [activeIdx, setActiveIdx] = useState(0);
  const [trackX,    setTrackX]    = useState(0);   // CSS translateX for the track

  /* ── Compute translateX so the active card sits centred ─────── */
  const centreCard = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const W   = containerRef.current.offsetWidth;
    /* positive = shift track left, negative = shift right to expose card */
    const raw = idx * STEP - (W / 2 - CARD_W / 2);
    setTrackX(raw);
  }, []);

  /* Recalculate on activeIdx change */
  useLayoutEffect(() => { centreCard(activeIdx); }, [activeIdx, centreCard]);

  /* Recalculate on container resize (e.g. window resize) */
  useEffect(() => {
    const ro = new ResizeObserver(() => centreCard(activeIdx));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [activeIdx, centreCard]);

  /* ── Auto-play: advance & loop ──────────────────────────────── */
  const scheduleNext = useCallback(() => {
    clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => {
      if (!pausedRef.current) setActiveIdx(i => (i + 1) % count);
    }, AUTO_MS);
  }, [count]);

  useEffect(() => {
    scheduleNext();
    return () => clearTimeout(autoRef.current);
  }, [activeIdx, scheduleNext]);

  /* ── Manual nav ─────────────────────────────────────────────── */
  const go = (idx: number) => setActiveIdx((idx + count) % count);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-10"
      onMouseEnter={() => { pausedRef.current = true;  clearTimeout(autoRef.current); }}
      onMouseLeave={() => { pausedRef.current = false; scheduleNext(); }}
    >
      {/* ── Sliding track ── all cards move together as one unit ── */}
      <div
        className="flex"
        style={{
          gap:        GAP,
          transform:  `translateX(${-trackX}px)`,
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        {gallery.map((item, i) => {
          const isActive = i === activeIdx;
          const dist     = Math.abs(i - activeIdx);

          /* Scale, opacity, and shadow based on distance from active */
          const scale   = isActive ? 1.06 : dist === 1 ? 0.95 : 0.88;
          const opacity = isActive ? 1    : dist === 1 ? 0.5  : 0.25;
          const shadow  = isActive
            ? "0 28px 72px rgba(0,0,0,0.75), 0 0 56px rgba(255,214,10,0.14)"
            : "0 4px 20px rgba(0,0,0,0.35)";
          const border  = isActive
            ? "1.5px solid rgba(255,214,10,0.4)"
            : "1px solid rgba(255,255,255,0.05)";

          return (
            <figure
              key={item.src}
              onClick={() => go(i)}
              style={{
                width:        CARD_W,
                flexShrink:   0,
                borderRadius: 18,
                overflow:     "hidden",
                cursor:       "pointer",
                background:   "linear-gradient(145deg,#111320,#0D0F1A)",
                transform:    `scale(${scale})`,
                opacity,
                boxShadow:    shadow,
                border,
                /* All visual props share the same spring-like transition */
                transition:   [
                  "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                  "opacity   0.6s ease",
                  "box-shadow 0.6s ease",
                  "border-color 0.6s ease",
                ].join(", "),
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: CARD_H, overflow: "hidden" }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  style={{
                    transform:  isActive ? "scale(1.0)" : "scale(1.1)",
                    transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  sizes={`${CARD_W}px`}
                  loading={i < 3 ? "eager" : "lazy"}
                />
                {/* Gradient veil */}
                <div
                  style={{
                    position:   "absolute",
                    inset:      0,
                    background: "linear-gradient(to top, rgba(5,6,15,0.7) 0%, transparent 55%)",
                    opacity:    isActive ? 1 : 0.25,
                    transition: "opacity 0.6s ease",
                  }}
                />
                {/* Active badge */}
                {isActive && (
                  <div
                    style={{
                      position:   "absolute",
                      top:        12,
                      right:      12,
                      width:       8,
                      height:      8,
                      borderRadius: "50%",
                      background:  "#FFD60A",
                      boxShadow:   "0 0 10px rgba(255,214,10,0.8)",
                      animation:   "glow-pulse 1.4s ease-in-out infinite",
                    }}
                  />
                )}
              </div>

              {/* Caption */}
              <figcaption
                style={{
                  padding:    "10px 16px 14px",
                  transition: "color 0.6s ease",
                }}
              >
                {/* Event name */}
                <p style={{
                  margin:        0,
                  fontSize:      "0.68rem",
                  fontFamily:    "var(--font-unbounded, sans-serif)",
                  letterSpacing: "0.18em",
                  color:         isActive ? "#FFD60A" : "#3A4058",
                  transition:    "color 0.6s ease",
                  lineHeight:    1.3,
                }}>
                  {item.caption}
                </p>
                {/* Full college name */}
                <p style={{
                  margin:        "4px 0 0",
                  fontSize:      "0.6rem",
                  fontFamily:    "var(--font-geist-sans, sans-serif)",
                  letterSpacing: "0.02em",
                  color:         isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.15)",
                  transition:    "color 0.6s ease",
                  lineHeight:    1.4,
                  fontStyle:     "italic",
                }}>
                  {item.college}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* ── Arrow buttons ── */}
      {(["prev", "next"] as const).map(dir => (
        <button
          key={dir}
          onClick={() => go(dir === "next" ? activeIdx + 1 : activeIdx - 1)}
          aria-label={dir === "next" ? "Next slide" : "Previous slide"}
          className="absolute top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center
                     rounded-full border border-white/10 text-gray-400
                     hover:border-gold/50 hover:text-gold
                     transition-all duration-200 z-10 backdrop-blur-sm"
          style={{
            [dir === "prev" ? "left" : "right"]: 0,
            background: "rgba(13,15,26,0.85)",
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path
              strokeLinecap="round" strokeLinejoin="round"
              d={dir === "prev" ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"}
            />
          </svg>
        </button>
      ))}

      {/* ── Dot indicators ── */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {gallery.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              borderRadius: 999,
              height:       6,
              width:        i === activeIdx ? 26 : 6,
              background:   i === activeIdx ? "#FFD60A" : "rgba(255,255,255,0.18)",
              transition:   "width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s ease",
              border:       "none",
              cursor:       "pointer",
              padding:      0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
