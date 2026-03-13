export interface ActionItem {
  title: string;
  description: string;
  detail: string[];
  owner: string;
  krs: number[];
  status: "Not Started" | "In Progress" | "Done" | "Blocked";
  source: string;
}

export interface ActionStream {
  name: string;
  items: ActionItem[];
}

export interface ActionPhase {
  phase: "Primary Focus" | "Quick Wins" | "Secondary Focus";
  subtitle: string;
  rationale: string;
  streams: ActionStream[];
}

export const actionPlanPhases: ActionPhase[] = [
  {
    phase: "Primary Focus",
    subtitle: "Solve the biggest bottlenecks first",
    rationale: "Admin panel setup consumes 30–40% of TAM time (validated by 9/10 discovery sources). Website builder and support tickets are the next highest-impact constraints. These are the items that unlock the most capacity.",
    streams: [
      {
        name: "Admin Panel — Back-end Configuration",
        items: [
          {
            title: "Auto-Clone Environment with Smart Defaults",
            description: "Pre-populate repeat event settings from previous builds. First-time builds take 15 days vs 11 for clones; TAMs can't selectively copy/prevent items.",
            detail: [
              "Audit 64 manual config steps — identify which can be automated or templated",
              "Smart defaults for registration, matchmaking, API setup based on event type",
              "Selective clone: allow TAMs to pick which settings to carry over",
              "Pre-populate from previous event data with override capability",
            ],
            owner: "Product Team, Susan",
            krs: [1, 4],
            status: "Not Started",
            source: "Susan rank #1. KR1 Analysis",
          },
          {
            title: "Feature-Based Admin Panel Wizard",
            description: "Organiser selects features at onboarding, UI adapts to show only relevant features. ~50% of features are unused per event but all are shown.",
            detail: [
              "Map features to event types (exhibition, conference, hybrid, etc.)",
              "Show basic vs advanced settings toggle",
              "Reduce cognitive load for organisers and TAMs",
              "Include guided setup flow for registration pipeline (currently complex and un-user-friendly)",
            ],
            owner: "Product Team, Tanya, Ajay",
            krs: [1, 4],
            status: "Not Started",
            source: "Susan rank #3. KR1 Analysis",
          },
          {
            title: "Matchmaking Bulk Configuration Tool",
            description: "Replace 3,000+ individual checkbox clicks with bulk selection/import. Olena manually adding matchmaking category session checkboxes.",
            detail: [
              "Bulk select/deselect by category",
              "Import configuration from spreadsheet or previous event",
              "Template-based matchmaking setup for common event types",
            ],
            owner: "Product Team, Susan",
            krs: [1, 2],
            status: "Not Started",
            source: "Susan rank #5. TAM Interviews",
          },
          {
            title: "Automated Pre-Launch Health Checks",
            description: "Replace 64-step manual TAM checklists with a Launch Readiness Dashboard. Every launch currently requires massive manual verification across 4 Trello checklists.",
            detail: [
              "Automated checks for registration, integrations, content, branding",
              "Dashboard showing pass/fail per area with fix suggestions",
              "Auto-flag missing assets, broken links, incomplete configs",
              "Replace Trello-based checklists with in-platform verification",
            ],
            owner: "Susan, Bartek",
            krs: [1],
            status: "Not Started",
            source: "Susan rank #12. Trello Audit. Complements EI-148",
          },
          {
            title: "Panel Configuration Validator",
            description: "Real-time detection of misconfigurations, missing steps & pre-launch risk flagging. 40% of support tickets (~100/month) trace back to admin panel misconfigurations with no real-time feedback during setup.",
            detail: [
              "Configuration rule engine for common misconfiguration patterns (e.g., registration open but no types defined)",
              "AI analysis layer using Claude for non-rule-based logical inconsistencies",
              "In-admin real-time inline warnings with configuration health score",
              "Pre-launch summary report with readiness score for TAM review",
              "Target: 80% misconfiguration detection, <5s warning display, <10% false positives",
            ],
            owner: "Sprint Squad, Susan, Bartek",
            krs: [1, 3, 4],
            status: "Not Started",
            source: "EI-148. Complements Launch Readiness Dashboard — proactive vs reactive",
          },
          {
            title: "Recurring Event Intelligence Report",
            description: "Automated delta analysis and recommendations for repeat organisers. TAMs manually reconstruct event history from Jira, Fathom, ClickUp, and notes for recurring events.",
            detail: [
              "Event data comparison engine — highlight carried-over, changed, and missing settings between editions",
              "Platform changelog integration — surface new features relevant to the organiser's event type",
              "Historical issue analysis — pull support tickets, bug reports, and call notes from previous edition",
              "AI-generated recommendations via Claude — configuration improvements, new features, preventive actions",
              "Structured output report (Confluence/PDF) with comparison summary, lessons learned, recommendations",
            ],
            owner: "Sprint Squad, Susan",
            krs: [1, 2, 4],
            status: "Not Started",
            source: "EI-150. Complements Auto-Clone. Target: report within 10 mins, validated against 2-3 recurring events",
          },
          {
            title: "Standardised Asset Collection Forms with Automated Reminders",
            description: "No pre-built collection forms exist; multiple follow-ups needed to chase client inputs.",
            detail: [
              "Pre-populate from previous events",
              "Automated reminder sequences for missing assets",
              "Data validation on import with error flagging",
              "Centralised asset tracking dashboard",
            ],
            owner: "Sprint Squad 2, Susan",
            krs: [1, 4],
            status: "Not Started",
            source: "Susan rank #14. AI Automation Spring",
          },
        ],
      },
      {
        name: "Admin Panel — Usability & Onboarding",
        items: [
          {
            title: "Admin Panel Hover Text + Usability Improvements",
            description: "Make UI self-explanatory to reduce marathon training sessions. Organisers need extensive hand-holding because admin panel is hard to understand.",
            detail: [
              "Add contextual hover text / tooltips across all config sections",
              "Restructure admin panel navigation based on Ops team suggestions (Loom recording exists)",
              "Implement touring/walkthrough capability after key meetings",
              "Convert TAM spreadsheet of UX feedback into production improvements",
            ],
            owner: "Tanya, Ajay, Product Team",
            krs: [2, 4],
            status: "In Progress",
            source: "Susan rank #7. Admin Panel Improvements doc",
          },
          {
            title: "Setup Wizard / Guided Setup for Organisers",
            description: "Step-by-step onboarding flow in admin panel. Currently unstructured; TAMs must hand-hold every new organiser.",
            detail: [
              "Progressive disclosure of features based on organiser's event type",
              "Milestone-based progress tracking during setup",
              "Contextual help and recommendations at each step",
              "Reduce dependency on live training sessions",
            ],
            owner: "Product Team, Susan",
            krs: [2, 4],
            status: "Not Started",
            source: "Susan rank #2. KR1 Analysis",
          },
        ],
      },
      {
        name: "Website Builder",
        items: [
          {
            title: "AI-Generated CSS Template Library",
            description: "AI generates complete CSS themes and block specs, stored in Confluence as a portable library. TAMs pick a theme and paste into builder. Reduces Olha + Alex involvement by 70–80%.",
            detail: [
              "Generate CSS themes using Alex's confirmed class names + EP patterns",
              "Each template: theme.css, block-spec.md, screenshot, README",
              "Validate all CSS on published live frontend (not builder preview — HTML differs)",
              "Backend-agnostic: works on any client backend",
              "Phase 1: exclude Custom Grid blocks until Maksym's skills markdown is ready",
            ],
            owner: "Ilaria, Maksym, TAMs",
            krs: [1, 2],
            status: "Not Started",
            source: "Website Builder doc (Idea A). Maksym meeting 12 Mar",
          },
          {
            title: "AI-Assisted CSS Generation via Claude",
            description: "Train Claude with EP's block markup and skills/markdown files from Maksym. TAMs describe client look → Claude generates CSS + block spec. Replaces Olha (mockups) and Alex (CSS) for standard sites.",
            detail: [
              "Maksym to describe EP elements and colour system to Claude via skills/markdown",
              "Restrict AI to block-by-block CSS (prevents cross-page CSS conflicts)",
              "TAMs use Claude instead of contacting Alex for custom CSS",
              "Clear guidelines: block-by-block only, no global styles",
              "Requires: CSS class reference from Alex ✅, skills files from Maksym (in progress)",
            ],
            owner: "Maksym, Ilaria, TAMs",
            krs: [1, 2],
            status: "Not Started",
            source: "Maksym Fathom call 12 Mar. Website Builder doc (Idea B)",
          },
          {
            title: "CSS Preview Sync Fix",
            description: "Fix disconnect between admin panel CSS preview and actual frontend rendering. Builder HTML wraps blocks in additional markup that causes CSS to render differently.",
            detail: [
              "Audit CSS rendering differences between builder and live frontend",
              "Ensure TAMs/organisers can preview CSS changes accurately before publishing",
              "May be integrated into broader website builder improvements",
            ],
            owner: "Maksym, Product Team",
            krs: [2],
            status: "Not Started",
            source: "Website Builder doc",
          },
        ],
      },
      {
        name: "Support & Ticket Automation",
        items: [
          {
            title: "JSM AI Ticket Triage & Auto-Response",
            description: "Neutral sentiment tickets → AI responds from docs, escalate urgent only. 40% of JSM tickets are basic access/config issues.",
            detail: [
              "AI triage for neutral sentiment tickets",
              "Auto-respond to top 6 ticket themes (login, exhibitor, registration, CSS, mobile app, lead retrieval)",
              "Escalation rules for urgent/complex tickets",
              "Self-serve content creation for most common queries",
            ],
            owner: "Sprint Squad 1, Susan",
            krs: [1, 3],
            status: "Not Started",
            source: "KR1 Analysis, TAM Interviews",
          },
          {
            title: "Customer Response Handling with Human-in-the-Loop",
            description: "AI generates response from docs, TAM approves before sending. Eliminates repetitive response drafting across email, ClickUp, Jira, Trello, Notion.",
            detail: [
              "AI drafts responses using knowledge base + previous responses",
              "TAM reviews and approves before sending",
              "Works across email, PM tools, and support channels",
              "Learning loop: approved responses improve future suggestions",
            ],
            owner: "Sprint Squad 2, Pavel",
            krs: [1, 3],
            status: "Not Started",
            source: "AI Automation Spring, TAM Interviews",
          },
          {
            title: "Expo Assistant Chatbot Rebuild",
            description: "Self-service support chatbot for organisers using Confluence knowledge base. Reduces first-line TAM queries.",
            detail: [
              "Rebuild with updated Confluence knowledge base",
              "Cover top recurring organiser questions",
              "Integrate with admin panel for contextual help",
              "Track deflection rate to measure effectiveness",
            ],
            owner: "Product Team",
            krs: [1, 3],
            status: "In Progress",
            source: "KR1 Analysis. Already in progress by Product team",
          },
          {
            title: "Incident Triage & Categorization Automation",
            description: "Automate ticket triage between incident vs bug using AI + codebase validation. Closes gap between first-level support (TAMs) and engineering notification.",
            detail: [
              "Auto-classify tickets as incident, bug, or feature request",
              "Route to correct team based on classification",
              "Cross-team handoff automation (TAM → Engineering)",
              "Priority scoring based on customer impact",
            ],
            owner: "Sprint Squad 3, Julia",
            krs: [1, 3, 5],
            status: "Not Started",
            source: "AI Automation Spring",
          },
        ],
      },
      {
        name: "Finance Automation",
        items: [
          {
            title: "Billing–Reporting Data Sync via n8n",
            description: "API-based sync between billing and reporting systems. ~80% of Finance work is manual reconciliation (Xero → Excel). Daryna logs 12hrs/wk on manual tasks.",
            detail: [
              "API integration between Xero and reporting systems",
              "Automated reconciliation mismatch detection & alerts",
              "Auto-flag discrepancies between systems",
              "Replace manual copy-paste workflows",
            ],
            owner: "Sprint Squad 5, Alina",
            krs: [1],
            status: "Not Started",
            source: "AI Automation Spring, Weekly Tracker",
          },
        ],
      },
    ],
  },
  {
    phase: "Quick Wins",
    subtitle: "High-ROI improvements that can run in parallel",
    rationale: "Smaller, faster-to-implement items that deliver immediate value. Many can run alongside Primary Focus work. Build momentum and demonstrate value across departments.",
    streams: [
      {
        name: "TAMs / Operations",
        items: [
          {
            title: "App Store Auto-Submission",
            description: "Browser automation (Claude Co-Work) for Android/iOS questionnaire. Saves 1.5hrs per event; currently fully manual with rejection risk from human error.",
            detail: [
              "Automate Android questionnaire pre-fill",
              "Automate iOS App Store submission questionnaire",
              "Standardise app submission checklist for both platforms",
              "Investigate API-based submission to Google Play and Apple App Store Connect",
            ],
            owner: "Sprint Squad 1, Olha, Susan",
            krs: [1, 2],
            status: "Not Started",
            source: "Susan rank #4. AI Automation Spring",
          },
          {
            title: "N8N Email Triage Workflow",
            description: "Classify → auto-respond FAQ → log → escalate. Reduces first-line support burden on TAMs.",
            detail: [
              "Email classification by topic and urgency",
              "Auto-respond to known FAQ patterns",
              "Log all interactions for tracking",
              "Escalate complex queries to appropriate TAM",
            ],
            owner: "Susan, Bartek",
            krs: [1, 3],
            status: "Not Started",
            source: "KR1 Analysis",
          },
          {
            title: "Agentic AI for Meeting Prep",
            description: "Auto-prepare wash-ups, kick-offs, next-event briefs. Significant TAM time spent on manual prep before every meeting.",
            detail: [
              "Auto-generate meeting agendas from event data",
              "Pre-fill wash-up reports from analytics",
              "Create next-event brief from previous event learnings",
            ],
            owner: "Susan",
            krs: [1],
            status: "Not Started",
            source: "Susan rank #15. KR1 Analysis",
          },
          {
            title: "Bug Follow-up Automation",
            description: "Auto-link Jira bug tickets to Gmail/Chat, flag unsolved, chase owner.",
            detail: [
              "Automated notifications for stalled bug tickets",
              "Integration between Jira and communication channels",
              "Escalation rules for tickets past SLA",
            ],
            owner: "Ilaria",
            krs: [1, 5],
            status: "Not Started",
            source: "Ilaria",
          },
          {
            title: "Daily Email Summary of Key Activity",
            description: "Google Workspace Studio or similar — digest of key activity across workspace.",
            detail: [
              "Aggregate activity from Jira, email, PM tools",
              "Surface key updates and blockers daily",
            ],
            owner: "Ilaria",
            krs: [1],
            status: "Not Started",
            source: "Ilaria",
          },
        ],
      },
      {
        name: "HR",
        items: [
          {
            title: "Candidate Screening & Outreach Agent",
            description: "AI screens from LinkedIn, auto-emails customised messages based on profile + role. Already using Claude Co-Work extension for screening.",
            detail: [
              "AI-powered candidate screening from LinkedIn profiles",
              "Personalised outreach email generation",
              "Interview scheduling + feedback chasing workflow automation",
              "Integration with PeopleForce ATS",
            ],
            owner: "Sprint Squad 4, Olga",
            krs: [1],
            status: "Not Started",
            source: "AI Automation Spring, HR Meetings",
          },
          {
            title: "Onboarding Tasks Automation",
            description: "Run onboarding tasks via Claude artifact with API keys for PeopleForce, Google, EP Client Manager, Jira.",
            detail: [
              "Automated account provisioning across systems",
              "Onboarding checklist auto-generation",
              "Drata device compliance automation",
            ],
            owner: "Olga",
            krs: [1],
            status: "Not Started",
            source: "Ilaria, HR Meetings",
          },
        ],
      },
      {
        name: "Engineering",
        items: [
          {
            title: "Jira Team Field Enforcement",
            description: "400–500 hrs/month lost to non-attributed work; no visibility on engineering effort. Critical for OKR5 data quality.",
            detail: [
              "Enforce Team field on all Jira tasks",
              "Automated validation on ticket creation/update",
              "Dashboard for attribution completeness",
            ],
            owner: "Sprint Squad 6, Bartek",
            krs: [1, 5],
            status: "Not Started",
            source: "AI Automation Spring, KR1 Analysis",
          },
          {
            title: "Legacy Backlog Cleanup",
            description: "Close 178 ghost bugs from 2022–2024 still polluting the backlog.",
            detail: [
              "Auto-close tickets >18 months without 90-day update",
              "Notification to owners before auto-close",
              "Archive for reference",
            ],
            owner: "Sprint Squad 6",
            krs: [5],
            status: "Not Started",
            source: "AI Automation Spring",
          },
          {
            title: "Bug Context Enrichment & Prioritisation via N8N",
            description: "Auto-classify and route bugs. Reduces manual triage time and inconsistent classification.",
            detail: [
              "AI-powered bug classification by area and severity",
              "Auto-routing to correct engineering team",
              "Automated release notes generation (secondary use case)",
            ],
            owner: "Sprint Squad 7",
            krs: [3, 5],
            status: "Not Started",
            source: "AI Automation Spring. Susan rank #23",
          },
        ],
      },
      {
        name: "Marketing",
        items: [
          {
            title: "Pipedrive Lead Flow Optimisation",
            description: "Optimise 60+ existing automations; add missing lead assignment rules. Outdated automations need restructure.",
            detail: [
              "Audit and restructure Maria's 60+ Pipedrive automations",
              "Add missing lead routing rules",
              "PlanHat renewals workflow — auto-trigger renewal outreach",
            ],
            owner: "Maria, Ilaria",
            krs: [1],
            status: "Not Started",
            source: "Ilaria",
          },
          {
            title: "SEO & PPC Automation",
            description: "Automate content brief generation, keyword tracking, and bid adjustments. Yana spends 4hrs/wk on PPC + 5hrs/wk on SEO.",
            detail: [
              "Search Atlas SEO content brief automation",
              "Rule-based PPC bid optimisation for Google/LinkedIn",
              "Data enrichment automation for outbound prospect lists",
            ],
            owner: "Yana, Choyonika",
            krs: [1],
            status: "Not Started",
            source: "Weekly Tracker (Yana, Choyonika)",
          },
        ],
      },
      {
        name: "Internal Tools & Knowledge",
        items: [
          {
            title: "Weekly Digest Newsletter & Automation Showcases",
            description: "Automate compilation and distribution of weekly updates. Share workarounds (Rachid Cursor, Pavel Claude) across all teams.",
            detail: [
              "Automate Fathom transcript → Confluence flow",
              "Build library with notes + videos",
              "Weekly operations spotlights (now running)",
              "Bi-weekly automation showcases (format established)",
            ],
            owner: "Ilaria",
            krs: [1],
            status: "In Progress",
            source: "KR1 Analysis, Meetings",
          },
          {
            title: "Admin Panel Quick Fixes from TAM Feedback",
            description: "Convert TAM spreadsheet feedback into production UX improvements. Known issues tracked but not actioned.",
            detail: [
              "Review TAM spreadsheet of UX issues",
              "Prioritise by frequency and impact",
              "Ship as incremental improvements alongside main work",
            ],
            owner: "Tanya, Ajay, Product Team",
            krs: [2, 4],
            status: "Not Started",
            source: "TAM Spreadsheet, Ilaria",
          },
          {
            title: "Automated Data Validation on Import",
            description: "Replace manual data checks with automated validation and error flagging on import.",
            detail: [
              "Validate field formats automatically",
              "Flag errors with clear descriptions",
              "Suggest corrections where possible",
            ],
            owner: "Sprint Squad 2",
            krs: [1, 2],
            status: "Not Started",
            source: "AI Automation Spring, KR1 Analysis",
          },
        ],
      },
      {
        name: "Finance",
        items: [
          {
            title: "Automated Overdue Report Generation",
            description: "Replace weekly manual upload from Xero → Excel → email. Daryna spends 2hrs/wk on overdue reports alone.",
            detail: [
              "Auto-generate overdue reports from Xero data",
              "Automated client follow-up emails",
              "Dashboard for payment status tracking",
            ],
            owner: "Daryna",
            krs: [1],
            status: "Not Started",
            source: "Weekly Tracker (Daryna)",
          },
        ],
      },
      {
        name: "Data",
        items: [
          {
            title: "Automatic Data Export from Backend Dashboards",
            description: "TAMs skip washup analytics because manual copy-paste into spreadsheets takes too long. Data Science team working on standard post-event HTML report.",
            detail: [
              "One-click export from backend dashboards",
              "Standard post-event report template",
              "Web analytics filter/search improvements (remove manual URL scrolling)",
            ],
            owner: "Data Science Team, Susan",
            krs: [1, 5],
            status: "Not Started",
            source: "Susan rank #21-22. KR1 Analysis",
          },
        ],
      },
    ],
  },
  {
    phase: "Secondary Focus",
    subtitle: "Important but not urgent — pursue once key constraints are addressed",
    rationale: "Non-bottleneck improvements to pursue after Phase 1 core constraints are resolved. These are valuable but won't unlock capacity until the primary bottlenecks are cleared.",
    streams: [
      {
        name: "Website Builder — Phase 2",
        items: [
          {
            title: "In-Builder AI Agent (Overlay)",
            description: "AI agent embedded inside the website builder itself. Organisers/TAMs describe desired changes; AI generates CSS/JS scoped to individual blocks. Doesn't change the underlying system.",
            detail: [
              "Expose admin panel settings API to AI for direct editing",
              "AI creates CSS restricted to individual blocks (prevents cross-page conflicts)",
              "Potential for organiser self-service on basic visual changes",
              "Requires: product roadmap prioritisation with Kavi & Evgen",
              "Long-term: AI could access product data (exhibitor slider, product cards) via backend API",
            ],
            owner: "Maksym, Kavi, Evgen",
            krs: [1, 2],
            status: "Not Started",
            source: "Maksym Fathom call 12 Mar. Website Builder doc (Idea D)",
          },
        ],
      },
      {
        name: "Sales",
        items: [
          {
            title: "Automate Outbound Sales Process",
            description: "Replace manual Pipedrive follow-ups. Jens spends 5hrs/wk on Pipedrive + 5hrs/wk on forecasts.",
            detail: [
              "Automated follow-ups based on pipeline status",
              "Pipedrive restructure (Maria's 60+ automations need overhaul)",
              "Centralised asset library with self-service access",
            ],
            owner: "Jens, Maria",
            krs: [1],
            status: "Not Started",
            source: "Weekly Tracker (Jens). Survey",
          },
        ],
      },
      {
        name: "Product Improvements",
        items: [
          {
            title: "In-Admin Panel Feedback (NPS/CSAT)",
            description: "Direct client feedback collection via in-product surveys (PeopleForce style). Currently feedback is indirect via TAMs.",
            detail: [
              "In-product NPS/CSAT pop-ups at key moments",
              "Direct organiser input without TAM intermediary",
              "Automated sentiment tracking and alerting",
            ],
            owner: "Product Team",
            krs: [2],
            status: "Not Started",
            source: "Susan rank #9. KR1 Analysis",
          },
          {
            title: "Planhat Automated Onboarding",
            description: "Welcome materials + videos auto-sent on deal close. Manual sales-to-TAM handover is lossy and inconsistent.",
            detail: [
              "Auto-trigger onboarding sequence on deal close",
              "Personalised welcome materials based on package",
              "Automated handover brief from Sales to TAM",
            ],
            owner: "Susan, TAM Leads",
            krs: [1, 4],
            status: "In Progress",
            source: "Susan: covered by Planhat rollout",
          },
          {
            title: "Customer Journey End-to-End Roadmap",
            description: "Granular step-by-step roadmap per year to identify improvement areas across full customer journey.",
            detail: [
              "Map every TAM touchpoint with effort and time data",
              "Identify automation opportunities at each step",
              "Visual journey map with hotspot analysis",
            ],
            owner: "Ilaria, Shafa",
            krs: [1, 4],
            status: "In Progress",
            source: "Ilaria",
          },
        ],
      },
      {
        name: "Engineering — Longer Term",
        items: [
          {
            title: "Automated Testing Framework (Playwright/Cypress)",
            description: "QA runs manual regression 8–15hrs per release cycle. Target: reduce mobile bug time from 44% to ≤30%.",
            detail: [
              "Automated regression test suite for critical paths",
              "CI/CD integration for pre-release validation",
              "Mobile app automated testing",
            ],
            owner: "Engineering",
            krs: [3, 5],
            status: "Not Started",
            source: "Survey",
          },
          {
            title: "Integration Monitoring & API Health Dashboards",
            description: "Limited API visibility; manual reconciliation across systems. Rachid requested Datadog-like APM.",
            detail: [
              "Real-time API health monitoring",
              "Automated alerts for integration failures",
              "Performance metrics and SLA tracking",
            ],
            owner: "Engineering, Rachid",
            krs: [3, 5],
            status: "Not Started",
            source: "Susan rank #6. Survey",
          },
        ],
      },
      {
        name: "Marketing & Data",
        items: [
          {
            title: "AI-Generated Marketing Videos",
            description: "Use Synthesia, Kling, ElevenLabs for marketing material creation.",
            detail: [
              "Product demo videos auto-generated",
              "Personalised client marketing materials",
            ],
            owner: "Marketing Team",
            krs: [1],
            status: "Not Started",
            source: "Survey",
          },
          {
            title: "Outcome-Focused Usage Dashboards",
            description: "Feature adoption per market/event. Manual tracking of features sold vs used; no automated usage visibility.",
            detail: [
              "Automated event performance reports (AI-generated summary)",
              "Universal data translator / stricter import templates",
              "Client database automation (auto-update with deal data, GRR/NRR/Top 10)",
            ],
            owner: "Data Science, Susan",
            krs: [5],
            status: "Not Started",
            source: "Susan rank #18-20. KR1 Analysis",
          },
        ],
      },
      {
        name: "Unified Tools",
        items: [
          {
            title: "Unified Project Management Approach",
            description: "Consolidate Trello/Notion/ClickUp into single tool with Jira integration. Fragmented PM tools across regions; duplicated coordination effort.",
            detail: [
              "Evaluate and select single PM tool",
              "Migration plan for existing boards and workflows",
              "Jira integration for engineering handoffs",
            ],
            owner: "Susan, Planhat team",
            krs: [1],
            status: "In Progress",
            source: "Susan: covered by Planhat. KR1 Analysis",
          },
        ],
      },
    ],
  },
];
