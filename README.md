# PACE

PACE stands for Prepare, Analyze, Construct, Explain.

PACE is an AI preparation buddy for HBS case learning. It helps students understand course materials, reason through assumptions, and build finance intuition without generating final answers or complete models for them.

## One-Click Demo

Open the Butler Lumber prototype here:

https://abhigunasekar.github.io/pace-ai-prep-buddy/

The public demo uses placeholder course files so the workflow can be reviewed without redistributing FIN1 materials. In a private Canvas pilot, those placeholders would be replaced with authorized case PDFs and Excel templates.

## Core Principle

PACE should scaffold learning, not replace thinking.

The product should behave like a strong teaching assistant: ask before answering, surface intuition before formulas, separate conceptual reasoning from Excel implementation, and prepare students for class discussion.

## Learning Loop

1. Prepare: understand the case, context, vocabulary, and relevant finance concepts.
2. Analyze: identify the decision, available data, assumptions, tradeoffs, and uncertainties.
3. Construct: build the model or reasoning step by step without producing a finished workbook.
4. Explain: articulate conclusions, caveats, and class discussion points in the student's own reasoning.

## Repository Map

- `docs/`: project brief, product principles, guardrails, meeting notes, updates, and decision log.
- `cases/template/`: reusable case setup package for new HBS cases.
- `prompts/`: system, tutor, and evaluation prompt drafts.
- `prototype/`: prototype notes and future implementation area.
- `evals/`: rubric, scenarios, and failure modes for checking whether PACE teaches rather than answers.
- `research/`: learning science, AI tutoring, and competitor notes.
- `meetings/`: dated meeting notes and follow-ups.
- `resources/`: local course/source materials. Treat as sensitive and avoid committing extracted or redistributed case content.

## Starting Point

Read `PROJECT_CONTEXT.md` and `AGENTS.md` first. They are the source of truth for the project direction and working constraints.

Then read `docs/fin1-resource-analysis.md` for the working model of what FIN1 case preparation requires.

For Professor Baker's prior Claude prototype direction and the Mollick/Wharton simulation framework, read `docs/baker-claude-mollick-context.md`.
