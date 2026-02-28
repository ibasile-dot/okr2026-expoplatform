import { PageHeader, ProgressBar, StatusBadge } from "@/components/DashboardWidgets";
import { Target } from "lucide-react";

const krData = [
  {
    id: "KR1", title: "Reduce manual process time by ≥50% per department", progress: 25,
    departments: [
      { name: "TAMs", measurement: "Jira worklogs + survey", status: "In Progress", result: "Admin panel 30-40% time, Client comms 15-20%, Troubleshooting 10-15%" },
      { name: "Finance", measurement: "Email/Survey", status: "In Progress", result: "~80% manual workload" },
      { name: "HR", measurement: "Email/Survey", status: "In Progress", result: "~77% manual workload" },
      { name: "Marketing", measurement: "Email/Survey", status: "In Progress", result: "~66% manual. Maria has 60+ automations needing restructure" },
      { name: "Sales", measurement: "Email/Survey", status: "In Progress", result: "Chris confirmed 'very manual' but no data exists" },
      { name: "Engineering", measurement: "Jira worklogs + survey", status: "In Progress", result: "~42% manual. 400-500 hrs/month lost due to missing Team field" },
    ],
  },
  {
    id: "KR2", title: "Reduce event setup effort by ≥40% for organisers", progress: 15,
    departments: [
      { name: "TAMs/Clients", measurement: "Fathom call analysis", status: "In Progress", result: "Complex: 15-23hrs | Medium: 12-18hrs | Small: 6-9hrs total training" },
      { name: "Product", measurement: "Admin panel usage logs", status: "Not Started", result: "Early 2027 in Product Roadmap. PRIMARY CONSTRAINT" },
      { name: "Operations", measurement: "Ilaria admin panel test", status: "In Progress", result: "1hr 15mins with little results (26 Feb)" },
    ],
  },
  {
    id: "KR3", title: "Decrease support tickets by ≥30%", progress: 10,
    departments: [
      { name: "TAMs/Clients", measurement: "Jira Service Management", status: "Done", result: "2025 avg: 164/month (18.2/event). Jan-Feb 2026: 254/month (28.2/event)" },
    ],
    note: "JSM adoption still increasing — tickets will likely rise before decreasing",
    topThemes: ["Login/password reset", "Mobile app build/config", "Exhibitor/booth setup", "CSS/Branding customisation", "Registration/Badge config", "Lead retrieval/integration"],
  },
  {
    id: "KR4", title: "Reduce onboarding time by ≥35%", progress: 20,
    departments: [
      { name: "TAMs/Clients", measurement: "Fathom call analysis", status: "Done", result: "6 friction points, 5 time sinks, 8 recurring questions. 72% addressable via self-serve content" },
      { name: "Operations", measurement: "Ilaria first-hand test", status: "In Progress", result: "Testing full setup as organiser" },
    ],
  },
  {
    id: "KR5", title: "Engineering maintenance reduced by ≥25%", progress: 10,
    departments: [
      { name: "Engineering", measurement: "Jira team field enforcement", status: "In Progress", result: "126 tasks without Team field; 650.48h non-attributed time" },
      { name: "Engineering", measurement: "Bug vs non-bug ratio", status: "In Progress", result: "Mobile: 44% bug time (Jan 2026). Yuriy considers 30% healthy" },
    ],
  },
];

const KeyResultsPage = () => {
  return (
    <div>
      <PageHeader title="Key Results — Detail View" description="Track progress across all 5 Key Results with department-level breakdowns" />

      <div className="space-y-6">
        {krData.map((kr) => (
          <div key={kr.id} className="glass-card rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary-foreground">{kr.id}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-foreground">{kr.title}</h2>
                <ProgressBar value={kr.progress} className="mt-2" />
              </div>
            </div>

            {kr.note && (
              <div className="mb-4 p-3 rounded-lg bg-warning/5 border border-warning/20">
                <p className="text-xs text-warning font-medium">⚠️ {kr.note}</p>
              </div>
            )}

            {kr.topThemes && (
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Top Ticket Themes:</p>
                <div className="flex flex-wrap gap-1.5">
                  {kr.topThemes.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Department</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Measurement</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Results</th>
                  </tr>
                </thead>
                <tbody>
                  {kr.departments.map((d, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2.5 font-medium text-foreground">{d.name}</td>
                      <td className="py-2.5 text-muted-foreground">{d.measurement}</td>
                      <td className="py-2.5"><StatusBadge status={d.status} /></td>
                      <td className="py-2.5 text-muted-foreground max-w-xs">{d.result}</td>
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

export default KeyResultsPage;
