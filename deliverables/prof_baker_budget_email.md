Subject: PACE budget and scale plan

Professor Baker,

Thank you. I agree with both technical requirements.

PACE stands for Prepare, Analyze, Construct, Explain.

I did a first-pass token budget for an API-backed version. The current MVP does not use any LLM API, so it has no token cost. For the next version, assuming Claude Sonnet with prompt caching and roughly 25k tokens of approved case context per case run, I estimate:

- Pure API cost: about $0.25-$0.30 per student per case.
- Planning price with buffer: about $0.50 per student per case.
- Practical pilot budget: $1.00-$2.00 per student per case, because failed runs, retries, support, hosting, QA, and messy student behavior will matter more than the raw token bill.

For 24 cases:

- One 90-student section: roughly $500-$600 in pure API cost; I would budget $1,000-$2,500.
- Full RC-scale use, assuming roughly 930 students: roughly $5,500-$6,000 in pure API cost; I would budget $25,000-$50,000 if we want real buffer for a fall pilot.

The other key implication is architecture. To hit your 3-5 hour per-case requirement, I think we should stop treating Butler as a one-off app and instead make it the template for a repeatable case-generation pipeline. Each case should become a structured PACE config: tools, tutorial checks, assignment questions, Excel-required flags, stuck-point categories, reflection prompt, and approved case excerpts. The app should not need bespoke code changes for each case.

I see two viable paths:

1. API-backed pilot: better student experience and more consistent tutoring, but requires budget and token governance.
2. Student-owned Claude handoff: lower cost and no instructor token exposure, but weaker integration and less reliable tracking.

My recommendation is to build the scalable case-config architecture either way. Then we can decide whether the tutor layer is API-backed or student-owned Claude based on budget.

Next steps from my end:

1. Refactor Butler into the canonical case-config schema.
2. Build a draft case-ingestion workflow so a new assignment can be converted in 3-5 hours.
3. Run the RC beta tester through Butler and use the failure points to harden the template.
4. Prepare a second FIN1 case using the same process to test whether the 3-5 hour target is realistic.

Best,
Abhi
