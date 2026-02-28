import { PageHeader, StatusBadge, PriorityBadge } from "@/components/DashboardWidgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AutomationIdea {
  idea: string;
  whatItSolves: string;
  source: string;
  status: string;
  priority?: string;
}

const categories: { label: string; key: string; ideas: AutomationIdea[] }[] = [
  {
    label: "TAM Workflow", key: "tam",
    ideas: [
      { idea: "JSM AI triage — neutral sentiment = AI responds, escalate urgent only", whatItSolves: "TAMs on routine queries", source: "Pre-Joining + Bartosz", status: "To explore" },
      { idea: "AI Digital Twin — AI replies from TAM email for routine, escalates complex", whatItSolves: "Personalised per TAM", source: "Pre-joining + Susan", status: "Hypothesis" },
      { idea: "N8N email triage workflow — classify → auto-respond FAQ → log → escalate", whatItSolves: "First-line support", source: "Pre-Joining", status: "Draft exists" },
      { idea: "How-to video automation + sharing in playlist with chapters", whatItSolves: "Training videos for TAMs, organisers, event websites", source: "Julia meeting", status: "No budget yet" },
      { idea: "Standardised Asset Collection Forms with Automated Reminders", whatItSolves: "No pre-built collection forms, multiple follow-ups", source: "Discovery interviews", status: "To explore", priority: "High" },
      { idea: "Automated pre-launch health checks", whatItSolves: "Every launch = massive manual checklist", source: "Quantitative Discovery", status: "To explore" },
      { idea: "SLA timezone-based — JSM 24hr SLA per client", whatItSolves: "Inconsistent SLAs across regions", source: "JSM intro Fathom", status: "To explore" },
      { idea: "Ticket splitting — auto-split multi-topic tickets", whatItSolves: "Messy tickets with more than one request", source: "JSM intro Fathom", status: "To explore" },
      { idea: "Agentic AI preparing for meetings: wash-ups, kick offs", whatItSolves: "Manual prep taking lots of TAMs time", source: "Ilaria's doc review", status: "To explore" },
      { idea: "Fathom & Claude integration for client journey automation", whatItSolves: "Manual kick-off prep, PM board creation, wash-up prep", source: "Ilaria's doc review", status: "To explore" },
      { idea: "Planhat automated onboarding — welcome materials auto-sent on deal close", whatItSolves: "Sales-to-TAM handover is manual and lossy", source: "OKR rows, Chris", status: "To explore" },
    ],
  },
  {
    label: "Product & Design", key: "product",
    ideas: [
      { idea: "Website ready templates — swap colours/fonts, layout stays fixed", whatItSolves: "TAM setup time per event + organiser website creation", source: "Julia", status: "To explore" },
      { idea: "AI Agent on module setup (registration conditional logic)", whatItSolves: "Complex and un-user-friendly registration pipelines", source: "Shubham", status: "To explore" },
      { idea: "Direct Client Feedback — in-product surveys, NPS", whatItSolves: "Product feedback currently indirect via TAMs", source: "Discovery interviews", status: "To explore", priority: "High" },
      { idea: "Auto-Clone Environment with Smart Defaults for repeat events", whatItSolves: "First-time ~15 days, repeat ~11 days", source: "Discovery", status: "To explore" },
      { idea: "Feature-Based Admin Panel Wizard — organiser selects features, UI adapts", whatItSolves: "~50% of features unused per event but all shown", source: "Rachid", status: "To explore", priority: "High" },
    ],
  },
  {
    label: "Sales & Marketing", key: "sales",
    ideas: [
      { idea: "Sales admin automation", whatItSolves: "Sales team admin burden", source: "Chris meeting", status: "To explore" },
      { idea: "Pipedrive restructure", whatItSolves: "Outdated automations (Maria's 60+ need restructure)", source: "Maria meeting", status: "To explore" },
      { idea: "Auto data export from backend dashboards for analytics", whatItSolves: "TAMs skip washup analytics — manual copy-paste", source: "Maria", status: "To explore" },
      { idea: "AI Generated marketing videos", whatItSolves: "Human needed for all marketing material", source: "Maria", status: "Quick Win" },
      { idea: "Automate outbound sales process", whatItSolves: "Replaces manual Pipedrive follow-ups", source: "Celine", status: "To explore" },
    ],
  },
  {
    label: "Engineering", key: "engineering",
    ideas: [
      { idea: "Legacy Backlog 'Purge' — close tickets >18 months without 90-day update", whatItSolves: "178 bugs from 2022-2024 still open", source: "Bartosz", status: "To explore" },
      { idea: "QA N8N bug context/prioritisation", whatItSolves: "Bug triage time", source: "Bartosz", status: "Live" },
      { idea: "Automated testing framework (Playwright/Cypress)", whatItSolves: "QA runs manual regression 8-15hrs per release cycle", source: "Survey", status: "To explore" },
      { idea: "AI Concierge for Matchmaking — buyer/exhibitor matching", whatItSolves: "Manual matching (core product USP)", source: "AI Days", status: "Unfinished" },
    ],
  },
  {
    label: "HR", key: "hr",
    ideas: [
      { idea: "HR onboarding via Claude Co-Work — browser automation", whatItSolves: "Olga does this manually", source: "Bartosz", status: "Idea only" },
      { idea: "Structured TAM Onboarding & Shadowing Programme", whatItSolves: "Junior TAMs lack structured onboarding, attrition", source: "Sana exit interview", status: "To explore" },
      { idea: "ATS integration or AI-assisted screening & interview coordination", whatItSolves: "Manual screening hours + email scheduling", source: "Survey", status: "To explore" },
      { idea: "Calendar automation for scheduling", whatItSolves: "Manual workload for interview scheduling", source: "Survey", status: "To explore" },
    ],
  },
  {
    label: "Data & Finance", key: "data",
    ideas: [
      { idea: "Automated Bug classification: Production Bug vs Dev Defect", whatItSolves: "Yuriy manually checks Client field", source: "Yuriy", status: "Idea only" },
      { idea: "API-based sync via n8n between billing and reporting", whatItSolves: "Finance ~80% manual reconciliation work", source: "Survey", status: "Idea only" },
    ],
  },
];

const AutomationIdeasPage = () => {
  return (
    <div>
      <PageHeader title="Automation Ideas" description="40+ automation ideas collected across 7 departments — categorised by area" />

      <Tabs defaultValue="tam" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {categories.map((cat) => (
            <TabsTrigger key={cat.key} value={cat.key} className="text-xs">
              {cat.label} ({cat.ideas.length})
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.key} value={cat.key}>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Idea</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-56">What it Solves</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-32">Source</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-24">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-20">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.ideas.map((idea, i) => (
                    <tr key={i} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-3 text-foreground font-medium">{idea.idea}</td>
                      <td className="p-3 text-muted-foreground">{idea.whatItSolves}</td>
                      <td className="p-3 text-muted-foreground">{idea.source}</td>
                      <td className="p-3"><StatusBadge status={idea.status} /></td>
                      <td className="p-3">{idea.priority && <PriorityBadge priority={idea.priority} />}</td>
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
