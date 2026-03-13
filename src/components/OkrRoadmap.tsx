import { useState, useMemo, useEffect, useCallback } from "react";
import { roadmapData } from "@/data/roadmapData";
import { EditableCell } from "@/components/EditableCell";
import { useMetricValues } from "@/hooks/useMetricValues";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const CUSTOM_KR = 50; // kr_number used for custom roadmap rows

interface CustomRow {
  _idx: number;
  month: string;
  kr: string;
  action: string;
  owner: string;
  status: string;
  notes: string;
}

const OkrRoadmap = ({ readOnly = false }: { readOnly?: boolean }) => {
  const [krFilter, setKrFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const { getValue, saveValue } = useMetricValues(4, 0);

  // Custom rows from DB
  const [customRows, setCustomRows] = useState<CustomRow[]>([]);
  const [customLoaded, setCustomLoaded] = useState(false);

  const fetchCustomRows = useCallback(async () => {
    const { data } = await supabase
      .from("okr_metric_values")
      .select("row_index, column_key, value")
      .eq("okr_number", 4)
      .eq("kr_number", CUSTOM_KR)
      .order("row_index", { ascending: true });

    if (data) {
      const map: Record<number, Record<string, string>> = {};
      data.forEach((d) => {
        if (!map[d.row_index]) map[d.row_index] = {};
        map[d.row_index][d.column_key] = d.value;
      });
      const rows: CustomRow[] = Object.entries(map)
        .filter(([, vals]) => !vals._deleted)
        .map(([idx, vals]) => ({
          _idx: Number(idx),
          month: vals.month || "",
          kr: vals.kr || "",
          action: vals.action || "",
          owner: vals.owner || "",
          status: vals.status || "To Do",
          notes: vals.notes || "",
        }));
      setCustomRows(rows);
    }
    setCustomLoaded(true);
  }, []);

  useEffect(() => { fetchCustomRows(); }, [fetchCustomRows]);

  const saveCustomCell = async (rowIdx: number, col: string, value: string) => {
    if (readOnly) return;
    setCustomRows((prev) =>
      prev.map((r) => (r._idx === rowIdx ? { ...r, [col]: value } : r))
    );
    await supabase.from("okr_metric_values").upsert({
      okr_number: 4,
      kr_number: CUSTOM_KR,
      row_index: rowIdx,
      column_key: col,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: "okr_number,kr_number,row_index,column_key" });
  };

  const addRow = async () => {
    if (readOnly) return;
    const idx = customRows.length === 0 ? 0 : Math.max(...customRows.map((r) => r._idx)) + 1;
    await supabase.from("okr_metric_values").upsert({
      okr_number: 4,
      kr_number: CUSTOM_KR,
      row_index: idx,
      column_key: "status",
      value: "To Do",
      updated_at: new Date().toISOString(),
    }, { onConflict: "okr_number,kr_number,row_index,column_key" });
    setCustomRows((prev) => [...prev, { _idx: idx, month: "", kr: "", action: "", owner: "", status: "To Do", notes: "" }]);
  };

  const deleteRow = async (rowIdx: number) => {
    if (readOnly) return;
    await supabase
      .from("okr_metric_values")
      .delete()
      .eq("okr_number", 4)
      .eq("kr_number", CUSTOM_KR)
      .eq("row_index", rowIdx);
    setCustomRows((prev) => prev.filter((r) => r._idx !== rowIdx));
  };

  const getStatus = (rowIdx: number, defaultStatus: string) => {
    const saved = getValue(rowIdx, "roadmap_status");
    return saved || defaultStatus;
  };

  const getNotes = (rowIdx: number, defaultNotes: string) => {
    const saved = getValue(rowIdx, "roadmap_notes");
    return saved || defaultNotes;
  };

  // Build unified list: static items + custom items
  type UnifiedItem = {
    type: "static";
    item: typeof roadmapData[0];
    idx: number;
  } | {
    type: "custom";
    row: CustomRow;
  };

  const allItems: UnifiedItem[] = useMemo(() => {
    const staticItems: UnifiedItem[] = roadmapData.map((item, idx) => ({ type: "static" as const, item, idx }));
    const customItems: UnifiedItem[] = customRows.map((row) => ({ type: "custom" as const, row }));
    return [...staticItems, ...customItems];
  }, [customRows]);

  // Unique months & KRs from all items
  const allMonths = useMemo(() => {
    const months = new Set<string>();
    allItems.forEach((u) => {
      const m = u.type === "static" ? u.item.month : u.row.month;
      if (m) months.add(m);
    });
    return [...months];
  }, [allItems]);

  const uniqueKrs = useMemo(() => {
    const krs = new Set<number>();
    allItems.forEach((u) => {
      const kr = u.type === "static" ? u.item.okr : Number(u.row.kr) || 0;
      if (kr) krs.add(kr);
    });
    return [...krs].sort();
  }, [allItems]);

  const filteredData = useMemo(() => {
    return allItems.filter((u) => {
      const month = u.type === "static" ? u.item.month : u.row.month;
      const kr = u.type === "static" ? u.item.okr : Number(u.row.kr) || 0;
      return (
        (krFilter === "all" || kr === Number(krFilter)) &&
        (monthFilter === "all" || month === monthFilter)
      );
    });
  }, [krFilter, monthFilter, allItems]);

  const stats = useMemo(() => {
    const total = filteredData.length;
    const getItemStatus = (u: UnifiedItem) => {
      if (u.type === "static") return getStatus(u.idx, u.item.defaultStatus);
      return u.row.status || "To Do";
    };
    const done = filteredData.filter((u) => getItemStatus(u) === "Done").length;
    const inProgress = filteredData.filter((u) => getItemStatus(u) === "In Progress").length;
    const blocked = filteredData.filter((u) => getItemStatus(u) === "Blocked").length;
    const toDo = total - done - inProgress - blocked;
    return { total, done, inProgress, toDo, blocked, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValue, filteredData, customRows]);

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
                {allMonths.map((m) => (
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
              {!readOnly && <th className={thClass} style={{ width: 40 }}></th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((unified) => {
              if (unified.type === "static") {
                const { item, idx } = unified;
                const showMonth = item.month !== lastMonth;
                lastMonth = item.month;
                const status = getStatus(idx, item.defaultStatus);

                return (
                  <tr
                    key={`static-${item.id}`}
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
                      {readOnly ? (
                        <Badge variant="outline" className={`text-xs px-2 py-0.5 ${statusBadgeClass[status] || ""}`}>
                          {status}
                        </Badge>
                      ) : (
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
                      )}
                    </td>
                    <EditableCell
                      value={getNotes(idx, item.defaultNotes)}
                      onSave={(v) => saveValue(idx, "roadmap_notes", v)}
                      className={tdClass}
                      placeholder="Add notes..."
                      readOnly={readOnly}
                    />
                    {!readOnly && <td className={tdClass} />}
                  </tr>
                );
              } else {
                const { row } = unified;
                const status = row.status || "To Do";
                const showMonth = row.month !== lastMonth;
                if (row.month) lastMonth = row.month;

                return (
                  <tr
                    key={`custom-${row._idx}`}
                    className={`border-b border-border hover:bg-secondary/30 ${showMonth ? "border-t-2 border-t-border" : ""}`}
                  >
                    <EditableCell
                      value={row.month}
                      onSave={(v) => saveCustomCell(row._idx, "month", v)}
                      className={`${tdClass} font-medium`}
                      placeholder="Month..."
                      readOnly={readOnly}
                    />
                    <td className={tdClass}>
                      {readOnly ? (
                        row.kr ? (
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 ${okrBadgeColors[Number(row.kr)] || ""}`}>
                            KR{row.kr}
                          </Badge>
                        ) : <span className="text-muted-foreground text-xs">—</span>
                      ) : (
                        <Select
                          value={row.kr || "none"}
                          onValueChange={(v) => saveCustomCell(row._idx, "kr", v === "none" ? "" : v)}
                        >
                          <SelectTrigger className="h-7 text-xs border rounded-md px-2 w-[70px]">
                            <SelectValue placeholder="KR" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">—</SelectItem>
                            {[1, 2, 3, 4, 5].map((kr) => (
                              <SelectItem key={kr} value={String(kr)}>KR{kr}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                    <EditableCell
                      value={row.action}
                      onSave={(v) => saveCustomCell(row._idx, "action", v)}
                      className={tdClass}
                      placeholder="Action..."
                      readOnly={readOnly}
                    />
                    <EditableCell
                      value={row.owner}
                      onSave={(v) => saveCustomCell(row._idx, "owner", v)}
                      className={`${tdClass} text-xs text-muted-foreground`}
                      placeholder="Owner..."
                      readOnly={readOnly}
                    />
                    <td className={tdClass}>
                      {readOnly ? (
                        <Badge variant="outline" className={`text-xs px-2 py-0.5 ${statusBadgeClass[status] || ""}`}>
                          {status}
                        </Badge>
                      ) : (
                        <Select
                          value={status}
                          onValueChange={(v) => saveCustomCell(row._idx, "status", v)}
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
                      )}
                    </td>
                    <EditableCell
                      value={row.notes}
                      onSave={(v) => saveCustomCell(row._idx, "notes", v)}
                      className={tdClass}
                      placeholder="Add notes..."
                      readOnly={readOnly}
                    />
                    {!readOnly && (
                      <td className={tdClass}>
                        <button
                          onClick={() => deleteRow(row._idx)}
                          className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      {!readOnly && (
        <button
          onClick={addRow}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
      )}
    </div>
  );
};

export default OkrRoadmap;
