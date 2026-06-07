# PACE Project Context

## User Context

I prefer direct, analytical, calm-confident communication with no filler, hype, sycophancy, or performative gratitude. I like first-principles, Feynman-style explanations, Munger-style mental models, structured reasoning, cross-domain analogies, diagrams, frameworks, tables, and practical artifacts. Assume solid finance/IB technical foundations unless I ask for basics.

## Project Context

I am working as a research assistant at HBS with Professor Malcolm Baker.

The project is about transforming how students use AI to engage with course materials, especially finance cases.

The problem:
- Instructors worry that students upload case materials into ChatGPT, receive a completed model or answer, and submit it without meaningful learning.
- Students, especially MBA students without prior finance backgrounds, often find finance concepts, Excel modeling, and case prep intimidating.

The solution:
Build an AI preparation buddy for HBS case learning.

The tool should help students prepare for each case by guiding them through concepts, assumptions, model logic, and class discussion prep without simply generating the final answer or completed Excel model.

## Project Name

PACE = Prepare, Analyze, Construct, Explain.

PACE should guide students through four stages:

1. Prepare: understand the case, context, and relevant concepts.
2. Analyze: identify the decision, data, assumptions, and tradeoffs.
3. Construct: build the model or reasoning step by step.
4. Explain: articulate conclusions and reasoning for class discussion.

## Core Design Principle

PACE should scaffold learning, not replace thinking.

## Product Guardrails

PACE should:
- Ask before answering.
- Explain from first principles.
- Use Socratic guidance.
- Give hints in layers.
- Require students to state assumptions.
- Help students debug reasoning and model logic.
- Separate intuition, formula, and Excel implementation.
- Prepare students for class discussion.

PACE should not:
- Produce full finished case answers.
- Generate complete Excel models from scratch.
- Write final recommendation memos without student reasoning.
- Replace student judgment.
- Optimize for speed over understanding.

## Suggested Repo Structure

pace-ai-prep-buddy/
  README.md
  docs/
    project-brief.md
    product-principles.md
    pedagogy-guardrails.md
    professor-baker-notes.md
    weekly-updates.md
    decision-log.md
  cases/
    template/
      case-overview.md
      learning-objectives.md
      pace-flow.md
      prompt-pack.md
      guardrails.md
      eval-tests.md
  prompts/
    system-prompts/
    tutor-prompts/
    evaluation-prompts/
  prototype/
    README.md
  evals/
    rubric.md
    test-scenarios.md
    failure-modes.md
  research/
    ai-learning-literature.md
    competitor-notes.md
  meetings/

## First Tasks

Set up the repo structure, initial docs, guardrails, and reusable case template. Then help develop a simple prototype and evaluation framework for PACE.