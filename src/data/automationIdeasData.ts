export type IceScore = "S" | "M" | "L";
export type IdeaStatus = "Not Started" | "In Progress" | "Done" | "Blocked" | "Cancelled";

export interface AutomationIdea {
  id: string;
  idea: string;
  solves: string;
  phase: "Primary Focus" | "Quick Wins" | "Secondary Focus";
  krs: number[]; // KR numbers within OKR4 (1-5)
  impact: IceScore;
  confidence: IceScore;
  ease: IceScore;
  status: IdeaStatus;
  notes: string;
}

export interface DepartmentCategory {
  label: string;
  key: string;
  ideas: AutomationIdea[];
}

export const iceValue: Record<IceScore, number> = { S: 1, M: 2, L: 3 };

export const iceTotal = (i: IceScore, c: IceScore, e: IceScore) =>
  iceValue[i] + iceValue[c] + iceValue[e];

export const getPriority = (total: number): string => {
  if (total >= 8) return "High";
  if (total >= 6) return "Medium";
  return "Low";
};

let idCounter = 0;
const nextId = () => `ai-${++idCounter}`;

export const automationCategories: DepartmentCategory[] = [
  {
    label: "TAMs / Operations",
    key: "tams",
    ideas: [
      {
        id: nextId(), idea: "JSM AI Ticket Triage & Routing — neutral sentiment → AI responds, escalate urgent only",
        solves: "TAMs handling routine support queries manually; 40% of JSM tickets are basic access/config issues",
        phase: "Primary Focus", krs: [1, 3], impact: "L", confidence: "L", ease: "M", status: "Not Started", notes: "Sprint Squad 1 — primary use case"
      },
      {
        id: nextId(), idea: "Customer response handling with human-in-the-loop — AI generates response from docs, TAM approves before sending",
        solves: "TAMs drafting repetitive responses across email, ClickUp, Jira, Trello, Notion",
        phase: "Primary Focus", krs: [1, 3], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 2 — Pavel lead. Can use PM tool or email"
      },
      {
        id: nextId(), idea: "N8N email triage workflow — classify → auto-respond FAQ → log → escalate",
        solves: "First-line support burden on TAMs",
        phase: "Quick Wins", krs: [1, 3], impact: "L", confidence: "L", ease: "S", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Website builder ready templates — swap colours/fonts, layout stays fixed + AI agent + Confluence KB",
        solves: "TAM setup time per event; organiser website creation from scratch each time",
        phase: "Primary Focus", krs: [1, 2], impact: "L", confidence: "L", ease: "M", status: "Not Started", notes: "Susan rank #10. Talk to TAMs and Max about previous template event"
      },
      {
        id: nextId(), idea: "Auto-Clone Environment with Smart Defaults — pre-populate repeat event settings from previous builds",
        solves: "First-time builds 15 days vs 11 for clones; TAMs can't selectively copy/prevent items",
        phase: "Primary Focus", krs: [1, 4], impact: "M", confidence: "L", ease: "S", status: "Not Started", notes: "Susan rank #1 (Product team). Prioritise over templates"
      },
      {
        id: nextId(), idea: "Feature-Based Admin Panel Wizard — organiser selects features at onboarding, UI adapts to show only relevant features",
        solves: "~50% of features unused per event but all shown; admin panel overwhelming",
        phase: "Primary Focus", krs: [1, 4], impact: "L", confidence: "S", ease: "S", status: "Not Started", notes: "Susan rank #3. Include basic vs advanced settings"
      },
      {
        id: nextId(), idea: "Automated pre-launch health checks — replace 64-step manual TAM checklists with Launch Readiness Dashboard",
        solves: "Every launch = massive manual checklist across 4 Trello checklists",
        phase: "Primary Focus", krs: [1], impact: "L", confidence: "L", ease: "S", status: "Not Started", notes: "Susan rank #12"
      },
      {
        id: nextId(), idea: "App store auto submission — browser automation (Claude Co-Work) for Android/iOS questionnaire",
        solves: "1.5hrs per event manual submission; rejection risk from human error",
        phase: "Quick Wins", krs: [1, 2], impact: "L", confidence: "L", ease: "L", status: "Not Started", notes: "Susan rank #4. Olha's screenshot tool could integrate. Sprint Squad 1"
      },
      {
        id: nextId(), idea: "Automated time tracking (worklog tracker) — auto-track tasks and log to Jira",
        solves: "Manual Jira time logging across all TAMs",
        phase: "Quick Wins", krs: [1], impact: "S", confidence: "L", ease: "L", status: "Done", notes: "Extended from Pavel's Claude workaround. Now live for all TAMs"
      },
      {
        id: nextId(), idea: "Standardised Asset Collection Forms with Automated Reminders — pre-populate from previous events",
        solves: "No pre-built collection forms; multiple follow-ups needed to chase client inputs",
        phase: "Primary Focus", krs: [1, 4], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 2 — data validation on import. Susan rank #14"
      },
      {
        id: nextId(), idea: "Matchmaking bulk configuration tool — replace 3,000+ individual checkbox clicks with bulk selection/import",
        solves: "Olena manually adding 3,000+ matchmaking category session checkboxes",
        phase: "Primary Focus", krs: [1, 2], impact: "L", confidence: "L", ease: "S", status: "Not Started", notes: "Susan rank #5 (Product team)"
      },
      {
        id: nextId(), idea: "Planhat automated onboarding — welcome materials + videos auto-sent on deal close",
        solves: "Manual sales-to-TAM handover is lossy and inconsistent",
        phase: "Secondary Focus", krs: [1, 4], impact: "M", confidence: "L", ease: "M", status: "In Progress", notes: "Susan: covered by Planhat rollout"
      },
      {
        id: nextId(), idea: "Agentic AI for meeting prep — auto-prepare wash-ups, kick-offs, next-event briefs",
        solves: "Manual prep taking significant TAM time before every meeting",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "S", status: "Not Started", notes: "Susan rank #15"
      },
      {
        id: nextId(), idea: "Incident triage & categorization — automate ticket triage between incident vs bug using AI + codebase validation",
        solves: "Gap between first-level support (TAMs) and engineering notification",
        phase: "Primary Focus", krs: [1, 3, 5], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 3 — Julia lead. Cross-team handoffs"
      },
      {
        id: nextId(), idea: "Bug follow-up automation — auto-link Jira bug tickets to Gmail/Chat, flag unsolved, chase owner",
        solves: "Bugs get lost; no automated follow-up when tickets stall",
        phase: "Quick Wins", krs: [1, 5], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Daily email summary of key activity across workspace (Google Workspace Studio or similar)",
        solves: "No visibility across workspace activity; scattered across tools",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "M", ease: "L", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Roadmap creation for end-to-end customer journey — granular step-by-step per year",
        solves: "No structured view of full customer journey to identify improvement areas",
        phase: "Secondary Focus", krs: [1, 4], impact: "L", confidence: "M", ease: "S", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Weekly digest newsletter — what everyone is doing, automate compilation and distribution",
        solves: "No visibility on cross-team activities; manual effort to compile updates",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "M", status: "In Progress", notes: "Weekly spotlights created for operations. Need to automate Fathom transcript → Confluence flow and build library with notes + videos"
      },
      {
        id: nextId(), idea: "Bi-weekly automation showcases — share workarounds (Rachid Cursor, Pavel Claude) across all teams",
        solves: "Knowledge siloing; great workarounds exist but aren't shared",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "L", status: "Done", notes: "Format established. Need to automate flow from Fathom transcript to Confluence and create library"
      },
      {
        id: nextId(), idea: "Weekly operations spotlights",
        solves: "Lack of regular visibility into ops activities and wins",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "L", status: "Done", notes: "Now running regularly"
      },
      {
        id: nextId(), idea: "Expo Assistant chatbot rebuild (with Confluence knowledge base)",
        solves: "Self-service support for organisers; reduces first-line TAM queries",
        phase: "Primary Focus", krs: [1, 3], impact: "L", confidence: "M", ease: "S", status: "In Progress", notes: "Already in progress by Product team"
      },
      {
        id: nextId(), idea: "Unified project management approach — consolidate Trello/Notion/ClickUp into single tool with Jira integration",
        solves: "Fragmented PM tools across regions; duplicated coordination effort",
        phase: "Secondary Focus", krs: [1], impact: "L", confidence: "M", ease: "M", status: "In Progress", notes: "Susan: covered by Planhat"
      },
    ],
  },
  {
    label: "HR",
    key: "hr",
    ideas: [
      {
        id: nextId(), idea: "Candidate screening & outreach agent — AI screens from LinkedIn, auto-emails customised messages based on profile + role",
        solves: "Manual screening hours; generic outreach instead of personalised emails",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "L", ease: "M", status: "Not Started", notes: "Sprint Squad 4 — Olga lead. Already using Claude Co-Work extension for screening"
      },
      {
        id: nextId(), idea: "Interview scheduling + feedback chasing workflow automation",
        solves: "Manual email coordination for scheduling; feedback not collected systematically",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: "Sprint Squad 4 — secondary use case"
      },
      {
        id: nextId(), idea: "Onboarding tasks automation — run tasks via Claude artifact with API keys for PeopleForce, Google, EP Client Manager, Jira etc.",
        solves: "Olga does onboarding manually across multiple systems",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: "Requires API integration with PeopleForce, Google, EP Client Manager, Jira"
      },
    ],
  },
  {
    label: "Finance",
    key: "finance",
    ideas: [
      {
        id: nextId(), idea: "Billing–reporting data sync via n8n — API-based sync between billing and reporting systems",
        solves: "~80% manual reconciliation work in Finance; copy-paste from Xero to Excel",
        phase: "Primary Focus", krs: [1], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 5 — Alina lead. Daryna logs 12hrs/wk on manual tasks"
      },
      {
        id: nextId(), idea: "Reconciliation mismatch detection & alerts — auto-flag discrepancies between systems",
        solves: "Manual checking of invoice statuses and payment follow-ups",
        phase: "Primary Focus", krs: [1], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 5 — secondary use case"
      },
      {
        id: nextId(), idea: "Automated overdue report generation + client follow-up",
        solves: "Weekly manual upload from Xero → Excel → email with comments; each invoice checked manually",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: "Daryna: 2hrs/wk on overdue reports alone"
      },
      {
        id: nextId(), idea: "Client database automation — auto-update Excel tracker with deal data, calculate GRR/NRR/Top 10",
        solves: "Manual Excel file with all clients, events, metrics — all data entry done by hand",
        phase: "Secondary Focus", krs: [1], impact: "M", confidence: "M", ease: "S", status: "Not Started", notes: "Daryna: currently maintaining separate Excel per client"
      },
    ],
  },
  {
    label: "Marketing",
    key: "marketing",
    ideas: [
      {
        id: nextId(), idea: "Pipedrive lead flow — optimise 60+ existing automations; add missing lead assignment rules",
        solves: "Outdated automations (Maria's 60+ need restructure); leads not routed correctly",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "PlanHat renewals workflow — auto-trigger renewal outreach based on contract end dates",
        solves: "Manual tracking of contract renewals and outreach timing",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Search Atlas SEO — automate content brief generation and GEO optimisation for target markets",
        solves: "Manual SEO tracking, keyword ranking analysis, and content planning",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: "Yana: 4hrs/wk on PPC + 5hrs/wk on SEO/search queries"
      },
      {
        id: nextId(), idea: "PPC bid optimisation — rule-based automation for Google/LinkedIn PPC bid adjustments",
        solves: "Daily manual PPC campaign optimisation across platforms",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: "Yana: 4hrs/wk on PPC alone"
      },
      {
        id: nextId(), idea: "Data enrichment automation — auto-enrich outbound prospect lists from LinkedIn + event data",
        solves: "Manual data enrichment for outbound activities every week",
        phase: "Quick Wins", krs: [1], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: "Choyonika: 3.5hrs/wk on manual data enrichment"
      },
      {
        id: nextId(), idea: "AI-generated marketing videos (Synthesia, Kling, ElevenLabs)",
        solves: "Human needed for all marketing material creation",
        phase: "Secondary Focus", krs: [1], impact: "M", confidence: "S", ease: "S", status: "Not Started", notes: ""
      },
    ],
  },
  {
    label: "Sales",
    key: "sales",
    ideas: [
      {
        id: nextId(), idea: "Lead enrichment + outbound follow-up automation — auto-follow-ups based on meeting/pipeline status",
        solves: "CRM admin work; missed follow-ups reduce sales throughput",
        phase: "Quick Wins", krs: [1], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 8 — Revenue Ops. Jens: 26hrs/wk manual tasks"
      },
      {
        id: nextId(), idea: "Automate outbound sales process — replaces manual Pipedrive follow-ups",
        solves: "Manual CRM checking, forecast updates, client follow-ups",
        phase: "Secondary Focus", krs: [1], impact: "L", confidence: "M", ease: "M", status: "Not Started", notes: "Jens: 5hrs/wk on Pipedrive + 5hrs/wk on forecasts"
      },
      {
        id: nextId(), idea: "Pipedrive restructure — clean up and modernise automation rules",
        solves: "60+ outdated automations need restructure (Maria's list)",
        phase: "Secondary Focus", krs: [1], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Centralised asset library with self-service access",
        solves: "Repeated requests for assets; manual sharing across teams",
        phase: "Secondary Focus", krs: [1], impact: "M", confidence: "S", ease: "M", status: "Not Started", notes: ""
      },
    ],
  },
  {
    label: "Product / Design",
    key: "product",
    ideas: [
      {
        id: nextId(), idea: "Admin Panel hover text + usability improvements — make UI self-explanatory to reduce training sessions",
        solves: "Organisers need marathon training sessions because admin panel is hard to understand",
        phase: "Primary Focus", krs: [2, 4], impact: "L", confidence: "L", ease: "M", status: "Not Started", notes: "Susan rank #7 (Product team)"
      },
      {
        id: nextId(), idea: "Setup wizard / guided setup for organisers — step-by-step onboarding flow in admin panel",
        solves: "Unstructured onboarding; TAMs must hand-hold every new organiser",
        phase: "Primary Focus", krs: [2, 4], impact: "L", confidence: "L", ease: "S", status: "Not Started", notes: "Susan rank #2 (Product team)"
      },
      {
        id: nextId(), idea: "In-admin panel feedback pop-up (PeopleForce style) — direct client NPS/CSAT collection",
        solves: "Product feedback currently indirect via TAMs; no direct organiser input",
        phase: "Secondary Focus", krs: [2], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: "Susan rank #9 (Product team)"
      },
      {
        id: nextId(), idea: "Admin panel quick fixes — convert TAM spreadsheet feedback to production UX improvements",
        solves: "Known UX issues tracked by TAMs but not actioned in product",
        phase: "Quick Wins", krs: [2, 4], impact: "M", confidence: "L", ease: "L", status: "Not Started", notes: "From TAMs spreadsheet to production"
      },
      {
        id: nextId(), idea: "CSS preview sync — fix disconnect between admin panel CSS preview and actual frontend rendering",
        solves: "Organisers/TAMs can't preview CSS changes accurately; may be part of bigger website builder project",
        phase: "Primary Focus", krs: [2], impact: "L", confidence: "M", ease: "S", status: "Not Started", notes: "Potentially part of website builder project"
      },
      {
        id: nextId(), idea: "Automated data validation on import with error flagging",
        solves: "Manual data checks; inconsistent field formats on import",
        phase: "Quick Wins", krs: [1, 2], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: ""
      },
    ],
  },
  {
    label: "Engineering",
    key: "engineering",
    ideas: [
      {
        id: nextId(), idea: "Jira Team field enforcement across all tasks",
        solves: "400–500 hrs/month lost to non-attributed work; no visibility on engineering effort",
        phase: "Quick Wins", krs: [1, 5], impact: "L", confidence: "L", ease: "L", status: "Not Started", notes: "Sprint Squad 6. Data quality critical for OKR5"
      },
      {
        id: nextId(), idea: "Legacy backlog cleanup automation — close tickets >18 months without 90-day update",
        solves: "178 bugs from 2022–2024 still open; polluting backlog",
        phase: "Quick Wins", krs: [5], impact: "L", confidence: "L", ease: "L", status: "Not Started", notes: "Sprint Squad 6 — secondary use case"
      },
      {
        id: nextId(), idea: "Bug context enrichment & prioritisation via N8N — auto-classify and route bugs",
        solves: "Manual bug triage time; inconsistent classification",
        phase: "Quick Wins", krs: [3, 5], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: "Sprint Squad 7. Susan rank #23"
      },
      {
        id: nextId(), idea: "Automated Release Notes Generation",
        solves: "Manual release communication work each cycle",
        phase: "Quick Wins", krs: [5], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: "Sprint Squad 7 — secondary use case"
      },
      {
        id: nextId(), idea: "Automated testing framework (Playwright/Cypress)",
        solves: "QA runs manual regression 8–15hrs per release cycle",
        phase: "Secondary Focus", krs: [3, 5], impact: "L", confidence: "M", ease: "S", status: "Not Started", notes: ""
      },
      {
        id: nextId(), idea: "Integration monitoring & API health dashboards",
        solves: "Limited API visibility; manual reconciliation across systems",
        phase: "Secondary Focus", krs: [3, 5], impact: "M", confidence: "M", ease: "M", status: "Not Started", notes: "Rachid requested Datadog-like APM. Susan rank #6"
      },
    ],
  },
  {
    label: "Data",
    key: "data",
    ideas: [
      {
        id: nextId(), idea: "Automatic data export from backend dashboards for analytics",
        solves: "TAMs skip washup analytics because manual copy-paste into spreadsheets",
        phase: "Quick Wins", krs: [1, 5], impact: "L", confidence: "M", ease: "S", status: "Not Started", notes: "Susan rank #22. Data Science team working on standard post-event HTML report"
      },
      {
        id: nextId(), idea: "Web analytics filter/search — match App's UI, remove manual scrolling through URLs",
        solves: "Manual scrolling through thousands of URLs for analytics data",
        phase: "Quick Wins", krs: [5], impact: "M", confidence: "L", ease: "M", status: "Not Started", notes: "Susan rank #21"
      },
      {
        id: nextId(), idea: "Outcome-focused usage dashboards — feature adoption per market/event",
        solves: "Manual tracking of features sold vs used; no automated usage visibility",
        phase: "Secondary Focus", krs: [5], impact: "M", confidence: "L", ease: "S", status: "Not Started", notes: "Susan rank #18"
      },
      {
        id: nextId(), idea: "Automated event performance reports — AI-generated summary from platform data",
        solves: "Manual post-event analysis and report compilation",
        phase: "Secondary Focus", krs: [1, 5], impact: "M", confidence: "L", ease: "S", status: "Not Started", notes: "Susan rank #20"
      },
      {
        id: nextId(), idea: "Universal Data Translator / stricter import templates — standardise data intake formats",
        solves: "Manual requirement gathering and data mapping on every import",
        phase: "Secondary Focus", krs: [1, 2], impact: "S", confidence: "S", ease: "S", status: "Not Started", notes: "Susan rank #8"
      },
    ],
  },
];
