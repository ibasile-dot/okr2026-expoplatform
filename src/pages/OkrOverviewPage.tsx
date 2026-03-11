import { useNavigate } from "react-router-dom";
import { okrData } from "@/data/okrData";

const OkrOverviewPage = () => {
  const navigate = useNavigate();

  const totalKRs = okrData.reduce((sum, okr) => sum + okr.keyResults.length, 0);
  const onTrackKRs = okrData.reduce(
    (sum, okr) => sum + okr.keyResults.filter((kr) => kr.status === "on-track").length,
    0
  );
  const overallProgress = totalKRs > 0 ? Math.round((onTrackKRs / totalKRs) * 100) : 0;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ExpoPlatform OKRs 2026</h1>
        <p className="text-sm text-muted-foreground mt-1">Overall Progress Tracking and Strategic Initiatives</p>
      </div>

      {/* Overall Progress Card */}
      <div className="section-card p-6 mb-8">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Overall Progress</h2>
          <span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide bg-accent text-accent-foreground">
            {overallProgress}%
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-accent transition-all duration-700"
            style={{ width: `${Math.max(overallProgress, 2)}%` }}
          />
        </div>
        <p className="text-xs font-semibold text-muted-foreground">
          Combined progress across all OKRs
        </p>
      </div>

      {/* OKR Portfolio */}
      <h2 className="text-xl font-semibold text-foreground mb-5">OKR Portfolio</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {okrData.map((okr) => {
          const onTrack = okr.keyResults.filter((kr) => kr.status === "on-track").length;
          const total = okr.keyResults.length;
          const progressPct = total > 0 ? Math.round((onTrack / total) * 100) : 0;

          return (
            <div
              key={okr.id}
              className="section-card p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/okr/${okr.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0"
                  style={{ background: okr.color }}
                >
                  {okr.id}
                </span>
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2">{okr.shortTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{okr.objective}</p>

              <div className="text-xs text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">Owner:</span> {okr.owners[0]}
                {okr.owners[1] && (
                  <>
                    {" "}| <span className="font-semibold text-foreground">Co-owner:</span> {okr.owners[1]}
                  </>
                )}
              </div>

              <div className="text-[13px] font-medium text-muted-foreground mb-4">
                {total} Key Results
              </div>

              <div className="mt-auto">
                <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${Math.max(progressPct, 2)}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">{progressPct}%</p>
              </div>

              <button
                className="self-start mt-4 px-4 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded hover:opacity-90 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/okr/${okr.id}`);
                }}
              >
                View OKR
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OkrOverviewPage;
