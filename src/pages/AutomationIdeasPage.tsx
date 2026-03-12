import { useState, useCallback, useMemo } from "react";
import { SectionTitle } from "@/components/DashboardWidgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, X } from "lucide-react";
import {
  automationCategories,
  iceTotal,
  iceValue,
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

const phaseStyle: Record<string, string> = {
  "Primary Focus": "bg-[hsl(263,70%,95%)] text-[hsl(263,70%,45%)]",
  "Quick Wins": "bg-success/15 text-success",
  "Secondary Focus": "bg-warning/15 text-warning",
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
  1: "bg-[hsl(237,68%,33%)] text-white",
  2: "bg-[hsl(44,100%,58%)] text-white",
  3: "bg-[hsl(330,70%,55%)] text-white",
  4: "bg-[hsl(200,60%,45%)] text-white",
  5: "bg-[hsl(152,60%,40%)] text-white",
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

const SummaryBar = ({ categories }: { categories: DepartmentCategory[] }) => {
  const totalIdeas = categories.reduce((sum, c) => sum + c.ideas.length, 0);
  const doneCount = categories.reduce((sum, c) => sum + c.ideas.filter(i => i.status === "Done").length, 0);
  const inProgressCount = categories.reduce((sum, c) => sum + c.ideas.filter(i => i.status === "In Progress").length, 0);
  const toDoCount = categories.reduce((sum, c) => sum + c.ideas.filter(i => i.status === "Not Started").length, 0);

  return (
    <div className="flex items-center gap-5 px-6 py-4 bg-gradient-to-r from-[hsl(237,40%,15%)] to-[hsl(237,50%,25%)] rounded-xl mb-5 text-white flex-wrap">
      <div className="text-center">
        <div className="text-2xl font-bold">{totalIdeas}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">Total Ideas</div>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-center">
        <div className="text-2xl font-bold text-[hsl(185,80%,80%)]">{doneCount}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">Done ✅</div>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-center">
        <div className="text-2xl font-bold text-[hsl(44,90%,80%)]">{inProgressCount}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">In Progress 🔄</div>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="text-center">
        <div className="text-2xl font-bold text-[hsl(260,70%,80%)]">{toDoCount}</div>
        <div className="text-[11px] opacity-75 uppercase tracking-wider">To Do ⏳</div>
      </div>
      <div className="flex-1 min-w-[120px]" />
      <div className="text-[11px] opacity-70 text-right leading-relaxed">
        ICE: Impact · Confidence · Ease<br />
        S = 1 &nbsp;|&nbsp; M = 2 &nbsp;|&nbsp; L = 3 &nbsp;|&nbsp; Max = 9<br />
        <span className="text-[hsl(44,90%,80%)]">All ICE scores, status &amp; notes are editable ↓</span>
      </div>
    </div>
  );
};

const PhaseLegend = () => (
  <div className="flex gap-4 mb-5 flex-wrap items-center">
    <span className="text-xs text-muted-foreground font-semibold">Phase:</span>
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${phaseStyle["Primary Focus"]}`}>Primary Focus</span>
      <span>Core bottlenecks — do first</span>
    </div>
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${phaseStyle["Quick Wins"]}`}>Quick Wins</span>
      <span>Fast to implement</span>
    </div>
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${phaseStyle["Secondary Focus"]}`}>Secondary Focus</span>
      <span>After Phase 1</span>
    </div>
  </div>
);

const IceFootnote = () => (
  <div className="mt-3 px-3 py-2 bg-muted/50 rounded-lg text-[10px] text-muted-foreground leading-relaxed">
    <span className="font-semibold">Impact:</span> How much it will solve the problem (S=1, M=2, L=3) &nbsp;·&nbsp;
    <span className="font-semibold">Confidence:</span> How likely it is to work (S=1, M=2, L=3) &nbsp;·&nbsp;
    <span className="font-semibold">Ease:</span> How easy to implement (S=1, M=2, L=3) &nbsp;·&nbsp;
    <span className="font-semibold">Total:</span> Sum of ICE (max 9)
  </div>
);

const FilterBar = ({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) => {
  const priorityOpts = ["High", "Medium", "Low"];
  const krOpts = [1, 2, 3, 4, 5];
  const hasFilters = filters.priority || filters.phase || filters.kr;

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      <Filter className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground font-medium mr-1">Filter:</span>

      {priorityOpts.map((p) => (
        <button
          key={p}
          onClick={() => setFilters({ ...filters, priority: filters.priority === p ? null : p })}
          className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
            filters.priority === p
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
          }`}
        >
          {p}
        </button>
      ))}

      <span className="text-border">|</span>

      {phaseOptions.map((p) => (
        <button
          key={p}
          onClick={() => setFilters({ ...filters, phase: filters.phase === p ? null : p })}
          className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
            filters.phase === p
              ? "bg-primary text-primary-foreground border-primary"
              : `bg-transparent border-border hover:border-primary/50 ${phaseStyle[p].split(" ")[1]}`
          }`}
        >
          {p}
        </button>
      ))}

      <span className="text-border">|</span>

      {krOpts.map((kr) => (
        <button
          key={kr}
          onClick={() => setFilters({ ...filters, kr: filters.kr === kr ? null : kr })}
          className={`text-[11px] px-2 py-1 rounded border transition-colors font-bold ${
            filters.kr === kr
              ? `${krColors[kr]} border-transparent`
              : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
          }`}
        >
          KR{kr}
        </button>
      ))}

      {hasFilters && (
        <button
          onClick={() => setFilters({ priority: null, phase: null, kr: null })}
          className="text-[11px] px-2 py-1 rounded-full text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-1"
        >
          <X className="w-3 h-3" /> Clear
        </button>
      )}
    </div>
  );
};

const DepartmentTable = ({
  ideas,
  onUpdate,
  onAddIdea,
  filters,
}: {
  ideas: AutomationIdea[];
  onUpdate: (id: string, field: string, value: string) => void;
  onAddIdea: () => void;
  filters: Filters;
}) => {
  const filtered = useMemo(() => {
    let result = ideas;
    if (filters.priority) {
      result = result.filter((i) => getPriority(iceTotal(i.impact, i.confidence, i.ease)) === filters.priority);
    }
    if (filters.phase) {
      result = result.filter((i) => i.phase === filters.phase);
    }
    if (filters.kr) {
      result = result.filter((i) => i.krs.includes(filters.kr!));
    }
    return result;
  }, [ideas, filters]);

  const sorted = [...filtered].sort((a, b) => iceTotal(b.impact, b.confidence, b.ease) - iceTotal(a.impact, a.confidence, a.ease));

  return (
    <div className="section-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[24%]">Idea</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[16%]">What it Solves</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[9%]">Phase</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[7%]">KR(s)</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]" title="Impact: how much it will solve the problem (S=1, M=2, L=3)">Impact</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]" title="Confidence: how likely it is to work (S=1, M=2, L=3)">Conf.</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]" title="Ease: how easy to implement (S=1, M=2, L=3)">Ease</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[4%]">Total</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Priority</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[9%]">Status</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[11%]">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr><td colSpan={11} className="p-6 text-center text-muted-foreground text-sm">No ideas match the current filters</td></tr>
            )}
            {sorted.map((idea) => {
              const total = iceTotal(idea.impact, idea.confidence, idea.ease);
              const priority = getPriority(total);
              return (
                <tr key={idea.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-2.5 font-medium text-foreground">{idea.idea}</td>
                  <td className="p-2.5 text-muted-foreground">{idea.solves}</td>
                  <td className="p-2.5">
                    <PhaseDropdown value={idea.phase} onChange={(v) => onUpdate(idea.id, "phase", v)} />
                  </td>
                  <td className="p-2.5">
                    <div className="flex flex-wrap gap-1">
                      {idea.krs.map((kr) => (
                        <span key={kr} className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${krColors[kr] || "bg-muted text-muted-foreground"}`}>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={onAddIdea}
        className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors border-t border-border"
      >
        <Plus className="w-3.5 h-3.5" />
        Add new idea
      </button>
      <IceFootnote />
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

  const handleAddIdea = useCallback((catKey: string) => {
    const newId = `ai-new-${++clientIdCounter}`;
    const newIdea: AutomationIdea = {
      id: newId, idea: "New automation idea", solves: "", phase: "Quick Wins",
      krs: [4], impact: "M", confidence: "M", ease: "M", status: "Not Started", source: "", notes: "",
    };
    setCategories((prev) =>
      prev.map((cat) => cat.key === catKey ? { ...cat, ideas: [...cat.ideas, newIdea] } : cat)
    );
  }, []);

  return (
    <div>
      <SectionTitle>Automation Ideas</SectionTitle>
      <SummaryBar categories={categories} />
      <PhaseLegend />
      <FilterBar filters={filters} setFilters={setFilters} />

      <Tabs defaultValue="tams" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1 bg-transparent border-b border-border rounded-none p-0 pb-2">
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

        {categories.map((cat) => (
          <TabsContent key={cat.key} value={cat.key}>
            <DepartmentTable ideas={cat.ideas} onUpdate={handleUpdate} onAddIdea={() => handleAddIdea(cat.key)} filters={filters} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AutomationIdeasPage;
