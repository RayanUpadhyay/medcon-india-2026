/* ============================================================================
 * MEDCON India 2026 — SITE CONTENT
 * ----------------------------------------------------------------------------
 * ⚠️  PLACEHOLDER / ILLUSTRATIVE CONTENT
 *
 * Everything in this file is editable copy for the homepage. Several values
 * below (panelist names, sponsors, statistics, dates, affiliations,
 * certifications, contact details and social links) are ILLUSTRATIVE
 * placeholders carried over from the original prototype. They have NOT been
 * verified and must be replaced with official MEDCON 2026 information before
 * the site goes live.
 *
 * Placeholder items are marked with `PLACEHOLDER:` comments. Search this file
 * for that token to find everything that still needs confirming.
 *
 * Keeping all copy here means the rest of the codebase (src/components/*)
 * never has to change when the real details arrive.
 * ========================================================================== */

/* ── External links / calls to action ──────────────────────────────────────
 * These are the only outward-facing URLs on the site. Replace the values;
 * do not scatter new URLs through the components.
 */
export const links = {
  /** PLACEHOLDER: official registration URL is not available yet.
   *  `#register` scrolls to the hero registration block as a safe fallback.
   *  Replace with the real URL (e.g. a form or ticketing page) when ready. */
  register: "#register",

  /** PLACEHOLDER: partnership / general enquiries address, unverified. */
  contactEmail: "medcon@tisb.ac.in",

  /** PLACEHOLDER: social handle + profile URL, unverified. Set both to ""
   *  to hide every social link on the site. */
  instagramHandle: "@medconindia",
  instagramUrl: "https://www.instagram.com/medconindia",

  /** PLACEHOLDER: host institution website, unverified. */
  hostWebsiteLabel: "tisb.org",
  hostWebsiteUrl: "https://www.tisb.org",
} as const;

/* ── Images ───────────────────────────────────────────────────────────────
 * Temporary Unsplash photography. Swap each `src` for official MEDCON
 * imagery later; keep the `alt` text accurate to whatever replaces it.
 * Decorative images (pure background texture) use alt "".
 */
export const images = {
  hero: {
    src: "https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?w=1920&h=1080&fit=crop&auto=format&q=80",
    alt: "", // decorative background wash
  },
  about: {
    src: "https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?w=900&h=1100&fit=crop&auto=format&q=80",
    alt: "Medical professionals collaborating in a clinical setting",
  },
  eventWorkshop: {
    src: "https://images.unsplash.com/photo-1766297248071-dfa7a5bc9b87?w=700&h=500&fit=crop&auto=format&q=80",
    alt: "",
  },
  eventPanel: {
    src: "https://images.unsplash.com/photo-1782388716252-d598f84ea62f?w=700&h=500&fit=crop&auto=format&q=80",
    alt: "",
  },
  eventCompetition: {
    src: "https://images.unsplash.com/photo-1781029711378-e17c0c6bd0d1?w=700&h=500&fit=crop&auto=format&q=80",
    alt: "",
  },
} as const;

export type GalleryImage = {
  src: string;
  alt: string;
  /** When true the image occupies a taller cell in the mosaic. */
  tall: boolean;
};

/* PLACEHOLDER: stock photography standing in for MEDCON event photos. */
export const gallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&h=900&fit=crop&auto=format&q=75",
    alt: "Surgeons at work in an operating theatre",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=700&h=500&fit=crop&auto=format&q=75",
    alt: "Medical team during a procedure",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1612886649688-ef2912f17921?w=700&h=500&fit=crop&auto=format&q=75",
    alt: "Clinician reviewing notes on a tablet",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=700&h=900&fit=crop&auto=format&q=75",
    alt: "Doctor in a hospital corridor",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1781029711378-e17c0c6bd0d1?w=700&h=500&fit=crop&auto=format&q=75",
    alt: "Attendees seated at a conference session",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1782388716252-d598f84ea62f?w=700&h=500&fit=crop&auto=format&q=75",
    alt: "Students working together with laptops",
    tall: false,
  },
];

