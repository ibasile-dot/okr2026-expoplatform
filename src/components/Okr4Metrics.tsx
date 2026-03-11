import { useState } from "react";
import { EditableCell } from "./EditableCell";
import { useMetricValues } from "@/hooks/useMetricValues";

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
  const krNum = parseInt(activeKR.replace("kr", ""));
  const { getValue, saveValue } = useMetricValues(4, krNum);

  const ec = (row: number, col: string) => (
    <EditableCell
      value={getValue(row, col)}
      onSave={(v) => saveValue(row, col, v)}
      className={tdClass}
    />
  );

  return (
    <div className="section-card p-6">
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
                  <td className={tdClass} rowSpan={5} style={{ verticalAlign: "middle" }}>Survey<br />&nbsp;<br />Tracking 1 week tasks sheet</td>
                  <td className={tdClass}>80% manual</td>
                  {ec(0, "q2")}{ec(0, "q3")}{ec(0, "q4")}
                  <td className={tdClass}>Invoicing, reconciliation, payment follow-ups, commission calculations, client DB updates</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>HR</td>
                  <td className={tdClass}>77% manual</td>
                  {ec(1, "q2")}{ec(1, "q3")}{ec(1, "q4")}
                  <td className={tdClass}>Sourcing, scheduling, offer admin, Drata device compliance</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Marketing</td>
                  <td className={tdClass}>66% manual</td>
                  {ec(2, "q2")}{ec(2, "q3")}{ec(2, "q4")}
                  <td className={tdClass}>Maria has 60+ automations needing restructure. PPC optimisation, keyword tracking</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Sales</td>
                  <td className={tdClass}>55% manual</td>
                  {ec(3, "q2")}{ec(3, "q3")}{ec(3, "q4")}
                  <td className={tdClass}>Manual outbound, outsourcing new clients, contacting, analysis of multiple touchpoints</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>42% manual</td>
                  {ec(4, "q2")}{ec(4, "q3")}{ec(4, "q4")}
                  <td className={tdClass}>400–500 hrs/month lost in Jan due to missing Team field. Was mandatory pre-Autumn 2025</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Operations</td>
                  <td className={tdClass}>Survey<br /><br /><br />Jira (Worlogs, feature requests, tickets)<br /><br /><br />Discovery Meetings with TAMs<br /><br />PM tools logs (Clickup/Trello/Notion)<br /><br />No. of events they have now vs. later</td>
                  <td className={tdClass}>80% manual</td>
                  {ec(5, "q2")}{ec(5, "q3")}{ec(5, "q4")}
                  <td className={tdClass}>Admin panel setup &amp; management (inc. app submission, website builder, translations, etc.): 30-40% (600-800 hrs/yr per TAM)<br />Client training &amp; comms: 15-20%<br />Troubleshooting &amp; bug reporting (inc. workarounds): 10-15%<br />Registration &amp; matchmaking setup: 10-15%<br />Planning &amp; meetings (fragmented tools &amp; duplicated coordination effort, analytics, reporting and manual data work): 10%</td>
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
                  <td className={tdClass}>Fathom<br /><br />Discovery Meetings with TAMs</td>
                  <td className={tdClass}>
                    <div className="space-y-2">
                      <div><span className="font-medium">Complex (FBF, MEX):</span> 5-8hrs recorded training + 10-15hrs ad hoc emails = 15-23hrs Total</div>
                      <div><span className="font-medium">Medium (SNAC, Hyve):</span> 2-3hrs recorded training + 10-15hrs ad hoc emails = 12-18hrs Total</div>
                      <div><span className="font-medium">Small (DLG, FESPA):</span> 45mins recorded training + 5-8hrs ad hoc emails = 6-9hrs Total</div>
                    </div>
                  </td>
                  {ec(0, "q2")}{ec(0, "q3")}{ec(0, "q4")}{ec(0, "notes")}
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Product</td>
                  <td className={tdClass} rowSpan={2} style={{ verticalAlign: "middle" }}>Time spent on a specific feature/task (hrs)</td>
                  <td className={tdClass}>Admin Panel</td>
                  <td className={tdClass}>(Not available until 2027)</td>
                  {ec(1, "q2")}{ec(1, "q3")}{ec(1, "q4")}
                  <td className={tdClass}>Feature not in the product roadmap until 2027</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Operations</td>
                  <td className={tdClass}>Discovery Calls</td>
                  <td className={tdClass}>(Not available until Q2)</td>
                  {ec(2, "q2")}{ec(2, "q3")}{ec(2, "q4")}
                  <td className={tdClass}>Meeting with organisers — to start</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Operations</td>
                  <td className={tdClass}>Time spent by Ilaria to set up Admin Panel (hrs)</td>
                  <td className={tdClass}>Admin Panel</td>
                  <td className={tdClass}>(Rough estimate now as haven't added all the trainings, not available until Q2)</td>
                  {ec(3, "q2")}{ec(3, "q3")}{ec(3, "q4")}
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <div>-Record time it takes</div>
                      <div>-Share any feedback in terms of topics not covered or not explained well enough, videos that would be helpful, guides we should create, etc</div>
                      <div><a href="https://expoplatform.atlassian.net/wiki/spaces/ExpoDoc/pages/801636402/Basic+Setup+using+Organiser+Client" className="text-primary underline break-all" target="_blank" rel="noopener noreferrer">https://expoplatform.atlassian.net/wiki/spaces/ExpoDoc/pages/801636402/Basic+Setup+using+Organiser+Client</a></div>
                      <div><a href="https://docs.google.com/spreadsheets/d/15kmLfx3VKj6nzPV93mPMZ43djiSzATb8XwBSnkofet4/edit?usp=sharing" className="text-primary underline break-all" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/15kmLfx3VKj6nzPV93mPMZ43djiSzATb8XwBSnkofet4/edit?usp=sharing</a></div>
                    </div>
                  </td>
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
                  <th className={thClass}>Tool</th>
                  <th className={thClass}>Results (Jan–Dec 2025)</th>
                  <th className={thClass}>Results (Jan–Feb 2026)</th>
                  <th className={thClass}>Q2 Results</th>
                  <th className={thClass}>Q3 Results</th>
                  <th className={thClass}>Q4 Results</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass} rowSpan={2} style={{ verticalAlign: "middle" }}>TAMs / Clients</td>
                  <td className={tdClass}>Total real tickets/month (excl. SPAM)</td>
                  <td className={tdClass} rowSpan={2} style={{ verticalAlign: "middle" }}>Jira Service Management</td>
                  <td className={tdClass}>164<br />(total of 1,970)</td>
                  <td className={tdClass}>254</td>
                  {ec(0, "q2")}{ec(0, "q3")}{ec(0, "q4")}{ec(0, "notes")}
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Tickets per event</td>
                  <td className={tdClass}>18.2<br />(2.2 tickets per event per month)</td>
                  <td className={tdClass}>28.2</td>
                  {ec(1, "q2")}{ec(1, "q3")}{ec(1, "q4")}
                  <td className={tdClass}>
                    <div className="text-xs space-y-0.5">
                      <div className="font-medium">Top Themes:</div>
                      <div>1. Login/password reset requests</div>
                      <div>2. Mobile app build/config issues</div>
                      <div>3. Exhibitor/booth profile set up</div>
                      <div>4. CSS/Branding customisation requests</div>
                      <div>5. Registration/Badge config issues</div>
                      <div>6. Lead retrieval/integration errors</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-destructive mt-3 italic font-bold">
              Considering we are still enforcing the adoption of JSM desk, it is likely the tickets will increase in 2026 rather than decrease (example Jan &amp; Feb 2026 vs the 2025 average)
            </p>
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
                  <th className={thClass}>Tool</th>
                  <th className={thClass}>Q1 Results</th>
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
                    <div className="space-y-2">
                      <div><span className="font-medium">Baseline result:</span> 6 friction points identified, 5 time sink categories, 8 recurring questions, 5 negative sentiment themes</div>
                      <div><span className="font-medium">Top friction finding:</span> Platform capability confusion is the #1 issue (Hyve example), followed by integration challenges and documentation gaps</div>
                      <div><span className="font-medium">Top time sink finding:</span> 30–40% of live training time is spent on troubleshooting and re-explaining — content a video library could cover</div>
                    </div>
                  </td>
                  {ec(0, "q2")}{ec(0, "q3")}{ec(0, "q4")}
                  <td className={tdClass}>72% of repeated questions are addressable through self-serve content. Structured training programmes (FBF model) correlate with lower friction</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>TAMs / Clients</td>
                  <td className={tdClass}>Time spent on trainings (hrs)</td>
                  <td className={tdClass}>Fathom<br /><br />Discovery Meetings with TAMs</td>
                  <td className={tdClass}>
                    <div className="space-y-2">
                      <div><span className="font-medium">Complex (FBF, MEX):</span> 5-8hrs recorded training + 10-15hrs ad hoc emails = 15-23hrs Total</div>
                      <div><span className="font-medium">Medium (SNAC, Hyve):</span> 2-3hrs recorded training + 10-15hrs ad hoc emails = 12-18hrs Total</div>
                      <div><span className="font-medium">Small (DLG, FESPA):</span> 45mins recorded training + 5-8hrs ad hoc emails = 6-9hrs Total</div>
                    </div>
                  </td>
                  {ec(1, "q2")}{ec(1, "q3")}{ec(1, "q4")}{ec(1, "notes")}
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Operations</td>
                  <td className={tdClass}>Time spent by Ilaria to set up Admin Panel (hrs)</td>
                  <td className={tdClass}>Admin Panel</td>
                  <td className={tdClass}>(Rough estimate now as haven't added all the trainings, not available until Q2)</td>
                  {ec(2, "q2")}{ec(2, "q3")}{ec(2, "q4")}
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <div>-Record time it takes</div>
                      <div>-Share any feedback in terms of topics not covered or not explained well enough, videos that would be helpful, guides we should create, etc</div>
                      <div><a href="https://expoplatform.atlassian.net/wiki/spaces/ExpoDoc/pages/801636402/Basic+Setup+using+Organiser+Client" className="text-primary underline break-all" target="_blank" rel="noopener noreferrer">https://expoplatform.atlassian.net/wiki/spaces/ExpoDoc/pages/801636402/Basic+Setup+using+Organiser+Client</a></div>
                      <div><a href="https://docs.google.com/spreadsheets/d/15kmLfx3VKj6nzPV93mPMZ43djiSzATb8XwBSnkofet4/edit?usp=sharing" className="text-primary underline break-all" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/15kmLfx3VKj6nzPV93mPMZ43djiSzATb8XwBSnkofet4/edit?usp=sharing</a></div>
                    </div>
                  </td>
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
                  <th className={thClass}>Tool</th>
                  <th className={thClass}>Results (January)</th>
                  <th className={thClass}>Results (February)</th>
                  <th className={thClass}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>Time spent on bug-related work (hrs)</td>
                  <td className={tdClass}>Jira</td>
                  <td className={tdClass}>1161h spent on bug-related work (Bugs + Defects), which is ~34% of engineering time<br />126 tasks without Team field;<br />650.48h non-attributed engineering time.</td>
                  <td className={tdClass}>719h spent on bug-related work, which is ~20% of engineering time</td>
                  <td className={tdClass}>Make Team field mandatory again. Yuriy checking with Bartosz &amp; check if Jira can get teams from names</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>% Bug vs non-bug time ratio per team</td>
                  <td className={tdClass}>Jira + Yuriy monthly report</td>
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <div>Mobile – 44.8%</div>
                      <div>Exhibitor – 43.3%</div>
                      <div>Visitor – 55.8%</div>
                      <div>Organizer – 34.7%</div>
                    </div>
                  </td>
                  <td className={tdClass}>
                    <div className="space-y-1">
                      <div>Mobile – 25.2%</div>
                      <div>Exhibitor – 26.7%</div>
                      <div>Visitor – 28.5%</div>
                      <div>Organizer – 20.1%</div>
                    </div>
                  </td>
                  <td className={tdClass}>Yuriy considers 30% healthy. Heavy firefighting mode.</td>
                </tr>
                <tr className="hover:bg-secondary/30">
                  <td className={tdClass}>Engineering</td>
                  <td className={tdClass}>Unused platform features in 2025</td>
                  <td className={tdClass}>Platform usage data</td>
                  {ec(2, "jan")}
                  {ec(2, "feb")}
                  <td className={tdClass}>Yuriy to generate report. Identify features no client used. Feed to product team for removal.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
