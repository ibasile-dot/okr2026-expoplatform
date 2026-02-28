import { PageHeader } from "@/components/DashboardWidgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Idea {
  idea: string;
  solves: string;
  area: string;
  priority: "High" | "Medium" | "Low";
}

const categories: { label: string; key: string; ideas: Idea[] }[] = [
  {
    label: "TAM Workflow", key: "tam",
    ideas: [
      { idea: "JSM AI triage — neutral sentiment → AI responds, escalate urgent only", solves: "TAMs on routine queries", area: "Phase 1 — Support Tickets", priority: "High" },
      { idea: "AI Digital Twin — AI replies from TAM email for routine, escalates complex", solves: "Personalised per TAM", area: "Phase 1 — Support Tickets", priority: "Medium" },
      { idea: "N8N email triage workflow — classify → auto-respond FAQ → log → escalate", solves: "First-line support", area: "Phase 1 — Support Tickets", priority: "Medium" },
      { idea: "Standardised Asset Collection Forms with Automated Reminders", solves: "No pre-built collection forms, multiple follow-ups", area: "Phase 1 — Admin Panel", priority: "High" },
      { idea: "Automated pre-launch health checks", solves: "Every launch = massive manual checklist", area: "Phase 1 — Admin Panel", priority: "High" },
      { idea: "SLA timezone-based — JSM 24hr SLA per client", solves: "Inconsistent SLAs across regions", area: "Phase 2 — Quick Wins", priority: "Low" },
      { idea: "Agentic AI preparing for meetings: wash-ups, kick offs", solves: "Manual prep taking lots of TAMs time", area: "Phase 2 — Quick Wins", priority: "Medium" },
      { idea: "Fathom & Claude integration for client journey automation", solves: "Manual kick-off prep, PM board creation", area: "Phase 2 — Quick Wins", priority: "Medium" },
      { idea: "Planhat automated onboarding — welcome materials auto-sent on deal close", solves: "Sales-to-TAM handover is manual and lossy", area: "Phase 3 — Second Priorities", priority: "Low" },
    ],
  },
  {
    label: "Product & Design", key: "product",
    ideas: [
      { idea: "Website ready templates — swap colours/fonts, layout stays fixed", solves: "TAM setup time per event + organiser website creation", area: "Phase 1 — Website Builder", priority: "High" },
      { idea: "AI Agent on module setup (registration conditional logic)", solves: "Complex and un-user-friendly registration pipelines", area: "Phase 1 — Back-end Config", priority: "High" },
      { idea: "Direct Client Feedback — in-product surveys, NPS", solves: "Product feedback currently indirect via TAMs", area: "Phase 3 — Second Priorities", priority: "Medium" },
      { idea: "Auto-Clone Environment with Smart Defaults for repeat events", solves: "First-time ~15 days, repeat ~11 days", area: "Phase 1 — Admin Panel", priority: "High" },
      { idea: "Feature-Based Admin Panel Wizard — organiser selects features, UI adapts", solves: "~50% of features unused per event but all shown", area: "Phase 1 — Admin Panel", priority: "High" },
    ],
  },
  {
    label: "Sales & Marketing", key: "sales",
    ideas: [
      { idea: "Sales admin automation", solves: "Sales team admin burden", area: "Phase 3 — Second Priorities", priority: "Medium" },
      { idea: "Pipedrive restructure", solves: "Outdated automations (Maria's 60+ need restructure)", area: "Phase 3 — Second Priorities", priority: "Medium" },
      { idea: "Auto data export from backend dashboards for analytics", solves: "TAMs skip washup analytics — manual copy-paste", area: "Phase 3 — Second Priorities", priority: "Low" },
      { idea: "AI Generated marketing videos", solves: "Human needed for all marketing material", area: "Phase 3 — Second Priorities", priority: "Low" },
      { idea: "Automate outbound sales process", solves: "Replaces manual Pipedrive follow-ups", area: "Phase 3 — Second Priorities", priority: "Medium" },
    ],
  },
  {
    label: "Engineering", key: "engineering",
    ideas: [
      { idea: "Legacy Backlog Purge — close tickets >18 months without 90-day update", solves: "178 bugs from 2022–2024 still open", area: "Phase 2 — Engineering Quick Wins", priority: "High" },
      { idea: "QA N8N bug context/prioritisation", solves: "Bug triage time", area: "Phase 2 — Engineering Quick Wins", priority: "Medium" },
      { idea: "Automated testing framework (Playwright/Cypress)", solves: "QA runs manual regression 8–15hrs per release cycle", area: "Phase 2 — Engineering Quick Wins", priority: "Medium" },
    ],
  },
  {
    label: "HR & People", key: "hr",
    ideas: [
      { idea: "HR onboarding via Claude Co-Work — browser automation", solves: "Olga does this manually", area: "Phase 2 — HR Support", priority: "High" },
      { idea: "Structured TAM Onboarding & Shadowing Programme", solves: "Junior TAMs lack structured onboarding, attrition", area: "Phase 2 — Quick Wins", priority: "Medium" },
      { idea: "ATS integration or AI-assisted screening & interview coordination", solves: "Manual screening hours + email scheduling", area: "Phase 2 — HR Support", priority: "Medium" },
    ],
  },
  {
    label: "Data & Finance", key: "data",
    ideas: [
      { idea: "Jira Team field enforcement across all tasks", solves: "400–500 hrs/month lost to non-attributed work", area: "Phase 2 — Engineering Quick Wins", priority: "High" },
      { idea: "API-based sync via n8n between billing and reporting", solves: "Finance ~80% manual reconciliation work", area: "Phase 3 — Second Priorities", priority: "Medium" },
    ],
  },
];

const priorityStyle: Record<string, string> = {
  High: "tag-dark",
  Medium: "tag",
  Low: "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border border-border text-muted-foreground bg-transparent",
};

const AutomationIdeasPage = () => {
  return (
    <div>
      <PageHeader title="Automation Ideas" description="40+ ideas collected across 7 departments from interviews, surveys, and discovery." />

      <Tabs defaultValue="tam" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1 bg-transparent border-b border-border rounded-none p-0 pb-2">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.key}
              value={cat.key}
              className="text-xs rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none border border-border px-3 py-1"
            >
              {cat.label} ({cat.ideas.length})
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.key} value={cat.key}>
            <div className="section-card overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Idea</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-48">What it Solves</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-48">Action Plan Area</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-20">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.ideas.map((idea, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">{idea.idea}</td>
                      <td className="p-3 text-muted-foreground">{idea.solves}</td>
                      <td className="p-3 text-muted-foreground">{idea.area}</td>
                      <td className="p-3">
                        <span className={priorityStyle[idea.priority]}>{idea.priority}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AutomationIdeasPage;
