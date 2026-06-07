# Baker Claude Chats And Mollick Context

## Source Scope

Reviewed:

- `resources/2-additional_references/prof_baker_claude_chat_1.pdf`
- `resources/2-additional_references/prof_baker_claude_chat_2.pdf`
- `resources/2-additional_references/prof_baker_claude_chat_3.pdf`
- `resources/2-additional_references/prof_baker_claude_chat_4.pdf`
- `resources/2-additional_references/prof_baker_claude_chat_5.pdf`
- `resources/2-additional_references/wharton_paper.pdf`

This note captures product and pedagogy implications without reproducing long chat transcripts or paper text.

## What Professor Baker Is Looking For

Professor Baker's prior Claude work is converging on an interactive FIN1 assignment runner, not a generic tutor.

The desired tool should:

- Guide students through a case in phases.
- Use the assignment questions as the pedagogical spine.
- Release content progressively so students read, think, answer, and then advance.
- Provide scoped Socratic help inside each phase.
- Support Excel work without doing the model for the student.
- Let students paste or upload work for formative audit.
- Produce a lightweight activity report that can be submitted with the Excel file.
- Let the instructor summarize activity reports before class to see common struggles and high-effort preparation.

The strongest product interpretation is:

```text
PACE = guided case-prep workflow + Socratic AI panels + spreadsheet audit + instructor pre-class intelligence.
```

## Professor Baker's Prototype Direction

The Butler Lumber runner discussed in the chats had these phases:

1. Set the stage.
2. Readings and concept checks.
3. Tutorial help.
4. Case reading and exhibits.
5. Excel audit.
6. Interpretation questions.
7. Tool reflection.
8. Submission.

The important design pattern is not the exact phase count. It is the combination of structured navigation and adaptive dialogue.

### Navigation Shell

The website/app should give students clear phase tabs, progress, back/continue controls, and visible submission requirements. This replaces the awkwardness of chat-only navigation.

### Scoped Socratic Panels

Each phase can have an AI panel, but the panel should be scoped:

- Reading concept check.
- Tutorial question help.
- Case section reflection.
- Exhibit or Excel audit.
- Assignment question interpretation.
- Tool transfer beyond the case.

The model should not be one open-ended chat that can drift into final-answer generation.

### Excel Audit

The prior conversations explored direct file upload, client-side Excel parsing, screenshot-based audit, and paste-based audit. The practical lesson:

- Direct Excel upload inside Claude artifacts was unreliable.
- Pasted values from Excel are more dependable for prototype flow.
- The audit should be split by exhibit or section.
- The AI should avoid false positives caused by rounding, percentage/decimal formatting, or reasonable presentation differences.
- The audit should produce formative feedback, not a final grade.

For PACE, the first robust implementation should support pasted structured values before attempting file parsing.

### Activity Report

The report matters for two reasons:

- It rewards preparation effort.
- It gives instructors evidence about where the class is confused before discussion.

The report should capture:

- Phase visits.
- Concept checks opened.
- Chat topics engaged.
- Student messages and AI responses when feasible.
- Excel audit section attempted.
- Interpretation questions discussed.
- Optional short reflection responses.

The report should be structured enough for an instructor-side script or AI agent to parse reliably.

## Instructor Prep Agent

Professor Baker explicitly wants uploaded activity reports to feed a pre-class synthesis.

The instructor-facing agent should produce a short preparation brief:

- Common conceptual sticking points.
- Common modeling or Excel errors.
- Questions students asked that are worth surfacing in class.
- Evidence of high-effort preparation.
- Suggested opening cold call or discussion path.
- Topics that may need additional explanation.

This is a major product differentiator. PACE is not only a student tutor; it is also a class-sensing system.

## Mollick / Wharton Paper Implications

The Wharton paper describes AI-enabled educational simulations using multiple agents:

- Mentor Agent for student preparation.
- Role-player / NPC Agent for active practice.
- Evaluator Agent for feedback.
- Progress Agent for individual student summaries.
- Class Insights Agent for instructor-level synthesis.

The paper's learning loop maps cleanly to PACE:

| Wharton Simulation Loop | PACE Equivalent |
| --- | --- |
| Direct instruction | Readings, tools, tutorials |
| Immersive scenario | Case narrative and protagonist decision |
| Practice | Excel analysis, assumptions, interpretation questions |
| Feedback | Socratic checks, audit feedback, model debugging |
| Reflection | Tool reflection, recommendation defense, activity report |

The key move is to treat FIN1 case prep as simulated practice for managerial financial judgment.

## Proposed PACE Agent Model

PACE should not be one giant prompt. It should be a coordinated set of bounded roles.

| Agent | Audience | Job |
| --- | --- | --- |
| Case Runner | Student | Manages phase progression and content release |
| Concept Tutor | Student | Explains finance concepts from intuition to formula to Excel |
| Excel Audit Coach | Student | Reviews pasted/student-provided values and diagnoses likely mistakes |
| Socratic Examiner | Student | Pressure-tests assignment-question reasoning for class discussion |
| Activity Summarizer | Instructor | Converts one student's report into a concise preparation signal |
| Class Insights Agent | Instructor | Aggregates student signals into a class prep brief |
| Evaluation Agent | Builder/instructor | Tests whether PACE followed guardrails and learning goals |

This mirrors the Wharton multi-agent architecture but adapts it to finance case prep.

## Product Guardrails From This Context

### Student-Facing

- Ask for the student's attempt before giving substantive help.
- Keep the student inside the current phase unless they choose to navigate.
- Give hints, not finished answers.
- Keep Excel audit formative and bounded.
- Treat reasonable rounding and formatting differences as correct.
- Encourage class discussion rather than over-resolving uncertainty.
- Remind students that AI can be wrong and that confusion is part of case preparation.

### Instructor-Facing

- Do not expose private student details unnecessarily.
- Focus on aggregate patterns and pedagogically useful signals.
- Highlight individual students only for legitimate instructor use, such as identifying strong questions or high-effort preparation.
- Keep class briefs short enough to read before class.

### Transparency

The Wharton paper stresses explicit AI guidance and data-use clarity. PACE should tell students:

- When they are interacting with AI.
- What data is captured in the activity report.
- How the report may be used by the instructor.
- That AI feedback is provisional and should be checked against their own reasoning.

## Build Implications

### MVP Shape

Start with Butler Lumber Day 1 as a single-case runner:

1. Static phase navigation.
2. Case-prep content and links.
3. Concept-check prompts.
4. Pasted Excel audit for Exhibit 1 and Exhibit 2.
5. Interpretation tab with assignment questions.
6. Tool reflection.
7. Copyable/downloadable activity report.
8. Instructor report parser/summarizer.

This MVP should prioritize reliability over fancy automation.

### Avoid In The First Build

- Direct `.xlsx` upload parsing inside the browser.
- Full case PDF ingestion in the client.
- Hidden answer generation through open-ended chat.
- Overcomplicated verification-code schemes.
- A broad multi-case platform before one case works.

### Design Principle

The app should make the desired learning path the path of least resistance:

```text
read a section -> answer a question -> build/check a model section -> interpret -> reflect -> submit evidence of preparation
```

## Open Questions For Build

- Should activity reports include full chat transcripts, only student messages, or summaries?
- Should the first deployment be a local web app, a Claude artifact-style JSX runner, or a hosted app?
- How much solution data can safely live in client-side code?
- What is the right balance between open-access tabs and soft sequencing nudges?
- What is the instructor's tolerance for false positives in Excel audit feedback?
- How should PACE handle copyrighted case text in a deployable environment?
