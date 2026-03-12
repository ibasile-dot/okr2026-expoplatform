import { useState, useCallback, useMemo } from "react";
import { SectionTitle } from "@/components/DashboardWidgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, X, Trash2 } from "lucide-react";
import {
  automationCategories,
  iceTotal,
  getPriority,
  type AutomationIdea,
  type IceScore,
  type IdeaStatus,
  type DepartmentCategory,
} from "@/data/automationIdeasData";
import { EditableCell } from "@/components/EditableCell";

const iceOptions: IceScore[] = ["S", "M", "L"];
const statusOptions: IdeaStatus[] = ["Not Started", "In Progress", "Done", "Blocked", "Cancelled"];
const phaseOptions: AutomationIdea["phase"][] = ["Primary Focus", "Quick Wins", "Secondary Focus"];
const allKrs = [1, 2, 3, 4, 5];

const phaseStyle: Record<string, string> = {
  "Primary Focus": "bg-[hsl(263,70%,95%)] text-[hsl(263,70%,45%)]",
  "Quick Wins": "bg-[hsl(200,80%,92%)] text-[hsl(200,60%,38%)]",
  "Secondary Focus": "bg-[hsl(30,80%,92%)] text-[hsl(30,60%,38%)]",
};

const priorityColors: Record<string, string> = {
  High: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<string, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-primary/10 text-primary",
  Done: "bg-success/15 text-success",
  Blocked: "bg-destructive/15 text-destructive",
  Cancelled: "bg-muted text-muted-foreground line-through",
};

const krColors: Record<number, string> = {
  1: "bg-[hsl(237,68%,33%)]/15 text-[hsl(237,68%,33%)] border border-[hsl(237,68%,33%)]/30",
  2: "bg-[hsl(44,100%,58%)]/15 text-[hsl(44,100%,40%)] border border-[hsl(44,100%,58%)]/30",
  3: "bg-[hsl(152,60%,40%)]/15 text-[hsl(152,60%,40%)] border border-[hsl(152,60%,40%)]/30",
  4: "bg-[hsl(200,60%,45%)]/15 text-[hsl(200,60%,45%)] border border-[hsl(200,60%,45%)]/30",
  5: "bg-[hsl(280,50%,50%)]/15 text-[hsl(280,50%,50%)] border border-[hsl(280,50%,50%)]/30",
};

const krColorActive: Record<number, string> = {
  1: "bg-[hsl(237,68%,33%)] text-white border border-[hsl(237,68%,33%)]",
  2: "bg-[hsl(44,100%,58%)] text-white border border-[hsl(44,100%,58%)]",
  3: "bg-[hsl(152,60%,40%)] text-white border border-[hsl(152,60%,40%)]",
  4: "bg-[hsl(200,60%,45%)] text-white border border-[hsl(200,60%,45%)]",
  5: "bg-[hsl(280,50%,50%)] text-white border border-[hsl(280,50%,50%)]",
};

interface Filters {
  priority: string | null;
  phase: string | null;
  kr: number | null;
}

const IceDropdown = ({ value, onChange }: { value: IceScore; onChange: (v: IceScore) => void }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as IceScore)}
    className="w-11 bg-transparent border border-border rounded px-1 py-1 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none text-center"
  >
    {iceOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
  </select>
);

const PhaseDropdown = ({ value, onChange }: { value: AutomationIdea["phase"]; onChange: (v: AutomationIdea["phase"]) => void }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as AutomationIdea["phase"])}
    className={`border-0 rounded-full px-2 py-1 text-[11px] font-semibold cursor-pointer focus:outline-none whitespace-nowrap ${phaseStyle[value]}`}
  >
    {phaseOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
  </select>
);

const StatusDropdown = ({ value, onChange }: { value: IdeaStatus; onChange: (v: IdeaStatus) => void }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as IdeaStatus)}
    className={`w-full min-w-[100px] border-0 rounded-full px-2.5 py-1 text-[11px] font-medium cursor-pointer focus:outline-none ${statusColors[value]}`}
  >
    {statusOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
  </select>
);

