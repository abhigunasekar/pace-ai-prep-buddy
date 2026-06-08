import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const casePath = path.join(root, "apps/student-runner/src/cases/butler-lumber-day-1.json");
const outPath = path.join(root, "deliverables/token_budget_24_cases.md");
const jsonOutPath = path.join(root, "artifacts/token_budget.json");

const pricing = {
  "Claude Haiku 4.5": {
    inputPerMTok: 1,
    outputPerMTok: 5,
    cacheWritePerMTok: 1.25,
    cacheReadPerMTok: 0.1,
  },
  "Claude Sonnet 4.6": {
    inputPerMTok: 3,
    outputPerMTok: 15,
    cacheWritePerMTok: 3.75,
    cacheReadPerMTok: 0.3,
  },
  "Claude Opus 4.8": {
    inputPerMTok: 5,
    outputPerMTok: 25,
    cacheWritePerMTok: 6.25,
    cacheReadPerMTok: 0.5,
  },
};

const scenario = {
  semesterCases: 24,
  sectionStudents: 90,
  fullRcStudents: 930,
  aiTurnsPerRun: 13,
  avgStudentAnswerTokens: 90,
  avgTutorOutputTokens: 230,
  perTurnInstructionTokens: 260,
  cacheableSystemTokens: 1200,
  approvedCaseMaterialTokens: 25_000,
};

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function dollars(value) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function costNoCache(tokens, model) {
  return (tokens.input / 1_000_000) * model.inputPerMTok + (tokens.output / 1_000_000) * model.outputPerMTok;
}

function costWithCache(tokens, model) {
  return (
    (tokens.cacheWrite / 1_000_000) * model.cacheWritePerMTok +
    (tokens.cacheRead / 1_000_000) * model.cacheReadPerMTok +
    (tokens.uncachedInput / 1_000_000) * model.inputPerMTok +
    (tokens.output / 1_000_000) * model.outputPerMTok
  );
}

const caseConfig = JSON.parse(fs.readFileSync(casePath, "utf8"));
const casePackText = JSON.stringify(caseConfig, null, 2);
const casePackTokens = estimateTokens(casePackText);
const cacheableTokens = scenario.cacheableSystemTokens + scenario.approvedCaseMaterialTokens + casePackTokens;
const uncachedInputPerTurn = scenario.perTurnInstructionTokens + scenario.avgStudentAnswerTokens;
const outputPerTurn = scenario.avgTutorOutputTokens;

const runTokens = {
  input: scenario.aiTurnsPerRun * (cacheableTokens + uncachedInputPerTurn),
  output: scenario.aiTurnsPerRun * outputPerTurn,
  cacheWrite: cacheableTokens,
  cacheRead: Math.max(0, scenario.aiTurnsPerRun - 1) * cacheableTokens,
  uncachedInput: scenario.aiTurnsPerRun * uncachedInputPerTurn,
};

const caseBuildTokens = {
  input: 90_000,
  output: 7_000,
};

const rows = Object.entries(pricing).map(([modelName, model]) => {
  const noCache = costNoCache(runTokens, model);
  const cached = costWithCache(runTokens, model);
  const sectionSemester = cached * scenario.sectionStudents * scenario.semesterCases;
  const fullRcSemester = cached * scenario.fullRcStudents * scenario.semesterCases;
  const buildCostPerCase = costNoCache(caseBuildTokens, model);
  return {
    modelName,
    noCache,
    cached,
    sectionSemester,
    fullRcSemester,
    buildCostPerCase,
  };
});

const recommended = rows.find((row) => row.modelName === "Claude Sonnet 4.6");
const markdown = `# PACE Token Budget: 24-Case FIN1 Semester

Generated from the Butler Lumber case config in \`apps/student-runner/src/cases/butler-lumber-day-1.json\`.

## Pricing Inputs

Pricing uses Anthropic's published Claude API rates as of 2026-06-08:

- Claude Haiku 4.5: $1 input / $5 output per million tokens.
- Claude Sonnet 4.6: $3 input / $15 output per million tokens.
- Claude Opus 4.8: $5 input / $25 output per million tokens.
- Prompt cache reads are materially cheaper than normal input tokens. This estimate assumes a cached case pack per student run.

## Case-Run Assumptions

| Assumption | Value |
|---|---:|
| AI tutor turns per student case run | ${scenario.aiTurnsPerRun} |
| Cached system + case-pack tokens | ${cacheableTokens.toLocaleString()} |
| Included approved case-material context | ${scenario.approvedCaseMaterialTokens.toLocaleString()} |
| Uncached input tokens per turn | ${uncachedInputPerTurn.toLocaleString()} |
| Output tokens per turn | ${outputPerTurn.toLocaleString()} |
| Total output tokens per case run | ${runTokens.output.toLocaleString()} |

The current static MVP consumes no LLM tokens. These are estimates for the next API-backed tutor architecture.

## Cost Per Student Per Case

| Model | No Caching | With Prompt Caching |
|---|---:|---:|
${rows.map((row) => `| ${row.modelName} | ${dollars(row.noCache)} | ${dollars(row.cached)} |`).join("\n")}

## Semester API Budget

Assuming ${scenario.semesterCases} cases per semester:

| Model | 90-student section | 930-student full RC |
|---|---:|---:|
${rows.map((row) => `| ${row.modelName} | ${dollars(row.sectionSemester)} | ${dollars(row.fullRcSemester)} |`).join("\n")}

## Case-Build Cost

The one-time API cost to convert a new case into a PACE config is estimated at 90k input tokens and 7k output tokens. That is intentionally conservative for assignment extraction, tool mapping, tutorial generation, and QA pass generation.

| Model | API cost to build one case | API cost to build 24 cases |
|---|---:|---:|
${rows.map((row) => `| ${row.modelName} | ${dollars(row.buildCostPerCase)} | ${dollars(row.buildCostPerCase * scenario.semesterCases)} |`).join("\n")}

## Recommended Budget Ask

Use **Claude Sonnet 4.6 with prompt caching** as the default planning case.

- Estimated API cost per student per case: **${dollars(recommended.cached)}**.
- Suggested internal planning price per student per case: **$0.50**.
- Suggested student-facing / program budget price per student per case: **$1.00-$2.00**, because support, QA, hosting, retries, and failed runs will dominate pure token cost.
- For one 90-student section across 24 cases, ask for **$1,000-$2,500**.
- For a full RC-scale test of 930 students across 24 cases, ask for **$25,000-$50,000**.

The pure token math is lower than these asks, but the budget should include buffer for messy pilots, repeated attempts, case conversion, and support.
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.mkdirSync(path.dirname(jsonOutPath), { recursive: true });
fs.writeFileSync(outPath, markdown);
fs.writeFileSync(
  jsonOutPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      caseId: caseConfig.id,
      scenario,
      casePackTokens,
      cacheableTokens,
      runTokens,
      rows,
    },
    null,
    2,
  ),
);

console.log(markdown);
