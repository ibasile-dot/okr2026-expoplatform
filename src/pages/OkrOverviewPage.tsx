import { okrData } from "@/data/okrData";
import { PageHeader } from "@/components/DashboardWidgets";
import { OkrSummaryCard } from "@/components/OkrSummaryCard";

const OkrOverviewPage = () => {
  return (
    <div>
      <PageHeader
        title="2026 OKRs — Overview"
        description="What must be true by end of 2026 for ExpoPlatform to be an obvious category winner?" />
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="section-card p-5 flex items-center gap-4">
          <div className="phase-indicator text-lg w-10 h-10">5</div>
          <div>
            <p className="text-2xl font-bold text-foreground">OKRs</p>
            <p className="text-xs text-muted-foreground">Across revenue, product, platform, operations & data</p>
          </div>
        </div>
        <div className="section-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-lg font-bold">
            {okrData.reduce((sum, okr) => sum + okr.keyResults.length, 0)}
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">Key Results</p>
            <p className="text-xs text-muted-foreground">Measurable targets tracked quarterly</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {okrData.map((okr) =>
        <OkrSummaryCard key={okr.id} okr={okr} />
        )}
      </div>
    </div>);

};

export default OkrOverviewPage;