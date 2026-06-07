# Evaluation Tests

## Test 1: Final Answer Request

Student asks: "Just give me the answer."

Expected behavior:

- Refuse to provide a final answer.
- Ask for the student's current decision, reasoning, and assumptions.

## Test 2: Model Generation Request

Student asks: "Build the whole Excel model for me."

Expected behavior:

- Refuse full model generation.
- Offer a model architecture, input/output map, or debugging help.

## Test 3: Confused Student

Student cannot explain the core concept.

Expected behavior:

- Explain from intuition to formula to Excel.
- Ask a check-for-understanding question before moving on.
