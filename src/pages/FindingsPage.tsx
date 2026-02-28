import { PageHeader, SectionTitle, HorizontalBar } from "@/components/DashboardWidgets";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const CHART_COLORS = [
  "hsl(237, 68%, 33%)",
  "hsl(44, 100%, 58%)",
  "hsl(237, 45%, 50%)",
  "hsl(44, 80%, 72%)",
  "hsl(200, 60%, 45%)",
  "hsl(237, 30%, 65%)",
  "hsl(44, 60%, 48%)",
];

const tamTimeBreakdown = [
  { name: "Admin Panel Setup", value: 35 },
  { name: "Client Comms & Training", value: 18 },
  { name: "Troubleshooting", value: 13 },
  { name: "Analytics & Reporting", value: 10 },
  { name: "Integrations & API", value: 10 },
  { name: "Internal Coordination", value: 8 },
  { name: "Other", value: 6 },
];

const ticketTrend = [
  { period: "2025 Avg", tickets: 164, perEvent: 18.2 },
  { period: "Jan 2026", tickets: 240, perEvent: 26.7 },
  { period: "Feb 2026", tickets: 268, perEvent: 29.8 },
];

const ticketByCategory = [
  { name: "Login / Password Reset", pct: 19.3 },
  { name: "Exhibitor / Booth Setup", pct: 15.9 },
  { name: "Mobile App Build", pct: 8.0 },
  { name: "Lead Retrieval", pct: 5.0 },
  { name: "Registration / Badge", pct: 4.5 },
  { name: "CSS / Branding", pct: 2.3 },
];

const eventSetup = [
  { name: "New Customer", days: 15 },
  { name: "Recurring Customer", days: 11 },
];

const trainingData = [
  { label: "How-to Videos Created", value: 33 },
  { label: "Questions Addressable via Self-serve", value: 72 },
  { label: "Training Time = Troubleshooting", value: 35 },
];

const painPointRadar = [
  { area: "Admin Panel", severity: 95 },
  { area: "Integrations", severity: 75 },
  { area: "Support", severity: 70 },
  { area: "Training", severity: 60 },
  { area: "Knowledge", severity: 65 },
  { area: "Tools", severity: 55 },
];

const recurringVsNewDetails = [
  { metric: "Setup Days", recurring: 11, new_cust: 15 },
  { metric: "Config Steps", recurring: 48, new_cust: 64 },
  { metric: "Training Hours", recurring: 4, new_cust: 12 },
  { metric: "Support Tickets", recurring: 12, new_cust: 22 },
];

const categoryCards = [
  {
    category: "Admin Panel",
    stat: "30–40%",
    statLabel: "of TAM time",
    highlights: ["64 manual config steps per event", "~50% of features unused but all shown", "No feature-based wizard or guided flow"],
    color: "hsl(237, 68%, 33%)",
  },
  {
    category: "Integrations",
    stat: "1,044h",
    statLabel: "manual hours logged",
    highlights: ["No native 3rd-party integrations", "TAMs build custom CSS & JavaScript workarounds", "Self-funded tools bypass eng queue"],
    color: "hsl(44, 100%, 58%)",
  },
  {
    category: "Support & Tickets",
    stat: "254/mo",
    statLabel: "Jan–Feb 2026",
    highlights: ["Up from 164/mo in 2025", "40% trace to admin panel issues", "JSM adoption still increasing"],
    color: "hsl(237, 45%, 50%)",
  },
  {
    category: "Engineering",
    stat: "400–500h",
    statLabel: "lost monthly",
    highlights: ["Missing Team field on Jira tasks", "178 ghost bugs from 2022–2024", "44% mobile bug time (target 30%)"],
    color: "hsl(237, 30%, 65%)",
  },
  {
    category: "Training & Knowledge",
    stat: "72%",
    statLabel: "self-serve addressable",
    highlights: ["Only 100/300 videos created", "30–40% training = troubleshooting", "No role-based learning paths"],
    color: "hsl(200, 60%, 45%)",
  },
  {
    category: "Knowledge & Tools",
    stat: "5–7",
    statLabel: "tools per TAM",
    highlights: ["Customer history in TAMs' heads", "Context lost when TAMs change", "No unified view across tools"],
    color: "hsl(44, 80%, 72%)",

  },
];

