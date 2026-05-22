"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#initiatives",  label: "Initiatives"  },
  { href: "#benefits",     label: "Benefits"      },
  { href: "#peek",         label: "Gallery"       },
  { href: "#mission",      label: "Mission"       },
  { href: "#events",       label: "Events"        },
  { href: "#testimonials", label: "Testimonials"  },
  { href: "#faq",          label: "FAQs"          },
];



export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled,  setScrolled]    = useState(false);
  const [activeId,  setActiveId]    = useState<string>("");
  const drawerRef                   = useRef<HTMLDivElement>(null);

  /* ── Scroll shadow ────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracking ──────────────────────────── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Trap focus / close on Esc ────────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* ── Prevent body scroll when drawer open ─────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 glass-nav transition-all duration-500 ${
          scrolled ? "shadow-[0_4px_40px_rgba(0,0,0,0.65)]" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ───────────────────────────────────────── */}
            <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-gold/40 transition-colors duration-300">
                <Image
                  src="/brand/az-logo.png"
                  alt="AlgoZenith"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-xs text-white tracking-tight leading-none block">
                  AlgoZenith <span className="text-gold">CCP</span>
                </span>
                <span className="font-display text-[0.55rem] text-gray-600 tracking-widest uppercase leading-none block mt-0.5">Campus Connect</span>
              </div>
            </a>

            {/* ── Desktop pill nav ───────────────────────────── */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1.5 backdrop-blur-sm"
            >
              {navLinks.map((link) => {
                const id      = link.href.slice(1);
                const isActive = activeId === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-[10.5px] font-display font-medium tracking-widest uppercase rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-gold bg-gold/10"
                        : "text-az-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full ring-1 ring-gold/25 pointer-events-none" />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* ── Right-side CTAs ────────────────────────────── */}
            <div className="flex items-center gap-3 flex-shrink-0">


              {/* Apply Now – always visible */}
              <a
                href="https://forms.gle/HpedZoLqd7puN1hPA"
                target="_blank"
                rel="noopener noreferrer"
                className="az-btn-gold !py-2 !px-5 !text-[10.5px] hidden sm:inline-flex"
              >
                Apply Now
              </a>

              {/* Burger – mobile only */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-colors duration-200"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer"
              >
                {/* animated burger → X */}
                <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
                <span
                  aria-hidden
                  className={`absolute block w-4 h-px bg-current transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-0" : "-translate-y-1"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute block w-4 h-px bg-current transition-all duration-300 ${
                    menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute block w-4 h-px bg-current transition-all duration-300 ${
                    menuOpen ? "-rotate-45 translate-y-0" : "translate-y-1"
                  }`}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer backdrop ─────────────────────────── */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Mobile drawer panel ────────────────────────────── */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-x-0 top-16 z-50 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="mx-3 rounded-2xl bg-az-surface border border-white/[0.07] shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden">

          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="p-3 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const id      = link.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-display uppercase tracking-widest transition-all duration-200 ${
                    isActive
                      ? "text-gold bg-gold/10 border border-gold/15"
                      : "text-az-muted hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-4" />

          {/* Apply */}
          <div className="p-3">
            <a
              href="https://forms.gle/HpedZoLqd7puN1hPA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="az-btn-gold !py-3 !px-5 !text-[11px] mt-1 justify-center"
            >
              Apply Now →
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
