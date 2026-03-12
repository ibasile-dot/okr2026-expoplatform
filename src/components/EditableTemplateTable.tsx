import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";

interface EditableTemplateTableProps {
  okrNumber: number;
  sectionKey: number; // stored as kr_number in okr_metric_values
  columns: string[];
  headers: string[];
  color: string;
  emptyMessage?: string;
}

const tdClass = "p-3 text-sm border-b border-border";
const thClass = "text-left p-3 font-semibold text-foreground whitespace-nowrap text-xs uppercase tracking-wide";

const EditableTemplateTable = ({
  okrNumber,
  sectionKey,
  columns,
  headers,
  color,
  emptyMessage = "No entries yet. Click \"+ Add Row\" to get started.",
}: EditableTemplateTableProps) => {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);

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
      // Also include rows that only have _idx
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
    const idx = getNextIndex();
    // Insert a placeholder to mark the row exists
    await supabase.from("okr_metric_values").upsert({
      okr_number: okrNumber,
      kr_number: sectionKey,
      row_index: idx,
      column_key: columns[0],
      value: "",
      updated_at: new Date().toISOString(),
    }, { onConflict: "okr_number,kr_number,row_index,column_key" });

    const newRow: Record<string, string> = { _idx: String(idx) };
    columns.forEach((c) => (newRow[c] = ""));
    setRows((prev) => [...prev, newRow]);
  };

  const deleteRow = async (rowIdx: number) => {
    // Delete all columns for this row
    await supabase
      .from("okr_metric_values")
      .delete()
      .eq("okr_number", okrNumber)
      .eq("kr_number", sectionKey)
      .eq("row_index", rowIdx);
    setRows((prev) => prev.filter((r) => Number(r._idx) !== rowIdx));
  };

  const saveCell = async (rowIdx: number, col: string, value: string) => {
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

  if (loading) {
    return <div className="section-card p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="section-card p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50 border-b-2 border-border">
              {headers.map((h) => (
                <th key={h} className={thClass}>{h}</th>
              ))}
              <th className={thClass} style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={headers.length + 1} className="p-6 text-center text-muted-foreground italic text-sm">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const idx = Number(row._idx);
              return (
                <tr key={idx} className="border-b border-border hover:bg-secondary/30">
                  {columns.map((col) => (
                    <EditableCell
                      key={col}
                      value={row[col] || ""}
                      onSave={(v) => saveCell(idx, col, v)}
                      className={tdClass}
                      placeholder="Click to edit..."
                    />
                  ))}
                  <td className={tdClass}>
                    <button
                      onClick={() => deleteRow(idx)}
                      className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        style={{ color }}
      >
        <Plus className="w-4 h-4" /> Add Row
      </button>
    </div>
  );
};

export default EditableTemplateTable;