/* ── Navigation ──────────────────────────────────────────────────────────── */
export type NavLink = { label: string; id: string };

export const navLinks: NavLink[] = [
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Panel", id: "panel" },
  { label: "Sponsors", id: "sponsors" },
  { label: "Gallery", id: "gallery" },
];

/* ── Hero ────────────────────────────────────────────────────────────────── */
export const hero = {
  /** PLACEHOLDER: positioning claim, unverified. */
  eyebrow: "India's First Student-Led Medical Conference",
  location: "Bangalore, India",
  year: "2026",
  yearPlace: "Bangalore",
  headlineLead: "MED",
  headlineTail: "CON",
  subtitle:
    "Science, healthcare, and entrepreneurship — converging at the frontier of what medicine can become.",
  ctaPrimary: "Register Free",
  ctaSecondary: "View Programme",

  /** PLACEHOLDER: event logistics, all unverified. */
  details: [
    { label: "Date", value: "March 2026" },
    { label: "Time", value: "7:30 AM — 2:30 PM" },
    { label: "Venue", value: "TISB, Bangalore" },
    { label: "Eligibility", value: "Grades 8 – 12" },
    { label: "Entry", value: "Free" },
  ] as { label: string; value: string }[],

  /** PLACEHOLDER: certifications / partnerships, all unverified. */
  credits: [
    "Govt. of Karnataka Certified CPR Training",
    "Supported by Manipal Hospitals",
    "Project Suryanayak",
  ],
};

/* ── About ───────────────────────────────────────────────────────────────── */
export const about = {
  headline:
    "India's first student-led medical conference — built for the next generation of healers.",
  /** PLACEHOLDER: several claims below (state-certified, government-backed,
   *  attendance figures) are unverified. */
  paragraphs: [
    "MEDCON was founded with a singular purpose: to bring science, healthcare, and entrepreneurship together in one room — entirely at the hands of students. Hosted at The International School Bangalore, it has grown into a state-certified, government-backed platform reaching hundreds of young medical minds each year.",
    "Every edition features hands-on clinical workshops, high-caliber panel discussions, and competitive events that push students to think beyond the textbook — toward the actual future of medicine.",
  ],
  /** PLACEHOLDER: statistics, unverified. */
  stats: [
    { value: "98%", caption: "of Indians remain untrained in basic life-saving CPR", accent: "sage" as const },
    { value: "#1", caption: "student-led medical conference in India", accent: "cream" as const },
  ],
  /** PLACEHOLDER: affiliations, unverified. */
  affiliationLabel: "Affiliated With",
  affiliationValue:
    "Karnataka Government Health Department · Project Suryanayak · Manipal Hospitals",
  missionLabel: "Mission",
  missionQuote:
    "To train, inspire, and equip the next generation of India's medical leaders.",
};

/* ── Events / Programme ──────────────────────────────────────────────────── */
export type EventAccent = "sage" | "periwinkle";

export type ProgrammeEvent = {
  num: string;
  category: string;
  title: string;
  body: string;
  tag: string;
  accent: EventAccent;
  image: { src: string; alt: string };
};

/* PLACEHOLDER: programme details and certification/award claims are
 * illustrative and unverified. */
export const events: ProgrammeEvent[] = [
  {
    num: "01",
    category: "Hands-On Training",
    title: "CPR Workshops",
    body: "Receive personalized CPR instruction leading to State Certification from the Government of Karnataka. This is real skill acquisition — not theory.",
    tag: "Govt. of Karnataka Certified",
    accent: "sage",
    image: images.eventWorkshop,
  },
  {
    num: "02",
    category: "The Modern Health Paradox",
    title: "Panel Discussion",
    body: "An expert-led panel examining the contradictions at the heart of modern healthcare — access, technology, equity, and the future of medicine in India.",
    tag: "Expert Speakers",
    accent: "periwinkle",
    image: images.eventPanel,
  },
  {
    num: "03",
    category: "Best Student Life Saver",
    title: "Competition",
    body: "A high-stakes event where knowledge, composure, and quick thinking are tested under pressure. The top performer earns the Best Student Life Saver 2026 award.",
    tag: "Open to Grades 8 – 12",
    accent: "sage",
    image: images.eventCompetition,
  },
];

