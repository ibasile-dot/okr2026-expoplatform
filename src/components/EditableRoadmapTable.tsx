import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";
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

const tdClass = "p-3 text-sm border-b border-border";
const thClass = "text-left p-3 font-semibold text-foreground whitespace-nowrap text-xs uppercase tracking-wide";

interface EditableRoadmapTableProps {
  okrNumber: number;
  sectionKey: number;
  color: string;
  readOnly?: boolean;
}

const EditableRoadmapTable = ({
  okrNumber,
  sectionKey,
  color,
  readOnly = false,
}: EditableRoadmapTableProps) => {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("all");

  const columns = ["month", "initiative", "owner", "status", "notes"];
  const headers = ["Month", "Initiative", "Owner", "Status", "Notes"];

  const fetchRows = useCallback(async () => {
    const { data } = await supabase
      .from("okr_metric_values")
      .select("row_index, column_key, value")
      .eq("okr_number", okrNumber)
      .eq("kr_number", sectionKey)
      .order("row_index", { ascending: true });

    if (data) {
      const map: Record<number, Record<string, string>> = {};
      data.forEach((d) => {
        if (!map[d.row_index]) map[d.row_index] = { _idx: String(d.row_index) };
        map[d.row_index][d.column_key] = d.value;
      });
      const maxIdx = data.length > 0 ? Math.max(...data.map((d) => d.row_index)) : -1;
      const rowList: Record<string, string>[] = [];
      for (let i = 0; i <= maxIdx; i++) {
        if (map[i] && !map[i]._deleted) {
          rowList.push({ _idx: String(i), ...map[i] });
        }
      }
      setRows(rowList);
    }
    setLoading(false);
  }, [okrNumber, sectionKey]);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  const getNextIndex = () => {
    if (rows.length === 0) return 0;
    return Math.max(...rows.map((r) => Number(r._idx))) + 1;
  };

  const addRow = async () => {
    if (readOnly) return;
    const idx = getNextIndex();
    await supabase.from("okr_metric_values").upsert({
      okr_number: okrNumber,
      kr_number: sectionKey,
      row_index: idx,
      column_key: columns[0],
      value: "",
      updated_at: new Date().toISOString(),
    }, { onConflict: "okr_number,kr_number,row_index,column_key" });

    const newRow: Record<string, string> = { _idx: String(idx) };
    columns.forEach((c) => (newRow[c] = c === "status" ? "To Do" : ""));
    setRows((prev) => [...prev, newRow]);
  };

  const deleteRow = async (rowIdx: number) => {
    if (readOnly) return;
    await supabase
      .from("okr_metric_values")
      .delete()
      .eq("okr_number", okrNumber)
      .eq("kr_number", sectionKey)
      .eq("row_index", rowIdx);
    setRows((prev) => prev.filter((r) => Number(r._idx) !== rowIdx));
  };

  const saveCell = async (rowIdx: number, col: string, value: string) => {
    if (readOnly) return;
    setRows((prev) =>
      prev.map((r) => (Number(r._idx) === rowIdx ? { ...r, [col]: value } : r))
    );
    await supabase.from("okr_metric_values").upsert({
      okr_number: okrNumber,
      kr_number: sectionKey,
      row_index: rowIdx,
      column_key: col,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: "okr_number,kr_number,row_index,column_key" });
  };

  const uniqueMonths = useMemo(() => {
    const months = rows.map((r) => r.month).filter(Boolean);
    return [...new Set(months)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const status = row.status || "To Do";
      if (statusFilter !== "all" && status !== statusFilter) return false;
      if (monthFilter !== "all" && (row.month || "") !== monthFilter) return false;
      return true;
    });
  }, [rows, statusFilter, monthFilter]);

  const stats = useMemo(() => {
    const total = rows.length;
    const done = rows.filter((r) => (r.status || "To Do") === "Done").length;
    const inProgress = rows.filter((r) => (r.status || "To Do") === "In Progress").length;
    const blocked = rows.filter((r) => (r.status || "To Do") === "Blocked").length;
    const toDo = total - done - inProgress - blocked;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, inProgress, toDo, blocked, percent };
  }, [rows]);

  if (loading) {
    return <div className="section-card p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="section-card p-6 space-y-6">
      {readOnly && (
        <div className="bg-muted/50 border border-border rounded-md px-4 py-2.5 text-xs text-muted-foreground">
          🔒 View only — you are not assigned to this OKR. Contact an admin to request access.
        </div>
      )}

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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
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
              {headers.map((h) => (
                <th key={h} className={`${thClass} ${h === "Initiative" ? "min-w-[250px]" : h === "Notes" ? "min-w-[180px]" : h === "Status" ? "min-w-[130px]" : ""}`}>{h}</th>
              ))}
              {!readOnly && <th className={thClass} style={{ width: 40 }}></th>}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={headers.length + (readOnly ? 0 : 1)} className="p-6 text-center text-muted-foreground italic text-sm">
                  No roadmap items yet. {!readOnly && "Click 'Add Row' to get started."}
                </td>
              </tr>
            )}
            {filteredRows.map((row) => {
              const idx = Number(row._idx);
              const status = row.status || "To Do";

              return (
                <tr key={idx} className="border-b border-border hover:bg-secondary/30">
                  {columns.map((col) => {
                    if (col === "status") {
                      return (
                        <td key={col} className={tdClass}>
                          {readOnly ? (
                            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${statusBadgeClass[status] || ""}`}>
                              {status}
                            </Badge>
                          ) : (
                            <Select
                              value={status}
                              onValueChange={(v) => saveCell(idx, "status", v)}
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
                      );
                    }
                    return (
                      <EditableCell
                        key={col}
                        value={row[col] || ""}
                        onSave={(v) => saveCell(idx, col, v)}
                        className={tdClass}
                        placeholder="Click to edit..."
                        readOnly={readOnly}
                      />
                    );
                  })}
                  {!readOnly && (
                    <td className={tdClass}>
                      <button
                        onClick={() => deleteRow(idx)}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!readOnly && (
        <button
          onClick={addRow}
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color }}
        >
          <Plus className="w-4 h-4" /> Add Row
        </button>
      )}
    </div>
  );
};

export default EditableRoadmapTable;
