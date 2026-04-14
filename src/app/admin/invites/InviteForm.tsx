"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InviteForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    const res = await fetch("/api/admin/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setState("sent");
      setEmail("");
      router.refresh();
      setTimeout(() => setState("idle"), 3000);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Failed to send invite");
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="colleague@college.edu"
          className="flex-1 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/20"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid rgba(255,214,10,0.4)";
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.09)";
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          }}
        />
        <button
          type="submit"
          disabled={state === "sending" || state === "sent"}
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:scale-100 shrink-0"
          style={{
            background:
              state === "sent"
                ? "rgba(52,211,153,0.15)"
                : "linear-gradient(135deg,#FFD60A 0%,#F0B800 100%)",
            color: state === "sent" ? "#34D399" : "#000",
            border: state === "sent" ? "1px solid rgba(52,211,153,0.3)" : "none",
            fontFamily: "var(--font-unbounded)",
            fontSize: "11px",
            letterSpacing: "0.05em",
            boxShadow: state === "sent" ? "none" : "0 4px 20px rgba(255,214,10,0.25)",
          }}
        >
          {state === "sending" ? "Sending…" : state === "sent" ? "✓ Sent" : "Send Invite"}
        </button>
      </div>

      {state === "error" && (
        <p
          className="text-xs px-4 py-2.5 rounded-xl"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#EF4444",
          }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
