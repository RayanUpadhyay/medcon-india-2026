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
    src: "/media/about/cpr-workshop-presentation.jpg",
    alt: "Students presenting a CPR and cardiac arrest workshop from the TISB stage",
  },
  eventWorkshop: {
    src: "/media/events/workshop-lobby.jpg",
    alt: "Attendees speaking with organizers in the auditorium lobby before a session",
  },
  eventPanel: {
    src: "/media/events/panel-speaking.jpg",
    alt: "A panelist speaking into a microphone during the MEDCON panel discussion",
  },
  eventCompetition: {
    src: "/media/events/competition-wide.jpg",
    alt: "A student presenting to the panel under stage lighting",
  },
} as const;

export type GalleryImage = {
  src: string;
  alt: string;
  /** When true the image occupies a taller cell in the mosaic. */
  tall: boolean;
};

/* Real MEDCON event photography (added Sept 2026, replacing stock photos). */
export const gallery: GalleryImage[] = [
  {
    src: "/media/gallery/auditorium-25-years.jpg",
    alt: "TISB auditorium ahead of the MEDCON panel session",
    tall: true,
  },
  {
    src: "/media/gallery/stage-group-handshake.jpg",
    alt: "Organizers and guests greeting each other on stage at MEDCON",
    tall: false,
  },
  {
    src: "/media/gallery/panel-discussion-wide.jpg",
    alt: "Panelists seated together during the MEDCON panel discussion",
    tall: false,
  },
  {
    src: "/media/gallery/stage-gift-exchange.jpg",
    alt: "A token of appreciation being presented to a guest speaker on stage",
    tall: true,
  },
  {
    src: "/media/gallery/panel-stage-wide.jpg",
    alt: "Wide view of the MEDCON panel on stage under stage lighting",
    tall: false,
  },
  {
    src: "/media/gallery/panel-activity-slide.jpg",
    alt: "A panelist speaking with the day's activity schedule projected behind",
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
  { label: "Media", id: "gallery" },
  { label: "Contact", id: "contact" },
  { label: "Venue", id: "venue" },
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
  ctaPrimary: "Register Now",
  ctaSecondary: "View Programme",

  /** PLACEHOLDER: event logistics, all unverified. */
  details: [
    { label: "Date", value: "September 19, 2026" },
    { label: "Time", value: "7:15 AM — 3:00 PM" },
    { label: "Venue", value: "TISB, Bangalore" },
    { label: "Eligibility", value: "Grades 8 – 12" },
    { label: "Entry", value: "₹250" },
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
  /** Official MEDCON 2026 description, provided by the organizing team. */
  paragraphs: [
    "MedCon is India's first student-led medical conference, happening on Saturday, September 19th, 2026. The conference covers a range of important topics in medicine through workshops, debates, and panel discussions. This year's theme of \"Beyond The White Coat\" focuses on the many disciplines and perspectives that shape healthcare, going beyond traditional medicine.",
    "The student competition helps test all you've learnt throughout the day, involving participants presenting unique solutions to important medicinal problems. The prizes include internships and shadowing opportunities alongside the professionals speaking at the conference. Make sure you register soon to secure your spot — we hope to see you there!",
  ],
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
    title: "Medical Skills Workshop",
    body: "Receive personalized CPR and medical skills instruction leading to State Certification from the Government of Karnataka. This is real skill acquisition — not theory.",
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
    title: "Student Competition",
    /** PLACEHOLDER: description pending from the R&C team — replace with
     *  their copy once available. */
    body: "Details of this year's Student Competition are being finalized by the Research & Competitions team — check back soon, or see the Panel section for confirmed speakers in the meantime.",
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

/* Confirmed MEDCON 2026 panelists (added Sept 2026). More speakers may be
 * announced closer to the event — update this list and the disclaimer below
 * as further names are confirmed. */
export const panel = {
  titleLead: "The Modern",
  titleTail: "Health Paradox",
  intro:
    "A curated panel of medical professionals, researchers, and entrepreneurs examining the contradictions that define healthcare today — where access, technology, equity, and innovation collide and converge.",
  disclaimer:
    "* Additional panelists to be announced closer to the event.",
  panelists: [
    {
      name: "Ms. Shilpi Saraswat",
      role: "Psychologist",
      institution: "",
    },
    {
      name: "Dr. Anirudh Jagannatha",
      role: "Neurosurgeon",
      institution: "",
    },
    {
      name: "Mr. Amol Kulkarni",
      role: "Biomedical Researcher",
      institution: "",
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
  { tier: "Sponsor", name: "Medvital Venture", note: "" },
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
  /** Venue address, confirmed by MEDCON organizing team (Sept 2026). */
  venue: {
    name: "The International School Bangalore (TISB)",
    lines: [
      "NAFL Valley Circle,",
      "Sarjapur - Marathahalli Rd, near Dommasandra,",
      "Whitefield, Thigala Chowdadenahalli,",
      "Karnataka 562125",
    ],
  },
  /** Google Maps "no API key" embed — built from the venue address above.
   *  If the venue ever changes, regenerate this by URL-encoding the new
   *  address into https://www.google.com/maps?q=<address>&output=embed */
  venueMapEmbedUrl:
    "https://www.google.com/maps?q=NAFL+Valley+Circle,+Sarjapur+-+Marathahalli+Rd,+near+Dommasandra,+Whitefield,+Thigala+Chowdadenahalli,+Karnataka+562125&output=embed",
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
  gallery: { index: "06", label: "Media" },
  contact: { index: "07", label: "Contact" },
  venue: { index: "08", label: "Venue" },
} as const;
