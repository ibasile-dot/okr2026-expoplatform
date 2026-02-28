import { PageHeader, SectionTitle } from "@/components/DashboardWidgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Idea {
  idea: string;
  solves: string;
  source: string;
  priority?: "High" | "Medium" | "Low";
}

const categories: { label: string; key: string; ideas: Idea[] }[] = [
  {
    label: "TAM Workflow", key: "tam",
    ideas: [
      { idea: "JSM AI triage — neutral sentiment → AI responds, escalate urgent only", solves: "TAMs on routine queries", source: "Pre-Joining + Bartosz" },
      { idea: "AI Digital Twin — AI replies from TAM email for routine, escalates complex", solves: "Personalised per TAM", source: "Pre-joining + Susan" },
      { idea: "N8N email triage workflow — classify → auto-respond FAQ → log → escalate", solves: "First-line support", source: "Pre-Joining" },
      { idea: "Standardised Asset Collection Forms with Automated Reminders", solves: "No pre-built collection forms, multiple follow-ups", source: "Discovery interviews", priority: "High" },
      { idea: "Automated pre-launch health checks", solves: "Every launch = massive manual checklist", source: "Quantitative Discovery" },
      { idea: "SLA timezone-based — JSM 24hr SLA per client", solves: "Inconsistent SLAs across regions", source: "JSM intro Fathom" },
      { idea: "Agentic AI preparing for meetings: wash-ups, kick offs", solves: "Manual prep taking lots of TAMs time", source: "Ilaria's doc review" },
      { idea: "Fathom & Claude integration for client journey automation", solves: "Manual kick-off prep, PM board creation", source: "Ilaria's doc review" },
      { idea: "Planhat automated onboarding — welcome materials auto-sent on deal close", solves: "Sales-to-TAM handover is manual and lossy", source: "OKR rows, Chris" },
    ],
  },
  {
    label: "Product & Design", key: "product",
    ideas: [
      { idea: "Website ready templates — swap colours/fonts, layout stays fixed", solves: "TAM setup time per event + organiser website creation", source: "Julia" },
      { idea: "AI Agent on module setup (registration conditional logic)", solves: "Complex and un-user-friendly registration pipelines", source: "Shubham" },
      { idea: "Direct Client Feedback — in-product surveys, NPS", solves: "Product feedback currently indirect via TAMs", source: "Discovery interviews", priority: "High" },
      { idea: "Auto-Clone Environment with Smart Defaults for repeat events", solves: "First-time ~15 days, repeat ~11 days", source: "Discovery" },
      { idea: "Feature-Based Admin Panel Wizard — organiser selects features, UI adapts", solves: "~50% of features unused per event but all shown", source: "Rachid", priority: "High" },
    ],
  },
  {
    label: "Sales & Marketing", key: "sales",
    ideas: [
      { idea: "Sales admin automation", solves: "Sales team admin burden", source: "Chris meeting" },
      { idea: "Pipedrive restructure", solves: "Outdated automations (Maria's 60+ need restructure)", source: "Maria meeting" },
      { idea: "Auto data export from backend dashboards for analytics", solves: "TAMs skip washup analytics — manual copy-paste", source: "Maria" },
      { idea: "AI Generated marketing videos", solves: "Human needed for all marketing material", source: "Maria" },
      { idea: "Automate outbound sales process", solves: "Replaces manual Pipedrive follow-ups", source: "Celine" },
    ],
  },
  {
    label: "Engineering", key: "engineering",
    ideas: [
      { idea: "Legacy Backlog Purge — close tickets >18 months without 90-day update", solves: "178 bugs from 2022–2024 still open", source: "Bartosz" },
      { idea: "QA N8N bug context/prioritisation", solves: "Bug triage time", source: "Bartosz" },
      { idea: "Automated testing framework (Playwright/Cypress)", solves: "QA runs manual regression 8–15hrs per release cycle", source: "Survey" },
    ],
  },
  {
    label: "HR & People", key: "hr",
    ideas: [
      { idea: "HR onboarding via Claude Co-Work — browser automation", solves: "Olga does this manually", source: "Bartosz" },
      { idea: "Structured TAM Onboarding & Shadowing Programme", solves: "Junior TAMs lack structured onboarding, attrition", source: "Sana exit interview" },
      { idea: "ATS integration or AI-assisted screening & interview coordination", solves: "Manual screening hours + email scheduling", source: "Survey" },
    ],
  },
  {
    label: "Data & Finance", key: "data",
    ideas: [
      { idea: "Automated Bug classification: Production Bug vs Dev Defect", solves: "Yuriy manually checks Client field", source: "Yuriy" },
      { idea: "API-based sync via n8n between billing and reporting", solves: "Finance ~80% manual reconciliation work", source: "Survey" },
    ],
  },
];

const priorityStyle: Record<string, string> = {
  High: "tag-dark",
  Medium: "tag",
  Low: "tag",
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
              className="text-xs rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none border border-border px-3 py-1"
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
                    <th className="text-left p-3 font-medium text-muted-foreground w-52">What it Solves</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-32">Source</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-20">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.ideas.map((idea, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">{idea.idea}</td>
                      <td className="p-3 text-muted-foreground">{idea.solves}</td>
                      <td className="p-3 text-muted-foreground">{idea.source}</td>
                      <td className="p-3">
                        {idea.priority && (
                          <span className={priorityStyle[idea.priority]}>{idea.priority}</span>
                        )}
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
