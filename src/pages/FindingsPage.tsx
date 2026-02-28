import { PageHeader, SectionTitle, HorizontalBar } from "@/components/DashboardWidgets";

const findings = [
  {
    category: "Admin Panel",
    items: [
      "30–40% of TAM time consumed by admin panel setup and configuration",
      "64 manual configuration steps per event",
      "First-time event builds take 36% more effort than repeat events (15 vs 11 days)",
      "~50% of features unused per event, but all shown in admin panel",
      "No feature-based wizard — organisers see everything regardless of event type",
    ],
  },
  {
    category: "Support & Tickets",
    items: [
      "2025 average: 164 tickets/month (18.2 per event). Jan–Feb 2026: 254/month (28.2 per event)",
      "40% of tickets map to admin panel: login 19.3%, exhibitor 15.9%, registration 4.5%, CSS 2.3%",
      "Top themes: Login/password reset, mobile app build, exhibitor/booth setup, CSS/branding, registration/badge config",
      "JSM adoption still increasing — tickets will rise before decreasing",
    ],
  },
  {
    category: "Integrations",
    items: [
      "1,044 hours total in worklogs for manual integrations",
      "No native integrations with common 3rd-party systems",
      "TAMs individually build siloed API scripts",
      "Self-funded tools (Cursor AI, Postman) used to bypass engineering queue",
    ],
  },
  {
    category: "Onboarding & Training",
    items: [
      "72% of repeated questions addressable via self-serve content",
      "30–40% of live training time = troubleshooting and re-explaining",
      "100 of 300 needed how-to videos created",
      "Training quality varies by TAM and region. No role-based learning paths",
      "6 friction points, 5 time sinks, 8 recurring questions identified from Fathom analysis",
    ],
  },
  {
    category: "Engineering",
    items: [
      "400–500 hrs/month lost due to missing Team field on Jira tasks",
      "126 tasks without Team field; 650.48h of non-attributed time",
      "Mobile team: 44% bug time in Jan 2026 (healthy benchmark = 30%)",
      "178 ghost bugs from 2022–2024 still open in backlog",
    ],
  },
  {
    category: "Knowledge & Tools",
    items: [
      "Customer history lives in TAMs' heads, not in systems",
      "5–7 different tools per TAM with no unified view",
      "TAMs self-teach API troubleshooting skills",
      "Returning customer context lost when TAMs change",
    ],
  },
];

const tamTimeBreakdown = [
  { label: "Admin Panel Setup & Config", value: 35 },
  { label: "Client Comms & Training", value: 18 },
  { label: "Troubleshooting", value: 13 },
  { label: "Analytics & Reporting", value: 10 },
  { label: "Integrations & API Work", value: 10 },
  { label: "Internal Coordination", value: 8 },
  { label: "Other", value: 6 },
];

const FindingsPage = () => {
  return (
    <div>
      <PageHeader
        title="Discovery Findings"
        description="Complete findings from the efficiency discovery across all departments. Based on interviews, surveys, Jira data, Fathom call analysis, and direct observation."
      />

      {/* TAM Time */}
      <div className="mb-12">
        <SectionTitle>TAM Time Distribution (Estimated)</SectionTitle>
        <div className="section-card p-6 max-w-2xl space-y-3">
          {tamTimeBreakdown.map((d) => (
            <HorizontalBar key={d.label} label={d.label} value={d.value} />
          ))}
        </div>
      </div>

      {/* Findings by Category */}
      <SectionTitle>Findings by Category</SectionTitle>
      <div className="space-y-6">
        {findings.map((section) => (
          <div key={section.category} className="section-card p-6">
            <h3 className="text-sm font-bold text-foreground mb-3">{section.category}</h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-foreground mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindingsPage;