const KrToggle = ({ krs, onChange }: { krs: number[]; onChange: (krs: number[]) => void }) => (
  <div className="flex flex-wrap gap-1">
    {allKrs.map((kr) => {
      const active = krs.includes(kr);
      return (
        <button
          key={kr}
          onClick={() => {
            if (active && krs.length > 1) onChange(krs.filter((k) => k !== kr));
            else if (!active) onChange([...krs, kr].sort());
          }}
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
            active ? krColorActive[kr] : "bg-muted/50 text-muted-foreground/40 border border-border"
          }`}
        >
          KR{kr}
        </button>
      );
    })}
  </div>
);

const SummaryBar = ({ categories }: { categories: DepartmentCategory[] }) => {
  const totalIdeas = categories.reduce((sum, c) => sum + c.ideas.length, 0);
  const doneCount = categories.reduce((sum, c) => sum + c.ideas.filter(i => i.status === "Done").length, 0);
  const inProgressCount = categories.reduce((sum, c) => sum + c.ideas.filter(i => i.status === "In Progress").length, 0);
  const toDoCount = categories.reduce((sum, c) => sum + c.ideas.filter(i => i.status === "Not Started").length, 0);

  return (
    <div className="flex items-center gap-5 px-6 py-4 bg-gradient-to-r from-[hsl(237,40%,15%)] to-[hsl(237,50%,25%)] rounded-xl mb-5 text-white flex-wrap">
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{totalIdeas}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">Total Ideas</div>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{doneCount}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">DONE</div>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{inProgressCount}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">IN PROGRESS</div>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{toDoCount}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">TO DO</div>
      </div>
      <div className="flex-1 min-w-[80px]" />
      <div className="text-[11px] opacity-70 text-right leading-relaxed">
        S = 1 &nbsp;|&nbsp; M = 2 &nbsp;|&nbsp; L = 3 &nbsp;|&nbsp; Max = 9
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-[11px] text-right leading-relaxed">
        <div className="font-semibold opacity-90">ICE Scoring</div>
        <div className="opacity-60 text-[10px]">Impact: how much it solves the problem</div>
        <div className="opacity-60 text-[10px]">Confidence: how likely it is to work</div>
        <div className="opacity-60 text-[10px]">Ease: how easy to implement</div>
      </div>
    </div>
  );
};

const FilterBar = ({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) => {
  const priorityOpts = ["High", "Medium", "Low"];
  const krOpts = [1, 2, 3, 4, 5];
  const hasFilters = filters.priority || filters.phase || filters.kr;

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <Filter className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground font-medium mr-1">Filter:</span>
      {priorityOpts.map((p) => (
        <button key={p} onClick={() => setFilters({ ...filters, priority: filters.priority === p ? null : p })}
          className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${filters.priority === p ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"}`}>{p}</button>
      ))}
      <span className="text-border">|</span>
      {phaseOptions.map((p) => (
        <button key={p} onClick={() => setFilters({ ...filters, phase: filters.phase === p ? null : p })}
          className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${filters.phase === p ? "bg-primary text-primary-foreground border-primary" : `bg-transparent border-border hover:border-primary/50 ${phaseStyle[p].split(" ")[1]}`}`}>{p}</button>
      ))}
      <span className="text-border">|</span>
      {krOpts.map((kr) => (
        <button key={kr} onClick={() => setFilters({ ...filters, kr: filters.kr === kr ? null : kr })}
          className={`text-[11px] px-2 py-1 rounded border transition-colors font-bold ${filters.kr === kr ? `${krColorActive[kr]}` : "bg-transparent text-muted-foreground border-border hover:border-primary/50"}`}>KR{kr}</button>
      ))}
      {hasFilters && (
        <button onClick={() => setFilters({ priority: null, phase: null, kr: null })}
          className="text-[11px] px-2 py-1 rounded-full text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-1">
          <X className="w-3 h-3" /> Clear
        </button>
      )}
    </div>
  );
};

const DepartmentTable = ({
  ideas, onUpdate, onAddIdea, onDeleteIdea, onUpdateKrs, filters,
}: {
  ideas: AutomationIdea[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAddIdea: (idea: AutomationIdea) => void;
  onDeleteIdea: (id: string) => void;
  onUpdateKrs: (id: string, krs: number[]) => void;
  filters: Filters;
}) => {
  const [showNewRow, setShowNewRow] = useState(false);
  const [newIdea, setNewIdea] = useState({ idea: "", solves: "", phase: "Quick Wins" as AutomationIdea["phase"], krs: [4] as number[] });

  const filtered = useMemo(() => {
    let result = ideas;
    if (filters.priority) result = result.filter((i) => getPriority(iceTotal(i.impact, i.confidence, i.ease)) === filters.priority);
    if (filters.phase) result = result.filter((i) => i.phase === filters.phase);
    if (filters.kr) result = result.filter((i) => i.krs.includes(filters.kr!));
    return result;
  }, [ideas, filters]);

  const sorted = filtered;

  const handleAdd = () => {
    if (!newIdea.idea.trim()) return;
    onAddIdea({
      id: "", idea: newIdea.idea, solves: newIdea.solves, phase: newIdea.phase,
      krs: newIdea.krs, impact: "M", confidence: "M", ease: "M", status: "Not Started", source: "", notes: "",
    });
    setNewIdea({ idea: "", solves: "", phase: "Quick Wins", krs: [4] });
    setShowNewRow(false);
  };

  return (
    <div className="section-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[22%]">Idea</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[14%]">What it Solves</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[9%]">Phase</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[9%]">KR(s)</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Impact</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Conf.</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Ease</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[4%]">Total</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Priority</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[8%]">Status</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[11%]">Notes</th>
              <th className="w-[3%]"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr><td colSpan={12} className="p-6 text-center text-muted-foreground text-sm">No ideas match the current filters</td></tr>
            )}
            {sorted.map((idea) => {
              const total = iceTotal(idea.impact, idea.confidence, idea.ease);
              const priority = getPriority(total);
              return (
                <tr key={idea.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors group">
                  {idea.id.startsWith("ai-new-") ? (
                    <EditableCell value={idea.idea} onSave={(v) => onUpdate(idea.id, "idea", v)} className="p-2.5 font-medium text-foreground" placeholder="Idea name..." />
                  ) : (
                    <td className="p-2.5 font-medium text-foreground">{idea.idea}</td>
                  )}
                  {idea.id.startsWith("ai-new-") ? (
                    <EditableCell value={idea.solves} onSave={(v) => onUpdate(idea.id, "solves", v)} className="p-2.5 text-muted-foreground" placeholder="What it solves..." />
                  ) : (
                    <td className="p-2.5 text-muted-foreground">{idea.solves}</td>
                  )}
                  <td className="p-2.5">
                    <PhaseDropdown value={idea.phase} onChange={(v) => onUpdate(idea.id, "phase", v)} />
                  </td>
                  <td className="p-2.5">
                    <div className="flex flex-wrap gap-1">
                      {idea.krs.map((kr) => (
                        <span key={kr} className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${krColors[kr]}`}>
                          KR{kr}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2.5"><IceDropdown value={idea.impact} onChange={(v) => onUpdate(idea.id, "impact", v)} /></td>
                  <td className="p-2.5"><IceDropdown value={idea.confidence} onChange={(v) => onUpdate(idea.id, "confidence", v)} /></td>
                  <td className="p-2.5"><IceDropdown value={idea.ease} onChange={(v) => onUpdate(idea.id, "ease", v)} /></td>
                  <td className="p-2.5 text-center"><span className="font-bold text-sm text-foreground">{total}</span></td>
                  <td className="p-2.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border ${priorityColors[priority]}`}>{priority}</span>
                  </td>
                  <td className="p-2.5"><StatusDropdown value={idea.status} onChange={(v) => onUpdate(idea.id, "status", v)} /></td>
                  <EditableCell value={idea.notes} onSave={(v) => onUpdate(idea.id, "notes", v)} className="p-2.5 text-[11px]" placeholder="Add notes..." />
                  <td className="p-2.5 text-center">
                    <button
                      onClick={() => { if (window.confirm("Delete this idea?")) onDeleteIdea(idea.id); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {showNewRow && (
              <tr className="border-b border-border/50 bg-primary/5">
                <td className="p-2.5">
                  <input
                    autoFocus
                    value={newIdea.idea}
                    onChange={(e) => setNewIdea({ ...newIdea, idea: e.target.value })}
                    placeholder="Idea name..."
                    className="w-full bg-transparent border border-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                    onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setShowNewRow(false); }}
                  />
                </td>
                <td className="p-2.5">
                  <input
                    value={newIdea.solves}
                    onChange={(e) => setNewIdea({ ...newIdea, solves: e.target.value })}
                    placeholder="What it solves..."
                    className="w-full bg-transparent border border-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </td>
                <td className="p-2.5">
                  <PhaseDropdown value={newIdea.phase} onChange={(v) => setNewIdea({ ...newIdea, phase: v })} />
                </td>
                <td className="p-2.5">
                  <KrToggle krs={newIdea.krs} onChange={(krs) => setNewIdea({ ...newIdea, krs })} />
                </td>
                <td colSpan={4} className="p-2.5 text-center text-muted-foreground text-[11px]">Default: M</td>
                <td colSpan={2} className="p-2.5">
                  <div className="flex gap-1.5 justify-center">
                    <button onClick={handleAdd} className="px-3 py-1 text-[11px] font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">Add</button>
                    <button onClick={() => setShowNewRow(false)} className="px-3 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted rounded transition-colors">Cancel</button>
                  </div>
                </td>
                <td colSpan={2}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!showNewRow && (
        <button
          onClick={() => setShowNewRow(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors border-t border-border"
        >
          <Plus className="w-3.5 h-3.5" />
          Add new idea
        </button>
      )}
    </div>
  );
};

let clientIdCounter = 1000;

const AutomationIdeasPage = () => {
  const [categories, setCategories] = useState<DepartmentCategory[]>(automationCategories);
  const [filters, setFilters] = useState<Filters>({ priority: null, phase: null, kr: null });

  const handleUpdate = useCallback((ideaId: string, field: string, value: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        ideas: cat.ideas.map((idea) =>
          idea.id === ideaId ? { ...idea, [field]: value } : idea
        ),
      }))
    );
  }, []);

  const handleUpdateKrs = useCallback((ideaId: string, krs: number[]) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        ideas: cat.ideas.map((idea) =>
          idea.id === ideaId ? { ...idea, krs } : idea
        ),
      }))
    );
  }, []);

  const handleAddIdea = useCallback((catKey: string, template: AutomationIdea) => {
    const newId = `ai-new-${++clientIdCounter}`;
    setCategories((prev) =>
      prev.map((cat) => cat.key === catKey ? { ...cat, ideas: [...cat.ideas, { ...template, id: newId }] } : cat)
    );
  }, []);

  const handleDeleteIdea = useCallback((ideaId: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        ideas: cat.ideas.filter((idea) => idea.id !== ideaId),
      }))
    );
  }, []);

  return (
    <div>
      <SectionTitle>Automation Ideas</SectionTitle>
      <SummaryBar categories={categories} />

      <Tabs defaultValue="tams" className="w-full">
        <TabsList className="mb-4 flex-wrap h-auto gap-1 bg-transparent border-b border-border rounded-none p-0 pb-2">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.key}
              value={cat.key}
              className="text-xs rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none border border-border px-3 py-1"
            >
              {cat.label} ({cat.ideas.length})
            </TabsTrigger>
          ))}
        </TabsList>

        <FilterBar filters={filters} setFilters={setFilters} />

        {categories.map((cat) => (
          <TabsContent key={cat.key} value={cat.key}>
            <DepartmentTable
              ideas={cat.ideas}
              onUpdate={handleUpdate}
              onAddIdea={(idea) => handleAddIdea(cat.key, idea)}
              onDeleteIdea={handleDeleteIdea}
              onUpdateKrs={handleUpdateKrs}
              filters={filters}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AutomationIdeasPage;
