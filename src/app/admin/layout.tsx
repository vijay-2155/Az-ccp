import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import NavLink from "./NavLink";

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 1.5V4M11 1.5V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="5.5" cy="9.5" r=".8" fill="currentColor"/>
    <circle cx="8" cy="9.5" r=".8" fill="currentColor"/>
    <circle cx="10.5" cy="9.5" r=".8" fill="currentColor"/>
  </svg>
);

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M11 7.5a2 2 0 1 0 0-4M15 13c0-2-1.34-3.7-3.2-4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconInvite = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.5 7.5a3 3 0 1 0-5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M2 13s.5-3 6-3 6 3 6 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M13 5v4M11 7h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconExternal = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  const name = user?.firstName ?? email.split("@")[0];

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "#070710",
        fontFamily: "var(--font-outfit)",
      }}
    >
      {/* ── Dot-grid background ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className="w-[220px] shrink-0 flex flex-col fixed top-0 left-0 bottom-0 z-20 border-r"
        style={{
          background: "linear-gradient(180deg, #0E0E1C 0%, #0A0A16 100%)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <Link
          href="/admin"
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,214,10,0.12)", border: "1px solid rgba(255,214,10,0.25)" }}
          >
            <Image src="/brand/az-logo.png" alt="AZ" width={18} height={18} className="object-contain" />
          </div>
          <div>
            <p
              className="text-xs font-bold tracking-[0.15em] uppercase"
              style={{ color: "#FFD60A", fontFamily: "var(--font-unbounded)" }}
            >
              AZ Admin
            </p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Control panel
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p
            className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Navigation
          </p>
          <NavLink href="/admin" exact icon={<IconDashboard />} label="Dashboard" />
          <NavLink href="/admin/events" icon={<IconCalendar />} label="Events" />
          <NavLink href="/admin/users" icon={<IconUsers />} label="Users" />
          <NavLink href="/admin/invites" icon={<IconInvite />} label="Invitations" />
        </nav>

        {/* View site link */}
        <div className="px-3 pb-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <IconExternal />
            <span>View live site</span>
          </Link>
        </div>

        {/* User */}
        <div
          className="px-4 py-4 border-t flex items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <UserButton />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white truncate">{name}</p>
            <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.3)" }}>
              {email}
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="flex-1 ml-[220px] relative z-10 min-h-screen">
        <div className="p-8 max-w-[1100px]">{children}</div>
      </main>
    </div>
  );
}
