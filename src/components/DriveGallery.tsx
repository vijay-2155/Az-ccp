"use client";

import { useEffect, useState, useCallback } from "react";

interface DriveFile {
  id: string;
  name: string;
}

interface Props {
  folderUrl: string;
}

/** Extract Google Drive folder ID from any sharing URL */
function extractFolderId(url: string): string | null {
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

/** Proxied through our server — avoids CORS on Google's CDN URLs */
function thumbUrl(id: string) {
  return `/api/drive-image?id=${id}`;
}

function fullUrl(id: string) {
  return `/api/drive-image?id=${id}`;
}

export default function DriveGallery({ folderUrl }: Props) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [status, setStatus] = useState<"loading" | "done" | "error" | "unconfigured">("loading");
  const [lightbox, setLightbox] = useState<number | null>(null); // index

  const folderId = extractFolderId(folderUrl);

  useEffect(() => {
    if (!folderId) { setStatus("error"); return; }

    fetch(`/api/drive-gallery?folderId=${folderId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error === "Drive API not configured") {
          setStatus("unconfigured");
        } else if (data.error) {
          setStatus("error");
        } else {
          setFiles(data.files ?? []);
          setStatus("done");
        }
      })
      .catch(() => setStatus("error"));
  }, [folderId]);

  /* Keyboard navigation */
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null ? Math.min(files.length - 1, i + 1) : null)), [files.length]);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  /* ── States ─────────────────────────────────────────────────────────────── */

  if (status === "loading") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl animate-pulse"
            style={{
              height: i === 0 ? 260 : 180,
              gridColumn: i === 0 ? "1 / -1" : "auto",
              background: "rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div
        className="rounded-xl px-6 py-8 text-center text-sm"
        style={{
          background: "rgba(255,214,10,0.04)",
          border: "1px solid rgba(255,214,10,0.15)",
        }}
      >
        <p className="font-semibold mb-1" style={{ color: "#FFD60A" }}>
          Google Drive API not configured
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Add <code className="px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)" }}>GOOGLE_DRIVE_API_KEY</code> to your environment variables.
        </p>
      </div>
    );
  }

  if (status === "error" || files.length === 0) {
    return (
      <div
        className="rounded-xl px-6 py-8 text-center text-sm"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {status === "error"
          ? "Could not load gallery — make sure the folder is shared publicly."
          : "No images found in this folder."}
      </div>
    );
  }

  /* ── Gallery grid ───────────────────────────────────────────────────────── */
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {files.map((file, i) => (
          <button
            key={file.id}
            onClick={() => setLightbox(i)}
            className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            style={{
              height: i === 0 ? 260 : 180,
              gridColumn: i === 0 ? "1 / -1" : "auto",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl(file.id)}
              alt={file.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "brightness(0.85)" }}
              loading={i < 3 ? "eager" : "lazy"}
            />
            {/* Hover veil */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(5,6,15,0.45)" }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2"/>
                <path d="M10 14h8M14 10v8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          onClick={close}
        >
          {/* Counter */}
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
          >
            {lightbox + 1} / {files.length}
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={files[lightbox].id}
              src={fullUrl(files[lightbox].id)}
              alt={files[lightbox].name}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
            />
            {/* Filename */}
            <p
              className="text-center text-xs mt-3 truncate max-w-[60vw] mx-auto"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {files[lightbox].name}
            </p>
          </div>

          {/* Next */}
          {lightbox < files.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
