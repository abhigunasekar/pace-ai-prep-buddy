import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] || "artifacts/activity_reports";

if (!fs.existsSync(dir)) {
  console.error(`No report directory found: ${dir}`);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter((file) => file.endsWith(".txt"));
const reports = files.map((file) => ({
  file,
  text: fs.readFileSync(path.join(dir, file), "utf8"),
}));

const phaseCounts = new Map();
const questionMentions = new Map();

for (const report of reports) {
  const visited = report.text.match(/Visited phases: (.*)/)?.[1] || "";
  for (const phase of visited.split("->").map((item) => item.trim()).filter(Boolean)) {
    phaseCounts.set(phase, (phaseCounts.get(phase) || 0) + 1);
  }
  for (const match of report.text.matchAll(/STUDENT: ([^\n]+)/g)) {
    const msg = match[1].toLowerCase();
    const key = msg.includes("cash") || msg.includes("borrow") ? "cash/borrowing"
      : msg.includes("margin") ? "margins"
      : msg.includes("inventory") || msg.includes("receivable") || msg.includes("payable") ? "working capital"
      : msg.includes("source") || msg.includes("use") ? "sources and uses"
      : "other";
    questionMentions.set(key, (questionMentions.get(key) || 0) + 1);
  }
}

console.log("# Instructor Prep Brief");
console.log(`Reports reviewed: ${reports.length}`);
console.log("\n## Phase Coverage");
for (const [phase, count] of [...phaseCounts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`- ${phase}: ${count}/${reports.length}`);
}
console.log("\n## Common Student Question Themes");
for (const [theme, count] of [...questionMentions.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`- ${theme}: ${count} message(s)`);
}
console.log("\n## Teaching Implication");
console.log("Start class by asking why a profitable growing business can still need external financing, then connect the answer to working capital and sources/uses.");
