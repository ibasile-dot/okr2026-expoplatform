import { PageHeader, SectionTitle } from "@/components/DashboardWidgets";

const workarounds = [
  { name: "Custom CSS Customisations", owner: "Shubham / Europe TAMs", frequency: "Medium (>5×)", impact: "0.5–1 hr", priority: "Medium", desc: "TAMs use CSS repo + ChatGPT to modify website blocks when native settings unavailable." },
  { name: "Manual How-To Video Production", owner: "Julia / Americas", frequency: "Low (once)", impact: "20+ hrs", priority: "Medium", desc: "Team created 100 videos on a Saturday to fill documentation gaps." },
  { name: "Multi-Tool Bug Transcription", owner: "Pavel / Regional OM", frequency: "High (10–30/project)", impact: "5–10 hrs", priority: "High", desc: "Manually re-tests and re-writes bugs from Azure DevOps to Jira." },
  { name: "Streamlined Kickoff Materials", owner: "Elena / Europe TAM", frequency: "Medium", impact: "1 hr+", priority: "Medium", desc: "Maintains reduced 8-page kickoff vs standard 28-page deck." },
  { name: "Manual App Store Submissions", owner: "Shubham / Europe TAM", frequency: "Low (once/project)", impact: "1.5 hrs", priority: "Quick Win", desc: "Lengthy Android questionnaire, precise multi-select answers required." },
  { name: "Manual Pipeline/Location Config", owner: "Matheus / Americas", frequency: "Medium", impact: "2 hrs", priority: "Medium", desc: "58 locations added one-by-one because import doesn't support mixed types." },
  { name: "AI-Generated CSS/JS with Cursor", owner: "Rachid / DXB Live", frequency: "High (every project)", impact: "Saves 2–4+ hrs", priority: "High", desc: "Self-funded Cursor AI to generate production-ready CSS/JS, bypassing engineering queue." },
  { name: "Postman API Troubleshooting", owner: "Olena, Pavel / Europe", frequency: "Medium", impact: "1–3 hrs/incident", priority: "Medium", desc: "TAMs use Postman to troubleshoot API failures, bypassing API team queue." },
  { name: "Claude Time Tracking to Jira", owner: "Pavel / TAM", frequency: "High (daily)", impact: "5–10 min/day", priority: "Quick Win", desc: "Claude prompt logs time entries to Jira worklogs automatically." },
  { name: "Dummy Exhibitor Lead Gen", owner: "Josuá / Americas", frequency: "Medium", impact: "2–3 hrs", priority: "High", desc: "Turns participants into exhibitor team members via API script for lead downloads." },
  { name: "Google Chat Task Triage", owner: "All Americas TAMs", frequency: "High (daily)", impact: "0.5 hr/day", priority: "High", desc: "Manual S/M/L/B tagging in Google Chat for bandwidth tracking." },
  { name: "Manual Data Cross-Referencing", owner: "Josuá / Americas", frequency: "Medium", impact: "1.5 hrs", priority: "High", desc: "Merging interaction exports with category exports due to missing data." },
  { name: "Project Dates/Health Spreadsheet", owner: "Jonathan / Americas", frequency: "Medium (weekly)", impact: "2 hrs", priority: "Medium", desc: "Manual spreadsheet for project dates, health scores, integrations." },
  { name: "Hosted Buyer OTP Login Bypass", owner: "Chaitanya / Europe", frequency: "Medium", impact: "0.5–1 hr", priority: "Quick Win", desc: "Bypasses OTP module during Go-Live — security risk." },
];

const priorityStyle: Record<string, string> = {
  High: "tag-dark",
  Medium: "tag",
  "Quick Win": "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border border-foreground/20 text-foreground bg-transparent",
};

const WorkaroundsPage = () => {
  return (
    <div>
      <PageHeader title="Workaround Catalogue" description="Documented TAM workarounds — each one represents a process gap." />

      <div className="section-card overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Workaround</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-36">Owner</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-28">Frequency</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-24">Time Impact</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-20">Priority</th>
            </tr>
          </thead>
          <tbody>
            {workarounds.map((w, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                <td className="p-3">
                  <p className="font-medium text-foreground">{w.name}</p>
                  <p className="text-muted-foreground mt-0.5 max-w-lg hidden group-hover:block">{w.desc}</p>
                </td>
                <td className="p-3 text-muted-foreground">{w.owner}</td>
                <td className="p-3 text-muted-foreground">{w.frequency}</td>
                <td className="p-3 font-mono text-foreground">{w.impact}</td>
                <td className="p-3">
                  <span className={priorityStyle[w.priority] || "tag"}>{w.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rovo / Claude Agents */}
      <div className="mt-10">
        <SectionTitle>Active AI Agents & Tools</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Feature Request Intake Agent", owner: "Ajay", team: "Product", tool: "Rovo" },
            { name: "Script Building Tool", owner: "Pedro", team: "Operations", tool: "Claude" },
            { name: "AI Legal Review", owner: "Mykyta", team: "Leadership", tool: "Claude Co-Work" },
            { name: "AI Rapid App Prototyping", owner: "Mykyta", team: "Engineering", tool: "Claude Co-Work" },
            { name: "AI Sentiment Analysis Agent", owner: "Susan", team: "Operations", tool: "Rovo" },
            { name: "AI Promise Detection Agent", owner: "Susan", team: "Operations", tool: "Rovo" },
          ].map((a, i) => (
            <div key={i} className="section-card p-4">
              <p className="text-xs font-medium text-foreground">{a.name}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{a.owner} · {a.team} · {a.tool}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkaroundsPage;
