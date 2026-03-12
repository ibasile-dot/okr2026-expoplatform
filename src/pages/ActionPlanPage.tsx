import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { automationCategories, AutomationIdea, iceTotal } from "@/data/automationIdeasData";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronDown,
  ChevronRight,
  Users,
  ExternalLink,
  StickyNote,
  Check,
  X } from
"lucide-react";

/* ── Phase config ── */
const phases = ["Primary Focus", "Quick Wins", "Secondary Focus"] as const;
type Phase = (typeof phases)[number];

const phaseConfig: Record<Phase, {color: string;icon: string;number: string;}> = {
  "Primary Focus": { color: "hsl(280, 50%, 50%)", icon: "🎯", number: "1" },
  "Quick Wins": { color: "hsl(200, 60%, 45%)", icon: "⚡", number: "2" },
  "Secondary Focus": { color: "hsl(44, 100%, 45%)", icon: "📋", number: "3" }
};

/* ── Area ordering per phase ── */
const areaOrder: Record<Phase, string[]> = {
  "Primary Focus": [
  "Admin Panel — Back-end Configuration",
  "Website Builder",
  "Admin Panel — Usability & Onboarding",
  "Support & Ticket Automation",
  "Finance",
  "HR",
  "Data",
  "Sales",
  "Engineering",
  "Marketing"],

  "Quick Wins": [
  "TAMs / Operations",
  "HR",
  "Engineering",
  "Marketing",
  "Product / Design",
  "Finance",
  "Data"],

  "Secondary Focus": [
  "TAMs / Operations",
  "Website Builder — Phase 2",
  "Sales",
  "Product / Design",
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Data"]

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
    if (dept === "hr" || dept === "HR") return "HR";
    if (dept === "engineering" || dept === "Engineering") return "Engineering";
    if (dept === "marketing" || dept === "Marketing") return "Marketing";
    if (dept === "data" || dept === "Data") return "Data";
    if (dept === "sales" || dept === "Sales") return "Sales";
    return dept;
  }
  if (idea.phase === "Secondary Focus") {
    if (t.includes("website") || t.includes("in-builder")) return "Website Builder — Phase 2";
    if (dept === "sales" || dept === "Sales") return "Sales";
    if (dept === "engineering" || dept === "Engineering") return "Engineering";
    if (dept === "marketing" || dept === "Marketing") return "Marketing";
    if (dept === "data" || dept === "Data") return "Data";
    if (dept === "tams" || dept === "TAMs / Operations") return "TAMs / Operations";
    if (dept === "hr" || dept === "HR") return "HR";
    if (dept === "finance" || dept === "Finance") return "Finance";
    return dept;
  }
  return dept;
}

/* ── Flatten all ideas with department info ── */
interface ActionEntry {
  idea: AutomationIdea;
  deptKey: string;
  deptLabel: string;
  area: string;
}

