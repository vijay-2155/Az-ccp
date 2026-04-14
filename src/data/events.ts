export type Status = "live" | "upcoming" | "past";

export interface AZEvent {
  id:          number;
  status:      Status;
  title:       string;
  type:        string;
  date:        string;
  time:        string;
  location:    string;
  college:     string;
  description: string;
  /** Full paragraph shown on event detail page */
  body:        string;
  image:       string;
  /** Gallery preview images shown on detail page for past events */
  gallery:     string[];
  /** Google Drive or external gallery URL */
  galleryUrl:  string | null;
  /** Google Form or registration URL */
  link:        string | null;
}

export const events: AZEvent[] = [
  /* ── LIVE ─────────────────────────────────────────────────────────── */
  {
    id: 1,
    status:      "live",
    title:       "DSA Bootcamp — Live Session",
    type:        "Workshop",
    date:        "Apr 14, 2026",
    time:        "6:00 PM IST",
    location:    "Online · Zoom",
    college:     "Nationwide",
    description: "An intensive live session on Dynamic Programming with real-time problem-solving, Q&A, and editorial walkthrough.",
    body:        "This live DSA Bootcamp is an intensive, mentor-led session focused on Dynamic Programming — one of the most tested topics in technical interviews. We'll start with the fundamentals of memoization and tabulation, work through 8 classic DP problems live, and finish with a Q&A + full editorial walkthrough. Bring a laptop, your preferred IDE, and your toughest DP questions. Mentors from top product companies will be guiding the session.",
    image:       "/gallery/dsa-session.jpeg",
    gallery:     ["/gallery/dsa-session.jpeg", "/gallery/workshop.jpg", "/gallery/iit-kanpur-community.jpg", "/gallery/ideathon.jpg"],
    galleryUrl:  null,
    link:        "https://forms.gle/HpedZoLqd7puN1hPA",
  },

  /* ── UPCOMING ──────────────────────────────────────────────────────── */
  {
    id: 2,
    status:      "upcoming",
    title:       "AZ Campus CP Contest — Season 2",
    type:        "Contest",
    date:        "Apr 22, 2026",
    time:        "2:00 PM IST",
    location:    "Online · Codeforces",
    college:     "All AZ Chapters",
    description: "A rated competitive programming contest exclusively for AZ chapter members. 5 problems, 2 hours, real prizes.",
    body:        "Season 2 of the AZ Campus CP Contest is here — bigger, harder, and with better prizes. This is an exclusive, rated contest for verified AZ chapter members only. Expect 5 carefully crafted problems ranging from implementation to combinatorics. The top 3 finishers from each tier win AZ merch, premium platform subscriptions, and a direct fast-track to the AZ ambassador shortlist. Register before Apr 20 to secure your slot.",
    image:       "/gallery/cp-contest.jpeg",
    gallery:     [],
    galleryUrl:  null,
    link:        "https://forms.gle/HpedZoLqd7puN1hPA",
  },
  {
    id: 3,
    status:      "upcoming",
    title:       "Resume & Interview Prep Workshop",
    type:        "Workshop",
    date:        "Apr 28, 2026",
    time:        "4:00 PM IST",
    location:    "NIT Calicut · Room 301",
    college:     "NIT Calicut Chapter",
    description: "Craft the perfect resume for FAANG and learn interview strategies directly from placed seniors.",
    body:        "Your resume is your first impression — and most students get it wrong. In this hands-on workshop, placed seniors from Google, Amazon, and Razorpay will break down what a strong SDE resume looks like, how to quantify impact, and how to tailor your application to specific companies. The second half covers mock technical interviews, common mistakes, and how to answer 'tell me about yourself' in a way that actually lands you an interview.",
    image:       "/gallery/workshop.jpg",
    gallery:     [],
    galleryUrl:  null,
    link:        "https://forms.gle/HpedZoLqd7puN1hPA",
  },
  {
    id: 4,
    status:      "upcoming",
    title:       "Web Dev Hackathon 2026",
    type:        "Hackathon",
    date:        "May 3–4, 2026",
    time:        "10:00 AM IST",
    location:    "BITS Goa · Main Auditorium",
    college:     "BITS Goa Chapter",
    description: "24-hour hackathon — build real-world web apps, compete for ₹50K in prizes, get mentored by engineers.",
    body:        "AZ Web Dev Hackathon 2026 is a 24-hour in-person build challenge at BITS Goa. Teams of 2–4 will tackle one of three real-world problem statements released at the event. A panel of engineers from funded startups will mentor throughout the night, and a live judging session will close the event. ₹50,000 in total prizes across three tracks — best UI/UX, best backend architecture, and most impactful solution. Food and accommodation arranged for outstation participants.",
    image:       "/community/winning-goodies.jpeg",
    gallery:     [],
    galleryUrl:  null,
    link:        "https://forms.gle/HpedZoLqd7puN1hPA",
  },
  {
    id: 5,
    status:      "upcoming",
    title:       "Intro to Open Source with Git & GitHub",
    type:        "Seminar",
    date:        "May 10, 2026",
    time:        "5:00 PM IST",
    location:    "Online · Google Meet",
    college:     "IIIT Gwalior Chapter",
    description: "Learn to navigate open-source contribution — forking, PRs, code reviews, and how to get your first merge.",
    body:        "Open source is one of the fastest ways to build a credible portfolio — and it's more accessible than you think. This seminar walks you through everything from setting up Git correctly to navigating large codebases, writing good commit messages, raising your first pull request, and handling code review feedback. We'll also cover platforms like GSSoC, Hacktoberfest, and MLH Fellowship, and how to use open-source contributions to stand out in internship applications.",
    image:       "/hero/az-team.jpeg",
    gallery:     [],
    galleryUrl:  null,
    link:        "https://forms.gle/HpedZoLqd7puN1hPA",
  },

  /* ── PAST ──────────────────────────────────────────────────────────── */
  {
    id: 6,
    status:      "past",
    title:       "Ideathon — Innovate & Build",
    type:        "Ideathon",
    date:        "Mar 15, 2026",
    time:        "11:00 AM IST",
    location:    "IIIT Gwalior · Seminar Hall",
    college:     "IIIT Gwalior Chapter",
    description: "Students pitched tech ideas solving real-world problems. Top 3 ideas received AZ mentorship and resources.",
    body:        "The IIIT Gwalior Ideathon brought together 60+ students to pitch tech-driven solutions to real-world problems. Teams had 4 minutes to present and 2 minutes for Q&A from a panel of AZ mentors and faculty. Problem areas ranged from campus logistics to rural fintech. Three winning teams received 6-month AZ Pro subscriptions, direct mentorship from a senior engineer, and support to develop their idea further. The energy in the room was electric — some of these ideas are already being incubated.",
    image:       "/gallery/ideathon.jpg",
    gallery:     ["/gallery/ideathon.jpg", "/gallery/iit-kanpur-community.jpg", "/gallery/dsa-session.jpeg", "/gallery/workshop.jpg"],
    galleryUrl:  "https://drive.google.com/drive/folders/example-ideathon",
    link:        null,
  },
  {
    id: 7,
    status:      "past",
    title:       "Intro to Competitive Programming",
    type:        "Seminar",
    date:        "Mar 5, 2026",
    time:        "3:00 PM IST",
    location:    "Online · Google Meet",
    college:     "MIT Manipal Chapter",
    description: "A beginner-friendly seminar covering CP fundamentals, key topics, and resource roadmaps for new coders.",
    body:        "Over 180 students joined this online seminar designed for complete beginners to competitive programming. The session started with why CP matters beyond just placement, covered the essential topics (arrays, strings, sorting, greedy, basic DP), and mapped out a 3-month roadmap to go from zero to Codeforces Specialist. A live AMA session with two CP specialists closed the event. Recording shared with all registered participants.",
    image:       "/gallery/iit-kanpur-community.jpg",
    gallery:     ["/gallery/iit-kanpur-community.jpg", "/gallery/cp-contest.jpeg", "/gallery/dsa-session.jpeg", "/hero/workshop-home.jpg"],
    galleryUrl:  "https://drive.google.com/drive/folders/example-cp-seminar",
    link:        null,
  },
  {
    id: 8,
    status:      "past",
    title:       "CP Contest — Season 1",
    type:        "Contest",
    date:        "Feb 20, 2026",
    time:        "5:00 PM IST",
    location:    "Online · HackerRank",
    college:     "All AZ Chapters",
    description: "Season 1 of the AZ campus contest — 5 problems, beginner to advanced. 200+ participants competed.",
    body:        "Season 1 saw 200+ participants from 22 AZ chapters compete across two divisions — Beginner and Advanced. Five problems were set by AZ's internal problem-setting team, vetted for originality. The top-rated performer across both divisions was Karthik S. from NIT Trichy, solving all 5 problems in under 90 minutes. Full editorials and solutions were released 48 hours after the contest. Season 2 is now bigger with external participants.",
    image:       "/gallery/cp-contest.jpeg",
    gallery:     ["/gallery/cp-contest.jpeg", "/gallery/iit-kanpur-community.jpg", "/gallery/dsa-session.jpeg", "/gallery/ideathon.jpg"],
    galleryUrl:  "https://drive.google.com/drive/folders/example-season1",
    link:        null,
  },
  {
    id: 9,
    status:      "past",
    title:       "DSA Session on Trees & Graphs",
    type:        "Workshop",
    date:        "Feb 8, 2026",
    time:        "4:00 PM IST",
    location:    "VIIT · CS Dept Lab",
    college:     "VIIT Visakhapatnam Chapter",
    description: "Deep-dive workshop on tree traversals, graph algorithms, and classic interview problems with live coding.",
    body:        "An in-person workshop at VIIT's CS department lab where 45 students spent 3 hours going deep on trees and graphs — the two most commonly misunderstood topics in technical interviews. The session covered BFS, DFS, Dijkstra, Bellman-Ford, and topological sort, with live coding walkthroughs for each. Every attendee left with a printed cheat-sheet and access to the AZ problem set for each topic. Attendance was so high the venue had to be shifted to the auditorium mid-session.",
    image:       "/hero/workshop-home.jpg",
    gallery:     ["/hero/workshop-home.jpg", "/gallery/dsa-session.jpeg", "/gallery/workshop.jpg", "/gallery/iit-kanpur-community.jpg"],
    galleryUrl:  "https://drive.google.com/drive/folders/example-trees-graphs",
    link:        null,
  },
];

export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Workshop:  { bg: "rgba(34,211,238,0.15)",  text: "#22D3EE" },
  Contest:   { bg: "rgba(255,214,10,0.15)",  text: "#FFD60A" },
  Hackathon: { bg: "rgba(167,139,250,0.15)", text: "#A78BFA" },
  Seminar:   { bg: "rgba(52,211,153,0.15)",  text: "#34D399" },
  Ideathon:  { bg: "rgba(251,146,60,0.15)",  text: "#FB923C" },
};

export const STATUS_CONFIG: Record<Status, { label: string; dotColor: string; borderColor: string }> = {
  live:     { label: "Live",     dotColor: "#EF4444", borderColor: "rgba(239,68,68,0.4)"    },
  upcoming: { label: "Upcoming", dotColor: "#22D3EE", borderColor: "rgba(34,211,238,0.2)"   },
  past:     { label: "Past",     dotColor: "#5A6278", borderColor: "rgba(255,255,255,0.05)" },
};
