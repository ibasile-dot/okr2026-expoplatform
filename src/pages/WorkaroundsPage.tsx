import { PageHeader, StatusBadge, PriorityBadge } from "@/components/DashboardWidgets";

const workarounds = [
  { name: "Custom CSS Customizations", owner: "Shubham / Europe TAMs", frequency: "Medium (>5 times)", impact: "0.5-1 hr", priority: "Medium", description: "TAMs use CSS repo + ChatGPT to modify website blocks when native settings unavailable." },
  { name: "Manual How-To Video Production", owner: "Julia / Americas", frequency: "Low (do once)", impact: "20+ hrs", priority: "Medium", description: "Team created 100 videos on a Saturday to fill documentation gaps. Help desk too text-heavy." },
  { name: "Multi-Tool Bug Transcription", owner: "Pavel / Regional OM", frequency: "High (10-30/project)", impact: "5-10 hrs", priority: "High", description: "Manually re-tests and re-writes bugs from Azure DevOps to Jira. Significant context-switching." },
  { name: "Streamlined Kickoff Materials", owner: "Elena / Europe TAM", frequency: "Medium", impact: "1 hr+", priority: "Medium", description: "Maintains reduced 8-page kickoff vs standard 28-page deck." },
  { name: "Manual App Store Submissions", owner: "Shubham / Europe TAM", frequency: "Low (once/project)", impact: "1.5 hrs", priority: "Quick Win", description: "Lengthy Android questionnaire, precise multi-select answers required per event." },
  { name: "Manual Pipeline/Location Config", owner: "Matheus / Americas", frequency: "Medium", impact: "2 hrs", priority: "Medium", description: "58 locations added one-by-one because import doesn't support mixed types." },
  { name: "AI-Generated CSS/JS with Cursor", owner: "Rachid / DXB Live", frequency: "High (every project)", impact: "Saves 2-4+ hrs", priority: "High", description: "Self-funded Cursor AI to generate production-ready CSS/JS, bypassing engineering queue." },
  { name: "Postman API Troubleshooting", owner: "Olena, Pavel / Europe", frequency: "Medium", impact: "1-3 hrs/incident", priority: "Medium", description: "TAMs use Postman to troubleshoot API failures, bypassing API team queue." },
  { name: "Claude Time Tracking to Jira", owner: "Pavel / TAM", frequency: "High (daily)", impact: "5-10 min/day", priority: "Quick Win", description: "Claude prompt logs time entries to Jira worklogs automatically." },
  { name: "Dummy Exhibitor Lead Gen", owner: "Josuá / Americas", frequency: "Medium", impact: "2-3 hrs API/Dev", priority: "High", description: "Turns participants into exhibitor team members via API script for lead downloads." },
  { name: "Google Chat Task Triage", owner: "All Americas TAMs", frequency: "High (daily)", impact: "0.5 hr/day", priority: "High", description: "Manual S/M/L/B tagging in Google Chat for bandwidth tracking." },
  { name: "Manual Data Cross-Referencing", owner: "Josuá / Americas", frequency: "Medium", impact: "1.5 hrs", priority: "High", description: "Merging interaction exports with category exports due to missing data." },
  { name: "Project Dates/Health Spreadsheet", owner: "Jonathan / Americas", frequency: "Medium (weekly)", impact: "2 hrs", priority: "Medium", description: "Manual spreadsheet for project dates, health scores, integrations." },
  { name: "Hosted Buyer OTP Login Bypass", owner: "Chaitanya / Europe", frequency: "Medium", impact: "0.5-1 hr", priority: "Quick Win", description: "Bypasses OTP module during Go-Live — SECURITY RISK." },
];

const WorkaroundsPage = () => {
  return (
    <div>
      <PageHeader title="Workaround Catalogue" description="Documented TAM workarounds with time impact and priority — 21 items catalogued" />

      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Workaround</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-36">Owner</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-32">Frequency</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-24">Impact</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-20">Priority</th>
            </tr>
          </thead>
          <tbody>
            {workarounds.map((w, i) => (
              <tr key={i} className="border-t border-border/50 hover:bg-muted/20 transition-colors group">
                <td className="p-3">
                  <p className="text-foreground font-medium">{w.name}</p>
                  <p className="text-muted-foreground mt-0.5 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity">{w.description}</p>
                </td>
                <td className="p-3 text-muted-foreground">{w.owner}</td>
                <td className="p-3 text-muted-foreground">{w.frequency}</td>
                <td className="p-3 font-mono text-foreground">{w.impact}</td>
                <td className="p-3"><PriorityBadge priority={w.priority} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Additional Automations (Rovo / Claude Agents)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Feature Request Intake Agent", owner: "Ajay", team: "Product", tool: "Rovo" },
            { name: "Script Building Tool", owner: "Pedro", team: "Operations", tool: "Claude" },
            { name: "AI Legal Review", owner: "Mykyta", team: "Leadership", tool: "Claude Co-Work" },
            { name: "AI Rapid App Prototyping", owner: "Mykyta", team: "Engineering", tool: "Claude Co-Work" },
            { name: "AI Sentiment Analysis Agent", owner: "Susan", team: "Operations", tool: "Rovo" },
            { name: "AI Promise Detection Agent", owner: "Susan", team: "Operations", tool: "Rovo" },
          ].map((a, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border/50">
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
