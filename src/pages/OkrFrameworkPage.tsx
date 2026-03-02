import { PageHeader, SectionTitle } from "@/components/DashboardWidgets";
import { Target, TrendingDown, Headphones, UserCheck, Wrench, ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface KRData {
  number: number;
  title: string;
  target: string;
  icon: ReactNode;
  rows: {department: string;measurement: string;tool: string;result: string;}[];
  connectedFindings: {label: string;link: string;}[];
}

const krData: KRData[] = [
{
  number: 1,
  title: "Reduce time spent on manual processes by ≥50% in each department",
  target: "≥50% reduction per department",
  icon: <TrendingDown className="w-5 h-5" />,
  rows: [
  { department: "Finance", measurement: "Hours/week on top manual tasks", tool: "Survey", result: "80% of tasks are manual (invoicing, reconciliation, reporting)" },
  { department: "HR", measurement: "Hours/week on top manual tasks", tool: "Survey", result: "77% of tasks are manual (onboarding docs, leave tracking, payroll prep)" },
  { department: "Marketing", measurement: "Hours/week on top manual tasks", tool: "Survey", result: "66% of tasks are manual (campaign setup, lead list building)" },
  { department: "Engineering", measurement: "Hours/week on top manual tasks", tool: "Survey", result: "42% of tasks are manual (deployment checks, config updates)" },
  { department: "Eng Management", measurement: "Hours/week on top manual tasks", tool: "Survey", result: "20% of tasks are manual (sprint reporting, resource allocation)" },
  { department: "Sales", measurement: "Manual task volume", tool: "Survey/Meetings", result: "Confirmed 'very manual' — no baseline data yet" },
  { department: "TAM", measurement: "Time per client/event", tool: "Jira", result: "Admin panel setup: 30-40%\nClient training & comms: 15-20%\nTroubleshooting: 10-15%\nRegistration & matchmaking setup: 10-15%\nPlanning & meetings: 10%" }],

  connectedFindings: [
  { label: "Bottleneck: Admin Panel Setup", link: "/findings" },
  { label: "Automation Ideas", link: "/automation-ideas" }]

},
{
  number: 2,
  title: "Reduce event setup & management manual effort by ≥40% for organisers",
  target: "≥40% reduction in organiser effort",
  icon: <Target className="w-5 h-5" />,
  rows: [
  { department: "TAM / Training", measurement: "Training session duration (pre vs post video library)", tool: "Fathom", result: "Complex (FBF, MEX)= 5-8hrs recorded training + 10-15hrs ad Hoc emails -> 15-23hrs Total\nMedium (SNAC, Hyve)= 2-3hrs recorded training + 10-15hrs ad Hoc emails -> 12-18hrs Total\nSmall (DLG, FESPA)= 45mins recorded training + 5-8hrs ad Hoc emails -> 6-9hrs Total" },
  { department: "Product", measurement: "How long organisers spend on specific tasks on the admin panel", tool: "Admin Panel", result: "Feature planned for early 2027 in Product Roadmap" },
  { department: "TAM", measurement: "Admin panel proxy baseline test (Ilaria)", tool: "Manual", result: "1 hr 15 min with limited results (26 Feb test)" }],

  connectedFindings: [
  { label: "Bottleneck: Organiser Onboarding", link: "/findings" },
  { label: "Workaround Catalogue", link: "/workarounds" }]

},
{
  number: 3,
  title: "Decrease customer support tickets related to manual workarounds by ≥30%",
  target: "≥30% reduction in support tickets",
  icon: <Headphones className="w-5 h-5" />,
  rows: [
  { department: "Support", measurement: "Total real tickets/month (excl. spam)", tool: "JSM", result: "2025 avg: 164/mo\nJan–Feb 2026: 254/mo" },
  { department: "Support", measurement: "Tickets per event", tool: "JSM", result: "2025: 18.2/event\nJan–Feb 2026: 28.2/event" }],

  connectedFindings: [
  { label: "Finding: Support Ticket Trends", link: "/findings" },
  { label: "Action Plan: Support Reduction", link: "/action-plan" }]

},
{
  number: 4,
  title: "Reduce average onboarding time for new customers by ≥35%",
  target: "≥35% reduction in onboarding time",
  icon: <UserCheck className="w-5 h-5" />,
  rows: [
  { department: "TAM / Training", measurement: "Onboarding friction patterns (Fathom call analysis)", tool: "Fathom", result: "6 friction points, 5 time sinks, 8 recurring questions — #1 issue: platform capability confusion" },
  { department: "TAM / Training", measurement: "Training duration (pre vs post video library)", tool: "Fathom", result: "Complex: 15–23 hrs, Medium: 12–18 hrs, Small: 6–9 hrs" },
  { department: "TAM", measurement: "First-hand onboarding test (Ilaria)", tool: "Manual", result: "In progress — validates structural vs documentation issues" }],

  connectedFindings: [
  { label: "Finding: Onboarding Friction", link: "/findings" },
  { label: "Action Plan: Self-Serve Content", link: "/action-plan" }]

},
{
  number: 5,
  title: "Engineering time spent on maintenance/manual ops reduced by ≥25%",
  target: "≥25% reduction in maintenance time",
  icon: <Wrench className="w-5 h-5" />,
  rows: [
  { department: "Engineering", measurement: "Worklogs categorised by team (enforce Team field)", tool: "Jira", result: "126 tasks missing Team field; 650 hrs of non-attributed time" },
  { department: "Engineering", measurement: "Bug vs non-bug time ratio per team", tool: "Jira", result: "Mobile team: 44% bug time (Jan 2026) — healthy benchmark is ≤30%" },
  { department: "Engineering", measurement: "Unused platform features audit", tool: "Platform data", result: "Report pending from Yuriy" }],

  connectedFindings: [
  { label: "Finding: Engineering Time Allocation", link: "/findings" },
  { label: "Automation Ideas", link: "/automation-ideas" }]

}];


const OkrFrameworkPage = () => {
  return (
    <div>
      <PageHeader
        title="OKR4 — Key Results Framework"
        description="Objective: Remove operational friction by automating repeatable internal and customer-facing workflows." />
      

      <div className="section-card p-5 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/60 mb-2">Why This Matters</p>
        <p className="text-sm text-foreground font-medium">
          This is how we will scale without scaling headcount or chaos. Each Key Result below maps directly to a
          priority constraint identified in this report.
        </p>
      </div>

      <SectionTitle>Key Results & Q1 Baseline Metrics</SectionTitle>
      <div className="space-y-8 mb-12">
        {krData.map((kr) =>
        <div key={kr.number} className="section-card overflow-hidden">
            {/* Header */}
            <div className="flex items-start gap-4 p-5 border-b border-border bg-secondary/30">
              <div className="phase-indicator shrink-0">{kr.number}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground leading-snug">{kr.title}</h3>
                <p className="text-xs text-primary font-semibold mt-1">Target: {kr.target}</p>
              </div>
              <div className="text-primary/40 shrink-0">{kr.icon}</div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-3 font-semibold text-muted-foreground w-[120px]">Department</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Measurement</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground w-[100px]">Tool</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Q1 Result - Phase 1</th>
                  </tr>
                </thead>
                <tbody>
                  {kr.rows.map((r, i) =>
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-semibold text-foreground">{r.department}</td>
                      <td className="p-3 text-muted-foreground">{r.measurement}</td>
                      <td className="p-3"><span className="tag">{r.tool}</span></td>
                      <td className="p-3 text-foreground whitespace-pre-line">{r.result}</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>

            {/* Connected findings */}
            <div className="px-5 py-3 bg-secondary/20 border-t border-border flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mr-1">A80% of tasks are manual (invoicing, reconciliation, reporting)</span>
              {kr.connectedFindings.map((cf, i) =>
            <Link
              key={i}
              to={cf.link}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors">
              
                  {cf.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
            )}
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default OkrFrameworkPage;