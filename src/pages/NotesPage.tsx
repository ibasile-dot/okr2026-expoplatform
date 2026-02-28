import { PageHeader } from "@/components/DashboardWidgets";
import { FileText, CalendarDays, ArrowRight, MessageSquare } from "lucide-react";

const nextSteps = [
  {
    title: "Call with Pedro — API Team",
    date: "Next week",
    description: "Discuss HR automation options and AI agent for admin panel. Explore what's possible with the API for automating manual admin panel tasks.",
    tags: ["HR Automation", "AI Agent", "Admin Panel", "API"],
  },
  {
    title: "Automation Days Execution",
    date: "19-20 March 2026",
    description: "Execute identified easy wins with Olga, Susan, Bartek, and Yuriy. Focus on quick wins from the workaround catalogue.",
    tags: ["Quick Wins", "Execution", "Cross-team"],
  },
  {
    title: "TAM Survey — Recurring Issues",
    date: "w/c March 2, 2026",
    description: "Survey around bugs that keep recurring, problematic platform areas, workarounds, and internal process gaps contributing to support tickets.",
    tags: ["Survey", "Data Collection", "TAMs"],
  },
  {
    title: "Rovo Theme Analysis",
    date: "w/c March 9, 2026",
    description: "Use Jira Theme Analysis Rovo agent + Notion/ClickUp/Trello AI to identify common themes and questions across customer boards.",
    tags: ["AI Analysis", "Jira", "Theme Identification"],
  },
  {
    title: "Action Plan Formulation",
    date: "w/c March 16, 2026",
    description: "Based on survey results and Rovo analysis, formulate an action plan. Document top 5 most frequent manual workarounds ranked by ROI.",
    tags: ["Planning", "ROI Analysis", "Prioritisation"],
  },
];

const keyFindings = [
  { category: "Primary Constraint", finding: "Admin Panel Setup = 30-40% of TAM time. 64 manual config steps per event. First-time builds 36% more effort (15 vs 11 days)." },
  { category: "Ticket Insights", finding: "40% of JSM tickets map to admin panel (login 19.3%, exhibitor 15.9%, registration 4.5%, CSS 2.3%). 254 tickets/month in Jan-Feb 2026." },
  { category: "Integration Pain", finding: "1,044h total in worklogs for integrations. No native integrations with common 3rd-party systems. TAMs individually build siloed scripts." },
  { category: "Onboarding Gap", finding: "72% of repeated questions addressable via self-serve content. 30-40% of live training = troubleshooting & re-explaining." },
  { category: "Engineering Waste", finding: "400-500 hrs/month lost without Team field on Jira. Mobile team at 44% bug time (healthy = 30%). 178 ghost bugs from 2022-2024." },
  { category: "Knowledge Loss", finding: "Returning customer history in TAMs' heads, not systems. TAMs self-teach API skills. 5-7 different tools per TAM with no unified view." },
  { category: "Quick Wins Identified", finding: "Claude time tracking (5-10 min/day saved), app store submission automation (1.5hrs), OTP login bypass fix, Jira automation for bug classification." },
  { category: "Training Gap", finding: "100 of 300 needed how-to videos created. Training quality varies by TAM/Region. No role-based learning paths." },
];

const meetingNotes = [
  { person: "Samarth Garg", role: "TAM (Middle East/West)", keyInsights: "Manages Middle East & West region. Large region including Africa, Asia, Oceanic. Main clients in Middle East due to pricing. >3 years at EP." },
  { person: "Julia", role: "Americas TAM Lead", keyInsights: "Team uses just 3 tools: kickoff PPT, ClickUp, wash-up PPT. Created 100 how-to videos on a Saturday. No project tracker beyond ClickUp." },
  { person: "Rachid", role: "DXB Live TAM", keyInsights: "Self-funds Cursor AI to bypass engineering queue. Admin panel 'overwhelming'. ~50% features unused per event but all shown." },
  { person: "Pavel", role: "Regional OM", keyInsights: "Built Azure→Jira automation with Claude. Bug transcription takes 5-10hrs for 10-30 bugs per project. Created Claude time tracking tool." },
  { person: "Sana", role: "Europe TAM (Exit Interview)", keyInsights: "Junior TAMs lack structured onboarding. Technical-only training, no client comms framework. No team lead for extended period → lost confidence." },
];

const NotesPage = () => {
  return (
    <div>
      <PageHeader title="Notes & Next Steps" description="Key findings, upcoming actions, and meeting insights" />

      {/* Next Steps */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          Upcoming Actions
        </h2>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-primary" />
                  {step.title}
                </h3>
                <span className="text-xs font-mono text-primary shrink-0">{step.date}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 pl-5">{step.description}</p>
              <div className="flex flex-wrap gap-1.5 pl-5">
                {step.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Findings */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Key Findings Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {keyFindings.map((f, i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <p className="text-xs font-bold text-primary mb-1.5">{f.category}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.finding}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Notes */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Key Meeting Insights
        </h2>
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground w-32">Person</th>
                <th className="text-left p-3 font-medium text-muted-foreground w-36">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Key Insights</th>
              </tr>
            </thead>
            <tbody>
              {meetingNotes.map((n, i) => (
                <tr key={i} className="border-t border-border/50">
                  <td className="p-3 font-medium text-foreground">{n.person}</td>
                  <td className="p-3 text-muted-foreground">{n.role}</td>
                  <td className="p-3 text-muted-foreground">{n.keyInsights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
