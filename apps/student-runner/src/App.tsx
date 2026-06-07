import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lock,
  PlayCircle,
  Send,
} from "lucide-react";
import {
  assignmentQuestions,
  butlerCase,
  stages,
  stuckOptions,
  toolChecklist,
  tutorialQuestions,
  type StageId,
} from "./data/butlerDay1";

type View = "student" | "instructor";
type TextMap = Record<string, string>;
type BoolMap = Record<string, boolean>;
type StuckMap = Record<string, string>;

type Submission = {
  id: string;
  studentName: string;
  submittedAt: string;
  startedAt: string;
  durationSeconds: number;
  toolsTakeaway: string;
  tutorialAnswers: TextMap;
  assignmentAnswers: TextMap;
  assignmentReasoning: TextMap;
  completedExcel: BoolMap;
  stuck: StuckMap;
  reflection: string;
};

const storageKey = "pace-butler-submissions-v1";
const startKey = "pace-butler-started-at-v1";
const stageOrder = stages.map((stage) => stage.id);

function loadSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "[]");
  } catch {
    return [];
  }
}

function saveSubmissions(submissions: Submission[]) {
  localStorage.setItem(storageKey, JSON.stringify(submissions));
}

function secondsToMinutes(seconds: number) {
  return Math.max(1, Math.round(seconds / 60));
}

