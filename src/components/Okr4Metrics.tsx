import { useState } from "react";

const thClass = "text-left p-3 font-semibold text-foreground whitespace-nowrap text-xs";
const tdClass = "p-3 text-sm border-b border-border";

const krTabs = [
  { id: "kr1", label: "KR1 — Manual Process Time" },
  { id: "kr2", label: "KR2 — Event Setup Effort" },
  { id: "kr3", label: "KR3 — Support Tickets" },
  { id: "kr4", label: "KR4 — Onboarding Time" },
  { id: "kr5", label: "KR5 — Engineering Maintenance" },
];

export const Okr4Metrics = () => {
  const [activeKR, setActiveKR] = useState("kr1");

  return (
    <div className="section-card p-6">
      {/* KR Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {krTabs.map((kr) => (
          <button
            key={kr.id}
            onClick={() => setActiveKR(kr.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeKR === kr.id
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {kr.label}
          </button>
        ))}
      </div>

      {/* KR1 */}
      {activeKR === "kr1" && (
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            KR1 — Reduce manual process time ≥50% per department
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b-2 border-border">
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Measurement</th>
                  <th className={thClass}>Source</th>
                  <th className={thClass}>Q1 Baseline</th>
                  <th className={thClass}>Q2 Results</th>
                  <th className={thClass}>Q3 Results</th>
                  <th className={thClass}>Q4 Results</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Finance</td>
                  <td className={tdClass} rowSpan={6} style={{ verticalAlign: "middle" }}>% of time spent on manual tasks</td>
                  <td className={tdClass} rowSpan={5} style={{ verticalAlign: "middle" }}>Survey / Tracking 1 week tasks sheet</td>
                  <td className={tdClass}>80% manual</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Invoicing, reconciliation, payment follow-ups, commission calculations, client DB updates</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>HR</td>
                  <td className={tdClass}>77% manual</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Sourcing, scheduling, offer admin, Drata device compliance</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Marketing</td>
                  <td className={tdClass}>66% manual</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Maria has 60+ automations needing restructure. PPC optimisation, keyword tracking</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Sales</td>
                  <td className={tdClass}>55% manual</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Manual outbound, outsourcing new clients, contacting, analysis of multiple touchpoints</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>42% manual</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>400–500 hrs/month lost in Jan due to missing Team field. Was mandatory pre-Autumn 2025</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Operations</td>
                  <td className={tdClass}>Survey<br/><br/><br/>Jira (Worlogs, feature requests, tickets)<br/><br/><br/>Discovery Meetings<br/><br/>PM tools logs (Clickup/Trello/Notion)<br/><br/>No. of events they have now vs. later</td>
                  <td className={tdClass}>80% manual</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Admin panel setup 30-40%, Client training 15-20%, Troubleshooting 10-15%, Registration/matchmaking 10-15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KR2 */}
      {activeKR === "kr2" && (
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            KR2 — Reduce event setup & management manual effort ≥40% for organisers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b-2 border-border">
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Measurement</th>
                  <th className={thClass}>Source</th>
                  <th className={thClass}>Q1 Baseline</th>
                  <th className={thClass}>Q2 Results</th>
                  <th className={thClass}>Q3 Results</th>
                  <th className={thClass}>Q4 Results</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Clients</td>
                  <td className={tdClass}>Time spent on trainings (hrs)</td>
                  <td className={tdClass}>Fathom / Discovery Meetings</td>
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <div><span className="font-medium">Complex:</span> 15–23hrs</div>
                      <div><span className="font-medium">Medium:</span> 12–18hrs</div>
                      <div><span className="font-medium">Small:</span> 6–9hrs</div>
                    </div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Includes recorded training + ad hoc emails</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Product</td>
                  <td className={tdClass}>Time spent on a specific feature/task (hrs)</td>
                  <td className={tdClass}>Admin Panel</td>
                  <td className={tdClass}>Not available until 2027</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Feature not in the product roadmap until 2027</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Operations</td>
                  <td className={tdClass}>Organiser feedback</td>
                  <td className={tdClass}>Discovery Calls</td>
                  <td className={tdClass}>Not available until Q2</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Meeting with organisers — to start</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Operations</td>
                  <td className={tdClass}>Time spent by Ilaria to set up Admin Panel (hrs)</td>
                  <td className={tdClass}>Admin Panel</td>
                  <td className={tdClass}>Rough estimate (not available until Q2)</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Record time it takes, share feedback on topics, videos, guides needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KR3 */}
      {activeKR === "kr3" && (
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            KR3 — Decrease customer support tickets related to manual workarounds ≥30%
          </h3>
          <p className="text-xs text-muted-foreground mb-4 italic">
            Note: Initiatives for improving KR2 and KR4 will lead to improvement of KR3 as well
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b-2 border-border">
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Measurement</th>
                  <th className={thClass}>Source</th>
                  <th className={thClass}>Q1 Baseline (Jan–Dec 2025)</th>
                  <th className={thClass}>Q2 Results</th>
                  <th className={thClass}>Q3 Results</th>
                  <th className={thClass}>Q4 Results</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Clients</td>
                  <td className={tdClass}>Total real tickets/month (excl. SPAM)</td>
                  <td className={tdClass}>Jira Service Management</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">2025 avg:</span> 164/month</div>
                    <div className="text-muted-foreground text-xs mt-1">Jan–Feb 2026: 254/month (+55%)</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Still enforcing JSM adoption — tickets likely to increase before decreasing</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Clients</td>
                  <td className={tdClass}>Tickets per event</td>
                  <td className={tdClass}>Jira Service Management</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">2025:</span> 18.2</div>
                    <div className="text-muted-foreground text-xs mt-1">Jan–Feb 2026: 28.2</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>
                    <div className="text-xs space-y-0.5">
                      <div className="font-medium">Top Themes:</div>
                      <div>1. Login/password reset</div>
                      <div>2. Mobile app build/config</div>
                      <div>3. Exhibitor/booth profile setup</div>
                      <div>4. CSS/Branding customisation</div>
                      <div>5. Registration/Badge config</div>
                      <div>6. Lead retrieval/integration</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KR4 */}
      {activeKR === "kr4" && (
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            KR4 — Reduce average onboarding time for new customers ≥35%
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b-2 border-border">
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Measurement</th>
                  <th className={thClass}>Source</th>
                  <th className={thClass}>Q1 Baseline</th>
                  <th className={thClass}>Q2 Results</th>
                  <th className={thClass}>Q3 Results</th>
                  <th className={thClass}>Q4 Results</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Clients</td>
                  <td className={tdClass}>Sentiment analysis — onboarding friction patterns</td>
                  <td className={tdClass}>Fathom</td>
                  <td className={tdClass}>
                    <div className="space-y-1 text-xs">
                      <div>6 friction points identified</div>
                      <div>5 time sink categories</div>
                      <div>8 recurring questions</div>
                      <div>5 negative sentiment themes</div>
                    </div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>72% of repeated questions addressable via self-serve. Platform capability confusion is #1 issue</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Clients</td>
                  <td className={tdClass}>Time spent on trainings (hrs)</td>
                  <td className={tdClass}>Fathom / Discovery Meetings</td>
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <div><span className="font-medium">Complex:</span> 15–23hrs</div>
                      <div><span className="font-medium">Medium:</span> 12–18hrs</div>
                      <div><span className="font-medium">Small:</span> 6–9hrs</div>
                    </div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Includes recorded training + ad hoc emails</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Operations</td>
                  <td className={tdClass}>Time spent by Ilaria to set up Admin Panel (hrs)</td>
                  <td className={tdClass}>Admin Panel</td>
                  <td className={tdClass}>Rough estimate (not available until Q2)</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Record time, share feedback on topics, videos, guides needed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KR5 */}
      {activeKR === "kr5" && (
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            KR5 — Engineering time on maintenance/manual ops reduced ≥25%
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b-2 border-border">
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Measurement</th>
                  <th className={thClass}>Source</th>
                  <th className={thClass}>Q1 Baseline</th>
                  <th className={thClass}>Q2 Results</th>
                  <th className={thClass}>Q3 Results</th>
                  <th className={thClass}>Q4 Results</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>Time spent on bug-related work (hrs)</td>
                  <td className={tdClass}>Jira</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">Jan:</span> 1,161h (~34%)</div>
                    <div><span className="font-medium">Feb:</span> 719h (~20%)</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Make Team field mandatory again. 126 tasks without Team field in Jan; 650h non-attributed time</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>% Bug vs non-bug time — Mobile</td>
                  <td className={tdClass}>Jira + Yuriy report</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">Jan:</span> 44.8%</div>
                    <div><span className="font-medium">Feb:</span> 25.2%</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Yuriy considers 30% healthy</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>% Bug vs non-bug time — Exhibitor</td>
                  <td className={tdClass}>Jira + Yuriy report</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">Jan:</span> 43.3%</div>
                    <div><span className="font-medium">Feb:</span> 26.7%</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Heavy firefighting mode</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>% Bug vs non-bug time — Visitor</td>
                  <td className={tdClass}>Jira + Yuriy report</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">Jan:</span> 55.8%</div>
                    <div><span className="font-medium">Feb:</span> 28.5%</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Highest bug ratio in Jan</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>% Bug vs non-bug time — Organizer</td>
                  <td className={tdClass}>Jira + Yuriy report</td>
                  <td className={tdClass}>
                    <div><span className="font-medium">Jan:</span> 34.7%</div>
                    <div><span className="font-medium">Feb:</span> 20.1%</div>
                  </td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Best performing team</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>Unused platform features in 2025</td>
                  <td className={tdClass}>Platform usage data</td>
                  <td className={tdClass}>Pending report</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={`${tdClass} text-muted-foreground italic`}>—</td>
                  <td className={tdClass}>Yuriy to generate report. Identify features no client used. Feed to product team for removal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
