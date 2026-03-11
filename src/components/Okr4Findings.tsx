import { SectionTitle, HorizontalBar } from "@/components/DashboardWidgets";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Users, Headphones, Timer, Wrench, AlertTriangle } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  discoverySources,
  deptManualWorkload,
  taskTimeLog,
  tamTimeBreakdown,
  eventSetupComparison,
  adminPanelFindings,
  ticketTrend,
  ticketBreakdownByType,
  ticketByCategory,
  trainingDuration,
  onboardingFriction,
  trainingReadiness,
  engineeringFindings,
  integrationOverhead,
  painPointSeverity,
  priorityRanking,
  CHART_COLORS,
} from "@/data/findingsData";

const tooltipStyle = { fontSize: 11, borderRadius: 6, border: "1px solid hsl(0,0%,91%)" };

// ─── Section wrapper ────────────────────────────────────────
const FindingSection = ({
  krNumber,
  title,
  icon,
  rationale,
  children,
}: {
  krNumber: number;
  title: string;
  icon: React.ReactNode;
  rationale: string;
  children: React.ReactNode;
}) => (
  <div className="mb-14">
    <div className="flex items-start gap-3 mb-1">
      <span className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shrink-0">
        {krNumber}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-bold text-foreground">{title}</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-3xl">{rationale}</p>
      </div>
    </div>
    <div className="ml-11 mt-4">{children}</div>
  </div>
);

// ─── Stat card ──────────────────────────────────────────────
const MiniStat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="section-card p-4 text-center">
    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
  </div>
);

// ─── Key insight callout ────────────────────────────────────
const Insight = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-md border border-accent/20 mt-4">
    <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
    <p className="text-xs text-foreground font-medium leading-relaxed">{text}</p>
  </div>
);

