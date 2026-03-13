import { useParams, useLocation, useNavigate } from "react-router-dom";
import { okrData } from "@/data/okrData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Okr4Metrics } from "@/components/Okr4Metrics";
import { EditableCell } from "@/components/EditableCell";
import { useMetricValues } from "@/hooks/useMetricValues";
import { useOkrAssignments } from "@/hooks/useOkrAssignments";
import { useAuth } from "@/hooks/useAuth";
import OkrRoadmap from "@/components/OkrRoadmap";
import OkrUpdates from "@/components/OkrUpdates";
import Okr4Findings from "@/components/Okr4Findings";
import AutomationIdeasPage from "@/pages/AutomationIdeasPage";
import ActionPlanPage from "@/pages/ActionPlanPage";
import EditableTemplateTable from "@/components/EditableTemplateTable";
import EditableRoadmapTable from "@/components/EditableRoadmapTable";

const SECTION_ROADMAP = 100;
const SECTION_FINDINGS = 200;
const SECTION_ACTION_PLAN = 300;

const tdClass = "p-3 text-sm border-b border-border";
const thClass = "text-left p-3 font-semibold text-foreground whitespace-nowrap text-xs";
const metricColumns = ["dept", "measurement", "source", "q1", "q2", "q3", "q4", "notes"];
const metricHeaders = ["Department", "Measurement", "Source", "Q1 Baseline", "Q2 Results", "Q3 Results", "Q4 Results", "Notes"];

const OkrTemplateMetrics = ({ okrId, readOnly }: { okrId: number; readOnly: boolean }) => {
  const { getValue, saveValue } = useMetricValues(okrId, 1);
  const rows = [0, 1, 2];

  return (
    <div className="section-card p-6">
      {readOnly && (
        <div className="bg-muted/50 border border-border rounded-md px-4 py-2.5 mb-4 text-xs text-muted-foreground">
          🔒 View only — you are not assigned to this OKR.
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50 border-b-2 border-border">
              {metricHeaders.map((h) => (
                <th key={h} className={thClass}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowIdx) => (
              <tr key={rowIdx} className="border-b border-border hover:bg-secondary/30">
                {metricColumns.map((col) => (
                  <EditableCell
                    key={col}
                    value={getValue(rowIdx, col)}
                    onSave={(v) => saveValue(rowIdx, col, v)}
                    className={tdClass}
                    readOnly={readOnly}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OkrDetailPage = () => {
  const { okrId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { canEdit } = useOkrAssignments();
  const okr = okrData.find((o) => o.id === Number(okrId));

  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const tabMap: Record<string, string> = {
    metrics: "metrics",
    roadmap: "roadmap",
    findings: "findings",
    "action-plan": "action-plan",
    updates: "updates",
    "automation-ideas": "automation-ideas",
  };
  const activeTab = tabMap[lastSegment] || "overview";

  if (!okr) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-foreground">OKR not found</h1>
      </div>
    );
  }

  const isAdmin = profile?.is_admin ?? false;
  const readOnly = !isAdmin && !canEdit(okr.id);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            OKR {okr.id}: {okr.shortTitle}
          </h1>
          {readOnly && (
            <span className="text-[10px] font-bold uppercase bg-muted text-muted-foreground px-2 py-1 rounded">
              View Only
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{okr.objective}</p>
      </div>

      <Tabs value={activeTab} onValueChange={(val) => {
        const suffix = val === "overview" ? "" : `/${val}`;
        navigate(`/okr/${okr.id}${suffix}`);
      }} className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b-2 border-border rounded-none gap-0 flex-wrap">
          {[
            "Overview", "Metrics", "Roadmap", "Findings", "Action Plan",
            ...(okr.id === 4 ? ["Automation Ideas"] : []),
            "Updates",
          ].map((tab) => {
            const tabValue = tab.toLowerCase().replace(/ /g, "-");
            const isActive = activeTab === tabValue;
            return (
              <TabsTrigger
                key={tab}
                value={tabValue}
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:shadow-none px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors bg-transparent"
                style={isActive ? { borderBottomColor: okr.color, color: okr.color } : undefined}
              >
                {tab}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="section-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">{okr.shortTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Owner</p>
                <p className="text-sm text-foreground">{okr.owners[0]}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  {okr.owners.length > 2 ? "Co-Owners" : "Co-Owner"}
                </p>
                <p className="text-sm text-foreground">{okr.owners.slice(1).join(", ") || "TBC"}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Objective</p>
                <p className="text-sm text-foreground">{okr.objective}</p>
              </div>
            </div>
            <h3 className="text-base font-semibold text-foreground mt-6 mb-3">Why it Matters</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{okr.whyItMatters}</p>
            <h3 className="text-base font-semibold text-foreground mt-6 mb-3">
              Key Results ({okr.keyResults.length})
            </h3>
            <div className="space-y-2">
              {okr.keyResults.map((kr) => (
                <div key={kr.id} className="flex items-start gap-3 text-sm">
                  <span className="font-mono text-muted-foreground w-5 shrink-0 text-right">{kr.number}</span>
                  <span className="text-foreground flex-1">{kr.description}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-6">
          {okr.id === 4 ? (
            <Okr4Metrics readOnly={readOnly} />
          ) : (
            <OkrTemplateMetrics okrId={okr.id} readOnly={readOnly} />
          )}
        </TabsContent>

        <TabsContent value="roadmap" className="mt-6">
          {okr.id === 4 ? (
            <OkrRoadmap readOnly={readOnly} />
          ) : (
            <EditableTemplateTable
              okrNumber={okr.id}
              sectionKey={SECTION_ROADMAP}
              columns={["month", "initiative", "owner", "status", "notes"]}
              headers={["Month", "Initiative", "Owner", "Status", "Notes"]}
              color={okr.color}
              emptyMessage={'No roadmap items yet.'}
              readOnly={readOnly}
            />
          )}
        </TabsContent>

        <TabsContent value="findings" className="mt-6">
          {okr.id === 4 ? (
            <Okr4Findings readOnly={readOnly} />
          ) : (
            <EditableTemplateTable
              okrNumber={okr.id}
              sectionKey={SECTION_FINDINGS}
              columns={["area", "finding", "source", "impact", "recommendation"]}
              headers={["Area", "Finding", "Source", "Impact", "Recommendation"]}
              color={okr.color}
              emptyMessage={'No findings yet.'}
              readOnly={readOnly}
            />
          )}
        </TabsContent>

        <TabsContent value="action-plan" className="mt-6">
          {okr.id === 4 ? (
            <ActionPlanPage readOnly={readOnly} />
          ) : (
            <EditableTemplateTable
              okrNumber={okr.id}
              sectionKey={SECTION_ACTION_PLAN}
              columns={["phase", "initiative", "owner", "status", "notes"]}
              headers={["Phase", "Initiative", "Owner", "Status", "Notes"]}
              color={okr.color}
              emptyMessage={'No action items yet.'}
              readOnly={readOnly}
            />
          )}
        </TabsContent>

        <TabsContent value="updates" className="mt-6">
          <OkrUpdates okrNumber={okr.id} color={okr.color} readOnly={readOnly} />
        </TabsContent>

        {okr.id === 4 && (
          <TabsContent value="automation-ideas" className="mt-6">
            <AutomationIdeasPage readOnly={readOnly} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default OkrDetailPage;