function buildPhaseMap(dbOverrides: Record<string, any>): Record<Phase, Record<string, ActionEntry[]>> {
  const map: Record<Phase, Record<string, ActionEntry[]>> = {
    "Primary Focus": {},
    "Quick Wins": {},
    "Secondary Focus": {}
  };

  // Track which DB ids are covered by static data
  const coveredIds = new Set<string>();

  for (const cat of automationCategories) {
    for (const origIdea of cat.ideas) {
      coveredIds.add(origIdea.id);
      // Apply DB overrides to get the current truth
      const saved = dbOverrides[origIdea.id];
      const idea: AutomationIdea = saved ? {
        ...origIdea,
        ...(saved.idea ? { idea: saved.idea } : {}),
        ...(saved.solves ? { solves: saved.solves } : {}),
        ...(saved.status ? { status: saved.status } : {}),
        ...(saved.impact ? { impact: saved.impact } : {}),
        ...(saved.confidence ? { confidence: saved.confidence } : {}),
        ...(saved.ease ? { ease: saved.ease } : {}),
        ...(saved.phase ? { phase: saved.phase } : {})
      } : origIdea;

      const phase = idea.phase as Phase;
      if (!map[phase]) continue;
      const area = getArea(idea, cat.label);
      if (!map[phase][area]) map[phase][area] = [];
      map[phase][area].push({ idea, deptKey: cat.key, deptLabel: cat.label, area });
    }
  }

  // Include DB-only ideas (e.g. ai-new-* added via Automation Ideas page)
  for (const [ideaId, saved] of Object.entries(dbOverrides)) {
    if (coveredIds.has(ideaId)) continue;
    if (!saved.idea) continue; // skip DB-only entries without a proper idea name

    const idea: AutomationIdea = {
      id: ideaId,
      idea: saved.idea || "Untitled",
      solves: saved.solves || "",
      phase: saved.phase as Phase || "Quick Wins",
      krs: [],
      impact: saved.impact || "M",
      confidence: saved.confidence || "M",
      ease: saved.ease || "M",
      status: saved.status || "Not Started",
      source: "",
      notes: saved.notes || ""
    };

    const phase = idea.phase as Phase;
    if (!map[phase]) continue;
    // Try to determine department from the idea context
    const deptLabel = "General";
    const area = deptLabel;
    if (!map[phase][area]) map[phase][area] = [];
    map[phase][area].push({ idea, deptKey: "general", deptLabel, area });
  }

  // Sort entries within each area by ICE total (descending) for priority
  for (const phase of phases) {
    for (const area of Object.keys(map[phase])) {
      map[phase][area].sort((a, b) => {
        const scoreA = iceTotal(a.idea.impact, a.idea.confidence, a.idea.ease);
        const scoreB = iceTotal(b.idea.impact, b.idea.confidence, b.idea.ease);
        return scoreB - scoreA;
      });
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
  Cancelled: "bg-muted text-muted-foreground line-through"
};

const KrBadge = ({ kr }: {kr: number;}) =>
<span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border bg-primary/10 text-primary border-primary/20">
    KR{kr}
  </span>;


/* ── Single action card ── */
const ActionCard = ({
  entry,
  savedStatus,
  savedNotes,
  onSaveNote





}: {entry: ActionEntry;savedStatus: Record<string, string>;savedNotes: Record<string, string>;onSaveNote: (id: string, note: string) => void;}) => {
  const [expanded, setExpanded] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const navigate = useNavigate();
  const { idea } = entry;

  const currentNote = savedNotes[idea.id] ?? "";
  const currentStatus = idea.status;

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
            <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${statusStyle[currentStatus]}`}>
              {currentStatus}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{idea.solves}</p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {idea.krs.map((kr) =>
            <KrBadge key={kr} kr={kr} />
            )}
          </div>
        </div>
      </div>

      {expanded &&
      <div className="ml-5 mt-3 space-y-3">
          {/* Notes */}
          <div className="bg-secondary/50 rounded-md p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <StickyNote className="w-3 h-3" /> Notes & Progress
              </p>
              {!editingNote &&
            <button
              onClick={startEditNote}
              className="text-[10px] text-primary hover:underline font-medium">
              
                  Edit
                </button>
            }
            </div>
            {editingNote ?
          <div className="space-y-2">
                <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full text-[11px] bg-background border border-border rounded p-2 min-h-[60px] text-foreground"
              autoFocus
              onClick={(e) => e.stopPropagation()} />
            
                <div className="flex gap-2">
                  <button
                onClick={(e) => {e.stopPropagation();saveNote();}}
                className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90">
                
                    <Check className="w-3 h-3" /> Save
                  </button>
                  <button
                onClick={(e) => {e.stopPropagation();setEditingNote(false);}}
                className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded bg-muted text-muted-foreground hover:bg-muted/80">
                
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div> :

          <p className="text-[11px] text-foreground leading-relaxed whitespace-pre-wrap">
                {currentNote || <span className="text-muted-foreground italic">No notes yet — click Edit to add progress updates</span>}
              </p>
          }
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
            className="flex items-center gap-1 text-primary hover:underline font-medium ml-auto">
            
              <ExternalLink className="w-3 h-3" /> View in Automation Ideas
            </button>
          </div>
        </div>
      }
    </div>);

};

/* ── Main page ── */
const ActionPlanPage = () => {
  const [dbOverrides, setDbOverrides] = useState<Record<string, any>>({});

  // Load overrides from DB (automation_idea_updates) — all fields
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.
      from("automation_idea_updates").
      select("idea_id, action_plan_notes, status, idea, solves, impact, confidence, ease, phase");
      if (data) {
        const map: Record<string, any> = {};
        data.forEach((r: any) => {
          map[r.idea_id] = r;
        });
        setDbOverrides(map);
      }
    };
    load();
  }, []);

  const phaseMap = useMemo(() => buildPhaseMap(dbOverrides), [dbOverrides]);

  const savedNotes: Record<string, string> = {};
  for (const [id, o] of Object.entries(dbOverrides)) {
    if (o.action_plan_notes) savedNotes[id] = o.action_plan_notes;
  }

  const handleSaveNote = async (ideaId: string, note: string) => {
    setDbOverrides((prev) => ({
      ...prev,
      [ideaId]: { ...prev[ideaId], action_plan_notes: note }
    }));
    await supabase.
    from("automation_idea_updates").
    upsert({ idea_id: ideaId, action_plan_notes: note } as any, { onConflict: "idea_id" });
  };

  const getStatus = (idea: AutomationIdea) => idea.status;

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Action Plan</h1>
        <p className="text-sm text-muted-foreground mt-1">Prioritised by findings and ICE scoring</p>
      </div>

      {/* Phases */}
      <div className="space-y-12">
        {phases.map((phase) => {
          const cfg = phaseConfig[phase];
          const areas = phaseMap[phase];
          const orderedAreaNames = areaOrder[phase];
          const allAreaNames = [...orderedAreaNames, ...Object.keys(areas).filter((a) => !orderedAreaNames.includes(a))];
          const phaseEntries = Object.values(areas).flat();
          const phaseDone = phaseEntries.filter((e) => getStatus(e.idea) === "Done").length;

          return (
            <div key={phase}>
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: cfg.color }}>
                  
                  {cfg.number}
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-foreground">
                    {cfg.icon} {phase}
                  </h2>
                  <span className="text-xs text-muted-foreground font-medium">
                    {phaseDone}/{phaseEntries.length} completed
                  </span>
                </div>
              </div>

              {/* Area groups */}
              <div className="space-y-6 ml-11">
                {allAreaNames.map((areaName) => {
                  const entries = areas[areaName];
                  if (!entries || entries.length === 0) return null;

                  return (
                    <div key={areaName}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                        <h3 className="text-xs font-bold" style={{ color: cfg.color }}>
                          {areaName}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {entries.map((entry) =>
                        <ActionCard
                          key={entry.idea.id}
                          entry={entry}
                          savedStatus={{}}
                          savedNotes={savedNotes}
                          onSaveNote={handleSaveNote} />

                        )}
                      </div>
                    </div>);

                })}
              </div>
            </div>);

        })}
      </div>
    </div>);

};

export default ActionPlanPage;