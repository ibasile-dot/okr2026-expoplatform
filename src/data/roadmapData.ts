export interface RoadmapItem {
  id: number;
  month: string;
  week: string;
  okr: number;
  action: string;
  subactions?: string;
  owner: string;
  defaultStatus: string;
  defaultNotes: string;
}

export const roadmapData: RoadmapItem[] = [
  { id: 1, month: "February", week: "w/c 16th Feb", okr: 1, action: "Analyse automation study results", owner: "Olga, Ilaria, Susan, Bartek", defaultStatus: "Done", defaultNotes: "" },
  { id: 2, month: "February", week: "w/c 16th Feb", okr: 1, action: "Validate list of manual tasks with each department", subactions: "Awaiting for various DEPTs responses", owner: "Olga, Ilaria, Susan, Bartek", defaultStatus: "Done", defaultNotes: "" },
  { id: 3, month: "February", week: "w/c 23rd Feb", okr: 1, action: "Discovery around current state and opportunities", subactions: "Review useful documents/meetings, Jira feature & customisation requests audit, Jira Reports review, Planhat integration plan review, Work logs review, Browse JSM Queues, Survey results review, Interviews with all departments, Review HR processes", owner: "Ilaria", defaultStatus: "Done", defaultNotes: "" },
  { id: 4, month: "February", week: "w/c 23rd Feb", okr: 1, action: "Identify easy wins and high value automation targets", owner: "Olga, Susan, Bartek, Ilaria + each department head", defaultStatus: "Done", defaultNotes: "" },
  { id: 5, month: "February", week: "w/c 23rd Feb", okr: 1, action: "Collect data about current time spent on above tasks using standard unit of measurement (per week, per month, etc.)", owner: "Ilaria, Susan, Julia, Olga, Bartek", defaultStatus: "Done", defaultNotes: "" },
  { id: 6, month: "February", week: "w/c 23rd Feb", okr: 1, action: "Use the above in planning for Automation Days", owner: "Olga, Susan, Bartek, Ilaria", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 7, month: "February", week: "w/c 23rd Feb", okr: 2, action: "Discovery around current state and opportunities", subactions: "Meet with Cross-Functional leads, Shadow TAM Sessions, Interviews with Organisers, Sample Fathom calls, Understand base metrics, EP Platform review, Baseline metrics established", owner: "Ilaria", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 8, month: "February", week: "w/c 23rd Feb", okr: 3, action: "Discovery around current state and opportunities", subactions: "Conduct 1:1 interviews with TAM Leads, Review Jira/Confluence, Get added to TAM Boards, EP Platform review, Start playing with tools, Contact AI/Automation experts", owner: "Ilaria", defaultStatus: "In Progress", defaultNotes: "" },
  
  { id: 10, month: "February", week: "w/c 23rd Feb", okr: 4, action: "Discovery around current state and opportunities", owner: "Ilaria", defaultStatus: "Done", defaultNotes: "" },
  { id: 11, month: "February", week: "early to mid-March", okr: 3, action: "Finish migrating customers to support mailbox", owner: "Samarth, Jens, Mykyta, Chris, Oriana, Julia", defaultStatus: "In Progress", defaultNotes: "As project end/new projects begin" },
  
  
  { id: 15, month: "March", week: "Mid to late March", okr: 2, action: "Collect baseline data about current level of effort for different stages and tasks", owner: "Ilaria, Yuriy", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 48, month: "March", week: "", okr: 3, action: "Evaluate other ways to streamline customer onboarding process", owner: "Ilaria, Julia, Susan, Ajay", defaultStatus: "To Do", defaultNotes: "" },
  { id: 49, month: "March", week: "", okr: 3, action: "Continue to move admin panel improvements forward", owner: "Tanya, Ajay, Ilaria", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 16, month: "March", week: "w/c March 2", okr: 3, action: "Conduct TAM survey around bugs that keep recurring, problematic areas of the platform that require firefighting and workarounds, what problem, if solved, would improve customer satisfaction by at least 20%, internal processes that are inefficient or have gaps that may be contributing causes to support tickets", owner: "Susan, Olga", defaultStatus: "To Do", defaultNotes: "" },
  { id: 17, month: "March", week: "w/c March 9", okr: 3, action: "Analyse survey results", owner: "Susan, Julia, Bartek, Ajay", defaultStatus: "To Do", defaultNotes: "" },
  { id: 18, month: "March", week: "w/c March 9", okr: 3, action: "Use Jira Theme Analysis Rovo agent to identify themes and common questions", owner: "Susan, Ilaria, TAM Leads", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 19, month: "March", week: "w/c March 9", okr: 3, action: "Notion/ClickUp AI for theme identification across customer boards", owner: "Susan, Ilaria, TAMs", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 20, month: "March", week: "w/c March 16", okr: 3, action: "Formulate action plan based on survey results and Rovo analysis", owner: "Susan, Ilaria, TAM Leads", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 21, month: "March", week: "", okr: 4, action: "Collect baseline data about current time spent", owner: "Ilaria, Yuriy", defaultStatus: "To Do", defaultNotes: "" },
  { id: 50, month: "March", week: "", okr: 4, action: "Continue building new onboarding/training materials", owner: "Julia, Jonathan, Matheus, Josua, Susan", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 47, month: "March", week: "", okr: 3, action: "Continue building new onboarding/training materials", owner: "Julia, Jonathan, Matheus, Josua, Susan", defaultStatus: "In Progress", defaultNotes: "" },
  { id: 22, month: "March", week: "w/c March 2", okr: 5, action: "Collect baseline data about current time spent", owner: "Susan, Bartek, Yuriy", defaultStatus: "To Do", defaultNotes: "" },
  { id: 23, month: "March", week: "After automation days?", okr: 5, action: "Conduct survey around current state and opportunities", owner: "Susan, Bartek, Olga", defaultStatus: "To Do", defaultNotes: "" },
  { id: 13, month: "April", week: "", okr: 1, action: "Create automations for easy wins and high value automation targets during Automation Days. Complete any spillover work as needed.", owner: "All Automation Days Participants", defaultStatus: "To Do", defaultNotes: "" },
  { id: 24, month: "April", week: "w/c 1st April", okr: 1, action: "Determine next steps based on analysis", owner: "Susan, Bartek, Ilaria", defaultStatus: "To Do", defaultNotes: "" },
  { id: 25, month: "April", week: "early to mid-April", okr: 2, action: "Identification of quick wins and longer-term opportunities", owner: "Ilaria, Susan", defaultStatus: "To Do", defaultNotes: "" },
  { id: 26, month: "April", week: "Mid to late-April", okr: 2, action: "Execute on quick wins", owner: "Ilaria, Susan, Bartek", defaultStatus: "To Do", defaultNotes: "" },
  { id: 27, month: "April", week: "", okr: 2, action: "Create automated workflows for customers in Planhat with how-to guides, best practices, common pitfalls", owner: "Susan, TAM Leads", defaultStatus: "To Do", defaultNotes: "" },
  { id: 51, month: "April", week: "", okr: 4, action: "Continue to move admin panel improvements forward", owner: "Tanya, Ajay, Ilaria", defaultStatus: "To Do", defaultNotes: "" },
  { id: 28, month: "April", week: "early to mid-April", okr: 4, action: "Identification of quick wins and longer-term opportunities", owner: "Ilaria, Susan", defaultStatus: "To Do", defaultNotes: "" },
  { id: 29, month: "April", week: "mid to late April", okr: 4, action: "Execute quick wins", owner: "Ilaria, Susan, Bartek", defaultStatus: "To Do", defaultNotes: "" },
  { id: 30, month: "April", week: "", okr: 4, action: "Create automated workflows for customers in Planhat with welcome materials, short videos", owner: "Susan, TAM Leads", defaultStatus: "To Do", defaultNotes: "" },
  { id: 31, month: "April", week: "Early to mid-April", okr: 5, action: "Identify quick wins & longer-term opportunities", owner: "Susan, Bartek, Yuriy", defaultStatus: "To Do", defaultNotes: "" },
  { id: 32, month: "April", week: "Mid to late April", okr: 5, action: "Execute quick wins", owner: "Ilaria, Susan, Bartek", defaultStatus: "To Do", defaultNotes: "" },
  { id: 45, month: "April", week: "", okr: 3, action: "Investigate creating AI-Powered support chatbot", owner: "Susan, Ilaria", defaultStatus: "To Do", defaultNotes: "" },
  { id: 52, month: "April", week: "", okr: 4, action: "Investigate creating AI-Powered support chatbot", owner: "Susan, Ilaria", defaultStatus: "To Do", defaultNotes: "" },
  { id: 46, month: "April", week: "", okr: 3, action: "Build granular customer journey end-to-end roadmap to assess opportunities for each step", owner: "Ilaria, Shafa", defaultStatus: "In Progress", defaultNotes: "" },
  
  { id: 33, month: "May", week: "", okr: 2, action: "Collect data on effort reductions from implementation of quick wins", owner: "Ilaria, Yuriy", defaultStatus: "To Do", defaultNotes: "" },
  { id: 34, month: "May", week: "", okr: 2, action: "Analyse and prioritise longer-term opportunities", owner: "Ilaria, Susan", defaultStatus: "To Do", defaultNotes: "" },
  { id: 35, month: "May", week: "", okr: 2, action: "Determine next steps based on analysis", owner: "Ilaria, Susan", defaultStatus: "To Do", defaultNotes: "" },
  { id: 36, month: "May", week: "", okr: 4, action: "Collect data on time reduction from implementation of quick wins", owner: "Ilaria, Yuriy", defaultStatus: "To Do", defaultNotes: "" },
  { id: 37, month: "May", week: "", okr: 4, action: "Analyse and prioritise longer-term opportunities", owner: "Ilaria, Susan", defaultStatus: "To Do", defaultNotes: "" },
  { id: 38, month: "May", week: "", okr: 4, action: "Determine next steps based on analysis", owner: "Ilaria, Susan", defaultStatus: "To Do", defaultNotes: "" },
  { id: 39, month: "May", week: "", okr: 5, action: "Collect data on effort reductions from implementation of quick wins", owner: "Bartek, Yuriy", defaultStatus: "To Do", defaultNotes: "" },
  { id: 40, month: "May", week: "", okr: 5, action: "Analyse and prioritise longer-term opportunities", owner: "Bartek, Susan, Ilaria", defaultStatus: "To Do", defaultNotes: "" },
  { id: 41, month: "May", week: "", okr: 5, action: "Determine next steps based on analysis", owner: "Bartek, Susan, Ilaria", defaultStatus: "To Do", defaultNotes: "" },
];
