"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#benefits",     label: "Benefits"     },
  { href: "#peek",         label: "Sneak Peek"   },
  { href: "#mission",      label: "Mission"      },
  { href: "#events",       label: "Events"       },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq",          label: "FAQs"         },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 glass-nav transition-all duration-500 ${
        scrolled ? "shadow-[0_4px_32px_rgba(0,0,0,0.6)]" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 group-hover:border-gold/40 transition-colors">
              <Image
                src="/brand/az-logo.png"
                alt="AlgoZenith"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="font-display font-bold text-sm text-white hidden sm:block tracking-tight">
              AZ <span className="text-gold">CCP</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 text-xs font-display font-medium tracking-widest uppercase text-az-muted hover:text-gold rounded-full transition-all duration-200 hover:bg-gold/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://forms.gle/HpedZoLqd7puN1hPA"
              target="_blank"
              rel="noopener noreferrer"
              className="az-btn-gold !py-2 !px-5 !text-xs"
            >
              Apply Now
            </a>
            <a
              href="https://maang.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex az-btn-outline !py-2 !px-5 !text-xs"
            >
              About AZ
            </a>
            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-az-bg/98 border-t border-white/[0.05] backdrop-blur-xl">
          <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-xs font-display uppercase tracking-widest text-az-muted hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
