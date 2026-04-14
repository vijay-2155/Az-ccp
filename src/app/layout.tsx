import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "leaflet/dist/leaflet.css";

/* Display font — wide, geometric, championship-grade */
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

/* Body font — clean, warm, readable */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AZ Campus Connection Program | AlgoZenith",
  description:
    "AZ Campus Connection Program — empowering student leaders with mentorship, events, and career opportunities. Apply to lead your campus chapter.",
  keywords: [
    "AZ CCP",
    "AlgoZenith",
    "Campus Ambassador",
    "Student Leadership",
    "Competitive Programming",
    "Campus Chapter",
  ],
  openGraph: {
    title: "AZ Campus Connection Program | AlgoZenith",
    description:
      "Become an AZ Chapter Lead — run workshops, build community, get mentorship and exclusive perks.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${unbounded.variable} ${outfit.variable} scroll-smooth`}
      >
        <body className="min-h-full">{children}</body>
      </html>
    </ClerkProvider>
  );
}
