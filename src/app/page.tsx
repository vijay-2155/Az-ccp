import Image from "next/image";
import Navbar from "@/components/Navbar";
import SneakPeekCarousel from "@/components/SneakPeekCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import InfoModal from "@/components/InfoModal";
import EventsSection from "@/components/EventsSection";
import MapWrapper from "@/components/MapWrapper";
import AZWatermark from "@/components/AZWatermark";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const stats = [
  { value: "80+",    label: "Colleges" },
  { value: "750+",   label: "Events"   },
  { value: "5000+",  label: "Alumni"   },
];

const benefits = [
  {
    num: "01",
    icon: "◈",
    title: "Leadership & Networking",
    body: "Refine your leadership skills and build lasting connections with fellow leads, mentors, and industry professionals from across India.",
  },
  {
    num: "02",
    icon: "◈",
    title: "Exclusive Swag & Merch",
    body: "Get rewarded with premium AZ merchandise, event goodies, and exclusive learning resources.",
  },
  {
    num: "03",
    icon: "◈",
    title: "Certificate of Recognition",
    body: "Earn an official AlgoZenith certificate — a powerful addition to your professional portfolio and resume.",
  },
  {
    num: "04",
    icon: "◈",
    title: "1:1 Mentorship",
    body: "Connect directly with AlgoZenith's core team and alumni mentors. Gain personalized guidance from real industry experts.",
  },
  {
    num: "05",
    icon: "◈",
    title: "Skill Development",
    body: "Boost your leadership, communication, and technical skills through real-world experiences and hands-on community building.",
  },
  {
    num: "06",
    icon: "◈",
    title: "Referrals & Internships",
    body: "Top-performing leads stand a chance to earn exclusive referrals and internship opportunities with AlgoZenith.",
  },
];

const applicationSteps = [
  { title: "Application Review",             desc: "We review your application to assess leadership potential and program fit."                             },
  { title: "Phone Interaction",              desc: "Shortlisted candidates get a quick call to discuss motivation and interest."                           },
  { title: "1:1 Video Interview & Onboarding", desc: "Finalists attend a 20–25 min interview, and selected leads are onboarded into AZ CCP."                },
];