/* PLACEHOLDER: programme summary details, unverified. */
export const eventDetails = [
  { label: "Format", value: "Workshops · Panels · Competitions" },
  { label: "Dress Code", value: "Formal Western / School Uniform" },
  { label: "Certification", value: "State-Certified CPR Training" },
  { label: "Awards", value: "Best Student Life Saver 2026" },
];

/* ── Panel ───────────────────────────────────────────────────────────────── */
export type Panelist = {
  name: string;
  role: string;
  institution: string;
};

/* PLACEHOLDER: none of these speakers are confirmed. The disclaimer shown
 * under the panel grid depends on this staying illustrative. */
export const panel = {
  titleLead: "The Modern",
  titleTail: "Health Paradox",
  intro:
    "A curated panel of medical professionals, researchers, and entrepreneurs examining the contradictions that define healthcare today — where access, technology, equity, and innovation collide and converge.",
  disclaimer:
    "* Panelists shown for illustration. Official speaker announcements will be released closer to the event.",
  panelists: [
    {
      name: "Dr. Ananya Krishnamurthy",
      role: "Cardiologist & Researcher",
      institution: "St. John's Medical College, Bangalore",
    },
    {
      name: "Dr. Rahul Mehta",
      role: "Healthcare Policy Specialist",
      institution: "AIIMS, New Delhi",
    },
    {
      name: "Ms. Priya Nair",
      role: "MedTech Entrepreneur",
      institution: "Founder, HealthBridge India",
    },
    {
      name: "Dr. Suresh Varma",
      role: "Emergency Medicine Specialist",
      institution: "Manipal Hospitals, Bangalore",
    },
  ] as Panelist[],
};

/* ── Sponsors / Partners ────────────────────────────────────────────────── */
export type Partner = {
  tier: string;
  name: string;
  note: string;
};

/* PLACEHOLDER: no sponsor or partner listed here is confirmed. */
export const partners: Partner[] = [
  { tier: "Title Sponsor", name: "Manipal Hospitals", note: "India's premier hospital network" },
  { tier: "Government Affiliate", name: "Karnataka Health Dept.", note: "State Certification Authority" },
  { tier: "Programme Partner", name: "Project Suryanayak", note: "CPR Awareness Initiative" },
  { tier: "Host Institution", name: "TISB", note: "The International School Bangalore" },
];

export const sponsorsCta = {
  eyebrow: "Interested in partnering?",
  title: "Become a MEDCON 2026 Partner",
  body: "Reach hundreds of India's most promising future medical professionals.",
  cta: "Get in Touch",
};

/* ── Footer ──────────────────────────────────────────────────────────────── */
export const footer = {
  blurb:
    "India's student-led medical conference. Hosted at The International School Bangalore.",
  navHeading: "Navigate",
  contactHeading: "Contact",
  venueHeading: "Venue",
  /** PLACEHOLDER: venue address, unverified. */
  venue: {
    name: "The International School Bangalore",
    lines: ["NAFL Valley,", "Whitefield–Sarjapur Road,", "Bangalore 562125"],
  },
  copyright: "© 2026 MEDCON India · The International School Bangalore",
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  /** Discreet developer colophon in the footer bottom bar. The address is used
   *  only as the mailto target and is never rendered as text. */
  credit: {
    label: "Site by Rayan Upadhyay",
    email: "RayanUpadhyay@gmail.com",
  },
};

/* ── Section index labels (editorial numbering) ─────────────────────────── */
export const sectionLabels = {
  about: { index: "02", label: "About MEDCON" },
  events: { index: "03", label: "Programme" },
  panel: { index: "04", label: "Panel" },
  sponsors: { index: "05", label: "Partners & Sponsors" },
  gallery: { index: "06", label: "Gallery" },
} as const;
