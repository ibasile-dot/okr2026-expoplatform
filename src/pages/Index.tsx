import { StatCard, HorizontalBar, SectionTitle, PageHeader } from "@/components/DashboardWidgets";

const deptWorkload = [
  { label: "Finance", value: 80 },
  { label: "HR", value: 77 },
  { label: "Marketing", value: 66 },
  { label: "Engineering", value: 42 },
  { label: "Eng Management", value: 20 },
];

const keyFindings = [
  { label: "Primary Constraint", text: "Admin Panel setup & configuration consumes 30–40% of TAM time per event. 64 manual config steps, first-time builds take 36% more effort." },
  { label: "Integration Bottleneck", text: "1,044 hours logged in worklogs for manual integrations. No native integrations with common 3rd-party systems." },
  { label: "Support Trend", text: "JSM tickets trending upward: 164/mo average in 2025, rising to 254/mo in Jan–Feb 2026. 40% map to admin panel." },
  { label: "Knowledge Loss", text: "Customer history lives in TAMs' heads, not systems. 5–7 tools per TAM with no unified view. Self-taught API skills." },
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
        <StatCard label="Avg Support Tickets" value="254/mo" detail="Jan–Feb 2026 (up from 164)" />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Department Workload */}
        <div>
          <SectionTitle>Manual Workload by Department</SectionTitle>
          <div className="section-card p-6 space-y-4">
            {deptWorkload.map((d) => (
              <HorizontalBar key={d.label} label={d.label} value={d.value} />
            ))}
            <p className="text-[10px] text-muted-foreground pt-2 border-t border-border">
              Source: Productivity, Automation Tools &amp; AI Adoption Survey — February 2026
            </p>
          </div>
        </div>

        {/* Key Findings */}
        <div>
          <SectionTitle>Key Findings</SectionTitle>
          <div className="space-y-3">
            {keyFindings.map((f, i) => (
              <div key={i} className="section-card p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground mb-1">{f.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focus Areas */}
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

      {/* Admin Panel Breakdown */}
      <SectionTitle>Admin Panel — The Primary Bottleneck</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="section-card p-5">
          <p className="stat-label mb-2">Website Builder</p>
          <p className="text-lg font-bold text-foreground">Back-end config</p>
          <p className="text-xs text-muted-foreground mt-1">Custom CSS, block configuration, theme setup. TAMs use ChatGPT + CSS repos as workarounds.</p>
        </div>
        <div className="section-card p-5">
          <p className="stat-label mb-2">App Submission</p>
          <p className="text-lg font-bold text-foreground">1.5hrs per event</p>
          <p className="text-xs text-muted-foreground mt-1">Lengthy Android questionnaire. Precise multi-select answers required. Manual process.</p>
        </div>
        <div className="section-card p-5">
          <p className="stat-label mb-2">App Builder</p>
          <p className="text-lg font-bold text-foreground">44% bug time</p>
          <p className="text-xs text-muted-foreground mt-1">Mobile team at 44% bug time (Jan 2026). Healthy benchmark is 30%. Heavy maintenance overhead.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
