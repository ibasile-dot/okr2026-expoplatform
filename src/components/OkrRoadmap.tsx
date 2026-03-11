import { useMemo } from "react";
import { roadmapData } from "@/data/roadmapData";
import { EditableCell } from "@/components/EditableCell";
import { useMetricValues } from "@/hooks/useMetricValues";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  "Done": "bg-success/15 text-success border-success/30",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  "To Do": "bg-muted text-muted-foreground border-border",
};

const okrBadgeColors: Record<number, string> = {
  1: "bg-[hsl(237,68%,33%)]/15 text-[hsl(237,68%,33%)] border-[hsl(237,68%,33%)]/30",
  2: "bg-[hsl(44,100%,58%)]/15 text-[hsl(44,100%,40%)] border-[hsl(44,100%,58%)]/30",
  3: "bg-[hsl(152,60%,40%)]/15 text-[hsl(152,60%,40%)] border-[hsl(152,60%,40%)]/30",
  4: "bg-[hsl(200,60%,45%)]/15 text-[hsl(200,60%,45%)] border-[hsl(200,60%,45%)]/30",
  5: "bg-[hsl(280,50%,50%)]/15 text-[hsl(280,50%,50%)] border-[hsl(280,50%,50%)]/30",
};

const thClass = "text-left p-3 font-semibold text-foreground whitespace-nowrap text-xs";
const tdClass = "p-3 text-sm border-b border-border";

const OkrRoadmap = () => {
  // Use kr_number=0 as convention for roadmap data
  const { getValue, saveValue } = useMetricValues(4, 0);

  const getStatus = (rowIdx: number, defaultStatus: string) => {
    const saved = getValue(rowIdx, "roadmap_status");
    return saved || defaultStatus;
  };

  const getNotes = (rowIdx: number, defaultNotes: string) => {
    const saved = getValue(rowIdx, "roadmap_notes");
    return saved || defaultNotes;
  };

  const stats = useMemo(() => {
    const total = roadmapData.length;
    const done = roadmapData.filter((_, idx) => getStatus(idx, roadmapData[idx].defaultStatus) === "Done").length;
    const inProgress = roadmapData.filter((_, idx) => getStatus(idx, roadmapData[idx].defaultStatus) === "In Progress").length;
    const toDo = total - done - inProgress;
    return { total, done, inProgress, toDo, percent: Math.round((done / total) * 100) };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValue]);

  // Group by month for visual separation
  let lastMonth = "";

  return (
    <div className="section-card p-6 space-y-6">
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Implementation Roadmap</h2>
          <span className="text-sm font-medium text-muted-foreground">
            {stats.done} / {stats.total} tasks completed
          </span>
        </div>
        <Progress value={stats.percent} className="h-3" />
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-muted-foreground">Done ({stats.done})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-muted-foreground">In Progress ({stats.inProgress})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
            <span className="text-muted-foreground">To Do ({stats.toDo})</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50 border-b-2 border-border">
              <th className={thClass}>Month</th>
              <th className={thClass}>Week</th>
              <th className={thClass}>KR</th>
              <th className={`${thClass} min-w-[250px]`}>Action</th>
              <th className={thClass}>Owner</th>
              <th className={`${thClass} min-w-[120px]`}>Status</th>
              <th className={`${thClass} min-w-[180px]`}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {roadmapData.map((item, idx) => {
              const showMonth = item.month !== lastMonth;
              lastMonth = item.month;
              const status = getStatus(idx, item.defaultStatus);

              return (
                <tr
                  key={item.id}
                  className={`border-b border-border hover:bg-secondary/30 ${showMonth ? "border-t-2 border-t-border" : ""}`}
                >
                  <td className={`${tdClass} font-medium ${showMonth ? "" : "text-transparent select-none"}`}>
                    {item.month}
                  </td>
                  <td className={`${tdClass} text-muted-foreground text-xs`}>{item.week || "—"}</td>
                  <td className={tdClass}>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 ${okrBadgeColors[item.okr] || ""}`}>
                      KR{item.okr}
                    </Badge>
                  </td>
                  <td className={tdClass}>
                    <div>
                      <span className="text-foreground">{item.action}</span>
                      {item.subactions && (
                        <p className="text-xs text-muted-foreground mt-1">{item.subactions}</p>
                      )}
                    </div>
                  </td>
                  <td className={`${tdClass} text-xs text-muted-foreground`}>{item.owner}</td>
                  <EditableCell
                    value={status}
                    onSave={(v) => saveValue(idx, "roadmap_status", v)}
                    className={tdClass}
                    placeholder="Set status..."
                  />
                  <EditableCell
                    value={getNotes(idx, item.defaultNotes)}
                    onSave={(v) => saveValue(idx, "roadmap_notes", v)}
                    className={tdClass}
                    placeholder="Add notes..."
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OkrRoadmap;
