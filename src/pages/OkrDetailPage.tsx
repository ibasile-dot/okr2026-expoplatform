import { useParams, useLocation, useNavigate } from "react-router-dom";
import { okrData } from "@/data/okrData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Okr4Metrics } from "@/components/Okr4Metrics";

const statusColors: Record<string, string> = {
  "on-track": "bg-success/15 text-success border-success/30",
  "at-risk": "bg-warning/15 text-warning border-warning/30",
  "behind": "bg-destructive/15 text-destructive border-destructive/30",
  "not-started": "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  "behind": "Behind",
  "not-started": "Not Started",
};

const OkrDetailPage = () => {
  const { okrId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const okr = okrData.find((o) => o.id === Number(okrId));

  // Derive active tab from URL path
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const tabMap: Record<string, string> = {
    metrics: "metrics",
    roadmap: "roadmap",
    findings: "findings",
    "action-plan": "action-plan",
    "new-initiatives": "new-initiatives",
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          OKR {okr.id}: {okr.shortTitle}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{okr.objective}</p>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b-2 border-border rounded-none gap-0 flex-wrap">
          {[
            "Overview", "Metrics", "Roadmap", "Findings", "Action Plan", "New Initiatives",
            ...(okr.id === 4 ? ["Automation Ideas"] : []),
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

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="section-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">{okr.shortTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Owner</p>
                <p className="text-sm text-foreground">{okr.owners[0]}</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Co-Owner</p>
                <p className="text-sm text-foreground">{okr.owners[1] || "TBC"}</p>
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

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="mt-6">
          {okr.id === 4 ? (
            <Okr4Metrics />
          ) : (
            <div className="section-card p-6">
              <div className="flex items-center justify-between mb-4 p-3 bg-secondary/50 rounded">
                <span className="text-xs font-semibold text-muted-foreground">Template Mode</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50 border-b-2 border-border">
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Department</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Measurement</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Source</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Q1 Baseline</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Q2 Results</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Q3 Results</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Q4 Results</th>
                      <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-secondary/30">
                      {Array(8).fill(null).map((_, i) => (
                        <td key={i} className="p-3 text-muted-foreground italic">—</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="mt-6">
          <div className="section-card p-6">
            <div className="flex items-center justify-between mb-4 p-3 bg-secondary/50 rounded">
              <span className="text-xs font-semibold text-muted-foreground">Template Mode</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b-2 border-border">
                    <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Month/Week</th>
                    <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Initiative</th>
                    <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Owner</th>
                    <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Status</th>
                    <th className="text-left p-3 font-semibold text-foreground whitespace-nowrap">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-secondary/30">
                    {Array(5).fill(null).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">—</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Findings Tab */}
        <TabsContent value="findings" className="mt-6">
          <div className="section-card p-6">
            <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: okr.color }}>Findings</p>
              <p className="text-sm text-muted-foreground italic">Findings will be added as data is collected</p>
            </div>
          </div>
        </TabsContent>

        {/* Action Plan Tab */}
        <TabsContent value="action-plan" className="mt-6">
          <div className="section-card p-6">
            <div className="flex items-center justify-between mb-4 p-3 bg-secondary/50 rounded">
              <span className="text-xs font-semibold text-muted-foreground">0 / 0 items completed</span>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-3">Phase 1 — Core Initiatives</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b-2 border-border">
                    <th className="text-left p-3 font-semibold text-foreground">#</th>
                    <th className="text-left p-3 font-semibold text-foreground">Initiative</th>
                    <th className="text-left p-3 font-semibold text-foreground">Owner</th>
                    <th className="text-left p-3 font-semibold text-foreground">Status</th>
                    <th className="text-left p-3 font-semibold text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-secondary/30">
                    {Array(5).fill(null).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">—</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        {/* New Initiatives Tab */}
        <TabsContent value="new-initiatives" className="mt-6">
          <div className="section-card p-6">
            <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: okr.color }}>New Initiatives</p>
              <p className="text-sm text-muted-foreground italic">New initiatives will be added as they are identified</p>
            </div>
          </div>
        </TabsContent>

        {/* Automation Ideas Tab (OKR 4 only) */}
        {okr.id === 4 && (
          <TabsContent value="automation-ideas" className="mt-6">
            <div className="section-card p-6">
              <div className="bg-secondary/50 p-4 rounded-md border-l-4" style={{ borderLeftColor: okr.color }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: okr.color }}>Automation Ideas</p>
                <p className="text-sm text-muted-foreground italic">Automation ideas will be catalogued here with priority scoring</p>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default OkrDetailPage;
