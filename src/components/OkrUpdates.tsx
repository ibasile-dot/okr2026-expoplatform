import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import { EditableCell } from "@/components/EditableCell";

interface UpdateRow {
  id: string;
  owner: string;
  department: string;
  initiative: string;
  tool: string;
  link_notes: string;
}

const columns = ["owner", "department", "initiative", "tool", "link_notes"] as const;
const headers = ["Owner", "Department", "Initiative", "Tool", "Link / Notes"];

const tdClass = "p-3 text-sm border-b border-border";
const thClass = "text-left p-3 font-semibold text-foreground whitespace-nowrap text-xs uppercase tracking-wide";

const OkrUpdates = ({ okrNumber, color, readOnly = false }: { okrNumber: number; color: string; readOnly?: boolean }) => {
  const [rows, setRows] = useState<UpdateRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRows = useCallback(async () => {
    const { data } = await supabase
      .from("okr_updates")
      .select("*")
      .eq("okr_number", okrNumber)
      .order("created_at", { ascending: true });
    if (data) {
      setRows(data.map((r) => ({
        id: r.id,
        owner: r.owner,
        department: r.department,
        initiative: r.initiative,
        tool: r.tool,
        link_notes: r.link_notes,
      })));
    }
    setLoading(false);
  }, [okrNumber]);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  const addRow = async () => {
    if (readOnly) return;
    const { data } = await supabase
      .from("okr_updates")
      .insert({ okr_number: okrNumber })
      .select()
      .single();
    if (data) {
      setRows((prev) => [...prev, {
        id: data.id,
        owner: data.owner,
        department: data.department,
        initiative: data.initiative,
        tool: data.tool,
        link_notes: data.link_notes,
      }]);
    }
  };

  const deleteRow = async (id: string) => {
    if (readOnly) return;
    await supabase.from("okr_updates").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const saveCell = async (id: string, col: string, value: string) => {
    if (readOnly) return;
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [col]: value } : r));
    await supabase.from("okr_updates").update({ [col]: value, updated_at: new Date().toISOString() }).eq("id", id);
  };

  if (loading) {
    return <div className="section-card p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="section-card p-6">
      {readOnly && (
        <div className="bg-muted/50 border border-border rounded-md px-4 py-2.5 mb-4 text-xs text-muted-foreground">
          🔒 View only — you are not assigned to this OKR. Contact an admin to request access.
        </div>
      )}
      <div className="bg-secondary/50 p-4 rounded-md border-l-4 mb-6" style={{ borderLeftColor: color }}>
        <p className="text-sm text-foreground">
          📝 <strong>Team:</strong> Please update this section with anything you've worked on or completed. This will be used for the weekly round-up newsletter.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50 border-b-2 border-border">
              {headers.map((h) => (
                <th key={h} className={thClass}>{h}</th>
              ))}
              {!readOnly && <th className={thClass} style={{ width: 40 }}></th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={headers.length + (readOnly ? 0 : 1)} className="p-6 text-center text-muted-foreground italic text-sm">
                  No updates yet.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-secondary/30">
                {columns.map((col) => (
                  <EditableCell
                    key={col}
                    value={row[col]}
                    onSave={(v) => saveCell(row.id, col, v)}
                    className={tdClass}
                    placeholder="Click to edit..."
                    readOnly={readOnly}
                  />
                ))}
                {!readOnly && (
                  <td className={tdClass}>
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!readOnly && (
        <button
          onClick={addRow}
          className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Update
        </button>
      )}
    </div>
  );
};

export default OkrUpdates;
