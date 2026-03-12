import { useState } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { actionPlanPhases, ActionItem } from "@/data/actionPlanData";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Users, Target } from "lucide-react";

const phaseConfig = {
  "Primary Focus": {
    color: "hsl(280, 50%, 50%)",
    bg: "bg-[hsl(280,50%,50%)]",
    bgLight: "bg-[hsl(280,50%,95%)]",
    text: "text-[hsl(280,50%,50%)]",
    border: "border-[hsl(280,50%,50%)]",
    label: "🎯 Primary Focus",
  },
  "Quick Wins": {
    color: "hsl(200, 60%, 45%)",
    bg: "bg-[hsl(200,60%,45%)]",
    bgLight: "bg-[hsl(200,60%,95%)]",
    text: "text-[hsl(200,60%,45%)]",
    border: "border-[hsl(200,60%,45%)]",
    label: "⚡ Quick Wins",
  },
  "Secondary Focus": {
    color: "hsl(44, 100%, 45%)",
    bg: "bg-[hsl(44,100%,45%)]",
    bgLight: "bg-[hsl(44,100%,95%)]",
    text: "text-[hsl(44,100%,45%)]",
    border: "border-[hsl(44,100%,45%)]",
    label: "📋 Secondary Focus",
  },
};

const statusConfig: Record<string, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/15 text-warning-foreground border border-warning/30",
  "Done": "bg-success/15 text-success border border-success/30",
  "Blocked": "bg-destructive/15 text-destructive border border-destructive/30",
};

const KrBadge = ({ kr }: { kr: number }) => (
  <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded border bg-primary/10 text-primary border-primary/20">
    KR{kr}
  </span>
);

const ActionItemCard = ({ item, phaseKey }: { item: ActionItem; phaseKey: string }) => {
  const [expanded, setExpanded] = useState(false);
  const config = phaseConfig[phaseKey as keyof typeof phaseConfig];

  return (
    <div className="section-card p-4 hover:shadow-sm transition-shadow">
      <div
        className="flex items-start gap-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="mt-0.5 shrink-0 text-muted-foreground">
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs font-bold text-foreground leading-snug">{item.title}</h4>
            <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusConfig[item.status]}`}>
              {item.status}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {item.krs.map((kr) => (
              <KrBadge key={kr} kr={kr} />
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="ml-5 mt-3 space-y-3">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">What this entails</p>
            <ul className="space-y-1">
              {item.detail.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-foreground/40 mt-1.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1 border-t border-border">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {item.owner}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" /> {item.source}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionPlanPage = () => {
  return (
    <div>
      <PageHeader
        title="Action Plan"
        description="Prioritised by findings and impact. Primary Focus items solve the biggest bottlenecks; Quick Wins deliver immediate value; Secondary Focus items follow once constraints are cleared."
      />

      <div className="space-y-14">
        {actionPlanPhases.map((phase) => {
          const config = phaseConfig[phase.phase];
          const totalItems = phase.streams.reduce((acc, s) => acc + s.items.length, 0);
          const doneItems = phase.streams.reduce(
            (acc, s) => acc + s.items.filter((i) => i.status === "Done").length,
            0
          );
          const inProgressItems = phase.streams.reduce(
            (acc, s) => acc + s.items.filter((i) => i.status === "In Progress").length,
            0
          );

          return (
            <div key={phase.phase}>
              {/* Phase Header */}
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: config.color }}
                >
                  {phase.phase === "Primary Focus" ? "1" : phase.phase === "Quick Wins" ? "2" : "3"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-foreground">{config.label}</h2>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{totalItems} items</span>
                      {doneItems > 0 && (
                        <span className="text-success font-medium">{doneItems} done</span>
                      )}
                      {inProgressItems > 0 && (
                        <span className="font-medium" style={{ color: "hsl(44, 100%, 45%)" }}>
                          {inProgressItems} in progress
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{phase.subtitle}</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mb-6 ml-11 max-w-3xl leading-relaxed">
                {phase.rationale}
              </p>

              {/* Streams */}
              <div className="space-y-6 ml-11">
                {phase.streams.map((stream) => (
                  <div key={stream.name}>
                    <h3
                      className="text-xs font-bold mb-3 flex items-center gap-2"
                      style={{ color: config.color }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      {stream.name}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {stream.items.map((item) => (
                        <ActionItemCard key={item.title} item={item} phaseKey={phase.phase} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActionPlanPage;
