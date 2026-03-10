import { useParams } from "react-router-dom";
import { okrData } from "@/data/okrData";
import { PageHeader } from "@/components/DashboardWidgets";

const statusColors: Record<string, string> = {
  "on-track": "bg-success/15 text-success border-success/30",
  "at-risk": "bg-warning/15 text-warning border-warning/30",
  "behind": "bg-destructive/15 text-destructive border-destructive/30",
  "not-started": "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  "behind": "Behind",
  "not-started": "Not Started",
};

const OkrPlaceholderPage = () => {
  const { okrId } = useParams();
  const okr = okrData.find((o) => o.id === Number(okrId));

  if (!okr) return <div className="p-8">OKR not found</div>;

  return (
    <div>
      <PageHeader title={okr.title} description={okr.objective} />

      <div className="section-card p-5 mb-6">
        <p className="stat-label mb-1">Owners</p>
        <p className="text-sm font-medium text-foreground">{okr.owners.join(", ")}</p>
        <p className="text-xs text-muted-foreground mt-2 italic">"{okr.whyItMatters}"</p>
      </div>

      <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-primary/60 mb-4">Key Results</h2>
      <div className="space-y-3">
        {okr.keyResults.map((kr) => (
          <div key={kr.id} className="section-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <span className="phase-indicator w-6 h-6 text-[10px]">{kr.number}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">{kr.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Target: {kr.target}</p>
                  {kr.q1 && <p className="text-[10px] text-success mt-1">Q1: {kr.q1}</p>}
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border shrink-0 ${statusColors[kr.status]}`}>
                {statusLabels[kr.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OkrPlaceholderPage;
