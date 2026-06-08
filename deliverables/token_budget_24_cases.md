# PACE Token Budget: 24-Case FIN1 Semester

Generated from the Butler Lumber case config in `apps/student-runner/src/cases/butler-lumber-day-1.json`.

## Pricing Inputs

Pricing uses Anthropic's published Claude API rates as of 2026-06-08:

- Claude Haiku 4.5: $1 input / $5 output per million tokens.
- Claude Sonnet 4.6: $3 input / $15 output per million tokens.
- Claude Opus 4.8: $5 input / $25 output per million tokens.
- Prompt cache reads are materially cheaper than normal input tokens. This estimate assumes a cached case pack per student run.

## Case-Run Assumptions

| Assumption | Value |
|---|---:|
| AI tutor turns per student case run | 13 |
| Cached system + case-pack tokens | 27,073 |
| Included approved case-material context | 25,000 |
| Uncached input tokens per turn | 350 |
| Output tokens per turn | 230 |
| Total output tokens per case run | 2,990 |

The current static MVP consumes no LLM tokens. These are estimates for the next API-backed tutor architecture.

## Cost Per Student Per Case

| Model | No Caching | With Prompt Caching |
|---|---:|---:|
| Claude Haiku 4.5 | $0.37 | $0.09 |
| Claude Sonnet 4.6 | $1.11 | $0.26 |
| Claude Opus 4.8 | $1.86 | $0.43 |

## Semester API Budget

Assuming 24 cases per semester:

| Model | 90-student section | 930-student full RC |
|---|---:|---:|
| Claude Haiku 4.5 | $185.39 | $1,915.70 |
| Claude Sonnet 4.6 | $556.17 | $5,747.10 |
| Claude Opus 4.8 | $926.95 | $9,578.50 |

## Case-Build Cost

The one-time API cost to convert a new case into a PACE config is estimated at 90k input tokens and 7k output tokens. That is intentionally conservative for assignment extraction, tool mapping, tutorial generation, and QA pass generation.

| Model | API cost to build one case | API cost to build 24 cases |
|---|---:|---:|
| Claude Haiku 4.5 | $0.13 | $3.00 |
| Claude Sonnet 4.6 | $0.38 | $9.00 |
| Claude Opus 4.8 | $0.63 | $15.00 |

## Recommended Budget Ask

Use **Claude Sonnet 4.6 with prompt caching** as the default planning case.

- Estimated API cost per student per case: **$0.26**.
- Suggested internal planning price per student per case: **$0.50**.
- Suggested student-facing / program budget price per student per case: **$1.00-$2.00**, because support, QA, hosting, retries, and failed runs will dominate pure token cost.
- For one 90-student section across 24 cases, ask for **$1,000-$2,500**.
- For a full RC-scale test of 930 students across 24 cases, ask for **$25,000-$50,000**.

The pure token math is lower than these asks, but the budget should include buffer for messy pilots, repeated attempts, case conversion, and support.
