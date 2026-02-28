import { PageHeader, SectionTitle, HorizontalBar } from "@/components/DashboardWidgets";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = [
  "hsl(0, 0%, 15%)",
  "hsl(0, 0%, 35%)",
  "hsl(0, 0%, 50%)",
  "hsl(0, 0%, 65%)",
  "hsl(0, 0%, 80%)",
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

const TAM_COLORS = [
  "hsl(0,0%,10%)", "hsl(0,0%,25%)", "hsl(0,0%,38%)", "hsl(0,0%,48%)",
  "hsl(0,0%,58%)", "hsl(0,0%,70%)", "hsl(0,0%,82%)",
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

const integrationHours = [
  { label: "Total Manual Integration Hours", value: 1044 },
];

const findings = [
  {
    category: "Admin Panel",
    items: [
      "30–40% of TAM time consumed by admin panel setup and configuration",
      "64 manual configuration steps per event",
      "First-time event builds take 36% more effort than repeat events (15 vs 11 days)",
      "~50% of features unused per event, but all shown in admin panel",
      "No feature-based wizard — organisers see everything regardless of event type",
      "Back-end config (registration, matchmaking, API) is complex with no guided flow",
      "Front-end website builder relies on custom CSS/JS — TAMs use ChatGPT as workaround",
    ],
  },
  {
    category: "Recurring vs New Customers",
    items: [
      "New customer events average 15 days setup; recurring average 11 days",
      "Recurring events still require significant manual reconfiguration",
      "No smart defaults or intelligent cloning for repeat events",
      "Customer history and preferences not systematically captured",
      "TAMs manually re-discover returning customer requirements each cycle",
    ],
  },
  {
    category: "Support & Tickets",
    items: [
      "2025 average: 164 tickets/month (18.2 per event). Jan–Feb 2026: 254/month (28.2 per event)",
      "40% of TAM support tickets map to admin panel issues",
      "Top themes: Login/password reset (19.3%), exhibitor setup (15.9%), mobile app (8%), registration (4.5%), CSS (2.3%)",
      "JSM adoption still increasing — ticket volume will rise before stabilising",
    ],
  },
  {
    category: "Integrations",
    items: [
      "1,044 hours total in worklogs for manual integrations",
      "No native integrations with common 3rd-party systems",
      "TAMs individually build siloed API scripts",
      "Self-funded tools (Cursor AI, Postman) used to bypass engineering queue",
    ],
  },
  {
    category: "Onboarding & Training",
    items: [
      "72% of repeated questions addressable via self-serve content",
      "30–40% of live training time = troubleshooting and re-explaining",
      "100 of 300 needed how-to videos created (33%)",
      "Training quality varies by TAM and region. No role-based learning paths",
      "6 friction points, 5 time sinks, 8 recurring questions identified from Fathom analysis",
    ],
  },
  {
    category: "Engineering",
    items: [
      "400–500 hrs/month lost due to missing Team field on Jira tasks",
      "126 tasks without Team field; 650.48h of non-attributed time",
      "Mobile team: 44% bug time in Jan 2026 (healthy benchmark = 30%)",
      "178 ghost bugs from 2022–2024 still open in backlog",
    ],
  },
  {
    category: "Knowledge & Tools",
    items: [
      "Customer history lives in TAMs' heads, not in systems",
      "5–7 different tools per TAM with no unified view",
      "TAMs self-teach API troubleshooting skills",
      "Returning customer context lost when TAMs change",
    ],
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
                        <Cell key={i} fill={TAM_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 flex-1">
                {tamTimeBreakdown.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: TAM_COLORS[i] }} />
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
                  <Bar dataKey="tickets" fill="hsl(0,0%,15%)" radius={[4, 4, 0, 0]} name="Tickets/Month" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">JSM adoption increasing — volume expected to rise before stabilising.</p>
          </div>
        </div>
      </div>

      {/* Ticket Themes + Event Setup Comparison */}
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
                  <Bar dataKey="pct" fill="hsl(0,0%,30%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Event Setup: New vs Recurring Customers</SectionTitle>
          <div className="section-card p-6">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventSetup} barCategoryGap="40%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: "Days", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `${v} days`} contentStyle={{ fontSize: 11, borderRadius: 6, border: '1px solid hsl(0,0%,91%)' }} />
                  <Bar dataKey="days" fill="hsl(0,0%,20%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">36% more effort for first-time events. Recurring events still lack smart defaults or intelligent cloning.</p>
          </div>
        </div>
      </div>

      {/* Training & Integration metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <SectionTitle>Training & Self-serve Readiness</SectionTitle>
          <div className="section-card p-6 space-y-3">
            {trainingData.map((d) => (
              <HorizontalBar key={d.label} label={d.label} value={d.value} />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Integration Overhead</SectionTitle>
          <div className="section-card p-6">
            <div className="text-center py-4">
              <p className="stat-value">1,044h</p>
              <p className="text-xs text-muted-foreground mt-2">Total hours logged for manual integrations</p>
              <p className="text-[10px] text-muted-foreground mt-1">No native 3rd-party integrations. TAMs build siloed API scripts individually.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Findings by Category */}
      <SectionTitle>Detailed Findings by Category</SectionTitle>
      <div className="space-y-4">
        {findings.map((section) => (
          <div key={section.category} className="section-card p-6">
            <h3 className="text-sm font-bold text-foreground mb-3">{section.category}</h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-foreground mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindingsPage;
