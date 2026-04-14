"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const IconTrash = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 3h9M4.5 3V2.25C4.5 1.836 4.836 1.5 5.25 1.5h1.5C7.164 1.5 7.5 1.836 7.5 2.25V3M2.5 3l.5 7.5h6L9.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DeleteEventButton({ id }: { id: number }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "confirm" | "deleting">("idle");

  async function handleDelete() {
    setState("deleting");
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (state === "confirm") {
    return (
      <span className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
        >
          Confirm
        </button>
        <button
          onClick={() => setState("idle")}
          className="px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/8"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setState("confirm")}
      disabled={state === "deleting"}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-red-500/10 disabled:opacity-40"
      style={{ color: "rgba(255,255,255,0.25)" }}
    >
      <IconTrash />
      {state === "deleting" ? "…" : "Delete"}
    </button>
  );
}
