"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  status: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  college: string;
  description: string;
  body: string;
  image: string;
  gallery: string;
  galleryUrl: string;
  link: string;
};

const EMPTY: FormData = {
  status: "upcoming",
  title: "",
  type: "Workshop",
  date: "",
  time: "",
  location: "",
  college: "",
  description: "",
  body: "",
  image: "",
  gallery: "",
  galleryUrl: "",
  link: "",
};

type Props = {
  mode: "create" | "edit";
  eventId?: number;
  initial?: Partial<FormData> & { gallery?: string[] };
};

/* ── Date / Time conversion helpers ─────────────────────────────────────── */

/** "Apr 22, 2026" → "2026-04-22" (HTML date input value) */
function dateToInput(stored: string): string {
  if (!stored) return "";
  const d = new Date(stored + " 00:00:00");
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dy = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${dy}`;
}

/** "2026-04-22" → "Apr 22, 2026" */
function inputToDate(val: string): string {
  if (!val) return "";
  const d = new Date(val + "T00:00:00");
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

/** "6:00 PM IST" → "18:00" (HTML time input value) */
function timeToInput(stored: string): string {
  if (!stored) return "";
  const m = stored.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return "";
  let h = parseInt(m[1]);
  const mins = m[2];
  const period = m[3].toUpperCase();
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${mins}`;
}

