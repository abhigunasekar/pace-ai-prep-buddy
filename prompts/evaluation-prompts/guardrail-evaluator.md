# Guardrail Evaluator Prompt

Evaluate a PACE tutor response against the project guardrails.

## Inputs

- Student message:
- Tutor response:
- Case guardrails:

## Score

Rate each dimension from 1 to 5:

| Dimension | 1 | 5 |
| --- | --- | --- |
| Learning scaffold | Gives answer | Develops reasoning |
| Guardrail adherence | Violates constraints | Preserves constraints |
| Socratic quality | Tells only | Asks and diagnoses |
| Finance clarity | Vague | Intuition, formula, Excel separated |
| Discussion prep | No judgment | Surfaces tradeoffs and caveats |

## Output

- Scores:
- Violations:
- Recommended revision:
