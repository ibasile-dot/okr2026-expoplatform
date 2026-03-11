// ============================================================
// OKR 4 — Discovery Findings Data
// Sources: Survey (Feb 2026), Interviews, Jira, Fathom, JSM,
//          Task Time Log (1-week tracking), Direct observation
// ============================================================

export const quantitativeSources = [
  { name: "Jira Feature Requests Analysis", scope: "Identify features that would eliminate workarounds" },
  { name: "Jira Customisation Requests Analysis", scope: "Frequently-requested customisations → standard features/templates" },
  { name: "Ticket Volume & Resolution Trends", scope: "JSM Desk — 2025–2026 ticket data" },
  { name: "Fathom Call Recordings", scope: "Sample of 20+ TAM/onboarding calls" },
  { name: "Productivity, Automation Tools & AI Adoption Survey", scope: "All departments — February 2026" },
  { name: "Monthly Efficiency Report", scope: "From Yuriy — engineering metrics" },
  { name: "Platform Usage Report", scope: "Feature adoption & usage patterns" },
  { name: "CRM Data", scope: "Current systems: Trello, Notion, ClickUp" },
  { name: "Planhat Data Model", scope: "Draft data model vs. current reality gaps" },
  { name: "Customer Satisfaction Data", scope: "NPS, CSAT — Survey, Jira" },
  { name: "TAM & APIM Data", scope: "2024, 2025 and 2026 datasets" },
  { name: "Existing Time-Logging Data", scope: "Where available" },
];

export const qualitativeSources = [
  { name: "1:1 Interviews", scope: "All department heads + TAM leads" },
  { name: "Direct Observation & Shadowing", scope: "TAM sessions, admin panel testing" },
  { name: "1-Week Manual Task Time Log", scope: "Marketing, Sales, HR, Finance — self-reported" },
  { name: "Fathom Call Sentiment Analysis", scope: "Friction patterns, sentiment themes from recordings" },
];

// KR1 — Manual workload by department (from survey)
export const deptManualWorkload = [
  { department: "Finance", pct: 80, detail: "Invoicing, reconciliation, reporting, client database maintenance" },
  { department: "HR", pct: 77, detail: "Onboarding docs, leave tracking, payroll prep, contract drafting" },
  { department: "Marketing", pct: 66, detail: "Campaign setup, lead list building, PD hygiene, data enrichment" },
  { department: "Sales", pct: 55, detail: "Confirmed 'very manual' — CRM updates, forecasting, meeting prep" },
  { department: "TAM Team", pct: 48, detail: "Admin panel setup, training, troubleshooting, workarounds" },
  { department: "Engineering", pct: 42, detail: "Deployment checks, config updates, manual testing" },
  { department: "Eng Management", pct: 20, detail: "Sprint reporting, resource allocation" },
];

// KR1 — Task time log data (from XLSX — 1-week tracking)
export const taskTimeLog = {
  summary: {
    totalPeople: 19,
    tasksLogged: 18,
    totalHrsWeek: 61.95,
    avgHrsPersonWeek: 1.63,
    estHrsMonth: 123.9,
  },
  byDepartment: [
    { department: "Sales", people: 9, tasksLogged: 5, totalHrs: 26.0, avgPerPerson: 1.44, estMonthly: 52.0, topTask: "CRM management, forecasting, meeting prep" },
    { department: "Marketing", people: 6, tasksLogged: 8, totalHrs: 23.95, avgPerPerson: 2.0, estMonthly: 47.9, topTask: "Data enrichment, PPC optimisation, PD maintenance" },
    { department: "Finance", people: 2, tasksLogged: 5, totalHrs: 12.0, avgPerPerson: 3.0, estMonthly: 24.0, topTask: "Overdue reports, invoice reminders, bonus calculations" },
    { department: "HR", people: 2, tasksLogged: 0, totalHrs: 0, avgPerPerson: 0, estMonthly: 0, topTask: "Data collection pending" },
  ],
  topTasks: [
    { task: "CRM / Pipedrive management & forecasting", person: "Jens Schindler", hrsWeek: 26.0, dept: "Sales" },
    { task: "PPC campaign optimisation & keyword tracking", person: "Yana Radetska", hrsWeek: 13.0, dept: "Marketing" },
    { task: "Data enrichment & global exhibition mapping", person: "Choyonika Ghosh", hrsWeek: 10.5, dept: "Marketing" },
    { task: "Invoice reminders & overdue reports", person: "Daryna Stukalenko", hrsWeek: 12.0, dept: "Finance" },
  ],
};

// KR2 — TAM time distribution & admin panel findings
export const tamTimeBreakdown = [
  { name: "Admin Panel Setup", value: 35 },
  { name: "Client Comms & Training", value: 18 },
  { name: "Troubleshooting", value: 13 },
  { name: "Analytics & Reporting", value: 10 },
  { name: "Integrations & API", value: 10 },
  { name: "Internal Coordination", value: 8 },
  { name: "Other", value: 6 },
];

export const eventSetupComparison = [
  { metric: "Setup Days", recurring: 11, newCustomer: 15 },
  { metric: "Config Steps", recurring: 48, newCustomer: 64 },
  { metric: "Training Hours", recurring: 4, newCustomer: 12 },
  { metric: "Support Tickets", recurring: 12, newCustomer: 22 },
];

export const adminPanelFindings = {
  configSteps: 64,
  unusedFeatures: "~50%",
  backendAreas: ["Registration conditional logic", "Matchmaking rules", "API configuration", "Exhibitor setup"],
  frontendAreas: ["Custom CSS/JavaScript", "Theme setup", "Block configuration", "Website builder"],
  appSubmission: "1.5hrs per event (fully manual — both iOS & Android)",
  mobileBugTime: "44% (healthy benchmark: ≤30%)",
};

// KR3 — Support ticket data
export const ticketTrend = [
  { period: "2025 Avg", tickets: 164, perEvent: 18.2 },
  { period: "Jan 2026", tickets: 240, perEvent: 26.7 },
  { period: "Feb 2026", tickets: 268, perEvent: 29.8 },
];

export const ticketBreakdownByType = [
  { name: "TAM Support", value: 40 },
  { name: "Feature Requests", value: 22 },
  { name: "Bug Reports", value: 20 },
  { name: "Customisation Requests", value: 12 },
  { name: "Other", value: 6 },
];

export const ticketByCategory = [
  { name: "Login / Password Reset", pct: 19.3 },
  { name: "Exhibitor / Booth Setup", pct: 15.9 },
  { name: "Mobile App Build", pct: 8.0 },
  { name: "Lead Retrieval", pct: 5.0 },
  { name: "Registration / Badge", pct: 4.5 },
  { name: "CSS / Branding", pct: 2.3 },
];

// KR4 — Customer onboarding & training
export const trainingDuration = [
  { type: "Complex (FBF, MEX)", recorded: "5–8 hrs", adHoc: "10–15 hrs", total: "15–23 hrs" },
  { type: "Medium (SNAC, Hyve)", recorded: "2–3 hrs", adHoc: "10–15 hrs", total: "12–18 hrs" },
  { type: "Small (DLG, FESPA)", recorded: "45 mins", adHoc: "5–8 hrs", total: "6–9 hrs" },
];

export const onboardingFriction = {
  frictionPoints: 6,
  timeSinkCategories: 5,
  recurringQuestions: 8,
  negativeSentimentThemes: 5,
  topFinding: "Platform capability confusion is the #1 issue, followed by integration challenges and documentation gaps",
  trainingWaste: "30–40% of live training time spent on troubleshooting and re-explaining",
};

export const trainingReadiness = [
  { label: "How-to Videos Created", value: 33 },
  { label: "Questions Addressable via Self-serve", value: 72 },
  { label: "Training Time = Troubleshooting", value: 35 },
];

// KR5 — Engineering maintenance
export const engineeringFindings = {
  missingTeamField: 126,
  nonAttributedHours: 650,
  ghostBugs: 178,
  ghostBugPeriod: "2022–2024",
  mobileBugPct: 44,
  healthyBenchmark: 30,
  estimatedLostHrs: "400–500 hrs/month",
};

// Integration overhead
export const integrationOverhead = {
  totalHours: 1044,
  findings: [
    "No native 3rd-party integrations available",
    "TAMs individually build custom CSS & JavaScript workarounds",
    "Self-funded tools (Cursor AI, Postman) used to bypass engineering queue",
  ],
};

// Pain point severity (for radar)
export const painPointSeverity = [
  { area: "Admin Panel", severity: 95 },
  { area: "Integrations", severity: 75 },
  { area: "Support", severity: 70 },
  { area: "Knowledge", severity: 65 },
  { area: "Training", severity: 60 },
  { area: "Tools", severity: 55 },
];

// Priority ranking — connects findings to action plan
export const priorityRanking = [
  { rank: 1, area: "Admin Panel Setup & Config", impact: "30–40% TAM time", validation: "9/10 sources", kr: [2, 3, 4] },
  { rank: 2, area: "Repetitive Manual Admin Tasks", impact: "Hrs/day cumulative", validation: "8/10 sources", kr: [1] },
  { rank: 3, area: "Manual Integration Workarounds", impact: "1,044h logged", validation: "7/10 sources", kr: [2, 3] },
  { rank: 4, area: "Fragmented Tools & Coordination", impact: "5–7 tools per TAM", validation: "7/10 sources", kr: [1, 5] },
  { rank: 5, area: "Client Comms & Training", impact: "15–20% TAM time", validation: "6/10 sources", kr: [4] },
  { rank: 6, area: "Analytics & Reporting", impact: "10% TAM time", validation: "5/10 sources", kr: [5] },
  { rank: 7, area: "Knowledge Siloing", impact: "Cross-cutting", validation: "6/10 sources", kr: [1, 4, 5] },
];

export const CHART_COLORS = [
  "hsl(237, 68%, 33%)",
  "hsl(44, 100%, 58%)",
  "hsl(237, 45%, 50%)",
  "hsl(44, 80%, 72%)",
  "hsl(200, 60%, 45%)",
  "hsl(237, 30%, 65%)",
  "hsl(44, 60%, 48%)",
];
