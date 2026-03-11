export interface KeyResult {
  id: string;
  number: number;
  description: string;
  target: string;
  status: "on-track" | "at-risk" | "behind" | "not-started";
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
}

export interface OKR {
  id: number;
  title: string;
  shortTitle: string;
  objective: string;
  owners: string[];
  whyItMatters: string;
  color: string;
  keyResults: KeyResult[];
}

export const okrData: OKR[] = [
  {
    id: 1,
    title: "OKR 1 — Revenue & Profit",
    shortTitle: "Revenue & Profit",
    objective: "Build a predictable, scalable revenue engine that supports long-term growth",
    owners: ["Chris Haddow", "Mike Higginbotham"],
    whyItMatters: "This forces discipline, pricing power, and cross-product strategy — not just top-line growth",
    color: "hsl(237, 68%, 33%)",
    keyResults: [
      { id: "1-1", number: 1, description: "Achieve £6.5M/$8.8M ARR by 31 Dec 2026", target: "£6.5M ARR", status: "on-track" },
      { id: "1-2", number: 2, description: "GCR: Gross Revenue Retention ≥ 90%", target: "≥ 90%", status: "on-track" },
      { id: "1-3", number: 3, description: "Average event value increases by ≥15% YoY", target: "≥ 15% YoY", status: "on-track" },
      { id: "1-4", number: 4, description: "≥30% of new ARR comes from multi-year customers", target: "≥ 30%", status: "not-started" },
      { id: "1-5", number: 5, description: "Forecast accuracy within ±10% by Q4 2026", target: "±10%", status: "not-started" },
      { id: "1-6", number: 6, description: "Improve profitability: reach EBITDA margin ≥ 25%", target: "≥ 25%", status: "on-track" },
      { id: "1-7", number: 7, description: "Lead Capture PRO reaches £500K ARR and ≥30% attach rate with CSAT ≥ 8.5", target: "£500K ARR", status: "on-track" },
      { id: "1-8", number: 8, description: "Sponsorship / revenue-share products to exhibitors — start selling Q3-Q4 to sign 3 contracts", target: "3 contracts", status: "not-started" },
    ],
  },
  {
    id: 2,
    title: "OKR 2 — Meetings & Networks",
    shortTitle: "Meetings & Networks",
    objective: "Make meetings the company's core specialisation and growth driver",
    owners: ["Tanya Pinchuk", "Céline Laukemann"],
    whyItMatters: "This creates category focus and a sharp narrative in the market — not a generic 'event tech' story",
    color: "hsl(44, 100%, 58%)",
    keyResults: [
      { id: "2-1", number: 1, description: "Networks generates ≥ £500K ARR with a repeatable GTM motion", target: "≥ £500K ARR", status: "on-track" },
      { id: "2-2", number: 2, description: "≥50% of new customers buy ExpoPlatform primarily for meetings/networking", target: "≥ 50%", status: "not-started" },
      { id: "2-3", number: 3, description: "Win rate for meeting-centric deals ≥ 50%", target: "≥ 50%", status: "not-started" },
      { id: "2-4", number: 4, description: "ExpoPlatform recognised by customers and partners as a leader in event meeting formats", target: "Recognition", status: "not-started" },
    ],
  },
  {
    id: 3,
    title: "OKR 3 — Delivery, Platform Satisfaction & Reliability",
    shortTitle: "Delivery, Platform Satisfaction & Reliability",
    objective: "Deliver reliably with high platform satisfaction, speed, and stability",
    owners: ["Bartosz Malec", "Ajay Singh"],
    whyItMatters: "This brings us closer to a possibility of Product Led Growth company",
    color: "hsl(152, 60%, 40%)",
    keyResults: [
      { id: "3-1", number: 1, description: "Platform uptime ≥ 99.9% (define SLA + measurement method)", target: "≥ 99.9%", status: "not-started" },
      { id: "3-2", number: 2, description: "Reduce P0/P1 production incidents by ≥40% YoY", target: "≥ 40% reduction", status: "not-started" },
      { id: "3-3", number: 3, description: "≥90% of committed roadmap items delivered per quarter", target: "≥ 90%", status: "not-started" },
      { id: "3-4", number: 4, description: "Platform satisfaction score ≥ 8.5/10 (NPS/CSAT)", target: "≥ 8.5/10", status: "not-started" },
      { id: "3-5", number: 5, description: "Reduce avg time to resolve critical incidents to <1 hour", target: "< 1 hour", status: "not-started" },
      { id: "3-6", number: 6, description: "Number of bugs reported by customers reduced by 50%", target: "50% reduction", status: "not-started" },
    ],
  },
  {
    id: 4,
    title: "OKR 4 — Automation of Manual Processes",
    shortTitle: "Automation of Manual Processes",
    objective: "Remove operational friction by automating repeatable internal and customer-facing workflows",
    owners: ["Susan Merola", "Ilaria Basile"],
    whyItMatters: "This is how we will scale without scaling headcount or chaos",
    color: "hsl(200, 60%, 45%)",
    keyResults: [
      { id: "4-1", number: 1, description: "Reduce time spent on manual processes by ≥50% in each department by automation", target: "≥ 50%", status: "on-track", q1: "Baseline collected" },
      { id: "4-2", number: 2, description: "Reduce event setup and management manual effort by ≥40% for organisers", target: "≥ 40%", status: "on-track", q1: "Discovery done" },
      { id: "4-3", number: 3, description: "Decrease customer support tickets related to manual workarounds by ≥30%", target: "≥ 30%", status: "at-risk", q1: "254/mo (trending up)" },
      { id: "4-4", number: 4, description: "Reduce average onboarding time for new customers by ≥35%", target: "≥ 35%", status: "on-track", q1: "Friction analysis done" },
      { id: "4-5", number: 5, description: "Engineering time spent on maintenance/manual ops reduced by ≥25%", target: "≥ 25%", status: "on-track", q1: "Jan: 34% → Feb: 20% bug time" },
    ],
  },
  {
    id: 5,
    title: "OKR 5 — Data-Driven Company",
    shortTitle: "Data-Driven Company",
    objective: "Make data the default input for every strategic and operational means — transform into a data-driven company",
    owners: ["Mykyta Fastovets"],
    whyItMatters: "This OKR underpins all others — without it, automation, GTM, and product bets are guesswork",
    color: "hsl(280, 50%, 50%)",
    keyResults: [
      { id: "5-1", number: 1, description: "Define and track a single source of truth for revenue, product, and customer KPIs", target: "Data lake", status: "not-started" },
      { id: "5-2", number: 2, description: "Live dashboards showing key business metrics driving decision making", target: "Live dashboards", status: "not-started" },
      { id: "5-3", number: 3, description: "Product usage dashboards created and used during product-related decision making", target: "Usage dashboards", status: "not-started" },
    ],
  },
];
