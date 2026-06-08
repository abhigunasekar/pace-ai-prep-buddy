import butlerCaseConfig from "../cases/butler-lumber-day-1.json";

export type StageId = "tools" | "tutorial" | "assignment" | "reflection" | "submit";

export type TutorialQuestion = {
  id: string;
  title: string;
  prompt: string;
};

export type AssignmentQuestion = {
  id: string;
  title: string;
  prompt: string;
  requiresExcel: boolean;
  excelInstruction: string;
};

export type PaceCaseConfig = {
  id: string;
  title: string;
  course: string;
  assetBasePath: string;
  toolsPdf: string;
  excelTemplate: string;
  context: string;
  toolChecklist: string[];
  tutorialQuestions: TutorialQuestion[];
  assignmentQuestions: AssignmentQuestion[];
  stuckOptions: string[];
  reflectionPrompt: string;
};

export const stages: Array<{ id: StageId; label: string; short: string }> = [
  { id: "tools", label: "Tools", short: "Tools" },
  { id: "tutorial", label: "Tutorials", short: "Tutorial" },
  { id: "assignment", label: "Assignment", short: "Assign" },
  { id: "reflection", label: "Reflection", short: "Reflect" },
  { id: "submit", label: "Submit", short: "Submit" },
];

const config = butlerCaseConfig as PaceCaseConfig;
const base = `${import.meta.env.BASE_URL}${config.assetBasePath}/`;

export const activeCase = config;

export const butlerCase = {
  title: config.title,
  course: config.course,
  toolsPdf: `${base}${config.toolsPdf}`,
  excelTemplate: `${base}${config.excelTemplate}`,
  excelHelper: `${import.meta.env.BASE_URL}excel-plugin/taskpane.html`,
  context: config.context,
};

export const toolChecklist = config.toolChecklist;
export const tutorialQuestions = config.tutorialQuestions;
export const assignmentQuestions = config.assignmentQuestions;
export const stuckOptions = config.stuckOptions;
