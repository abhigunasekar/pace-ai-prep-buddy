# Scalable Case Architecture

Professor Baker's scale requirement is the design constraint: after Butler Lumber Day 1 works, each additional FIN1 case should take roughly 3-5 hours to configure.

## Target Architecture

PACE should separate the reusable product shell from per-case content.

```text
PACE app shell
  stages
  gating
  AI tutor behavior
  Excel helper behavior
  submission/report format

Case config
  case identity
  tools/assets
  tutorial checks
  assignment questions
  Excel-required flags
  stuck-point options
  reflection prompt
  approved case excerpts
  guardrails and expected reasoning patterns
```

The Butler MVP now follows this pattern. Its case config lives at:

```text
apps/student-runner/src/cases/butler-lumber-day-1.json
```

The app adapter lives at:

```text
apps/student-runner/src/data/butlerDay1.ts
```

## Case Build Workflow

The future authoring flow should be:

1. Upload authorized case materials.
2. Extract assignment questions, tools, exhibits, and Excel-template requirements.
3. Generate a draft PACE case config.
4. Run guardrail checks against the config.
5. Beta-test as a student.
6. Professor approves or edits final prompts.
7. Publish the case.

## 3-5 Hour Case Conversion Budget

| Step | Owner | Target Time |
|---|---|---:|
| Upload/organize case materials | RA | 20 min |
| Extract assignment questions and required tools | AI + RA | 40 min |
| Mark Excel-required questions and stuck categories | RA | 30 min |
| Generate tutorial checks and reflection prompt | AI + RA | 45 min |
| QA for answer leakage and confusing prompts | RA + beta tester | 60-90 min |
| Professor review edits | Professor | 30-45 min |
| Publish final config | RA | 15 min |

Target total: 3-5 hours.

## Product Choices That Make Scale Possible

- Use one schema for every case.
- Keep case assets separate from public source control.
- Cache approved case context in the LLM layer.
- Avoid bespoke React changes per case.
- Generate draft configs automatically, but require human approval before publication.
- Treat instructor analytics as optional until the student runner and case-conversion workflow are stable.

## API Architecture Recommendation

The API-backed version should use Claude Sonnet 4.6 with prompt caching for the main tutor path.

Why:

- Sonnet is the likely quality/cost sweet spot for finance tutoring.
- Prompt caching makes repeated case context economical.
- Haiku may be acceptable for lightweight checks, but the conceptual tutoring quality risk is higher.
- Opus is likely unnecessary for routine case prep.

Fallback if budget is not approved:

- Keep the current static app.
- Add "Copy prompt to Claude" buttons for student-owned Claude use.
- Sacrifice instructor backend and automated feedback quality to avoid API spend.
