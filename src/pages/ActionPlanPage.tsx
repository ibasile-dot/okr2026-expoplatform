import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { automationCategories, AutomationIdea } from "@/data/automationIdeasData";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Users,
  ExternalLink,
  StickyNote,
  Check,
  X,
} from "lucide-react";

/* ── Phase config ── */
const phases = ["Primary Focus", "Quick Wins", "Secondary Focus"] as const;
type Phase = (typeof phases)[number];

const phaseConfig: Record<Phase, { color: string; icon: string; number: string }> = {
  "Primary Focus": { color: "hsl(280, 50%, 50%)", icon: "🎯", number: "1" },
  "Quick Wins": { color: "hsl(200, 60%, 45%)", icon: "⚡", number: "2" },
  "Secondary Focus": { color: "hsl(44, 100%, 45%)", icon: "📋", number: "3" },
};

/* ── Area ordering per phase ── */
const areaOrder: Record<Phase, string[]> = {
  "Primary Focus": [
    "Admin Panel — Back-end Configuration",
    "Website Builder",
    "Admin Panel — Usability & Onboarding",
    "Support & Ticket Automation",
    "Finance",
  ],
  "Quick Wins": [
    "TAMs / Operations",
    "HR",
    "Engineering",
    "Marketing",
    "Product / Design",
    "Finance",
    "Data",
  ],
  "Secondary Focus": [
    "Website Builder — Phase 2",
    "Sales",
    "Product / Design",
    "Engineering",
    "Marketing & Data",
    "Unified Tools",
  ],
};

/* ── Map automation idea to an area name within each phase ── */
function getArea(idea: AutomationIdea, dept: string): string {
  const t = idea.idea.toLowerCase();
  if (idea.phase === "Primary Focus") {
    if (dept === "product" || dept === "Product / Design") {
      if (t.includes("website builder") || t.includes("css preview") || t.includes("css template") || t.includes("css generation") || t.includes("ai-generated css") || t.includes("ai-assisted css"))
        return "Website Builder";
      if (t.includes("hover text") || t.includes("usability") || t.includes("setup wizard") || t.includes("guided setup"))
        return "Admin Panel — Usability & Onboarding";
      return "Admin Panel — Usability & Onboarding";
    }
    if (dept === "tams" || dept === "TAMs / Operations") {
      if (t.includes("jsm") || t.includes("ticket") || t.includes("customer response") || t.includes("expo assistant") || t.includes("incident triage"))
        return "Support & Ticket Automation";
      return "Admin Panel — Back-end Configuration";
    }
    if (dept === "finance" || dept === "Finance") return "Finance";
    return "Support & Ticket Automation";
  }
  if (idea.phase === "Secondary Focus") {
    if (t.includes("website") || t.includes("in-builder")) return "Website Builder — Phase 2";
    if (dept === "sales" || dept === "Sales") return "Sales";
    if (dept === "engineering" || dept === "Engineering") return "Engineering";
    if (dept === "marketing" || dept === "Marketing") return "Marketing & Data";
    if (dept === "data" || dept === "Data") return "Marketing & Data";
    if (t.includes("unified") || t.includes("project management")) return "Unified Tools";
    return "Product / Design";
  }
  // Quick Wins — use department label directly
  return dept;
}

/* ── Flatten all ideas with department info ── */
interface ActionEntry {
  idea: AutomationIdea;
  deptKey: string;
  deptLabel: string;
  area: string;
}

function buildPhaseMap(): Record<Phase, Record<string, ActionEntry[]>> {
  const map: Record<Phase, Record<string, ActionEntry[]>> = {
    "Primary Focus": {},
    "Quick Wins": {},
    "Secondary Focus": {},
  };

  for (const cat of automationCategories) {
    for (const idea of cat.ideas) {
      const phase = idea.phase as Phase;
      if (!map[phase]) continue;
      const area = getArea(idea, cat.key);
      if (!map[phase][area]) map[phase][area] = [];
      map[phase][area].push({ idea, deptKey: cat.key, deptLabel: cat.label, area });
    }
  }
  return map;
}

/* ── Status styling ── */
const statusStyle: Record<string, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/15 text-warning border border-warning/30",
  Done: "bg-success/15 text-success border border-success/30",
  Blocked: "bg-destructive/15 text-destructive border border-destructive/30",
  Cancelled: "bg-muted text-muted-foreground line-through",
};

const KrBadge = ({ kr }: { kr: number }) => (
  <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border bg-primary/10 text-primary border-primary/20">
    KR{kr}
  </span>
);