const Okr4Findings = () => {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          HEADER & METHODOLOGY
          ═══════════════════════════════════════════════════════ */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground">Discovery Findings & Rationale</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
          Complete findings from the operational efficiency discovery. Each section maps to a Key Result, showing the data
          collected, what it tells us, and why it drives our prioritisation.
        </p>
      </div>

      {/* Methodology */}
      <div className="section-card p-5 mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/60 mb-3">Discovery Methodology</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {discoverySources.map((s) => (
            <div key={s.name} className="bg-secondary/50 rounded p-2.5 text-center">
              <p className="text-[10px] font-bold text-foreground leading-snug">{s.name}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{s.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          EXECUTIVE SUMMARY — Key Numbers
          ═══════════════════════════════════════════════════════ */}
      <SectionTitle>Executive Summary</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <MiniStat label="Primary Constraint" value="30–40%" sub="TAM time on admin panel" />
        <MiniStat label="Workarounds Catalogued" value="21" sub="Active workarounds documented" />
        <MiniStat label="TAM Support Tickets" value="254/mo" sub="Jan–Feb 2026 (up from 164)" />
        <MiniStat label="Integration Hours" value="1,044h" sub="Manual integration worklogs" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          KR1 — Manual Process Reduction
          ═══════════════════════════════════════════════════════ */}
      <FindingSection
        krNumber={1}
        title="KR1: Reduce Manual Processes by ≥50% per Department"
        icon={<FileText className="w-4 h-4 text-primary" />}
        rationale="To understand the baseline, we ran a company-wide Productivity & AI Adoption Survey and asked each department to log their top manual tasks for 1 week. The survey showed perception; the time log showed reality."
      >
        {/* Survey results */}
        <SectionTitle>What Our People Are Telling Us — Survey Results</SectionTitle>
        <div className="section-card p-6 mb-6">
          <p className="text-[10px] text-muted-foreground mb-4">
            Source: Productivity, Automation Tools & AI Adoption Survey — February 2026
          </p>
          <div className="space-y-3">
            {deptManualWorkload.map((d) => (
              <div key={d.department}>
                <HorizontalBar label={d.department} value={d.pct} />
                <p className="text-[10px] text-muted-foreground ml-0.5 mt-0.5">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Task time log */}
        <SectionTitle>1-Week Manual Task Time Log — Actual Data</SectionTitle>
        <div className="section-card overflow-hidden mb-6">
          <div className="p-4 bg-secondary/30 border-b border-border">
            <p className="text-xs text-muted-foreground">
              19 people across 4 departments logged their top manual tasks for 1 week.
              <span className="font-semibold text-foreground ml-1">
                Result: {taskTimeLog.summary.totalHrsWeek} hrs/week → ~{taskTimeLog.summary.estHrsMonth} hrs/month
              </span>
            </p>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 font-semibold text-muted-foreground">Department</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">People</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Tasks Logged</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Total Hrs/Wk</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Avg/Person</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Est. Monthly</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Top Time Sinks</th>
              </tr>
            </thead>
            <tbody>
              {taskTimeLog.byDepartment.map((d) => (
                <tr key={d.department} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-3 font-semibold text-foreground">{d.department}</td>
                  <td className="p-3 text-muted-foreground">{d.people}</td>
                  <td className="p-3 text-muted-foreground">{d.tasksLogged}</td>
                  <td className="p-3 font-mono text-foreground">{d.totalHrs.toFixed(1)}</td>
                  <td className="p-3 font-mono text-muted-foreground">{d.avgPerPerson.toFixed(1)}</td>
                  <td className="p-3 font-mono text-foreground">{d.estMonthly.toFixed(0)}</td>
                  <td className="p-3 text-muted-foreground">{d.topTask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top individual tasks */}
        <SectionTitle>Biggest Individual Time Sinks</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {taskTimeLog.topTasks.map((t) => (
            <div key={t.person} className="section-card p-4 border-l-4 border-accent">
              <p className="text-xs font-bold text-foreground">{t.task}</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {t.person} ({t.dept}) — <span className="font-mono font-semibold text-foreground">{t.hrsWeek} hrs/week</span>
              </p>
            </div>
          ))}
        </div>

        <Insight text="Finance has the highest manual workload per person (3 hrs/week avg) despite having the smallest team. Sales has the highest absolute volume (52 hrs/month est.) driven by a single person's CRM management burden. These are the top automation candidates for Phase 3." />
      </FindingSection>

      {/* ═══════════════════════════════════════════════════════
          KR2 — Event Setup & Management
          ═══════════════════════════════════════════════════════ */}
      <FindingSection
        krNumber={2}
        title="KR2: Reduce Event Setup Manual Effort by ≥40%"
        icon={<Timer className="w-4 h-4 text-primary" />}
        rationale="TAM interviews and direct observation revealed the admin panel as the single biggest bottleneck. We mapped where TAM time goes and compared recurring vs new customer effort to understand the gap."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* TAM Time Pie */}
          <div>
            <SectionTitle>TAM Time Distribution (Estimated)</SectionTitle>
            <div className="section-card p-6">
              <div className="flex items-center gap-6">
                <div className="w-44 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={tamTimeBreakdown} cx="50%" cy="50%" innerRadius={38} outerRadius={68} dataKey="value" stroke="none">
                        {tamTimeBreakdown.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5 flex-1">
                  {tamTimeBreakdown.map((t, i) => (
                    <div key={t.name} className="flex items-center gap-2 text-xs">
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: CHART_COLORS[i] }} />
                      <span className="text-foreground font-medium flex-1">{t.name}</span>
                      <span className="font-mono text-muted-foreground">{t.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recurring vs New */}
          <div>
            <SectionTitle>Recurring vs New Customer Effort</SectionTitle>
            <div className="section-card p-6">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eventSetupComparison} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                    <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="recurring" fill="hsl(237, 68%, 33%)" radius={[4, 4, 0, 0]} name="Recurring" />
                    <Bar dataKey="newCustomer" fill="hsl(44, 100%, 58%)" radius={[4, 4, 0, 0]} name="New Customer" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                New customers require 36% more effort across all metrics. Recurring events still lack smart defaults.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Panel Breakdown */}
        <SectionTitle>Admin Panel — The Primary Bottleneck</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="section-card p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Back-end Configuration</p>
            <p className="text-lg font-bold text-foreground">{adminPanelFindings.configSteps} manual steps</p>
            <p className="text-xs text-muted-foreground mt-1">
              Registration conditional logic, matchmaking rules, API config, exhibitor setup. No guided wizards or templates.
            </p>
          </div>
          <div className="section-card p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Front-end — Website Builder</p>
            <p className="text-lg font-bold text-foreground">{adminPanelFindings.unusedFeatures} features unused</p>
            <p className="text-xs text-muted-foreground mt-1">
              TAMs use ChatGPT + CSS repos as workarounds. No feature-based wizard — all features shown regardless of event type.
            </p>
          </div>
          <div className="section-card p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">App Submission</p>
            <p className="text-lg font-bold text-foreground">{adminPanelFindings.appSubmission}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Both iOS & Android questionnaires fully manual. Quick win: pre-fill automation.
            </p>
          </div>
          <div className="section-card p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">App Builder — Mobile Bug Time</p>
            <p className="text-lg font-bold text-foreground">{adminPanelFindings.mobileBugTime}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Heavy maintenance overhead reduces capacity for new features.
            </p>
          </div>
        </div>

        <Insight text="The admin panel consumes 30–40% of TAM time (the single largest time sink) and generates 40% of support tickets. This is why it's the #1 focus of Phase 1 in the Action Plan. Solving this unlocks capacity across KR2, KR3, and KR4 simultaneously." />
      </FindingSection>

      {/* ═══════════════════════════════════════════════════════
          KR3 — Support Tickets
          ═══════════════════════════════════════════════════════ */}
      <FindingSection
        krNumber={3}
        title="KR3: Decrease Support Tickets by ≥30%"
        icon={<Headphones className="w-4 h-4 text-primary" />}
        rationale="We analysed JSM Desk ticket volume, categorised themes, and mapped root causes. The data shows tickets are rising — but this is partly due to JSM adoption. The key finding is that 40% of tickets trace back to admin panel issues, confirming KR2 as the root cause."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Ticket trend */}
          <div>
            <SectionTitle>Support Ticket Trend</SectionTitle>
            <div className="section-card p-6">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketTrend} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                    <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="tickets" fill="hsl(237, 68%, 33%)" radius={[4, 4, 0, 0]} name="Tickets/Month" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                JSM adoption still increasing — volume expected to rise before stabilising.
              </p>
            </div>
          </div>

          {/* Ticket by type */}
          <div>
            <SectionTitle>Ticket Breakdown by Type</SectionTitle>
            <div className="section-card p-6">
              <div className="flex items-center gap-6">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={ticketBreakdownByType} cx="50%" cy="50%" innerRadius={35} outerRadius={65} dataKey="value" stroke="none">
                        {ticketBreakdownByType.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5 flex-1">
                  {ticketBreakdownByType.map((t, i) => (
                    <div key={t.name} className="flex items-center gap-2 text-xs">
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: CHART_COLORS[i] }} />
                      <span className="text-foreground font-medium flex-1">{t.name}</span>
                      <span className="font-mono text-muted-foreground">{t.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3">
                TAM Support tickets account for 40% — the largest category.
              </p>
            </div>
          </div>
        </div>

        {/* Top ticket themes */}
        <SectionTitle>Top TAM Support Ticket Themes</SectionTitle>
        <div className="section-card p-6 mb-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketByCategory} layout="vertical" barCategoryGap="18%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,91%)" />
                <XAxis type="number" tick={{ fontSize: 10 }} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={130} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={tooltipStyle} />
                <Bar dataKey="pct" fill="hsl(44, 100%, 58%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Insight text="Login/password reset (19.3%) and exhibitor/booth setup (15.9%) are the top themes — both are self-serve addressable. This directly feeds the Action Plan's self-serve content and AI triage initiatives." />
      </FindingSection>

      {/* ═══════════════════════════════════════════════════════
          KR4 — Customer Onboarding
          ═══════════════════════════════════════════════════════ */}
      <FindingSection
        krNumber={4}
        title="KR4: Reduce Onboarding Time by ≥35%"
        icon={<Users className="w-4 h-4 text-primary" />}
        rationale="We used Fathom call analysis to study training sessions and identify friction patterns. The data revealed that a significant portion of 'training' time is actually troubleshooting — and that self-serve content could address the majority of repeated questions."
      >
        {/* Training duration by complexity */}
        <SectionTitle>Training Duration by Event Complexity</SectionTitle>
        <div className="section-card overflow-hidden mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 font-semibold text-muted-foreground">Event Type</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Recorded Training</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Ad Hoc Emails</th>
                <th className="text-left p-3 font-semibold text-foreground">Total Time</th>
              </tr>
            </thead>
            <tbody>
              {trainingDuration.map((t) => (
                <tr key={t.type} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-3 font-semibold text-foreground">{t.type}</td>
                  <td className="p-3 text-muted-foreground">{t.recorded}</td>
                  <td className="p-3 text-muted-foreground">{t.adHoc}</td>
                  <td className="p-3 font-bold text-foreground">{t.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Friction analysis */}
        <SectionTitle>Fathom Call Analysis — Friction Patterns</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <MiniStat label="Friction Points" value={String(onboardingFriction.frictionPoints)} />
          <MiniStat label="Time Sink Categories" value={String(onboardingFriction.timeSinkCategories)} />
          <MiniStat label="Recurring Questions" value={String(onboardingFriction.recurringQuestions)} />
          <MiniStat label="Neg. Sentiment Themes" value={String(onboardingFriction.negativeSentimentThemes)} />
        </div>

        {/* Self-serve readiness */}
        <SectionTitle>Training & Self-serve Readiness</SectionTitle>
        <div className="section-card p-6 mb-4">
          <div className="space-y-3">
            {trainingReadiness.map((d) => (
              <HorizontalBar key={d.label} label={d.label} value={d.value} />
            ))}
          </div>
          <div className="pt-3 border-t border-border mt-3">
            <div className="flex items-center gap-3">
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-foreground">100</p>
                <p className="text-[10px] text-muted-foreground">Videos created</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-muted-foreground">300</p>
                <p className="text-[10px] text-muted-foreground">Videos needed</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-2xl font-bold text-primary">33%</p>
                <p className="text-[10px] text-muted-foreground">Coverage</p>
              </div>
            </div>
          </div>
        </div>

        <Insight text={`Top finding: ${onboardingFriction.topFinding}. ${onboardingFriction.trainingWaste}. Building the video library and addressing admin panel confusion will directly reduce onboarding time.`} />
      </FindingSection>

      {/* ═══════════════════════════════════════════════════════
          KR5 — Engineering Maintenance
          ═══════════════════════════════════════════════════════ */}
      <FindingSection
        krNumber={5}
        title="KR5: Engineering Maintenance Reduced by ≥25%"
        icon={<Wrench className="w-4 h-4 text-primary" />}
        rationale="We analysed Jira worklogs, bug-to-feature time ratios, and identified data quality gaps. The findings reveal both quick wins (backlog purge, Team field enforcement) and structural issues (mobile bug time)."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MiniStat label="Estimated Lost" value={engineeringFindings.estimatedLostHrs} sub="per month" />
          <MiniStat label="Ghost Bugs" value={String(engineeringFindings.ghostBugs)} sub={`from ${engineeringFindings.ghostBugPeriod}`} />
          <MiniStat label="Missing Team Field" value={String(engineeringFindings.missingTeamField)} sub="tasks unattributed" />
          <MiniStat label="Mobile Bug Time" value={`${engineeringFindings.mobileBugPct}%`} sub={`target: ≤${engineeringFindings.healthyBenchmark}%`} />
        </div>

        {/* Integration overhead */}
        <SectionTitle>Integration Overhead</SectionTitle>
        <div className="section-card p-6 mb-4">
          <div className="flex items-center gap-8">
            <div className="text-center shrink-0">
              <p className="text-4xl font-bold text-foreground">{integrationOverhead.totalHours.toLocaleString()}h</p>
              <p className="text-xs text-muted-foreground mt-1">Total hours in manual integrations</p>
            </div>
            <div className="flex-1 space-y-2">
              {integrationOverhead.findings.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CHART_COLORS[i] }} />
                  <span className="text-foreground font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Insight text="Closing 178 ghost bugs and enforcing the Team field are immediate quick wins (Phase 2). Mobile bug time at 44% vs 30% benchmark indicates a structural issue requiring longer-term investment." />
      </FindingSection>

      {/* ═══════════════════════════════════════════════════════
          RATIONALE — How It All Connects
          ═══════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <SectionTitle>How It All Connects — Priority Rationale</SectionTitle>

        {/* Pain point radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="section-card p-6">
            <p className="text-xs font-semibold text-foreground mb-3">Pain Point Severity by Area</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={painPointSeverity}>
                  <PolarGrid stroke="hsl(0,0%,85%)" />
                  <PolarAngleAxis dataKey="area" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="Severity" dataKey="severity" stroke="hsl(237, 68%, 33%)" fill="hsl(237, 68%, 33%)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rationale explanation */}
          <div className="section-card p-6">
            <p className="text-xs font-semibold text-foreground mb-3">The Logic Chain</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <div>
                  <p className="text-xs font-bold text-foreground">Admin Panel is the #1 bottleneck</p>
                  <p className="text-[10px] text-muted-foreground">30–40% of TAM time, 64 manual steps, 40% of support tickets trace back here</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <div>
                  <p className="text-xs font-bold text-foreground">Fixing admin panel solves multiple KRs at once</p>
                  <p className="text-[10px] text-muted-foreground">Reduces event setup time (KR2), support tickets (KR3), and onboarding friction (KR4)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <div>
                  <p className="text-xs font-bold text-foreground">Quick wins run in parallel</p>
                  <p className="text-[10px] text-muted-foreground">Engineering backlog purge, Jira field enforcement, Automation Days — immediate value while Phase 1 progresses</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
                <div>
                  <p className="text-xs font-bold text-foreground">Department automation follows constraint resolution</p>
                  <p className="text-[10px] text-muted-foreground">Sales, Marketing, Finance automation (KR1) is Phase 3 — important but not the primary bottleneck</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority ranking table */}
        <SectionTitle>Priority Ranking — Where TAM Time Goes</SectionTitle>
        <div className="section-card overflow-hidden mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-3 font-medium text-muted-foreground w-12">#</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Area</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Impact</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Validation</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Feeds KR</th>
              </tr>
            </thead>
            <tbody>
              {priorityRanking.map((p) => (
                <tr key={p.rank} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono font-bold text-foreground">{p.rank}</td>
                  <td className="p-3 font-medium text-foreground">{p.area}</td>
                  <td className="p-3 text-muted-foreground">{p.impact}</td>
                  <td className="p-3 font-mono text-muted-foreground">{p.validation}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {p.kr.map((k) => (
                        <span key={k} className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent/20 text-accent">KR{k}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Connection to action plan */}
        <div className="section-card p-5 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-foreground">These findings directly shaped the 3-phase Action Plan</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Phase 1: Admin Panel (the constraint) → Phase 2: Quick Wins (parallel value) → Phase 3: Department Automation (non-bottleneck)
              </p>
            </div>
            <Link
              to="/okr/4/action-plan"
              className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground text-xs font-semibold rounded hover:opacity-90 transition-opacity shrink-0"
            >
              View Action Plan <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Okr4Findings;