/** "18:00" → "6:00 PM IST" */
function inputToTime(val: string): string {
  if (!val) return "";
  const [hStr, mStr] = val.split(":");
  let h = parseInt(hStr);
  const period = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${mStr} ${period} IST`;
}

/* ── Chapter list ────────────────────────────────────────────────────────── */

const CHAPTERS = [
  "Nationwide",
  "All AZ Chapters",
  "NIT Calicut Chapter",
  "BITS Goa Chapter",
  "IIIT Gwalior Chapter",
  "MIT Manipal Chapter",
  "VIIT Visakhapatnam Chapter",
  "IIT Bombay Chapter",
  "IIT Delhi Chapter",
  "IIT Madras Chapter",
  "IIT Kharagpur Chapter",
  "IIT Roorkee Chapter",
  "NIT Trichy Chapter",
  "NIT Warangal Chapter",
  "NIT Surathkal Chapter",
  "BITS Pilani Chapter",
  "BITS Hyderabad Chapter",
  "VIT Vellore Chapter",
  "SRM Chennai Chapter",
  "Amrita Coimbatore Chapter",
];

const STATUS_OPTIONS = [
  { value: "upcoming", label: "Upcoming", color: "#22D3EE" },
  { value: "live",     label: "Live",     color: "#EF4444" },
  { value: "past",     label: "Past",     color: "rgba(255,255,255,0.35)" },
];

const TYPE_OPTIONS = ["Workshop", "Contest", "Hackathon", "Seminar", "Ideathon"];

const TYPE_COLOR: Record<string, string> = {
  Workshop: "#22D3EE",
  Contest: "#FFD60A",
  Hackathon: "#A78BFA",
  Seminar: "#34D399",
  Ideathon: "#FB923C",
};

export default function EventForm({ mode, eventId, initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    ...EMPTY,
    ...initial,
    gallery: Array.isArray(initial?.gallery)
      ? initial.gallery.join("\n")
      : (initial?.gallery as string | undefined) ?? "",
  });

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      gallery: form.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
      galleryUrl: form.galleryUrl.trim() || null,
      link: form.link.trim() || null,
    };

    const url = mode === "create" ? "/api/admin/events" : `/api/admin/events/${eventId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong");
      setSaving(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ── Section: Core ─────────────────────────────────────────────── */}
      <Card label="Core Info" accent="#FFD60A">
        <Field label="Event title" required>
          <Input
            value={form.title}
            onChange={(v) => set("title", v)}
            placeholder="e.g. DSA Bootcamp — Live Session"
            required
          />
        </Field>

        {/* Status chip selector */}
        <Field label="Status">
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set("status", opt.value)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-150"
                style={{
                  background:
                    form.status === opt.value
                      ? `${opt.color}1A`
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${form.status === opt.value ? opt.color : "rgba(255,255,255,0.1)"}`,
                  color: form.status === opt.value ? opt.color : "rgba(255,255,255,0.4)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Type chip selector */}
        <Field label="Type">
          <div className="flex gap-2 flex-wrap">
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("type", t)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-150"
                style={{
                  background:
                    form.type === t
                      ? `${TYPE_COLOR[t]}1A`
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${form.type === t ? TYPE_COLOR[t] : "rgba(255,255,255,0.1)"}`,
                  color: form.type === t ? TYPE_COLOR[t] : "rgba(255,255,255,0.4)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date" required>
            <DatePicker
              value={form.date}
              onChange={(v) => set("date", v)}
              required
            />
          </Field>
          <Field label="Time" required>
            <TimePicker
              value={form.time}
              onChange={(v) => set("time", v)}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Location" required>
            <Input value={form.location} onChange={(v) => set("location", v)} placeholder="Online · Zoom" required />
          </Field>
          <Field label="College / Chapter" required>
            <ChapterSelect
              value={form.college}
              onChange={(v) => set("college", v)}
            />
          </Field>
        </div>
      </Card>

      {/* ── Section: Content ──────────────────────────────────────────── */}
      <Card label="Content" accent="#22D3EE">
        <Field label="Short description" required>
          <Textarea
            value={form.description}
            onChange={(v) => set("description", v)}
            rows={2}
            placeholder="One-line teaser shown on the events card."
            required
          />
        </Field>
        <Field label="Full body" required>
          <Textarea
            value={form.body}
            onChange={(v) => set("body", v)}
            rows={7}
            placeholder="Full paragraph shown on the event detail page…"
            required
          />
        </Field>
      </Card>

      {/* ── Section: Media ────────────────────────────────────────────── */}
      <Card label="Media" accent="#A78BFA">
        <Field label="Cover image URL" required>
          <Input
            value={form.image}
            onChange={(v) => set("image", v)}
            placeholder="https://drive.google.com/uc?export=view&id=…"
            required
          />
          <CoverPreview url={form.image} />
        </Field>
        <Field label="Gallery images (one URL per line)">
          <Textarea
            value={form.gallery}
            onChange={(v) => set("gallery", v)}
            rows={4}
            placeholder={"https://drive.google.com/uc?export=view&id=…\nhttps://drive.google.com/uc?export=view&id=…"}
          />
          <GalleryUrlsPreview raw={form.gallery} />
        </Field>
        <Field label="Google Drive folder URL (full gallery)">
          <Input
            value={form.galleryUrl}
            onChange={(v) => set("galleryUrl", v)}
            placeholder="https://drive.google.com/drive/folders/…"
          />
          <DrivePreview url={form.galleryUrl} />
        </Field>
      </Card>

      {/* ── Section: Registration ─────────────────────────────────────── */}
      <Card label="Registration" accent="#34D399">
        <Field label="Google Form / registration URL">
          <Input
            value={form.link}
            onChange={(v) => set("link", v)}
            placeholder="https://forms.gle/…"
          />
        </Field>
      </Card>

      {/* Error */}
      {error && (
        <div
          className="rounded-xl px-5 py-4 text-sm flex items-center gap-3"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#EF4444",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-7 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
          style={{
            background: "linear-gradient(135deg, #FFD60A 0%, #F0B800 100%)",
            color: "#000",
            fontFamily: "var(--font-unbounded)",
            fontSize: "11px",
            letterSpacing: "0.05em",
            boxShadow: saving ? "none" : "0 4px 20px rgba(255,214,10,0.3)",
          }}
        >
          {saving ? "Saving…" : mode === "create" ? "Create Event" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-3 rounded-xl text-sm transition-colors hover:bg-white/6"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ── Drive URL helpers ───────────────────────────────────────────────────── */

function extractFolderId(url: string): string | null {
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

/** Extract file ID from any single-file Drive URL:
 *  - drive.google.com/file/d/FILE_ID/view
 *  - drive.google.com/uc?export=view&id=FILE_ID
 *  - drive.google.com/open?id=FILE_ID
 */
function extractFileId(url: string): string | null {
  const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (byPath) return byPath[1];
  const byParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (byParam) return byParam[1];
  return null;
}

/* ── Single image preview (Cover) ───────────────────────────────────────── */

function CoverPreview({ url }: { url: string }) {
  const fileId = extractFileId(url);
  if (!fileId) return null;

  return (
    <div className="mt-3 relative rounded-xl overflow-hidden" style={{ height: 160 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={fileId}
        src={`/api/drive-image?id=${fileId}`}
        alt="Cover preview"
        className="w-full h-full object-cover"
        onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-1.5 text-[10px] font-medium"
        style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.5)" }}
      >
        Cover preview
      </div>
    </div>
  );
}

/* ── Multi image preview (Gallery URLs textarea) ─────────────────────────── */

function GalleryUrlsPreview({ raw }: { raw: string }) {
  const ids = raw
    .split("\n")
    .map((line) => extractFileId(line.trim()))
    .filter((id): id is string => !!id);

  if (ids.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
          {ids.length} image{ids.length !== 1 ? "s" : ""}
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "rgba(34,211,238,0.7)" }}>
          Preview
        </span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {ids.map((id, i) => (
          <div key={id} className="relative rounded-lg overflow-hidden group" style={{ height: 72, background: "rgba(255,255,255,0.03)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/drive-image?id=${id}`}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.opacity = "0.2"; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Drive folder preview ────────────────────────────────────────────────── */

type PreviewState = "idle" | "loading" | "done" | "error" | "unconfigured";

function DrivePreview({ url }: { url: string }) {
  const [state, setState] = useState<PreviewState>("idle");
  const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const folderId = extractFolderId(url);
    if (!folderId) { setState("idle"); setFiles([]); return; }

    setState("loading");
    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      fetch(`/api/drive-gallery?folderId=${folderId}`)
        .then(async (r) => {
          const data = await r.json();
          if (data.error === "Drive API not configured") { setState("unconfigured"); return; }
          if (!r.ok || data.error) {
            setErrorMsg(
              r.status === 403
                ? "Folder is not public. In Google Drive → Share → set to \"Anyone with the link\"."
                : (data.error ?? "Could not load folder."),
            );
            setState("error");
            return;
          }
          setFiles(data.files ?? []);
          setState("done");
        })
        .catch(() => { setErrorMsg("Network error — could not reach the API."); setState("error"); });
    }, 600);

    return () => { if (debounce.current) clearTimeout(debounce.current); };
  }, [url]);

  if (state === "idle") return null;

  if (state === "loading") {
    return (
      <div className="mt-3 grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg animate-pulse"
            style={{ height: 72, background: "rgba(255,255,255,0.05)" }}
          />
        ))}
      </div>
    );
  }

  if (state === "unconfigured") {
    return (
      <p className="mt-2 text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(255,214,10,0.06)", color: "#FFD60A", border: "1px solid rgba(255,214,10,0.15)" }}>
        Add <code className="font-mono">GOOGLE_DRIVE_API_KEY</code> to your .env.local to enable previews.
      </p>
    );
  }

  if (state === "error") {
    return (
      <p className="mt-2 text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.06)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.15)" }}>
        {errorMsg || "Could not load folder — make sure it is shared publicly."}
      </p>
    );
  }

  if (files.length === 0) {
    return (
      <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
        No images found in this folder.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {/* Count badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
          {files.length} image{files.length !== 1 ? "s" : ""} found
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "rgba(34,211,238,0.7)" }}>
          Preview
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {files.slice(0, 11).map((f) => (
          <div
            key={f.id}
            className="relative rounded-lg overflow-hidden group"
            style={{ height: 72, background: "rgba(255,255,255,0.03)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/drive-image?id=${f.id}`}
              alt={f.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}

        {/* +N overflow badge */}
        {files.length > 11 && (
          <div
            className="rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              height: 72,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            +{files.length - 11}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section card ────────────────────────────────────────────────────────── */

function Card({
  label, accent, children,
}: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Section header */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-b"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="w-1 h-4 rounded-full shrink-0" style={{ background: accent }} />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {label}
        </span>
      </div>
      {/* Fields */}
      <div
        className="p-6 space-y-5"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Field, Input, Textarea ──────────────────────────────────────────────── */

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label
        className="block text-xs font-medium"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = [
  "w-full rounded-xl px-4 py-3 text-sm text-white",
  "outline-none transition-all duration-200",
  "placeholder:text-white/20",
].join(" ");

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
};

function Input({ value, onChange, placeholder, required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={inputClass}
      style={inputStyle}
      onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(255,214,10,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onBlur={(e) => { e.currentTarget.style.border = inputStyle.border; e.currentTarget.style.background = inputStyle.background; }}
    />
  );
}

function Textarea({ value, onChange, rows, placeholder, required }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; required?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows ?? 3}
      placeholder={placeholder}
      required={required}
      className={`${inputClass} resize-y`}
      style={inputStyle}
      onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(255,214,10,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onBlur={(e) => { e.currentTarget.style.border = inputStyle.border; e.currentTarget.style.background = inputStyle.background; }}
    />
  );
}

function DatePicker({ value, onChange, required }: {
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <input
      type="date"
      value={dateToInput(value)}
      onChange={(e) => onChange(inputToDate(e.target.value))}
      required={required}
      className={inputClass}
      style={{
        ...inputStyle,
        colorScheme: "dark",
      }}
      onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(255,214,10,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onBlur={(e) => { e.currentTarget.style.border = inputStyle.border; e.currentTarget.style.background = inputStyle.background; }}
    />
  );
}

/* ── SpinnerSegment — a single scrollable drum column ───────────────────── */

function SpinnerSegment({
  display,
  active,
  onClick,
  onUp,
  onDown,
}: {
  display: string;
  active: boolean;
  onClick: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  const segRef = useRef<HTMLDivElement>(null);
  const upRef = useRef(onUp);
  const downRef = useRef(onDown);
  useEffect(() => { upRef.current = onUp; }, [onUp]);
  useEffect(() => { downRef.current = onDown; }, [onDown]);

  // Non-passive wheel handler so we can preventDefault
  useEffect(() => {
    const el = segRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) upRef.current();
      else downRef.current();
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const dim = display === "--";

  return (
    <div
      ref={segRef}
      onClick={onClick}
      className="flex flex-col items-center justify-between group cursor-pointer select-none"
      style={{ width: 60, padding: "5px 0" }}
    >
      {/* Up chevron */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onUp(); }}
        tabIndex={-1}
        className="flex items-center justify-center w-full transition-all duration-150"
        style={{
          height: 16,
          opacity: active ? 1 : 0,
          color: "#FFD60A",
        }}
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.opacity = "0"; }}
      >
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 6L5 2L9 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Value */}
      <div
        className="font-bold tracking-tighter transition-colors duration-150"
        style={{
          fontFamily: "var(--font-unbounded)",
          fontSize: 24,
          lineHeight: 1,
          color: active ? "#FFD60A" : dim ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.9)",
        }}
      >
        {display}
      </div>

      {/* Down chevron */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onDown(); }}
        tabIndex={-1}
        className="flex items-center justify-center w-full transition-all duration-150"
        style={{
          height: 16,
          opacity: active ? 1 : 0,
          color: "#FFD60A",
        }}
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.opacity = "0"; }}
      >
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ── TimePicker — drum-style hour/minute/period selector ────────────────── */

function TimePicker({ value, onChange, required }: {
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [activeSeg, setActiveSeg] = useState<"h" | "m" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse stored value
  const match = value?.match(/(\d+):(\d+)\s*(AM|PM)/i);
  const h = match ? parseInt(match[1]) : 12;
  const min = match ? parseInt(match[2]) : 0;
  const period = (match?.[3]?.toUpperCase() ?? "PM") as "AM" | "PM";
  const hasValue = !!match;

  // Refs for keyboard handler (avoids stale closures)
  const hRef = useRef(h); hRef.current = h;
  const minRef = useRef(min); minRef.current = min;
  const periodRef = useRef(period); periodRef.current = period;
  const hasValueRef = useRef(hasValue); hasValueRef.current = hasValue;

  function emit(newH: number, newMin: number, newPeriod: "AM" | "PM") {
    onChange(`${newH}:${String(newMin).padStart(2, "0")} ${newPeriod} IST`);
  }
  const emitRef = useRef(emit); emitRef.current = emit;

  function changeH(dir: 1 | -1) {
    const cur = hasValue ? h : 12;
    let n = cur + dir;
    if (n > 12) n = 1;
    if (n < 1) n = 12;
    emit(n, hasValue ? min : 0, period);
  }

  function changeM(dir: 1 | -1) {
    const cur = hasValue ? min : 0;
    let n = cur + dir * 5;
    if (n >= 60) n = 0;
    if (n < 0) n = 55;
    emit(hasValue ? h : 12, n, period);
  }

  function togglePeriod() {
    const p: "AM" | "PM" = period === "AM" ? "PM" : "AM";
    emit(hasValue ? h : 12, hasValue ? min : 0, p);
  }

  // Keyboard control
  useEffect(() => {
    if (!activeSeg) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeSeg === "h") {
          let n = (hasValueRef.current ? hRef.current : 12) + 1;
          if (n > 12) n = 1;
          emitRef.current(n, hasValueRef.current ? minRef.current : 0, periodRef.current);
        } else {
          let n = (hasValueRef.current ? minRef.current : 0) + 5;
          if (n >= 60) n = 0;
          emitRef.current(hasValueRef.current ? hRef.current : 12, n, periodRef.current);
        }
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeSeg === "h") {
          let n = (hasValueRef.current ? hRef.current : 12) - 1;
          if (n < 1) n = 12;
          emitRef.current(n, hasValueRef.current ? minRef.current : 0, periodRef.current);
        } else {
          let n = (hasValueRef.current ? minRef.current : 0) - 5;
          if (n < 0) n = 55;
          emitRef.current(hasValueRef.current ? hRef.current : 12, n, periodRef.current);
        }
      }
      if (e.key === "Escape") setActiveSeg(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeSeg]);

  // Click-outside dismissal
  useEffect(() => {
    if (!activeSeg) return;
    function handler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setActiveSeg(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeSeg]);

  const borderColor = activeSeg
    ? "rgba(255,214,10,0.35)"
    : "rgba(255,255,255,0.09)";

  return (
    <div
      ref={containerRef}
      className="flex items-stretch rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${borderColor}`,
        background: "rgba(255,255,255,0.04)",
        transition: "border-color 0.2s",
      }}
    >
      {/* Hour drum */}
      <SpinnerSegment
        display={hasValue ? String(h).padStart(2, "0") : "--"}
        active={activeSeg === "h"}
        onClick={() => setActiveSeg(activeSeg === "h" ? null : "h")}
        onUp={() => changeH(1)}
        onDown={() => changeH(-1)}
      />

      {/* Colon separator */}
      <div
        className="flex items-center font-bold select-none"
        style={{ color: "rgba(255,255,255,0.2)", fontSize: 20 }}
      >
        :
      </div>

      {/* Minute drum */}
      <SpinnerSegment
        display={hasValue ? String(min).padStart(2, "0") : "--"}
        active={activeSeg === "m"}
        onClick={() => setActiveSeg(activeSeg === "m" ? null : "m")}
        onUp={() => changeM(1)}
        onDown={() => changeM(-1)}
      />

      {/* Divider */}
      <div className="my-2 w-px shrink-0" style={{ background: "rgba(255,255,255,0.07)" }} />

      {/* AM / PM stacked toggle */}
      <button
        type="button"
        onClick={togglePeriod}
        className="flex flex-col items-center justify-center gap-[3px] px-4 transition-all"
        title="Toggle AM/PM"
        style={{ minWidth: 52 }}
      >
        {(["AM", "PM"] as const).map((p) => {
          const isSelected = period === p && hasValue;
          return (
            <span
              key={p}
              style={{
                fontFamily: "var(--font-unbounded)",
                fontWeight: 700,
                fontSize: isSelected ? "11px" : "9px",
                letterSpacing: "0.12em",
                color: isSelected ? "#FFD60A" : "rgba(255,255,255,0.15)",
                transition: "all 0.15s",
              }}
            >
              {p}
            </span>
          );
        })}
      </button>

      {/* Divider */}
      <div className="my-2 w-px shrink-0" style={{ background: "rgba(255,255,255,0.07)" }} />

      {/* IST badge */}
      <div
        className="flex items-center px-3 font-semibold tracking-[0.15em] select-none"
        style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}
      >
        IST
      </div>

      {/* Hidden input for native form validation */}
      {required && (
        <input
          type="text"
          value={value}
          required
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
        />
      )}
    </div>
  );
}

function ChapterSelect({ value, onChange }: {
  value: string; onChange: (v: string) => void;
}) {
  const isCustom = value && !CHAPTERS.includes(value);
  const [custom, setCustom] = useState(isCustom ? value : "");
  const [showCustom, setShowCustom] = useState(isCustom);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    if (v === "__custom__") {
      setShowCustom(true);
      onChange(custom);
    } else {
      setShowCustom(false);
      onChange(v);
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <select
          value={showCustom ? "__custom__" : (value || "")}
          onChange={handleSelect}
          required={!showCustom}
          className={`${inputClass} pr-10 appearance-none cursor-pointer`}
          style={{ ...inputStyle, colorScheme: "dark" }}
          onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(255,214,10,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          onBlur={(e) => { e.currentTarget.style.border = inputStyle.border; e.currentTarget.style.background = inputStyle.background; }}
        >
          <option value="" disabled style={{ background: "#0E0E1C" }}>Select chapter…</option>
          {CHAPTERS.map((ch) => (
            <option key={ch} value={ch} style={{ background: "#0E0E1C" }}>{ch}</option>
          ))}
          <option value="__custom__" style={{ background: "#0E0E1C" }}>Other (type below)</option>
        </select>
        {/* Chevron icon */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {showCustom && (
        <input
          type="text"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); onChange(e.target.value); }}
          placeholder="Type chapter name…"
          required
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(255,214,10,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          onBlur={(e) => { e.currentTarget.style.border = inputStyle.border; e.currentTarget.style.background = inputStyle.background; }}
        />
      )}
    </div>
  );
}