/* ── Single action card ── */
const ActionCard = ({
  entry,
  phaseColor,
  savedNotes,
  onSaveNote,
}: {
  entry: ActionEntry;
  phaseColor: string;
  savedNotes: Record<string, string>;
  onSaveNote: (id: string, note: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const navigate = useNavigate();
  const { idea } = entry;

  const currentNote = savedNotes[idea.id] ?? idea.notes;

  const startEditNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNoteText(currentNote);
    setEditingNote(true);
  };

  const saveNote = () => {
    onSaveNote(idea.id, noteText);
    setEditingNote(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="mt-0.5 shrink-0 text-muted-foreground">
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs font-bold text-foreground leading-snug flex-1">{idea.idea}</h4>
            <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${statusStyle[idea.status]}`}>
              {idea.status}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{idea.solves}</p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {idea.krs.map((kr) => (
              <KrBadge key={kr} kr={kr} />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">
              ICE: {idea.impact}/{idea.confidence}/{idea.ease}
            </span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="ml-5 mt-3 space-y-3">
          {/* Notes */}
          <div className="bg-secondary/50 rounded-md p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <StickyNote className="w-3 h-3" /> Notes & Progress
              </p>
              {!editingNote && (
                <button
                  onClick={startEditNote}
                  className="text-[10px] text-primary hover:underline font-medium"
                >
                  Edit
                </button>
              )}
            </div>
            {editingNote ? (
              <div className="space-y-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full text-[11px] bg-background border border-border rounded p-2 min-h-[60px] text-foreground"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); saveNote(); }}
                    className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Check className="w-3 h-3" /> Save
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingNote(false); }}
                    className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-foreground leading-relaxed whitespace-pre-wrap">
                {currentNote || <span className="text-muted-foreground italic">No notes yet — click Edit to add progress updates</span>}
              </p>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1 border-t border-border flex-wrap">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {entry.deptLabel}
            </span>
            <span className="text-muted-foreground">{idea.source}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/okr/4/automation-ideas");
              }}
              className="flex items-center gap-1 text-primary hover:underline font-medium ml-auto"
            >
              <ExternalLink className="w-3 h-3" /> View in Automation Ideas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Main page ── */
const ActionPlanPage = () => {
  const phaseMap = useMemo(() => buildPhaseMap(), []);
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
  const [dbNotes, setDbNotes] = useState<Record<string, string>>({});

  // Load notes from DB (automation_idea_updates)
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("automation_idea_updates").select("idea_id, notes");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((r) => { if (r.notes) map[r.idea_id] = r.notes; });
        setDbNotes(map);
      }
    };
    load();
  }, []);

  const mergedNotes = { ...dbNotes, ...savedNotes };

  const handleSaveNote = async (ideaId: string, note: string) => {
    setSavedNotes((prev) => ({ ...prev, [ideaId]: note }));
    await supabase
      .from("automation_idea_updates")
      .upsert({ idea_id: ideaId, notes: note }, { onConflict: "idea_id" });
  };

  // Count totals
  const allIdeas = automationCategories.flatMap((c) => c.ideas);
  const totalItems = allIdeas.length;
  const doneItems = allIdeas.filter((i) => i.status === "Done").length;
  const inProgressItems = allIdeas.filter((i) => i.status === "In Progress").length;

  return (
    <div>
      {/* Header summary */}
      <div className="bg-gradient-to-r from-[hsl(280,50%,15%)] to-[hsl(200,60%,15%)] rounded-xl p-5 mb-8 border border-border">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-white">Action Plan — All Initiatives</h2>
            <p className="text-xs text-white/60 mt-0.5">
              Derived from Automation Ideas catalogue · Prioritised by findings and impact
            </p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{totalItems}</p>
              <p className="text-white/50">Total</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-success">{doneItems}</p>
              <p className="text-white/50">Done</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-warning">{inProgressItems}</p>
              <p className="text-white/50">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white/80">{totalItems - doneItems - inProgressItems}</p>
              <p className="text-white/50">Not Started</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-12">
        {phases.map((phase) => {
          const cfg = phaseConfig[phase];
          const areas = phaseMap[phase];
          const orderedAreaNames = areaOrder[phase];
          // include any areas not in the predefined order
          const allAreaNames = [...orderedAreaNames, ...Object.keys(areas).filter((a) => !orderedAreaNames.includes(a))];
          const phaseItems = Object.values(areas).flat();
          const phaseDone = phaseItems.filter((e) => e.idea.status === "Done").length;

          return (
            <div key={phase}>
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: cfg.color }}
                >
                  {cfg.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-foreground">
                      {cfg.icon} {phase}
                    </h2>
                    <span className="text-[10px] text-muted-foreground">
                      {phaseDone}/{phaseItems.length} completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Area groups */}
              <div className="space-y-6 ml-11 mt-4">
                {allAreaNames.map((areaName) => {
                  const entries = areas[areaName];
                  if (!entries || entries.length === 0) return null;
                  const areaDone = entries.filter((e) => e.idea.status === "Done").length;
                  // Collect unique KRs in this area
                  const areaKrs = [...new Set(entries.flatMap((e) => e.idea.krs))].sort();

                  return (
                    <div key={areaName}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                        <h3 className="text-xs font-bold" style={{ color: cfg.color }}>
                          {areaName}
                        </h3>
                        <span className="text-[10px] text-muted-foreground font-medium ml-1">
                          {areaDone}/{entries.length} completed
                        </span>
                        <div className="flex gap-1 ml-2">
                          {areaKrs.map((kr) => (
                            <KrBadge key={kr} kr={kr} />
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {entries.map((entry) => (
                          <ActionCard
                            key={entry.idea.id}
                            entry={entry}
                            phaseColor={cfg.color}
                            savedNotes={mergedNotes}
                            onSaveNote={handleSaveNote}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionPlanPage;
