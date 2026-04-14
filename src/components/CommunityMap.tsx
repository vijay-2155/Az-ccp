"use client";

import { useEffect, useRef, useState } from "react";
import { colleges } from "@/data/colleges";

/* AZ-branded map pin — small clean badge, no glow */
const PIN_SVG = () => `
  <div class="az-pin">
    <div class="az-pin__bubble">
      <img src="/brand/az-logo.png" class="az-pin__logo" alt="" />
    </div>
    <div class="az-pin__tail"></div>
  </div>
`;

export default function CommunityMap() {
  const mapDivRef   = useRef<HTMLDivElement>(null);
  const mapRef      = useRef<import("leaflet").Map | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;

    let destroyed = false;

    import("leaflet").then((L) => {
      if (destroyed || !mapDivRef.current) return;

      /* ── Fix default icon path broken by webpack ─────────────────── */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "",
        iconUrl:       "",
        shadowUrl:     "",
      });

      /* ── Map init ─────────────────────────────────────────────────── */
      const map = L.map(mapDivRef.current, {
        center:             [20.5937, 78.9629],
        zoom:               5,
        zoomControl:        false,
        attributionControl: false,
        scrollWheelZoom:    false,      // prevent page-scroll hijack
        dragging:           true,
      });

      /* ── Dark CartoDB tiles ────────────────────────────────────────── */
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      /* ── Re-enable scroll zoom on map click (UX pattern) ─────────── */
      map.on("click", () => map.scrollWheelZoom.enable());
      map.on("mouseout", () => map.scrollWheelZoom.disable());

      /* ── Custom zoom control ─────────────────────────────────────── */
      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.control
        .attribution({ prefix: "© <a href='https://carto.com'>CARTO</a>" })
        .addTo(map);

      /* ── Markers ─────────────────────────────────────────────────── */
      colleges.forEach((college) => {
        const icon = L.divIcon({
          html:        PIN_SVG(),
          className:   "az-pin-wrapper",
          iconSize:    [26, 34],
          iconAnchor:  [13, 34],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([college.lat, college.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="
              font-family: var(--font-unbounded, sans-serif);
              background: #111320;
              border: 1px solid rgba(255,214,10,0.2);
              border-radius: 10px;
              padding: 10px 14px;
              min-width: 160px;
            ">
              <div style="color:#FFD60A;font-size:0.65rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;">
                AZ Chapter
              </div>
              <div style="color:#E8ECFF;font-size:0.8rem;font-weight:700;margin-bottom:2px;">
                ${college.name}
              </div>
              <div style="color:#5A6278;font-size:0.65rem;letter-spacing:0.05em;">
                ${college.city}, ${college.state}
              </div>
            </div>`,
            {
              closeButton:  false,
              className:    "az-popup",
              maxWidth:     220,
              offset:       [0, -6],
            }
          )
          .on("click", () => setActive(college.name));

        marker.on("mouseover", () => marker.getElement()?.classList.add("is-hovered"));
        marker.on("mouseout",  () => marker.getElement()?.classList.remove("is-hovered"));
      });

      mapRef.current = map;
    });

    return () => {
      destroyed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,214,10,0.12)", background: "#0D0F1A" }}>
      {/* Map container */}
      <div ref={mapDivRef} style={{ height: 480, width: "100%" }} />

      {/* Active college badge */}
      {active && (
        <div
          className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            background:  "rgba(17,19,32,0.92)",
            border:      "1px solid rgba(255,214,10,0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#FFD60A",
              boxShadow: "0 0 8px rgba(255,214,10,0.8)",
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: "var(--font-unbounded,sans-serif)", fontSize: "0.65rem", color: "#E8ECFF", letterSpacing: "0.08em" }}>
            {active}
          </span>
          <button
            onClick={() => setActive(null)}
            style={{ marginLeft: 4, color: "#5A6278", fontSize: "0.8rem", lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Leaflet popup overrides injected inline */}
      <style>{`
        .az-popup .leaflet-popup-content-wrapper,
        .az-popup .leaflet-popup-tip {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .az-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-control-zoom a {
          background: #111320 !important;
          color: #FFD60A !important;
          border-color: rgba(255,214,10,0.2) !important;
        }
        .leaflet-control-zoom a:hover { background: #1a1d2e !important; }
        .leaflet-control-attribution {
          background: rgba(5,6,15,0.7) !important;
          color: #5A6278 !important;
          font-size: 0.55rem !important;
        }
        .leaflet-control-attribution a { color: #5A6278 !important; }

        /* ── AZ branded pin ─────────────────────────────────── */
        .az-pin-wrapper {
          background: transparent !important;
          border: none !important;
        }
        .az-pin {
          width: 26px;
          height: 34px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: 50% 100%;
          transition: transform 180ms cubic-bezier(0.34,1.56,0.64,1);
        }

        /* Circular badge — no glow, clean border only */
        .az-pin__bubble {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0D0F1A;
          border: 1.5px solid #FFD60A;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* AZ logo inside badge */
        .az-pin__logo {
          width: 17px;
          height: 17px;
          object-fit: contain;
          display: block;
        }

        /* Pointed tail — thin, no glow */
        .az-pin__tail {
          width: 0;
          height: 0;
          border-left:  4px solid transparent;
          border-right: 4px solid transparent;
          border-top:   8px solid #FFD60A;
          margin-top: -1px;
        }

        /* Hover: just lift slightly, no glow */
        .az-pin-wrapper.is-hovered .az-pin,
        .az-pin-wrapper:hover       .az-pin {
          transform: translateY(-3px) scale(1.1);
        }
        .az-pin-wrapper.is-hovered .az-pin__bubble,
        .az-pin-wrapper:hover       .az-pin__bubble {
          border-color: #FFE566;
          background: #111320;
        }
      `}</style>
    </div>
  );
}
