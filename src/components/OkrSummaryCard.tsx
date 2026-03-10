import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { OKR } from "@/data/okrData";

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

export const OkrSummaryCard = ({ okr }: { okr: OKR }) => {
  const navigate = useNavigate();
  const onTrack = okr.keyResults.filter((kr) => kr.status === "on-track").length;
  const atRisk = okr.keyResults.filter((kr) => kr.status === "at-risk").length;
  const total = okr.keyResults.length;
  const progressPct = total > 0 ? Math.round((onTrack / total) * 100) : 0;

  return (
    <div
      className="section-card p-5 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => {
        if (okr.id === 4) navigate("/okr/4/overview");
        else navigate(`/okr/${okr.id}`);
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0"
              style={{ background: okr.color }}
            >
              {okr.id}
            </span>
            <h3 className="text-sm font-bold text-foreground truncate">{okr.title}</h3>
          </div>

          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{okr.objective}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-success transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">{progressPct}%</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {onTrack > 0 && (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border ${statusColors["on-track"]}`}>
                {onTrack} On Track
              </span>
            )}
            {atRisk > 0 && (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border ${statusColors["at-risk"]}`}>
                {atRisk} At Risk
              </span>
            )}
            {total - onTrack - atRisk > 0 && (
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border ${statusColors["not-started"]}`}>
                {total - onTrack - atRisk} Not Started
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <p className="text-[10px] text-muted-foreground">
              Owners: <span className="font-medium text-foreground">{okr.owners.join(", ")}</span>
            </p>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1" />
      </div>

      {/* Key Results preview */}
      <div className="mt-4 pt-3 border-t border-border space-y-1.5">
        {okr.keyResults.map((kr) => (
          <div key={kr.id} className="flex items-start gap-2 text-[11px]">
            <span className="font-mono text-muted-foreground w-4 shrink-0 text-right">
              {kr.number}
            </span>
            <span className="text-foreground flex-1">{kr.description}</span>
            <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-medium rounded border shrink-0 ${statusColors[kr.status]}`}>
              {statusLabels[kr.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
