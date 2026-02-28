import { StatCard, HorizontalBar, SectionTitle, PageHeader } from "@/components/DashboardWidgets";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const ticketBreakdown = [
  { name: "TAM Support", value: 40 },
  { name: "Feature Requests", value: 22 },
  { name: "Bug Reports", value: 20 },
  { name: "Customisation Requests", value: 12 },
  { name: "Other", value: 6 },
];

const ticketThemes = [
  { name: "Login / Password", pct: 19.3 },
  { name: "Exhibitor / Booth", pct: 15.9 },
  { name: "Registration / Badge", pct: 4.5 },
  { name: "CSS / Branding", pct: 2.3 },
  { name: "Mobile App Build", pct: 8 },
  { name: "Lead Retrieval", pct: 5 },
];

const COLORS = [
  "hsl(0, 0%, 15%)",
  "hsl(0, 0%, 35%)",
  "hsl(0, 0%, 50%)",
  "hsl(0, 0%, 65%)",
  "hsl(0, 0%, 80%)",
];

const deptWorkload = [
  { label: "Finance", value: 80 },
  { label: "HR", value: 77 },
  { label: "Marketing", value: 66 },
  { label: "Sales", value: 55 },
  { label: "TAM Team", value: 48 },
  { label: "Engineering", value: 42 },
  { label: "Eng Management", value: 20 },
];

const recurringVsNew = [
  { name: "Recurring", setup: 11, label: "~11 days" },
  { name: "New", setup: 15, label: "~15 days" },
];

const keyFindings = [
  { label: "Primary Constraint", text: "Admin Panel setup & configuration consumes 30–40% of TAM time per event. 64 manual config steps, first-time builds take 36% more effort." },
  { label: "Recurring vs New Customers", text: "Recurring events take ~11 days, new events ~15 days (36% more). Yet recurring events still require significant manual reconfiguration — no smart defaults or cloning." },
  { label: "Integration Bottleneck", text: "1,044 hours logged in worklogs for manual integrations. No native integrations with common 3rd-party systems. TAMs build siloed API scripts." },
  { label: "Support Trend", text: "JSM tickets trending upward: 164/mo in 2025, rising to 254/mo in Jan–Feb 2026. 40% of TAM support tickets trace back to admin panel issues." },
  { label: "Knowledge Loss", text: "Customer history lives in TAMs' heads, not systems. 5–7 tools per TAM with no unified view. Returning customer context lost when TAMs change." },
  { label: "Training Gaps", text: "72% of repeated questions addressable via self-serve content. 30–40% of live training = troubleshooting. Only 100 of 300 needed how-to videos created." },
  { label: "Unused Features", text: "~50% of admin panel features unused per event, but all shown. No feature-based wizard — organisers see everything regardless of event type." },
];

