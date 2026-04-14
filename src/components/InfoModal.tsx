"use client";

import { useState, useEffect, useCallback } from "react";

type ModalType = "roles" | "eligibility";

const modalData: Record<ModalType, { title: string; content: React.ReactNode }> = {
  roles: {
    title: "Roles & Responsibilities",
    content: (
      <div>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          As a Campus Lead, you&apos;ll take on impactful work that sharpens your leadership,
          organization, and communication — here&apos;s what you&apos;ll own:
        </p>
        <ol className="space-y-4">
          {[
            ["Organize Events", "Plan and host coding contests, webinars, workshops, and tech meetups — with full guidance from the AlgoZenith team."],
            ["Lead the Community", "Unite students across departments and batches to build a collaborative, growth-driven learning community."],
            ["Collaborate with AZ", "Stay in close contact with the AlgoZenith team — share updates, ideas, and feedback to shape future initiatives."],
            ["Build Your Core Team", "Select passionate peers to help you plan, promote, and execute events effectively."],
            ["Drive Engagement", "Promote AlgoZenith programs, events, and opportunities through campus channels and social media."],
            ["Uphold the Culture", "Represent AlgoZenith with integrity, creativity, and inclusivity — fostering a positive environment on campus."],
          ].map(([title, desc], i) => (
            <li key={title} className="flex gap-4">
              <span className="font-display text-xs text-gold/40 font-bold mt-0.5 flex-shrink-0 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-white font-semibold text-sm mb-1">{title}</div>
                <div className="text-gray-400 text-xs leading-relaxed">{desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  eligibility: {
    title: "Eligibility Criteria",
    content: (
      <ul className="space-y-3">
        {[
          "Must be enrolled in a recognized institution in India pursuing BTech, MTech, BCA, or MCA.",
          "Students in integrated programs (BTech+MTech, BCA+MCA) are also eligible.",
          "First-year students are not eligible to apply.",
          "Final-year students are not eligible to apply.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-gray-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
};

export default function InfoModal() {
  const [open, setOpen] = useState<ModalType | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const current = open ? modalData[open] : null;

  return (
    <>
      {/* Trigger buttons */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => setOpen("roles")}
          className="text-xs font-display text-cyan hover:text-white transition-colors tracking-widest uppercase border-b border-cyan/30 hover:border-white/40 pb-0.5"
        >
          Roles &amp; Responsibilities
        </button>
        <span className="w-px h-4 bg-white/10" aria-hidden="true" />
        <button
          onClick={() => setOpen("eligibility")}
          className="text-xs font-display text-cyan hover:text-white transition-colors tracking-widest uppercase border-b border-cyan/30 hover:border-white/40 pb-0.5"
        >
          Eligibility Criteria
        </button>
      </div>

      {/* Modal overlay */}
      {open && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-enter w-full md:max-w-xl bg-az-surface border border-white/10 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-7 py-5 border-b border-white/[0.06]">
              <div>
                <div className="section-tag mb-1">AZ CCP</div>
                <h3 id="modal-title" className="font-display text-lg font-bold text-white">
                  {current.title}
                </h3>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Body */}
            <div className="px-7 py-6 max-h-[65vh] overflow-y-auto">{current.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
