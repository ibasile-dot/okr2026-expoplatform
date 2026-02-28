import { PageHeader, SectionTitle, StatCard } from "@/components/DashboardWidgets";

const bottlenecks = [
  {
    rank: 1,
    area: "Admin Panel Setup & Configuration",
    impact: "30–40% of TAM time",
    validation: "9 out of 10 data sources",
    details: "64 manual steps per event. First-time builds 36% slower. No feature-based wizard — all options shown regardless of event type. TAMs resort to ChatGPT + CSS repos.",
    subAreas: [
      { name: "Website Builder (Back-end)", desc: "Custom CSS, block config, theme setup. No ready-made templates." },
      { name: "App Submission", desc: "1.5hrs per event. Lengthy Android questionnaire with precise multi-select answers." },
      { name: "App Builder", desc: "44% of mobile team time on bugs. Heavy maintenance overhead." },
    ],
  },
  {
    rank: 2,
    area: "Repetitive Manual Admin Tasks",
    impact: "Hours per day (cumulative)",
    validation: "8 out of 10 data sources",
    details: "Event cloning with manual reconfiguration. Registration pipeline setup is complex and un-user-friendly. Exhibitor and booth setup requires extensive manual config.",
  },
  {
    rank: 3,
    area: "Manual Integration Workarounds",
    impact: "1,044 hours logged",
    validation: "7 out of 10 data sources",
    details: "No native 3rd-party integrations. TAMs build individual API scripts. Self-funded tools (Cursor AI, Postman) used to bypass queues.",
  },
  {
    rank: 4,
    area: "Fragmented Tools & Coordination",
    impact: "5–7 tools per TAM",
    validation: "7 out of 10 data sources",
    details: "No unified view across tools. Customer history in TAMs' heads. Manual data cross-referencing between systems.",
  },
  {
    rank: 5,
    area: "Client Comms & Training",
    impact: "15–20% of TAM time",
    validation: "6 out of 10 data sources",
    details: "72% of repeated questions addressable via self-serve. 30–40% of live training is troubleshooting. 100/300 needed videos created.",
  },
  {
    rank: 6,
    area: "Analytics & Reporting",
    impact: "~10% of TAM time",
    validation: "5 out of 10 data sources",
    details: "TAMs skip washup analytics due to manual copy-paste. No automated data export from backend dashboards.",
  },
  {
    rank: 7,
    area: "Knowledge Siloing",
    impact: "Cross-cutting",
    validation: "6 out of 10 data sources",
    details: "Returning customer context lost on TAM change. Self-taught API skills. No knowledge base across teams.",
  },
];

const BottlenecksPage = () => {
  return (
    <div>
      <PageHeader
        title="Key Bottlenecks"
        description="Ranked list of operational bottlenecks by impact. Focus on the TAM team first, then expand."
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <StatCard label="No. 1 Bottleneck" value="Admin Panel" detail="Consumes 30–40% of TAM time" />
        <StatCard label="Data Sources Used" value="10" detail="Surveys, Jira, interviews, Fathom, observation" />
        <StatCard label="Focus First" value="TAM Team" detail="Then quick wins, then wider departments" />
      </div>

      {/* Bottleneck Cards */}
      <SectionTitle>Bottlenecks — Ranked by Impact</SectionTitle>
      <div className="space-y-4">
        {bottlenecks.map((b) => (
          <div key={b.rank} className="section-card p-6">
            <div className="flex items-start gap-4">
              <div className="phase-indicator shrink-0">{b.rank}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-foreground">{b.area}</h3>
                  <span className="tag-dark shrink-0 ml-3">{b.impact}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2">Validated by {b.validation}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.details}</p>

                {b.subAreas && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {b.subAreas.map((sub) => (
                      <div key={sub.name} className="bg-secondary rounded-md p-3">
                        <p className="text-[11px] font-semibold text-foreground mb-1">{sub.name}</p>
                        <p className="text-[11px] text-muted-foreground">{sub.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottlenecksPage;