const Index = () => {
  return (
    <div>
      <PageHeader
        title="OKR4 — Automation of Manual Processes"
        description="Executive summary of findings from the operational efficiency discovery. ExpoPlatform, 2026."
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard label="Primary Constraint" value="30–40%" detail="TAM time on admin panel" />
        <StatCard label="Workarounds Catalogued" value="21" detail="Active workarounds documented" />
        <StatCard label="Automation Ideas" value="40+" detail="Across 7 departments" />
        <StatCard label="TAM Support Tickets" value="254/mo" detail="Jan–Feb 2026 (up from 164)" />
      </div>

      {/* Ticket Breakdown + Department Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionTitle>Support Ticket Breakdown by Type</SectionTitle>
          <div className="section-card p-6">
            <div className="flex items-center gap-6">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ticketBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={65} dataKey="value" stroke="none">
                      {ticketBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 flex-1">
                {ticketBreakdown.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: COLORS[i] }} />
                    <span className="text-foreground font-medium flex-1">{t.name}</span>
                    <span className="font-mono text-muted-foreground">{t.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Manual Workload by Department</SectionTitle>
          <div className="section-card p-6 space-y-3">
            {deptWorkload.map((d) => (
              <HorizontalBar key={d.label} label={d.label} value={d.value} />
            ))}
            <p className="text-[10px] text-muted-foreground pt-2 border-t border-border">
              Source: Productivity, Automation Tools &amp; AI Adoption Survey — February 2026
            </p>
          </div>
        </div>
      </div>

      {/* Recurring vs New + Top Ticket Themes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionTitle>Event Setup: Recurring vs New Customers</SectionTitle>
          <div className="section-card p-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recurringVsNew} barCategoryGap="40%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: "Days", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `${v} days`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  <Bar dataKey="setup" fill="hsl(0,0%,15%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">New events take 36% more effort. Recurring events still lack smart defaults.</p>
          </div>
        </div>

        <div>
          <SectionTitle>Top TAM Support Ticket Themes</SectionTitle>
          <div className="section-card p-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketThemes} layout="vertical" barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                  <XAxis type="number" tick={{ fontSize: 10 }} unit="%" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={110} />
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  <Bar dataKey="pct" fill="hsl(0,0%,30%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <SectionTitle>Key Findings</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {keyFindings.map((f, i) => (
          <div key={i} className="section-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground mb-1">{f.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>

      {/* Priority Ranking */}
      <SectionTitle>Where TAM Time Goes — Priority Ranking</SectionTitle>
      <div className="section-card overflow-hidden mb-12">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-3 font-medium text-muted-foreground w-12">#</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Area</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Impact</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-28">Validation</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, name: "Admin Panel Setup & Config", impact: "30–40% TAM time", validation: "9/10 sources" },
              { rank: 2, name: "Repetitive Manual Admin Tasks", impact: "Hrs/day cumulative", validation: "8/10 sources" },
              { rank: 3, name: "Manual Integration Workarounds", impact: "1,044h logged", validation: "7/10 sources" },
              { rank: 4, name: "Fragmented Tools & Coordination", impact: "5–7 tools per TAM", validation: "7/10 sources" },
              { rank: 5, name: "Client Comms & Training", impact: "15–20% TAM time", validation: "6/10 sources" },
              { rank: 6, name: "Analytics & Reporting", impact: "10% TAM time", validation: "5/10 sources" },
              { rank: 7, name: "Knowledge Siloing", impact: "Cross-cutting", validation: "6/10 sources" },
            ].map((p) => (
              <tr key={p.rank} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="p-3 font-mono font-bold text-foreground">{p.rank}</td>
                <td className="p-3 font-medium text-foreground">{p.name}</td>
                <td className="p-3 text-muted-foreground">{p.impact}</td>
                <td className="p-3 font-mono text-muted-foreground">{p.validation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Panel — The Primary Bottleneck */}
      <SectionTitle>Admin Panel — The Primary Bottleneck</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="section-card p-5">
          <p className="stat-label mb-2">Back-end Configuration</p>
          <p className="text-lg font-bold text-foreground">Registration, Matchmaking, API</p>
          <p className="text-xs text-muted-foreground mt-1">Registration conditional logic, matchmaking rules, API configuration, exhibitor setup. Complex pipelines with no guided wizards.</p>
        </div>
        <div className="section-card p-5">
          <p className="stat-label mb-2">Front-end — Website Builder</p>
          <p className="text-lg font-bold text-foreground">Custom CSS, JS, Block Config</p>
          <p className="text-xs text-muted-foreground mt-1">Theme setup, custom CSS/JavaScript, block configuration. TAMs use ChatGPT + CSS repos as workarounds. No ready-made templates.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="section-card p-5">
          <p className="stat-label mb-2">App Builder</p>
          <p className="text-lg font-bold text-foreground">44% bug time</p>
          <p className="text-xs text-muted-foreground mt-1">Mobile team at 44% bug time (Jan 2026). Healthy benchmark is 30%. Heavy maintenance overhead reduces capacity for new features.</p>
        </div>
        <div className="section-card p-5">
          <p className="stat-label mb-2">App Submission</p>
          <p className="text-lg font-bold text-foreground">1.5hrs per event</p>
          <p className="text-xs text-muted-foreground mt-1">Lengthy Android questionnaire with precise multi-select answers. Fully manual process, no pre-fill or automation.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