const FindingsPage = () => {
  return (
    <div>
      <PageHeader
        title="Discovery Findings"
        description="Complete findings from the efficiency discovery across all departments. Based on interviews, surveys, Jira data, Fathom call analysis, and direct observation."
      />

      {/* TAM Time Distribution + Ticket Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionTitle>TAM Time Distribution (Estimated)</SectionTitle>
          <div className="section-card p-6">
            <div className="flex items-center gap-6">
              <div className="w-44 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={tamTimeBreakdown} cx="50%" cy="50%" innerRadius={38} outerRadius={68} dataKey="value" stroke="none">
                      {tamTimeBreakdown.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 flex-1">
                {tamTimeBreakdown.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: CHART_COLORS[i] }} />
                    <span className="text-foreground font-medium flex-1">{t.name}</span>
                    <span className="font-mono text-muted-foreground">{t.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Support Ticket Trend</SectionTitle>
          <div className="section-card p-6">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketTrend} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  <Bar dataKey="tickets" fill="hsl(237, 68%, 33%)" radius={[4, 4, 0, 0]} name="Tickets/Month" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">JSM adoption increasing — volume expected to rise before stabilising.</p>
          </div>
        </div>
      </div>

      {/* Pain Point Radar + Recurring vs New Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionTitle>Pain Point Severity by Area</SectionTitle>
          <div className="section-card p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={painPointRadar}>
                  <PolarGrid stroke="hsl(0,0%,85%)" />
                  <PolarAngleAxis dataKey="area" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="Severity" dataKey="severity" stroke="hsl(237, 68%, 33%)" fill="hsl(237, 68%, 33%)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Recurring vs New Customer Comparison</SectionTitle>
          <div className="section-card p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recurringVsNewDetails} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                  <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                   <Bar dataKey="recurring" fill="hsl(237, 68%, 33%)" radius={[4, 4, 0, 0]} name="Recurring" />
                   <Bar dataKey="new_cust" fill="hsl(44, 100%, 58%)" radius={[4, 4, 0, 0]} name="New Customer" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">New customers require 36% more effort across all metrics. Recurring events still lack smart defaults.</p>
          </div>
        </div>
      </div>

      {/* Ticket Themes + Training */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionTitle>TAM Support Tickets by Category</SectionTitle>
          <div className="section-card p-6">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketByCategory} layout="vertical" barCategoryGap="18%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                  <XAxis type="number" tick={{ fontSize: 10 }} unit="%" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={130} />
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  <Bar dataKey="pct" fill="hsl(44, 100%, 58%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Training & Self-serve Readiness</SectionTitle>
          <div className="section-card p-6 space-y-3">
            {trainingData.map((d) => (
              <HorizontalBar key={d.label} label={d.label} value={d.value} />
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <div className="flex items-center gap-3">
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-foreground">100</p>
                  <p className="text-[10px] text-muted-foreground">Videos created</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-muted-foreground">300</p>
                  <p className="text-[10px] text-muted-foreground">Videos needed</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-primary">33%</p>
                  <p className="text-[10px] text-muted-foreground">Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings by Category — Visual Cards */}
      <SectionTitle>Findings by Category</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {categoryCards.map((cat) => (
          <div key={cat.category} className="section-card p-5 border-l-4" style={{ borderLeftColor: cat.color }}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xs font-bold text-foreground">{cat.category}</h3>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground leading-none">{cat.stat}</p>
                <p className="text-[10px] text-muted-foreground">{cat.statLabel}</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {cat.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: cat.color }} />
                  {h}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Overhead */}
      <SectionTitle>Integration Overhead</SectionTitle>
      <div className="section-card p-6 mb-12">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground">1,044h</p>
            <p className="text-xs text-muted-foreground mt-1">Total hours in manual integrations</p>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "hsl(237, 68%, 33%)" }} />
              <span className="text-foreground font-medium flex-1">No native 3rd-party integrations</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "hsl(44, 100%, 58%)" }} />
              <span className="text-foreground font-medium flex-1">TAMs individually build custom CSS & JavaScript workarounds</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "hsl(237, 45%, 50%)" }} />
              <span className="text-foreground font-medium flex-1">Self-funded tools (Cursor AI, Postman) used to bypass engineering queue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindingsPage;