function isFilled(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function AppCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`card ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field compact">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">No major blocker</option>
        {stuckOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CompletionPill({ complete }: { complete: boolean }) {
  return (
    <span className={`pill ${complete ? "done" : ""}`}>
      {complete ? <CheckCircle2 size={15} /> : <Lock size={15} />}
      {complete ? "Complete" : "Required"}
    </span>
  );
}

function StudentView() {
  const [stage, setStage] = useState<StageId>("tools");
  const [startedAt] = useState(() => {
    const existing = localStorage.getItem(startKey);
    if (existing) return existing;
    const now = new Date().toISOString();
    localStorage.setItem(startKey, now);
    return now;
  });
  const [studentName, setStudentName] = useState("");
  const [toolsTakeaway, setToolsTakeaway] = useState("");
  const [tutorialAnswers, setTutorialAnswers] = useState<TextMap>({});
  const [assignmentAnswers, setAssignmentAnswers] = useState<TextMap>({});
  const [assignmentReasoning, setAssignmentReasoning] = useState<TextMap>({});
  const [completedExcel, setCompletedExcel] = useState<BoolMap>({});
  const [stuck, setStuck] = useState<StuckMap>({});
  const [reflection, setReflection] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>(() => loadSubmissions());
  const [submittedId, setSubmittedId] = useState("");

  useEffect(() => saveSubmissions(submissions), [submissions]);

  const completion = useMemo<Record<StageId, boolean>>(
    () => ({
      tools: isFilled(toolsTakeaway),
      tutorial: tutorialQuestions.every((question) => isFilled(tutorialAnswers[question.id])),
      assignment: assignmentQuestions.every((question) => {
        const hasAnswer = isFilled(assignmentAnswers[question.id]);
        const hasReasoning = isFilled(assignmentReasoning[question.id]);
        const excelOk = !question.requiresExcel || completedExcel[question.id];
        return hasAnswer && hasReasoning && excelOk;
      }),
      reflection: isFilled(reflection),
      submit: Boolean(submittedId),
    }),
    [assignmentAnswers, assignmentReasoning, completedExcel, reflection, submittedId, toolsTakeaway, tutorialAnswers],
  );

  function canOpen(target: StageId) {
    const targetIndex = stageOrder.indexOf(target);
    return stageOrder.slice(0, targetIndex).every((id) => completion[id]);
  }

  function go(next: StageId) {
    if (!canOpen(next)) return;
    setStage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nextStage() {
    const index = stageOrder.indexOf(stage);
    const next = stageOrder[Math.min(index + 1, stageOrder.length - 1)];
    go(next);
  }

  function previousStage() {
    const index = stageOrder.indexOf(stage);
    setStage(stageOrder[Math.max(index - 1, 0)]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    if (!studentName.trim() || !completion.tools || !completion.tutorial || !completion.assignment || !completion.reflection) return;
    const now = new Date();
    const submission: Submission = {
      id: crypto.randomUUID(),
      studentName: studentName.trim(),
      submittedAt: now.toISOString(),
      startedAt,
      durationSeconds: Math.max(60, Math.round((now.getTime() - new Date(startedAt).getTime()) / 1000)),
      toolsTakeaway,
      tutorialAnswers,
      assignmentAnswers,
      assignmentReasoning,
      completedExcel,
      stuck,
      reflection,
    };
    setSubmissions((current) => [submission, ...current]);
    setSubmittedId(submission.id);
  }

  function downloadReport() {
    const lines = [
      "# PACE Butler Lumber Activity Report",
      `Student: ${studentName || "[not entered]"}`,
      `Started: ${new Date(startedAt).toLocaleString()}`,
      `Submitted: ${new Date().toLocaleString()}`,
      "",
      "## Tools Takeaway",
      toolsTakeaway,
      "",
      "## Tutorial Answers",
      ...tutorialQuestions.flatMap((question) => [`### ${question.title}`, question.prompt, tutorialAnswers[question.id] || "[blank]", ""]),
      "## Assignment Answers",
      ...assignmentQuestions.flatMap((question) => [
        `### ${question.title}`,
        question.prompt,
        `Excel completed: ${question.requiresExcel ? (completedExcel[question.id] ? "yes" : "no") : "not required"}`,
        `Answer: ${assignmentAnswers[question.id] || "[blank]"}`,
        `Reasoning: ${assignmentReasoning[question.id] || "[blank]"}`,
        `Blocker: ${stuck[question.id] || "none reported"}`,
        "",
      ]),
      "## Reflection",
      reflection,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PACE_Butler_${studentName || "Student"}_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const currentIsComplete = completion[stage] || stage === "submit";
  const tutorialAnswered = tutorialQuestions.filter((question) => isFilled(tutorialAnswers[question.id])).length;

  return (
    <>
      <header className="hero">
        <div>
          <p className="eyebrow">FIN1 Assignment Runner</p>
          <h1>{butlerCase.title}</h1>
          <p>{butlerCase.context}</p>
        </div>
        <div className="status">
          <FileText size={18} />
          {stageOrder.filter((id) => completion[id]).length}/{stageOrder.length} stages complete
        </div>
      </header>

      <nav className="tabs">
        {stages.map((item) => {
          const locked = !canOpen(item.id);
          return (
            <button className={stage === item.id ? "active" : ""} disabled={locked} key={item.id} onClick={() => go(item.id)}>
              {locked ? <Lock size={15} /> : null}
              {item.short}
            </button>
          );
        })}
      </nav>

      {stage === "tools" && (
        <div className="two-column">
          <AppCard title="Required Tools">
            <p>Start by reviewing the Butler Day 1 tools. The goal is not memorization; it is knowing which tool answers which managerial question.</p>
            <iframe className="pdf-preview" src={butlerCase.toolsPdf} title="Butler Day 1 tools PDF" />
            <div className="actions">
              <a className="primary" href={butlerCase.toolsPdf} target="_blank" rel="noreferrer">
                <FileText size={16} /> Open tools PDF
              </a>
              <button
                className="secondary"
                onClick={() => downloadFile(butlerCase.excelTemplate, "Butler_Lumber_Day_1_Template.xlsx")}
                type="button"
              >
                <FileSpreadsheet size={16} /> Download Excel template
              </button>
            </div>
            <ul className="checklist">
              {toolChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AppCard>
          <AppCard title="Your Tool Plan">
            <TextAreaField
              label="Which tool is most important for this case, and why?"
              value={toolsTakeaway}
              onChange={setToolsTakeaway}
              placeholder="Example: Sources and uses matters because..."
            />
            <CompletionPill complete={completion.tools} />
          </AppCard>
        </div>
      )}

      {stage === "tutorial" && (
        <div className="stack">
          <AppCard title="Concept Tutorial">
            <div className="video-placeholder">
              <PlayCircle size={42} />
              <span>Video tutorial placeholder</span>
            </div>
            <p className="note">After the tutorial, answer the checks below in your own words. PACE should help you prepare, not replace your reasoning.</p>
            <p className="progress-note">{tutorialAnswered}/{tutorialQuestions.length} tutorial questions answered.</p>
          </AppCard>
          {tutorialQuestions.map((question) => (
            <AppCard title={question.title} key={question.id}>
              <p className="question">{question.prompt}</p>
              <TextAreaField
                label="Your answer"
                value={tutorialAnswers[question.id] ?? ""}
                onChange={(value) => setTutorialAnswers((current) => ({ ...current, [question.id]: value }))}
              />
              <CompletionPill complete={isFilled(tutorialAnswers[question.id])} />
            </AppCard>
          ))}
        </div>
      )}

      {stage === "assignment" && (
        <div className="stack">
          <AppCard title="Assignment Questions">
            <p>
              Complete the Excel work where required, then enter your answer and reasoning. It is okay if your answer is wrong; the useful signal is what you tried and where you got stuck.
            </p>
            <div className="actions">
              <button
                className="secondary"
                onClick={() => downloadFile(butlerCase.excelTemplate, "Butler_Lumber_Day_1_Template.xlsx")}
                type="button"
              >
                <FileSpreadsheet size={16} /> Open Excel template
              </button>
              <a className="secondary" href="/excel-plugin/taskpane.html" target="_blank" rel="noreferrer">
                <GraduationCap size={16} /> Open Excel helper
              </a>
            </div>
          </AppCard>
          {assignmentQuestions.map((question, index) => (
            <AppCard title={`${index + 1}. ${question.title}`} key={question.id}>
              <p className="question">{question.prompt}</p>
              <p className="note">{question.excelInstruction}</p>
              {question.requiresExcel && (
                <label className="checkbox">
                  <input
                    checked={Boolean(completedExcel[question.id])}
                    onChange={(event) => setCompletedExcel((current) => ({ ...current, [question.id]: event.target.checked }))}
                    type="checkbox"
                  />
                  I completed the relevant Excel work before answering.
                </label>
              )}
              <TextAreaField
                label="Your answer"
                value={assignmentAnswers[question.id] ?? ""}
                onChange={(value) => setAssignmentAnswers((current) => ({ ...current, [question.id]: value }))}
              />
              <TextAreaField
                label="Reasoning and exhibit evidence"
                value={assignmentReasoning[question.id] ?? ""}
                onChange={(value) => setAssignmentReasoning((current) => ({ ...current, [question.id]: value }))}
              />
              <SelectField
                label="Where did you get stuck, if anywhere?"
                value={stuck[question.id] ?? ""}
                onChange={(value) => setStuck((current) => ({ ...current, [question.id]: value }))}
              />
              <CompletionPill
                complete={
                  isFilled(assignmentAnswers[question.id]) &&
                  isFilled(assignmentReasoning[question.id]) &&
                  (!question.requiresExcel || completedExcel[question.id])
                }
              />
            </AppCard>
          ))}
        </div>
      )}

      {stage === "reflection" && (
        <AppCard title="Pre-Class Reflection">
          <TextAreaField
            label="What is your one main takeaway from Butler Lumber before class?"
            value={reflection}
            onChange={setReflection}
            placeholder="My main takeaway is..."
          />
          <CompletionPill complete={completion.reflection} />
        </AppCard>
      )}

      {stage === "submit" && (
        <AppCard title="Submit">
          <label className="field compact">
            <span>Student name</span>
            <input value={studentName} onChange={(event) => setStudentName(event.target.value)} placeholder="LastName, FirstName" />
          </label>
          <p className="note">Submit stores this locally for the instructor dashboard prototype and lets you download an activity report.</p>
          <div className="actions">
            <button className="primary" disabled={!studentName.trim() || submittedId.length > 0} onClick={submit}>
              <Send size={16} /> Submit preparation
            </button>
            <button className="secondary" onClick={downloadReport}>
              <Download size={16} /> Download report
            </button>
          </div>
          {submittedId ? <p className="success">Submission captured locally. Your instructor dashboard will now include this record.</p> : null}
        </AppCard>
      )}

      <footer>
        <button onClick={previousStage}>
          <ChevronLeft size={16} /> Back
        </button>
        <span>{currentIsComplete ? "This stage is complete." : "Complete the required fields to continue."}</span>
        <button disabled={!currentIsComplete || stage === "submit"} onClick={nextStage}>
          Continue <ChevronRight size={16} />
        </button>
      </footer>
    </>
  );
}

function InstructorView() {
  const [submissions, setSubmissions] = useState<Submission[]>(() => loadSubmissions());

  function refresh() {
    setSubmissions(loadSubmissions());
  }

  function seedDemo() {
    const now = new Date();
    const demo: Submission[] = [
      {
        id: crypto.randomUUID(),
        studentName: "Demo, A",
        startedAt: new Date(now.getTime() - 72 * 60 * 1000).toISOString(),
        submittedAt: new Date(now.getTime() - 31 * 60 * 1000).toISOString(),
        durationSeconds: 41 * 60,
        toolsTakeaway: "Sources and uses frames why growth consumes cash.",
        tutorialAnswers: {},
        assignmentAnswers: {},
        assignmentReasoning: {},
        completedExcel: {},
        stuck: { "q3-sources-uses": "Source/use sign logic", "q5-ccc": "Interpreting what the number means" },
        reflection: "Profitable growth can still pressure liquidity.",
      },
      {
        id: crypto.randomUUID(),
        studentName: "Demo, B",
        startedAt: new Date(now.getTime() - 130 * 60 * 1000).toISOString(),
        submittedAt: new Date(now.getTime() - 86 * 60 * 1000).toISOString(),
        durationSeconds: 44 * 60,
        toolsTakeaway: "Cash conversion cycle explains the borrowing need.",
        tutorialAnswers: {},
        assignmentAnswers: {},
        assignmentReasoning: {},
        completedExcel: {},
        stuck: { "q4-borrowing": "Translating analysis into a recommendation" },
        reflection: "The bank needs working-capital discipline, not just growth.",
      },
    ];
    const next = [...demo, ...loadSubmissions()];
    saveSubmissions(next);
    setSubmissions(next);
  }

  function clearDemo() {
    saveSubmissions([]);
    setSubmissions([]);
  }

  const byHour = useMemo(() => {
    const buckets = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));
    submissions.forEach((submission) => {
      buckets[new Date(submission.submittedAt).getHours()].count += 1;
    });
    return buckets.filter((bucket) => bucket.count > 0);
  }, [submissions]);

  const avgMinutes = submissions.length
    ? Math.round(submissions.reduce((sum, submission) => sum + submission.durationSeconds, 0) / submissions.length / 60)
    : 0;

  const stuckCounts = useMemo(() => {
    const counts = new Map<string, number>();
    submissions.forEach((submission) => {
      Object.entries(submission.stuck).forEach(([questionId, blocker]) => {
        if (!blocker) return;
        const question = assignmentQuestions.find((item) => item.id === questionId);
        const key = `${question?.title ?? questionId}: ${blocker}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      });
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [submissions]);

  const maxHour = Math.max(1, ...byHour.map((bucket) => bucket.count));

  return (
    <>
      <header className="hero">
        <div>
          <p className="eyebrow">Instructor View</p>
          <h1>Butler Prep Dashboard</h1>
          <p>Local prototype metrics for submission timing, completion duration, and where students report friction.</p>
        </div>
        <div className="status">
          <LayoutDashboard size={18} />
          {submissions.length} submissions
        </div>
      </header>
      <div className="actions dashboard-actions">
        <button className="secondary" onClick={refresh}>
          Refresh
        </button>
        <button className="secondary" onClick={seedDemo}>
          Seed demo data
        </button>
        <button className="danger" onClick={clearDemo}>
          Clear local data
        </button>
      </div>
      <div className="metric-grid">
        <AppCard title="Submissions by Hour">
          {byHour.length ? (
            <div className="bars">
              {byHour.map((bucket) => (
                <div className="bar-row" key={bucket.hour}>
                  <span>{bucket.hour}:00</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(bucket.count / maxHour) * 100}%` }} />
                  </div>
                  <strong>{bucket.count}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">No submissions yet.</p>
          )}
        </AppCard>
        <AppCard title="Average Time">
          <div className="big-number">{avgMinutes || "-"}</div>
          <p className="note">{avgMinutes ? "minutes to complete" : "Submit or seed data to populate this metric."}</p>
        </AppCard>
        <AppCard title="Most Common Stuck Points">
          {stuckCounts.length ? (
            <ol className="ranked">
              {stuckCounts.map(([label, count]) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty">No stuck points reported yet.</p>
          )}
        </AppCard>
      </div>
      <AppCard title="Recent Submissions">
        <div className="table">
          <div className="table-head">
            <span>Student</span>
            <span>Submitted</span>
            <span>Time</span>
            <span>Reflection</span>
          </div>
          {submissions.map((submission) => (
            <div className="table-row" key={submission.id}>
              <span>{submission.studentName}</span>
              <span>{new Date(submission.submittedAt).toLocaleString()}</span>
              <span>{secondsToMinutes(submission.durationSeconds)} min</span>
              <span>{submission.reflection}</span>
            </div>
          ))}
        </div>
      </AppCard>
    </>
  );
}

export function App() {
  const [view, setView] = useState<View>("student");

  return (
    <main>
      <div className="view-switch">
        <button className={view === "student" ? "active" : ""} onClick={() => setView("student")}>
          <GraduationCap size={16} /> Student
        </button>
        <button className={view === "instructor" ? "active" : ""} onClick={() => setView("instructor")}>
          <BarChart3 size={16} /> Instructor
        </button>
      </div>
      {view === "student" ? <StudentView /> : <InstructorView />}
    </main>
  );
}
