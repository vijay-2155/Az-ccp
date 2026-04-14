"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  exact?: boolean;
  icon: React.ReactNode;
  label: string;
};

export default function NavLink({ href, exact, icon, label }: Props) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-2.5 rounded-lg relative transition-all duration-200"
      style={{
        background: active ? "rgba(255,214,10,0.08)" : "transparent",
        color: active ? "#FFD60A" : "rgba(255,255,255,0.45)",
      }}
    >
      {/* Active gold bar */}
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
          style={{ background: "#FFD60A" }}
        />
      )}
      <span
        className="transition-colors duration-200"
        style={{ color: active ? "#FFD60A" : "rgba(255,255,255,0.35)" }}
      >
        {icon}
      </span>
      <span
        className="text-sm font-medium tracking-wide transition-colors duration-200 group-hover:text-white"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {label}
      </span>
    </Link>
  );
}
