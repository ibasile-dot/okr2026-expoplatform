import { PageHeader, StatusBadge } from "@/components/DashboardWidgets";
import { Map } from "lucide-react";

const roadmapData = [
  {
    month: "February",
    items: [
      { week: "w/c 16th Feb", kr: "KR1", action: "Analyse automation study results", owner: "Olga, Ilaria", status: "Done" },
      { week: "w/c 16th Feb", kr: "KR1", action: "Validate list of manual tasks with each department", owner: "Ilaria, Julia, Susan", status: "In Progress" },
      { week: "w/c 23rd Feb", kr: "KR1", action: "Discovery: review legacy worklogs, Jira reports, interviews", owner: "Ilaria", status: "Done" },
      { week: "w/c 23rd Feb", kr: "KR1", action: "Identify easy wins and high value automation targets", owner: "Ilaria, Susan, Julia", status: "Done" },
      { week: "w/c 23rd Feb", kr: "KR1", action: "Collect data about current time spent on tasks", owner: "Ilaria, Susan, Julia, Olga, Bartek", status: "In Progress" },
      { week: "w/c 23rd Feb", kr: "KR1", action: "Plan for Automation Days", owner: "Olga, Susan, Bartek, Ilaria", status: "In Progress" },
      { week: "w/c 23rd Feb", kr: "KR2", action: "Discovery: shadow TAMs, interview organisers, Fathom calls", owner: "Ilaria", status: "In Progress" },
      { week: "w/c 23rd Feb", kr: "KR3", action: "Discovery: interviews, Jira, Confluence, TAM boards, tools", owner: "Ilaria", status: "Done" },
      { week: "w/c 23rd Feb", kr: "KR4", action: "Continue building onboarding/training materials", owner: "Julia, Jonathan, Matheus, Josua, Susan", status: "In Progress" },
      { week: "early-mid March", kr: "KR3", action: "Finish migrating customers to support mailbox", owner: "Samarth, Jens, Mykyta, Chris, Oriana, Julia", status: "In Progress" },
      { week: "early-mid March", kr: "KR4", action: "Continue admin panel improvements", owner: "Tanya, Ajay", status: "In Progress" },
    ],
  },
  {
    month: "March",
    items: [
      { week: "19-20 March", kr: "KR1", action: "Execute Automation Days — easy wins", owner: "Olga, Susan, Bartek, Ilaria, Yuriy", status: "To Do" },
      { week: "Mid-late March", kr: "KR1", action: "Reassess & score remaining automation candidates", owner: "Olga, Susan, Bartek, Ilaria", status: "To Do" },
      { week: "Mid-late March", kr: "KR2", action: "Collect baseline data on effort for stages & tasks", owner: "Ilaria, Yuriy", status: "In Progress" },
      { week: "w/c March 2", kr: "KR3", action: "TAM survey: recurring bugs, workarounds, problem areas", owner: "Susan, Olga", status: "To Do" },
      { week: "w/c March 9", kr: "KR3", action: "Analyse survey results", owner: "Susan, Julia, Bartek, Ajay", status: "To Do" },
      { week: "w/c March 9", kr: "KR3", action: "Jira Theme Analysis with Rovo agent", owner: "Susan, Ilaria", status: "In Progress" },
      { week: "w/c March 9", kr: "KR3", action: "Notion/ClickUp/Trello AI for theme identification", owner: "Susan, Ilaria, TAMs", status: "In Progress" },
      { week: "w/c March 16", kr: "KR3", action: "Formulate action plan from survey + Rovo analysis", owner: "Susan, Ilaria, TAM Leads", status: "In Progress" },
      { week: "March", kr: "KR4", action: "Collect baseline data about current time spent", owner: "Ilaria, Yuriy", status: "To Do" },
      { week: "March", kr: "KR5", action: "Collect baseline data & conduct survey", owner: "Susan, Bartek, Yuriy", status: "To Do" },
    ],
  },
  {
    month: "April",
    items: [
      { week: "w/c 1st April", kr: "KR1", action: "Determine next steps based on analysis", owner: "Susan, Bartek, Ilaria", status: "To Do" },
      { week: "Early-mid April", kr: "KR2", action: "Identify quick wins & longer-term opportunities", owner: "Ilaria, Susan", status: "To Do" },
      { week: "Mid-late April", kr: "KR2", action: "Execute on quick wins", owner: "Ilaria, Susan, Bartek", status: "To Do" },
      { week: "April", kr: "KR2", action: "Planhat automated workflows with how-to guides", owner: "Susan, TAM Leads", status: "To Do" },
      { week: "Early-mid April", kr: "KR4", action: "Identify quick wins (trainings setup)", owner: "Ilaria, Susan", status: "To Do" },
      { week: "Mid-late April", kr: "KR4", action: "Execute quick wins", owner: "Ilaria, Susan, Bartek", status: "To Do" },
      { week: "April", kr: "KR4", action: "Planhat automated onboarding workflows", owner: "Susan, TAM Leads", status: "To Do" },
      { week: "Early-mid April", kr: "KR5", action: "Identify quick wins & longer-term opportunities", owner: "Susan, Bartek, Yuriy", status: "To Do" },
    ],
  },
  {
    month: "May",
    items: [
      { week: "May", kr: "KR2", action: "Collect data on effort reductions from quick wins", owner: "Ilaria, Yuriy", status: "To Do" },
      { week: "May", kr: "KR2", action: "Analyse & prioritise longer-term opportunities", owner: "Ilaria, Susan", status: "To Do" },
      { week: "May", kr: "KR4", action: "Collect data on time reduction from quick wins", owner: "Ilaria, Yuriy", status: "To Do" },
      { week: "May", kr: "KR5", action: "Collect data on effort reductions", owner: "Bartek, Yuriy", status: "To Do" },
    ],
  },
];

const krColors: Record<string, string> = {
  KR1: "bg-primary/10 text-primary",
  KR2: "bg-info/10 text-info",
  KR3: "bg-warning/10 text-warning",
  KR4: "bg-success/10 text-success",
  KR5: "bg-destructive/10 text-destructive",
};

const RoadmapPage = () => {
  return (
    <div>
      <PageHeader title="Implementation Roadmap" description="OKR4 monthly action plan — February to May 2026 and beyond" />

      <div className="space-y-8">
        {roadmapData.map((month) => (
          <div key={month.month}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Map className="w-4 h-4 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{month.month} 2026</h2>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground w-28">Week</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-16">KR</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Action</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-40">Owner</th>
                    <th className="text-left p-3 font-medium text-muted-foreground w-24">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {month.items.map((item, i) => (
                    <tr key={i} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="p-3 text-muted-foreground font-mono">{item.week}</td>
                      <td className="p-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${krColors[item.kr] || ""}`}>{item.kr}</span>
                      </td>
                      <td className="p-3 text-foreground font-medium">{item.action}</td>
                      <td className="p-3 text-muted-foreground">{item.owner}</td>
                      <td className="p-3"><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
