"use client";

import dynamic from "next/dynamic";

const CommunityMap = dynamic(() => import("@/components/CommunityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl flex items-center justify-center"
      style={{ height: 480, background: "#0D0F1A", border: "1px solid rgba(255,214,10,0.12)" }}
    >
      <span
        style={{
          color:       "#5A6278",
          fontFamily:  "var(--font-unbounded,sans-serif)",
          fontSize:    "0.65rem",
          letterSpacing: "0.2em",
        }}
      >
        LOADING MAP...
      </span>
    </div>
  ),
});

export default function MapWrapper() {
  return <CommunityMap />;
}