const faqs = [
  {
    q: "What is the AZ Campus Connection Program?",
    a: "AZ CCP is a student leadership initiative by AlgoZenith that empowers students to establish and lead campus chapters, organize a wide variety of events, and foster a collaborative learning community with full institutional support.",
  },
  {
    q: "Who is eligible to apply?",
    a: "Full-time UG/PG students in a recognized institution in India pursuing BTech, MTech, BCA, or MCA (including integrated programs). First-year and final-year students are NOT eligible.",
  },
  {
    q: "Is this a paid position?",
    a: "No, it is a voluntary leadership role. However, it comes with significant non-monetary benefits: exclusive perks, professional networking, and career opportunities.",
  },
  {
    q: "What is the time commitment?",
    a: "Flexible but driven by your activity — typically 2–3 hours per week for planning, promotion, team coordination, and event execution.",
  },
  {
    q: "What kind of events do chapters organize?",
    a: "Coding contests, webinars, DSA workshops, web development sessions, resume-building seminars, mock interviews, and overall career guidance events.",
  },
  {
    q: "Do I need to be a technical student?",
    a: "Eligibility is open to any branch within BTech, MTech, BCA, or MCA. What matters most is your drive to build technical community initiatives.",
  },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar />

      <main>
        {/* ════════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section
          id="home"
          className="relative min-h-screen flex items-center overflow-hidden pt-16"
        >
          {/* Layered background */}
          <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />
          <div
            className="hero-glow-gold absolute -left-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="hero-glow-cyan absolute right-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
            aria-hidden="true"
          />
          {/* Vignette */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#05060F_100%)] pointer-events-none"
            aria-hidden="true"
          />
          {/* Watermark */}
          <AZWatermark size={520} opacity={0.025} rotate={-12} className="-bottom-20 -right-20" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 xl:gap-20 items-center">

              {/* ── Left — copy ───────────────────────────────────────────── */}
              <div>
                {/* Terminal tag */}
                <div className="inline-flex items-center gap-2.5 mb-10 animate-fade-up">
                  <span className="w-2 h-2 rounded-full bg-gold" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                  <span className="font-mono text-[0.65rem] tracking-[0.28em] text-gold/80 uppercase">
                    &gt; AZ Campus Connect {currentYear}
                  </span>
                </div>

                {/* Main heading */}
                <h1 className="font-display font-black leading-[0.85] animate-fade-up delay-100">
                  <span className="block text-[clamp(3rem,8vw,6rem)] text-gradient-gold">
                    AlgoZenith
                  </span>
                  <span className="block text-[clamp(2.6rem,7vw,5.5rem)] text-white">
                    Campus
                  </span>
                  <span className="block text-[clamp(2.2rem,6vw,4.8rem)] text-white">
                    Connection
                  </span>
                  <span className="block text-[clamp(1.8rem,5vw,4rem)] text-outlined">
                    Program
                  </span>
                </h1>

                <p className="mt-8 text-base md:text-lg text-gray-400 max-w-lg leading-relaxed font-light animate-fade-up delay-200">
                  Building a nationwide community of student leaders who code, collaborate, and
                  transform their campuses — one chapter at a time.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
                  <a
                    href="https://forms.gle/HpedZoLqd7puN1hPA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="az-btn-gold"
                  >
                    Apply to Lead
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a href="#benefits" className="az-btn-outline">
                    Explore Benefits
                  </a>
                </div>

                {/* ── Stats scoreboard ──────────────────────────────────── */}
                <div className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6 animate-fade-up delay-400">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-black text-3xl md:text-4xl text-white">
                        {s.value}
                      </div>
                      <div className="mt-1.5 section-tag opacity-70">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right — image collage ────────────────────────────────── */}
              <div className="hidden lg:block animate-fade-up delay-200">
                <div className="animate-float">
                  <div className="az-image-frame rounded-2xl p-3">
                    <div className="relative w-full h-72 xl:h-80">
                      <Image
                        src="/hero/az-team.jpeg"
                        alt="AZ CCP team"
                        fill
                        className="object-cover rounded-xl"
                        priority
                        sizes="45vw"
                      />
                      {/* Inner glow overlay */}
                      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gold/10 pointer-events-none" />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="relative h-36">
                        <Image
                          src="/hero/workshop-home.jpg"
                          alt="Workshop"
                          fill
                          className="object-cover object-top rounded-xl"
                          sizes="22vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 pointer-events-none" />
                      </div>
                      <div className="relative h-36">
                        <Image
                          src="/hero/lead-home.png"
                          alt="Chapter leads"
                          fill
                          className="object-cover object-top rounded-xl"
                          sizes="22vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {/* Contact pill */}
                  <div className="mt-4 text-right">
                    <a href="mailto:campusconnect@algozenit.com" className="az-btn-blue !text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-az-bg to-transparent pointer-events-none" />
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            BENEFITS
        ════════════════════════════════════════════════════════════════════ */}
        <section id="benefits" className="py-24 relative overflow-hidden" style={{ background: "#0D0F1A" }}>
          <AZWatermark size={480} opacity={0.022} rotate={15} className="-top-16 -right-24" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="mb-16">
              <div className="section-tag mb-3">Why Lead?</div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight max-w-xl">
                Why Become a{" "}
                <span className="text-gradient-gold">Chapter Lead?</span>
              </h2>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <article
                  key={b.title}
                  className="az-card rounded-2xl p-7 relative overflow-hidden group"
                >
                  {/* Number watermark */}
                  <span className="absolute top-5 right-6 font-display font-black text-5xl text-white/[0.03] select-none leading-none">
                    {b.num}
                  </span>

                  {/* Accent number */}
                  <div className="font-display text-xs text-gold/50 font-bold tracking-widest mb-5">
                    {b.num}
                  </div>

                  <h3 className="font-display font-bold text-base text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {b.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{b.body}</p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SNEAK PEEK
        ════════════════════════════════════════════════════════════════════ */}
        <section id="peek" className="py-24 relative overflow-hidden" style={{ background: "#05060F" }}>
          <AZWatermark size={400} opacity={0.02} rotate={-8} className="top-1/2 -translate-y-1/2 -left-28" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <div className="section-tag mb-3">Gallery</div>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white">
                  Sneak <span className="text-gradient-gold">Peek</span>
                </h2>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Our chapters are live at IIT Goa, NIT Calicut, IIIT Gwalior, MIT Manipal, BITS
                Patna, KIIT Bhubaneswar, and many more.
              </p>
            </div>
            <SneakPeekCarousel />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            MISSION + APPLICATION
        ════════════════════════════════════════════════════════════════════ */}
        <section id="mission" className="py-24 relative overflow-hidden" style={{ background: "#0D0F1A" }}>
          <AZWatermark size={360} opacity={0.025} rotate={20} className="-bottom-10 left-1/2 -translate-x-1/2" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-start">

              {/* Mission */}
              <div>
                <div className="section-tag mb-3">Mission</div>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-6">
                  Our <span className="text-gradient-gold">Mission</span>
                </h2>
                <p className="text-gray-400 leading-relaxed font-light max-w-xl">
                  AlgoZenith Campus Connection Program bridges the gap between academic learning and
                  industry demands. We empower students with resources, mentorship, and a platform to
                  lead change on their campuses — creating meaningful impact across the student community.
                </p>

                {/* Mission pillars */}
                <div className="mt-10 space-y-4">
                  {[
                    { label: "Empower",    desc: "Give students the tools to lead and grow"       },
                    { label: "Connect",    desc: "Bridge campuses to industry and each other"      },
                    { label: "Transform",  desc: "Build coding culture that outlasts every chapter" },
                  ].map((p) => (
                    <div key={p.label} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-colors">
                        <span className="text-gold text-sm font-display font-bold">
                          {p.label[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm font-display">{p.label}</div>
                        <div className="text-gray-500 text-xs">{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application process */}
              <div
                className="rounded-2xl border border-white/[0.07] p-8"
                style={{ background: "linear-gradient(145deg, #111320 0%, #0D0F1A 100%)" }}
              >
                <div className="section-tag mb-3">How to Join</div>
                <h3 className="font-display font-bold text-xl text-white mb-8">
                  Application Process
                </h3>

                {/* Timeline */}
                <ol className="relative az-timeline-line space-y-8 ml-2 pl-8">
                  {applicationSteps.map((step, i) => (
                    <li key={step.title} className="relative">
                      {/* Dot */}
                      <div className="az-timeline-dot absolute -left-[42px] top-0.5" />
                      {/* Step number */}
                      <div className="section-tag mb-1 opacity-60">Step {i + 1}</div>
                      <strong className="block text-white font-display font-semibold text-sm mb-1">
                        {step.title}
                      </strong>
                      <span className="text-gray-400 text-xs leading-relaxed">{step.desc}</span>
                    </li>
                  ))}
                </ol>

                {/* Info links */}
                <InfoModal />

                {/* Apply CTA */}
                <div className="mt-8 text-center">
                  <a
                    href="https://forms.gle/HpedZoLqd7puN1hPA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="az-btn-gold w-full justify-center"
                  >
                    Apply Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════════════════════════════════ */}
        <section id="testimonials" className="py-24 relative overflow-hidden" style={{ background: "#05060F" }}>
          <AZWatermark size={440} opacity={0.022} rotate={-5} className="-bottom-16 -right-16" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="section-tag mb-3">From Our Leads</div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white">
                Words from Our{" "}
                <span className="text-gradient-gold">Leaders</span>
              </h2>
            </div>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            EVENTS
        ════════════════════════════════════════════════════════════════════ */}
        <EventsSection />

        {/* ════════════════════════════════════════════════════════════════════
            COMMUNITY MAP
        ════════════════════════════════════════════════════════════════════ */}
        <section id="map-section" className="py-24 relative overflow-hidden" style={{ background: "#0D0F1A" }}>
          <AZWatermark size={500} opacity={0.018} rotate={0} className="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* Interactive map */}
              <div className="order-last lg:order-first">
                <MapWrapper />
                <p className="mt-3 text-center text-[0.6rem] text-gray-700 tracking-widest uppercase font-display">
                  Click a pin to see the chapter · Scroll to zoom
                </p>
              </div>

              {/* Text + CTAs */}
              <div>
                <div className="section-tag mb-3">Nationwide</div>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight mb-6">
                  Join Our Growing{" "}
                  <span className="text-gradient-gold">Community</span>
                </h2>
                <p className="text-gray-400 leading-relaxed font-light max-w-lg">
                  AZ is propelling nationwide impact — powered by a thriving community engaged in
                  everything from virtual workshops to in-person hackathons. The movement is
                  happening; don&apos;t wait to join in.
                </p>

                {/* Map stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { val: "20+", lbl: "States Covered"     },
                    { val: "80+", lbl: "Active Chapters"    },
                  ].map((s) => (
                    <div
                      key={s.lbl}
                      className="rounded-xl border border-white/[0.06] p-5"
                      style={{ background: "#111320" }}
                    >
                      <div className="font-display font-black text-3xl text-white">{s.val}</div>
                      <div className="section-tag mt-1 opacity-60">{s.lbl}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="https://forms.gle/HpedZoLqd7puN1hPA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="az-btn-gold"
                  >
                    Apply Now &amp; Lead
                  </a>
                  <a href="mailto:campusconnect@algozenit.com" className="az-btn-outline">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FAQ
        ════════════════════════════════════════════════════════════════════ */}
        <section id="faq" className="py-24 relative overflow-hidden" style={{ background: "#05060F" }}>
          <AZWatermark size={380} opacity={0.023} rotate={10} className="-top-10 -left-20" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="mb-12">
              <div className="section-tag mb-3">Questions?</div>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white">
                Frequently Asked{" "}
                <span className="text-gradient-gold">Questions</span>
              </h2>
            </div>

            <div className="faq-scroll max-h-[520px] overflow-y-auto space-y-3 pr-1">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="bg-az-surface rounded-xl overflow-hidden group"
                >
                  <summary className="flex justify-between items-center gap-4 px-6 py-5 font-display font-semibold text-white text-sm tracking-wide hover:text-gold transition-colors duration-200">
                    <span>{faq.q}</span>
                    <svg
                      className="faq-chevron w-4 h-4 flex-shrink-0 text-gold/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <div className="h-px bg-gradient-to-r from-gold/20 via-white/5 to-transparent mb-4" />
                    <p className="text-gray-400 text-sm leading-relaxed font-light">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-gray-600">
              Still have questions?{" "}
              <a
                href="mailto:campusconnect@algozenit.com"
                className="text-cyan hover:text-white transition-colors"
              >
                campusconnect@algozenit.com
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#02030A" }} className="border-t border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10">
                <Image src="/brand/az-logo.png" alt="AlgoZenith" fill className="object-contain p-1" />
              </div>
              <div>
                <div className="font-display font-bold text-xs text-white tracking-tight">
                  AZ <span className="text-gold">CCP</span>
                </div>
                <div className="text-gray-600 text-[0.6rem] tracking-widest uppercase">AlgoZenith</div>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              {[
                { href: "#benefits", label: "Benefits" },
                { href: "#mission",  label: "Mission"  },
                { href: "#faq",      label: "FAQ"      },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-xs font-display text-gray-600 hover:text-gold transition-colors tracking-widest uppercase"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-gray-700 text-[0.65rem] tracking-wide">
              &copy; {currentYear} Algozenith Technologies Pvt. Ltd.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
