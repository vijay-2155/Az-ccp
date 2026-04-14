"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RevokeButton({ id }: { id: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "confirm" | "revoking">("idle");

  async function handleRevoke() {
    setState("revoking");
    await fetch(`/api/admin/invites/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (state === "confirm") {
    return (
      <span className="flex items-center gap-1">
        <button
          onClick={handleRevoke}
          className="px-3 py-1 rounded-lg text-xs font-semibold"
          style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
        >
          Revoke
        </button>
        <button
          onClick={() => setState("idle")}
          className="px-3 py-1 rounded-lg text-xs"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setState("confirm")}
      disabled={state === "revoking"}
      className="text-xs transition-colors hover:text-red-400 disabled:opacity-40"
      style={{ color: "rgba(255,255,255,0.25)" }}
    >
      {state === "revoking" ? "…" : "Revoke"}
    </button>
  );
}
