import { PageHeader, SectionTitle } from "@/components/DashboardWidgets";
import { Target, TrendingDown, Headphones, UserCheck, Wrench } from "lucide-react";
import { ReactNode } from "react";

interface KRCardProps {
  number: number;
  title: string;
  target: string;
  icon: ReactNode;
  measurements: { metric: string; tool: string; status: string; result: string }[];
  notes?: string;
}

const statusColor = (s: string) => {
  if (s === "Done") return "bg-success/15 text-success";
  if (s.includes("Progress")) return "bg-warning/15 text-warning-foreground";
  return "bg-secondary text-muted-foreground";
};

const KRCard = ({ number, title, target, icon, measurements, notes }: KRCardProps) => (
  <div className="section-card overflow-hidden">
    <div className="flex items-start gap-4 p-5 border-b border-border bg-secondary/30">
      <div className="phase-indicator shrink-0">{number}</div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-foreground leading-snug">{title}</h3>
        <p className="text-xs text-primary font-semibold mt-1">{target}</p>
      </div>
      <div className="text-primary/40 shrink-0">{icon}</div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 font-medium text-muted-foreground">Measurement</th>
            <th className="text-left p-3 font-medium text-muted-foreground w-24">Tool</th>
            <th className="text-left p-3 font-medium text-muted-foreground w-24">Status</th>
            <th className="text-left p-3 font-medium text-muted-foreground">Current Result</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((m, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="p-3 text-foreground font-medium">{m.metric}</td>
              <td className="p-3 text-muted-foreground">{m.tool}</td>
              <td className="p-3">
                <span className={`tag ${statusColor(m.status)}`}>{m.status}</span>
              </td>
              <td className="p-3 text-muted-foreground">{m.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {notes && (
      <div className="px-5 py-3 bg-secondary/20 border-t border-border">
        <p className="text-[10px] text-muted-foreground leading-relaxed">{notes}</p>
      </div>
    )}
  </div>
);

const krData: KRCardProps[] = [
  {
    number: 1,
    title: "Reduce time spent on manual processes by ≥50% in each department",
    target: "Target: ≥50% reduction per department",
    icon: <TrendingDown className="w-5 h-5" />,
    measurements: [
      { metric: "Top 3–5 most manual tasks: hrs/week + time per task", tool: "Survey", status: "In Progress", result: "Finance ~80%, HR ~77%, Marketing ~66%, Eng ~42%, Eng Mgmt ~20%" },
      { metric: "TAM worklogs — time per client/event", tool: "Jira", status: "In Progress", result: "Admin panel setup: 30–40% TAM time, Client comms: 15–20%, Troubleshooting: 10–15%" },
      { metric: "Sales manual task tracking", tool: "Survey", status: "In Progress", result: "Confirmed 'very manual' — no baseline data yet" },
    ],
    notes: "Quarterly survey tracking planned. Finance and HR have highest manual workload. Sales data gap needs addressing.",
  },
  {
    number: 2,
    title: "Reduce event setup and management manual effort by ≥40% for organisers",
    target: "Target: ≥40% reduction in organiser effort",
    icon: <Target className="w-5 h-5" />,
    measurements: [
      { metric: "Training session duration — pre vs post video library", tool: "Fathom", status: "In Progress", result: "Complex: 15–23hrs, Medium: 12–18hrs, Small: 6–9hrs total" },
      { metric: "Organiser time-on-task in admin panel", tool: "Admin Panel", status: "Not Started", result: "Early 2027 in Product Roadmap" },
      { metric: "Ilaria admin panel proxy baseline test", tool: "Manual", status: "In Progress", result: "1hr 15min with limited results (26 Feb)" },
      { metric: "Quarterly organiser feedback meetings", tool: "Calls", status: "Not Started", result: "—" },
    ],
    notes: "Primary constraint: most support logs trace back to admin panel setup questions. Panel UX review needed.",
  },
  {
    number: 3,
    title: "Decrease customer support tickets related to manual workarounds by ≥30%",
    target: "Target: ≥30% reduction in support tickets",
    icon: <Headphones className="w-5 h-5" />,
    measurements: [
      { metric: "Total real tickets/month (excl. spam)", tool: "JSM", status: "Done", result: "2025 avg: 164/mo → Jan–Feb 2026: 254/mo" },
      { metric: "Tickets per event", tool: "JSM", status: "Done", result: "2025: 18.2/event → Jan–Feb 2026: 28.2/event" },
    ],
    notes: "Tickets are currently increasing as JSM adoption is enforced. Top themes: login/password resets, mobile app build issues, exhibitor/booth setup, CSS/branding requests, registration/badge config, lead retrieval errors.",
  },
  {
    number: 4,
    title: "Reduce average onboarding time for new customers by ≥35%",
    target: "Target: ≥35% reduction in onboarding time",
    icon: <UserCheck className="w-5 h-5" />,
    measurements: [
      { metric: "Fathom call analysis — onboarding friction patterns", tool: "Fathom", status: "Done", result: "6 friction points, 5 time sinks, 8 recurring questions identified. #1 issue: platform capability confusion" },
      { metric: "Training duration — pre vs post video library", tool: "Fathom", status: "Done", result: "Complex: 15–23hrs, Medium: 12–18hrs, Small: 6–9hrs" },
      { metric: "First-hand onboarding test by Ilaria", tool: "Manual", status: "In Progress", result: "In progress — validates structural vs documentation issues" },
    ],
    notes: "72% of repeated questions addressable via self-serve content. 30–40% of live training time = troubleshooting. Structured programmes (FBF model) correlate with lower friction.",
  },
  {
    number: 5,
    title: "Engineering time spent on maintenance/manual ops reduced by ≥25%",
    target: "Target: ≥25% reduction in maintenance time",
    icon: <Wrench className="w-5 h-5" />,
    measurements: [
      { metric: "Worklogs categorised by team — enforce Team field", tool: "Jira", status: "In Progress", result: "126 tasks without Team field; 650h non-attributed time" },
      { metric: "Bug vs non-bug time ratio per team", tool: "Jira", status: "In Progress", result: "Mobile: 44% bug time (Jan 2026) — healthy is 30%" },
      { metric: "Unused platform features audit", tool: "Platform data", status: "Not Started", result: "Report pending from Yuriy" },
    ],
    notes: "400–500 hrs/month lost in Jan due to missing Team field (was mandatory pre-Autumn 2025). Need to make mandatory again.",
  },
];

const OkrFrameworkPage = () => {
  return (
    <div>
      <PageHeader
        title="OKR4 — Key Results Framework"
        description="Objective: Remove operational friction by automating repeatable internal and customer-facing workflows."
      />

      <div className="section-card p-5 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/60 mb-2">Why This Matters</p>
        <p className="text-sm text-foreground font-medium">
          This is how we will scale without scaling headcount or chaos.
        </p>
      </div>

      <SectionTitle>Key Results & Metrics</SectionTitle>
      <div className="space-y-6 mb-12">
        {krData.map((kr) => (
          <KRCard key={kr.number} {...kr} />
        ))}
      </div>
    </div>
  );
};

export default OkrFrameworkPage;
