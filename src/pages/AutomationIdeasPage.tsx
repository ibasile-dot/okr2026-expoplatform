import { useState, useCallback } from "react";
import { PageHeader } from "@/components/DashboardWidgets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
const iceLabel: Record<IceScore, string> = { S: "Small", M: "Medium", L: "Large" };
const statusOptions: IdeaStatus[] = ["Not Started", "In Progress", "Done", "Blocked", "Cancelled"];

const phaseStyle: Record<string, string> = {
  "Primary Focus": "tag-dark",
  "Quick Wins": "tag",
  "Secondary Focus": "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border border-border text-muted-foreground bg-transparent",
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

const IceDropdown = ({
  value,
  onChange,
}: {
  value: IceScore;
  onChange: (v: IceScore) => void;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as IceScore)}
    className="w-full bg-transparent border border-border rounded px-1.5 py-1 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none text-center"
  >
    {iceOptions.map((o) => (
      <option key={o} value={o}>
        {iceLabel[o]} ({iceValue[o]})
      </option>
    ))}
  </select>
);

const StatusDropdown = ({
  value,
  onChange,
}: {
  value: IdeaStatus;
  onChange: (v: IdeaStatus) => void;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as IdeaStatus)}
    className={`w-full border-0 rounded-full px-2 py-1 text-[11px] font-medium cursor-pointer focus:outline-none ${statusColors[value]}`}
  >
    {statusOptions.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

const DepartmentTable = ({
  ideas,
  onUpdate,
}: {
  ideas: AutomationIdea[];
  onUpdate: (id: string, field: string, value: string) => void;
}) => {
  // Sort by total descending
  const sorted = [...ideas].sort((a, b) => {
    const totalA = iceTotal(a.impact, a.confidence, a.ease);
    const totalB = iceTotal(b.impact, b.confidence, b.ease);
    return totalB - totalA;
  });

  return (
    <div className="section-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[28%]">Idea</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[16%]">What it Solves</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[8%]">Phase</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[6%]">KR(s)</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Impact</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Confidence</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Ease</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[4%]">Total</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[5%]">Priority</th>
              <th className="text-center p-2.5 font-medium text-muted-foreground w-[7%]">Status</th>
              <th className="text-left p-2.5 font-medium text-muted-foreground w-[11%]">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((idea) => {
              const total = iceTotal(idea.impact, idea.confidence, idea.ease);
              const priority = getPriority(total);
              return (
                <tr key={idea.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-2.5 font-medium text-foreground">{idea.idea}</td>
                  <td className="p-2.5 text-muted-foreground">{idea.solves}</td>
                  <td className="p-2.5">
                    <span className={phaseStyle[idea.phase]}>{idea.phase}</span>
                  </td>
                  <td className="p-2.5 text-muted-foreground">
                    {idea.krs.map((kr) => `KR${kr}`).join(", ")}
                  </td>
                  <td className="p-2.5">
                    <IceDropdown
                      value={idea.impact}
                      onChange={(v) => onUpdate(idea.id, "impact", v)}
                    />
                  </td>
                  <td className="p-2.5">
                    <IceDropdown
                      value={idea.confidence}
                      onChange={(v) => onUpdate(idea.id, "confidence", v)}
                    />
                  </td>
                  <td className="p-2.5">
                    <IceDropdown
                      value={idea.ease}
                      onChange={(v) => onUpdate(idea.id, "ease", v)}
                    />
                  </td>
                  <td className="p-2.5 text-center">
                    <span className="font-bold text-sm text-foreground">{total}</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border ${priorityColors[priority]}`}>
                      {priority}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <StatusDropdown
                      value={idea.status}
                      onChange={(v) => onUpdate(idea.id, "status", v)}
                    />
                  </td>
                  <EditableCell
                    value={idea.notes}
                    onSave={(v) => onUpdate(idea.id, "notes", v)}
                    className="p-2.5"
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

const AutomationIdeasPage = () => {
  const [categories, setCategories] = useState<DepartmentCategory[]>(automationCategories);

  const handleUpdate = useCallback(
    (ideaId: string, field: string, value: string) => {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          ideas: cat.ideas.map((idea) =>
            idea.id === ideaId ? { ...idea, [field]: value } : idea
          ),
        }))
      );
    },
    []
  );

  const totalIdeas = categories.reduce((sum, c) => sum + c.ideas.length, 0);
  const doneCount = categories.reduce(
    (sum, c) => sum + c.ideas.filter((i) => i.status === "Done").length,
    0
  );
  const inProgressCount = categories.reduce(
    (sum, c) => sum + c.ideas.filter((i) => i.status === "In Progress").length,
    0
  );

  return (
    <div>
      <PageHeader
        title="Automation Ideas"
        description={`${totalIdeas} ideas across ${categories.length} departments. ${doneCount} done, ${inProgressCount} in progress. Sourced from interviews, surveys, discovery, and AI Automation Spring programme.`}
      />

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
            <DepartmentTable ideas={cat.ideas} onUpdate={handleUpdate} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AutomationIdeasPage;
