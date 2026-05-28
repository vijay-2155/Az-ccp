import Image from "next/image";
import Navbar from "@/components/Navbar";
import SneakPeekCarousel from "@/components/SneakPeekCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import InfoModal from "@/components/InfoModal";
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
  { title: "Application Review",   desc: "We review your application to assess leadership potential and program fit."           },
  { title: "Task Execution Round", desc: "Shortlisted candidates participate in practical tasks to demonstrate their execution skills." },
  { title: "1:1 Interview",        desc: "Finalists attend a short session to align on chapter goals and onboarding."           },
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
          className="relative min-h-[100dvh] lg:min-h-[85vh] flex items-center overflow-hidden pt-16"
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

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 xl:gap-20 items-center">

              {/* ── Left — copy ──────────────────────────────────────────── */}
              <div>

                {/* Mobile-only: compact image strip */}
                <div className="lg:hidden mb-6 relative h-40 rounded-2xl overflow-hidden az-image-frame animate-fade-up">
                  <Image
                    src="/hero/az-team.jpeg"
                    alt="AZ CCP team"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 1024px) 100vw, 0px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-az-bg via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-gold/90 text-az-bg text-[9px] font-display font-black tracking-wider">
                      AZ CCP
                    </span>
                    <span className="text-white/60 text-[10px] font-display tracking-wide">80+ Campuses Nationwide</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/[0.06] mb-4 animate-fade-up">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                  <span className="text-[10px] font-display font-semibold text-gold/80 tracking-widest uppercase">Applications Open</span>
                </div>

                {/* Main heading */}
                <h1 className="font-display font-extrabold leading-[1.08] text-white animate-fade-up delay-100 text-[clamp(2rem,8vw,4.2rem)] tracking-tight">
                  AlgoZenith{" "}
                  <span className="text-gradient-gold">Campus<br className="sm:hidden" /> Connection</span>{" "}
                  Program
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-400 max-w-lg leading-relaxed font-light animate-fade-up delay-200">
                  Building a nationwide community of student leaders who collaborate and
                  transform their campuses — one chapter at a time.
                </p>

                {/* ── CTAs ─────────────────────────────────────────── */}
                <div className="mt-7 flex flex-col gap-4 animate-fade-up delay-300">

                  {/* Primary CTA row — always side-by-side */}
                  <div className="flex flex-row flex-wrap gap-2.5">
                    <a
                      href="https://forms.gle/iehrkGsicZLNexCG8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="az-btn-gold !py-2.5 !px-5 !text-[11px] sm:!text-sm flex-shrink-0"
                    >
                      Apply Now
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <a href="#benefits" className="az-btn-outline !py-2.5 !px-5 !text-[11px] sm:!text-sm flex-shrink-0">
                      Explore Program
                    </a>
                  </div>

                </div>

                {/* ── Stats scoreboard ─────────────────────────────── */}
                <div className="mt-8 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4 animate-fade-up delay-400">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white">
                        {s.value}
                      </div>
                      <div className="mt-1 section-tag opacity-70 text-[9px] sm:text-[0.6rem]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right — image collage (desktop only) ─────────── */}
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
                {/* Contact box */}
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-display tracking-widest uppercase text-gray-500 mb-2">Get in touch</p>
                    <p className="text-white/80 text-xs font-display font-medium mb-3">campusconnect@algozenith.com</p>
                    <a
                      href="mailto:campusconnect@algozenith.com"
                      className="az-btn-blue !text-[10px] !py-2 !px-4 w-full justify-center"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send us email
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
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/15 group-hover:border-gold/35 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            BENEFITS
        ════════════════════════════════════════════════════════════════════ */}
        <section id="benefits" className="py-24 relative overflow-hidden" style={{ background: "#0D0F1A" }}>
          <AZWatermark size={480} opacity={0.022} rotate={15} className="-top-16 -right-24" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="mb-16">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

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
                    href="https://forms.gle/iehrkGsicZLNexCG8"
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

        {/* Our Products Section */}
        <section id="products" className="py-24 relative overflow-hidden" style={{ background: "#05060F" }}>
          <AZWatermark size={320} opacity={0.015} rotate={-15} className="top-1/4 right-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
                Our Flagship <span className="text-gradient-gold">Products</span>
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Left Column: AlgoZenith */}
              <div 
                className="group relative rounded-2xl border border-gold/10 p-8 sm:p-10 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(255,214,10,0.08)] overflow-hidden"
                style={{ background: "linear-gradient(145deg, #0B0C15 0%, #05060F 100%)" }}
              >
                {/* Accent glow on top and hover background glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
                <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-all duration-500" />
                
                {/* Brand header block */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-14 h-14 rounded-2xl bg-black/40 border border-gold/25 p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/brand/az-logo.png"
                      alt="AlgoZenith Logo"
                      fill
                      sizes="56px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-[9px] font-display font-black tracking-widest uppercase">
                      Placement Prep Platform
                    </span>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight mt-1 group-hover:text-gold transition-colors duration-300">
                      AlgoZenith
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                  The ultimate preparation ecosystem for Competitive Programming, Data Structures & Algorithms, and System Design. Trusted by over 50,000+ engineers to crack top-tier global product companies.
                </p>

                {/* Features list */}
                <ul className="space-y-4 mb-8">
                  {[
                    "Custom interactive Learning Management System (LMS)",
                    "Complete structured curriculum covering advanced DSA, Math, and CP",
                    "Elite contest arena with real-time editorial codes & diagnostics"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold text-[10px] font-bold">✓</span>
                      <span className="font-light">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <a
                  href="https://maang.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gold text-black hover:bg-white hover:text-black transition-all duration-300 font-display font-extrabold text-xs tracking-wider uppercase w-full sm:w-auto justify-center shadow-lg hover:shadow-white/10"
                >
                  Explore AlgoZenith
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Right Column: CareerZenith */}
              <div 
                className="group relative rounded-2xl border border-blue-500/10 p-8 sm:p-10 transition-all duration-500 hover:border-blue-400/35 hover:shadow-[0_0_40px_rgba(59,130,246,0.08)] overflow-hidden"
                style={{ background: "linear-gradient(145deg, #0B0C15 0%, #05060F 100%)" }}
              >
                {/* Accent glow on top and hover background glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/45 to-transparent" />
                <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-all duration-500" />
                
                {/* Brand header block */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-14 h-14 rounded-2xl bg-black/40 border border-blue-500/25 p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/hero/cz.webp"
                      alt="CareerZenith Logo"
                      fill
                      sizes="56px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[9px] font-display font-black tracking-widest uppercase">
                      AI Career Accelerator
                    </span>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight mt-1 group-hover:text-blue-400 transition-colors duration-300">
                      CareerZenith
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                  A high-octane career acceleration suite that matches student profiles directly with modern job requirements. Uses proprietary AI algorithms to optimize resume pathways and secure top-tier opportunities.
                </p>

                {/* Features list */}
                <ul className="space-y-4 mb-8">
                  {[
                    "AI-driven resume reviewer, scorer, and template optimizer",
                    "Decentralized placement network connecting student leaders directly",
                    "Proprietary skill-matching mapping for active internship channels"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-xs text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-400 text-[10px] font-bold">✓</span>
                      <span className="font-light">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <a
                  href="https://careerzenith.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-white hover:text-black transition-all duration-300 font-display font-extrabold text-xs tracking-wider uppercase w-full sm:w-auto justify-center shadow-lg hover:shadow-white/10"
                >
                  Explore CareerZenith
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>




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
                    href="https://forms.gle/iehrkGsicZLNexCG8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="az-btn-gold"
                  >
                    Apply Now &amp; Lead
                  </a>
                  <div className="az-btn-outline cursor-default select-all !text-cyan">
                    campusconnect@algozenith.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our FAQs */}
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
                href="mailto:campusconnect@algozenith.com"
                className="text-cyan hover:text-white transition-colors"
              >
                campusconnect@algozenith.com
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#02030A" }} className="border-t border-white/[0.04]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Top row: brand + nav + socials */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">

            {/* Brand */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                <Image src="/brand/az-logo.png" alt="AlgoZenith" fill sizes="40px" className="object-contain p-1" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white tracking-tight">
                  AlgoZenith <span className="text-gold">CCP</span>
                </div>
                <div className="text-gray-600 text-[0.6rem] tracking-widest uppercase">Campus Connection Program</div>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap items-center gap-5">
              {[
                { href: "#benefits",     label: "Benefits"     },
                { href: "#mission",      label: "Mission"      },
                { href: "#testimonials", label: "Testimonials" },
                { href: "#products",     label: "About"        },
                { href: "#faq",          label: "FAQ"          },
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

            {/* Social icons — AlgoZenith only */}
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/algozenith/" target="_blank" rel="noopener noreferrer" aria-label="AlgoZenith LinkedIn"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-gray-600 hover:text-white hover:border-white/25 transition-all duration-200">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/algozenith/" target="_blank" rel="noopener noreferrer" aria-label="AlgoZenith Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-gray-600 hover:text-white hover:border-white/25 transition-all duration-200">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://twitter.com/algozenith" target="_blank" rel="noopener noreferrer" aria-label="AlgoZenith Twitter/X"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-gray-600 hover:text-white hover:border-white/25 transition-all duration-200">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@AlgoZenith" target="_blank" rel="noopener noreferrer" aria-label="AlgoZenith YouTube"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-gray-600 hover:text-white hover:border-white/25 transition-all duration-200">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05] mb-6" />

          {/* Bottom: copyright + email */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-700 text-[0.65rem] tracking-wide text-center sm:text-left">
              &copy; {currentYear} Algozenith Technologies Pvt. Ltd. All rights reserved.
            </p>
            <a
              href="mailto:campusconnect@algozenith.com"
              className="text-[0.65rem] text-gray-700 hover:text-gold transition-colors tracking-wide"
            >
              campusconnect@algozenith.com
            </a>
          </div>

        </div>
      </footer>
    </>
  );
}
