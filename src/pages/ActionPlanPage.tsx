import { PageHeader, SectionTitle } from "@/components/DashboardWidgets";

const phases = [
  {
    phase: 1,
    title: "TAM Team — Admin Panel Focus",
    timing: "Now → Next 6 weeks",
    rationale: "The admin panel is the #1 bottleneck (30–40% of TAM time). Solving this first unlocks the most capacity.",
    streams: [
      {
        name: "Back-end Configuration",
        actions: [
          "Explore API options with Pedro (API team) — scheduled next week",
          "Investigate AI agent for admin panel configuration (registration, matchmaking, API setup)",
          "Audit 64 manual config steps — identify which can be automated or templated",
          "Auto-clone environment with smart defaults for repeat events",
        ],
      },
      {
        name: "Front-end — Website Builder",
        actions: [
          "Evaluate ready-made website templates (swap colours/fonts, fixed layout)",
          "Reduce reliance on custom CSS/JavaScript by TAMs",
          "Standardise block configuration and theme setup",
        ],
      },
      {
        name: "App Submission",
        actions: [
          "Automate Android questionnaire pre-fill (quick win: 1.5hrs saved per event)",
          "Standardise app submission checklist",
        ],
      },
      {
        name: "App Builder",
        actions: [
          "Address 44% bug-time on mobile team (target: 30%)",
          "Feature-based admin panel wizard — show only relevant features per event type",
        ],
      },
      {
        name: "Support Tickets",
        actions: [
          "JSM AI triage for neutral sentiment tickets",
          "Self-serve content for top 6 ticket themes (login, exhibitor, registration, CSS, mobile app, lead retrieval)",
        ],
      },
    ],
  },
  {
    phase: 2,
    title: "Quick Wins & Cross-team Efficiency",
    timing: "Parallel + rolling",
    rationale: "Smaller, high-ROI improvements that can run alongside Phase 1. Build momentum and demonstrate value.",
    streams: [
      {
        name: "Automation Days",
        actions: [
          "19–20 March execution with Olga, Susan, Bartek, Yuriy",
          "Execute identified easy wins from workaround catalogue",
          "Document outcomes and time savings",
        ],
      },
      {
        name: "HR Team Support",
        actions: [
          "HR onboarding automation (Claude Co-Work / browser automation)",
          "ATS integration or AI-assisted screening",
          "Calendar automation for interview scheduling",
        ],
      },
      {
        name: "Internal Tools",
        actions: [
          "Claude-powered workloads tracker — iterate on existing tool",
          "Showcase meeting format and cadence",
          "Create newsletter (including videos and implementation updates)",
        ],
      },
      {
        name: "Engineering Quick Wins",
        actions: [
          "Legacy backlog purge — close 178 ghost bugs from 2022–2024",
          "Jira Team field enforcement (400–500 hrs/month recovery)",
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Second Priorities",
    timing: "After Phase 1 core bottlenecks resolved",
    rationale: "Important but not urgent. These are non-bottleneck improvements to pursue once the key constraints are addressed.",
    streams: [
      {
        name: "Sales Team",
        actions: [
          "Sales admin automation (Chris confirmed 'very manual' — no data yet)",
          "Pipedrive restructure (Maria's 60+ automations need overhaul)",
          "Automate outbound sales process",
        ],
      },
      {
        name: "Marketing",
        actions: [
          "AI-generated marketing videos (quick win)",
          "Auto data export from backend dashboards",
        ],
      },
      {
        name: "Finance",
        actions: [
          "API-based sync via n8n between billing and reporting (~80% manual)",
        ],
      },
      {
        name: "Product Improvements",
        actions: [
          "Direct client feedback — in-product surveys, NPS",
          "Planhat automated onboarding — welcome materials on deal close",
        ],
      },
    ],
  },
];

const ActionPlanPage = () => {
  return (
    <div>
      <PageHeader
        title="Action Plan"
        description="Phased plan based on priority. Solve the biggest bottlenecks first, then expand."
      />

      <div className="space-y-12">
        {phases.map((phase) => (
          <div key={phase.phase}>
            <div className="flex items-center gap-3 mb-2">
              <div className="phase-indicator">{phase.phase}</div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{phase.title}</h2>
                <p className="text-xs text-muted-foreground">{phase.timing}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-6 ml-10">{phase.rationale}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
              {phase.streams.map((stream) => (
                <div key={stream.name} className="section-card p-5">
                  <h3 className="text-xs font-bold text-foreground mb-3">{stream.name}</h3>
                  <ul className="space-y-2">
                    {stream.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-foreground mt-1.5 shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionPlanPage;
