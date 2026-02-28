import { MetricCard, ProgressBar, PageHeader } from "@/components/DashboardWidgets";
import { Target, Users, Wrench, Clock, TrendingDown, Zap } from "lucide-react";

const keyResults = [
  { id: "KR1", label: "Manual process time ≥50% reduction per dept", progress: 25, status: "Discovery complete, baseline established" },
  { id: "KR2", label: "Event setup effort ≥40% reduction for organisers", progress: 15, status: "Baseline data collection in progress" },
  { id: "KR3", label: "Support tickets ≥30% decrease", progress: 10, status: "JSM adoption still increasing — baseline: 164/month avg" },
  { id: "KR4", label: "Onboarding time ≥35% reduction", progress: 20, status: "Fathom analysis done, 6 friction points identified" },
  { id: "KR5", label: "Engineering maintenance ≥25% reduction", progress: 10, status: "Team field enforcement in progress" },
];

const priorities = [
  { rank: "P1", name: "Admin Panel Setup & Config", impact: "30-40% TAM time", validation: "9/10 sources", color: "border-l-destructive" },
  { rank: "P2", name: "Repetitive Manual Admin Tasks", impact: "Hrs/day cumulative", validation: "8/10 sources", color: "border-l-destructive" },
  { rank: "P3", name: "Manual Integration Workarounds", impact: "1,044h logged", validation: "7/10 sources", color: "border-l-warning" },
  { rank: "P4", name: "Fragmented Tools & Coordination", impact: "5-7 tools per TAM", validation: "7/10 sources", color: "border-l-warning" },
  { rank: "P5", name: "Client Comms & Training", impact: "15-20% TAM time", validation: "6/10 sources", color: "border-l-info" },
  { rank: "P6", name: "Analytics & Reporting", impact: "10% TAM time", validation: "5/10 sources", color: "border-l-info" },
  { rank: "P7", name: "Knowledge Siloing", impact: "Cross-cutting", validation: "6/10 sources", color: "border-l-muted-foreground" },
];

const deptManualLoad = [
  { dept: "Finance", manual: 80 },
  { dept: "HR", manual: 77 },
  { dept: "Marketing", manual: 66 },
  { dept: "Engineering", manual: 42 },
  { dept: "Eng Mgmt", manual: 20 },
];

const upcomingActions = [
  { action: "Call with Pedro — API team re: HR automation & AI agent for admin panel", date: "Next week" },
  { action: "Automation Days execution — easy wins", date: "19-20 March" },
  { action: "TAM survey: recurring bugs, problematic areas, workarounds", date: "w/c March 2" },
  { action: "Jira Theme Analysis with Rovo agent", date: "w/c March 9" },
  { action: "Formulate action plan from survey + Rovo analysis", date: "w/c March 16" },
];

const Index = () => {
  return (
    <div>
      <PageHeader
        title="OKR4 — Automation of Manual Processes"
        description="Remove operational friction by automating repeatable internal and customer-facing workflows · ExpoPlatform 2026"
      />

      {/* KR Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard title="Key Results" value="5" subtitle="Tracking towards end of 2026" icon={<Target className="w-4 h-4" />} />
        <MetricCard title="TAM Primary Constraint" value="30-40%" subtitle="Time on admin panel setup" icon={<Clock className="w-4 h-4" />} />
        <MetricCard title="Workarounds Catalogued" value="21" subtitle="Active workarounds documented" icon={<Wrench className="w-4 h-4" />} />
        <MetricCard title="Automation Ideas" value="40+" subtitle="Across 7 departments" icon={<Zap className="w-4 h-4" />} />
        <MetricCard title="Avg JSM Tickets" value="164/mo" subtitle="2025 avg (254 in Jan-Feb 2026)" icon={<TrendingDown className="w-4 h-4" />} />
      </div>

      {/* KR Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Key Results Progress
          </h2>
          <div className="space-y-5">
            {keyResults.map((kr) => (
              <div key={kr.id}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold font-mono text-primary">{kr.id}</span>
                  <span className="text-xs text-foreground font-medium">{kr.label}</span>
                </div>
                <ProgressBar value={kr.progress} />
                <p className="text-[11px] text-muted-foreground mt-1">{kr.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Department Manual Load */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Department Manual Workload (% from survey)
          </h2>
          <div className="space-y-4">
            {deptManualLoad.map((d) => (
              <ProgressBar key={d.dept} value={d.manual} label={d.dept} />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 italic">
            Source: Productivity, Automation Tools & AI Adoption Survey — February 2026
          </p>
        </div>
      </div>

      {/* Priority Areas & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            TAM Time Sink Priorities (Focus: TAM team first)
          </h2>
          <div className="space-y-2">
            {priorities.map((p) => (
              <div key={p.rank} className={`flex items-center gap-4 p-3 rounded-lg bg-muted/40 border-l-4 ${p.color}`}>
                <span className="text-xs font-bold font-mono text-primary w-8">{p.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.impact}</p>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono shrink-0">{p.validation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Upcoming Actions
          </h2>
          <div className="space-y-3">
            {upcomingActions.map((a, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/40 border border-border/50">
                <p className="text-xs font-medium text-foreground leading-relaxed">{a.action}</p>
                <p className="text-[11px] text-primary font-mono mt-1">{a.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
