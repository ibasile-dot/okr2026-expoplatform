import { useState, useMemo } from "react";
import { roadmapData } from "@/data/roadmapData";
import { EditableCell } from "@/components/EditableCell";
import { useMetricValues } from "@/hooks/useMetricValues";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusOptions = ["Done", "In Progress", "To Do", "Blocked"] as const;

const statusBadgeClass: Record<string, string> = {
  "Done": "bg-success/15 text-success border-success/30",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  "To Do": "bg-secondary text-muted-foreground border-border",
  "Blocked": "bg-destructive/15 text-destructive border-destructive/30",
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

const uniqueKrs = [...new Set(roadmapData.map((r) => r.okr))].sort();
const uniqueMonths = [...new Set(roadmapData.map((r) => r.month))];

const OkrRoadmap = () => {
  const [krFilter, setKrFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const { getValue, saveValue } = useMetricValues(4, 0);

  const getStatus = (rowIdx: number, defaultStatus: string) => {
    const saved = getValue(rowIdx, "roadmap_status");
    return saved || defaultStatus;
  };

  const getNotes = (rowIdx: number, defaultNotes: string) => {
    const saved = getValue(rowIdx, "roadmap_notes");
    return saved || defaultNotes;
  };

  const filteredData = useMemo(() => {
    return roadmapData.map((item, idx) => ({ item, idx })).filter(({ item }) =>
      (krFilter === "all" || item.okr === Number(krFilter)) &&
      (monthFilter === "all" || item.month === monthFilter)
    );
  }, [krFilter, monthFilter]);

  const stats = useMemo(() => {
    const items = filteredData;
    const total = items.length;
    const done = items.filter(({ idx, item }) => getStatus(idx, item.defaultStatus) === "Done").length;
    const inProgress = items.filter(({ idx, item }) => getStatus(idx, item.defaultStatus) === "In Progress").length;
    const blocked = items.filter(({ idx, item }) => getStatus(idx, item.defaultStatus) === "Blocked").length;
    const toDo = total - done - inProgress - blocked;
    return { total, done, inProgress, toDo, blocked, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValue, filteredData]);

  let lastMonth = "";

  return (
    <div className="section-card p-6 space-y-6">
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-foreground">Implementation Roadmap</h2>
          <div className="flex items-center gap-3">
            <Select value={monthFilter} onValueChange={setMonthFilter}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Filter by Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {uniqueMonths.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={krFilter} onValueChange={setKrFilter}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Filter by KR" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All KRs</SelectItem>
                {uniqueKrs.map((kr) => (
                  <SelectItem key={kr} value={String(kr)}>KR{kr}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm font-medium text-muted-foreground">
              {stats.done} / {stats.total} completed
            </span>
          </div>
        </div>
        <Progress value={stats.percent} className="h-3" />
        <div className="flex gap-4 text-xs flex-wrap">
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
          {stats.blocked > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Blocked ({stats.blocked})</span>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50 border-b-2 border-border">
              <th className={thClass}>Month</th>
              <th className={thClass}>KR</th>
              <th className={`${thClass} min-w-[250px]`}>Action</th>
              <th className={thClass}>Owner</th>
              <th className={`${thClass} min-w-[130px]`}>Status</th>
              <th className={`${thClass} min-w-[180px]`}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ item, idx }) => {
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
                  <td className={tdClass}>
                    <Select
                      value={status}
                      onValueChange={(v) => saveValue(idx, "roadmap_status", v)}
                    >
                      <SelectTrigger className={`h-7 text-xs border rounded-md px-2 ${statusBadgeClass[status] || ""}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${
                                s === "Done" ? "bg-success" :
                                s === "In Progress" ? "bg-warning" :
                                s === "Blocked" ? "bg-destructive" :
                                "bg-muted-foreground/40"
                              }`} />
                              {s}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
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
