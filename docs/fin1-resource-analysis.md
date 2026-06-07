# FIN1 Resource Analysis

## Source Scope

Reviewed local FIN1 materials under `resources/1-FIN1/course_execution/`, including:

- Course preparation guidance and requirements memos.
- 23 case folders with assignments, case PDFs, summaries, Excel exhibits, templates, and tools.
- Review sessions, online exercises, tutorials, test guidance, formula sheets, and sample exam materials.

This note captures the learning model and student expectations without reproducing proprietary case content.

## What FIN1 Case Prep Looks Like

FIN1 preparation is a structured learning workflow, not a search for a final number.

The typical sequence is:

1. Read the assignment questions first.
2. Read the case with those questions in mind.
3. Review the case-specific tools, textbook pages, or tutorial.
4. Complete the relevant Excel analysis, often in a partially templated workbook.
5. Use the quantitative analysis to support a qualitative recommendation.
6. Prepare to explain the logic in class and answer follow-up questions.

The course explicitly phases support down over time. Early modules provide more tools, templates, and tutorials. Later modules expect students to decide what analysis to run, not merely execute a prescribed model.

## Course Standard For Good Work

The standard is not "get the right answer." The standard is decision-quality reasoning.

Strong student preparation should show:

- Clear statement of the protagonist's decision.
- Correct use of finance concepts and formulas.
- Thoughtful Excel implementation.
- Explicit assumptions.
- Sensitivity to key drivers and uncertainty.
- Managerial recommendation tied to the analysis.
- Ability to explain the logic in class, not just report outputs.

This is directly aligned with PACE's core principle: scaffold learning, do not replace thinking.

## Role Of GenAI In FIN1

The course guidance supports GenAI only after independent preparation. The intended role is:

- Clarify concepts, terms, and tools.
- Explain tutorial mistakes.
- Help audit individual cells or formulas in a student's attempted model.
- Act as a Socratic examiner for class preparation.

The course guidance does not support:

- Asking GenAI to answer assignment questions directly.
- Asking GenAI to build the whole model.
- Using GenAI before doing the case work.
- Using GenAI during tests or the final exam.

PACE should therefore encode a "student attempt first" posture. It can ask, diagnose, hint, and debug. It should not substitute for the student's first pass.

## Case Archetypes

| Case Range | Representative Focus | Core Student Work |
| --- | --- | --- |
| 1-2 | Butler Lumber | Financial statement analysis, sources and uses, cash conversion cycle, percent-of-sales forecasting, funding need |
| 3 | Mighty Squirrel | Growth strategy, funding need, business model shift, founder recommendation |
| 4-6 | Helios, Patrimonio Hoy, Ocean Carriers | NPV, IRR, free cash flow, taxes, project economics, recommendation under assumptions |
| 7-10 | Progyny, Hamilton, song catalogs, Tottenham | DCF, decision trees, royalty streams, multiples, enterprise value, strategic interpretation |
| 11-15 | Cook County, Partners | Asset allocation, expected return, volatility, correlation, Sharpe ratio, portfolio construction |
| 16-17 | Optimalen, DraftKings | Efficient markets, regression beta, portfolio improvement rule, cost of capital, comparable firms |
| 18-23 | MGH/Royalty Pharma, pipeline, Dicerna, impact investing, Kerr-McGee, Peloton | Advanced valuation, scenario analysis, market value balance sheets, capital structure, strategic investment judgment |

## Repeated Analytical Patterns

### Financial Statement Diagnosis

Students must connect operating performance to financing pressure:

- Margins.
- Working capital days.
- Sources and uses of funds.
- Cash conversion cycle.
- Growth-driven funding need.

PACE implication: ask students to explain why a profitable business can still need financing before discussing formulas.

### Forecasting And Pro Forma Modeling

Students build forecasts from assumptions:

- Revenue growth.
- Percent-of-sales line items.
- Interest, taxes, and retained earnings.
- Balance sheet plugs and funding needs.

PACE implication: separate model architecture from model completion. Help map inputs, calculations, and outputs without filling every cell.

### Project And Asset Valuation

Students estimate value from future cash flows:

- Free cash flow.
- NPV.
- IRR.
- Terminal value or finite-life cash flows.
- Tax effects.
- Scenario and sensitivity analysis.

PACE implication: require students to identify the cash flow owner, timing, discount rate, and decision rule before calculation.

### Enterprise Valuation

Students use both intrinsic and market methods:

- DCF.
- Comparable company multiples.
- Enterprise value to equity value bridges.
- Market value balance sheets.

PACE implication: push students to reconcile what each method is saying and why estimates differ.

### Portfolio And Risk

Students move from standalone returns to portfolio logic:

- Expected return.
- Volatility.
- Correlation.
- Covariance.
- Sharpe ratio.
- Efficient frontier.
- Portfolio improvement rule.
- Beta and cost of capital.

PACE implication: teach risk as interaction, not just standalone volatility. The key intuition is how an asset changes the portfolio.

### Recommendation Under Uncertainty

Nearly every case asks for judgment:

- Buy or sell.
- Proceed or reject.
- Hold out or accept.
- Shift allocation or stay put.
- Repurchase or not.
- Invest or pass.

PACE implication: every flow should end with the student's recommendation, assumptions, strongest counterargument, and class-ready explanation.

## Excel Expectations

The Excel files show that students are expected to work with:

- Partially completed templates.
- Exhibit tabs with historical data.
- Assumption rows or sections.
- Formula-driven analyses.
- Review-session workbooks with question and solution tabs.
- Exam exhibits that require fast model completion or interpretation.

Excel competence in FIN1 is practical and analytical:

- Link formulas correctly.
- Keep assumptions visible.
- Understand timing.
- Avoid hardcoding when logic should flow.
- Debug formulas cell by cell.
- Interpret model output as decision evidence.

PACE should support Excel in three bounded ways:

1. Explain the concept behind a cell or formula.
2. Help the student diagnose a formula they wrote.
3. Suggest model structure at the section level.

PACE should not produce a completed workbook from scratch.

## Assessment Implications

Tests and the final are open-book/open-notes but prohibit GenAI. That matters for product design.

PACE should optimize for durable internalization:

- Students should be able to solve formula and modeling questions without live AI.
- Students should understand the "why" behind each calculation.
- Students should practice explaining the answer in words.
- Students should be trained to audit their own work.

The product should therefore include retrieval practice and self-testing, not only conversational help.

## PACE Product Requirements From FIN1 Materials

### 1. Student Attempt Gate

Before substantive help, PACE should ask for one of:

- The student's current answer.
- The attempted formula.
- The assumptions being used.
- The model section that is confusing.
- The decision the student thinks the case is asking.

### 2. Case Flow Builder

Each case should have a structured PACE flow:

- Decision.
- Concepts.
- Data and exhibits.
- Model outputs.
- Assumptions.
- Recommendation.
- Class discussion questions.

### 3. Hint Ladder

Use layered support:

1. Diagnostic question.
2. Conceptual intuition.
3. Formula relationship.
4. Excel implementation hint.
5. Debugging support.
6. Reflection and recommendation pressure-test.

### 4. Formula And Concept Cards

FIN1 needs reusable cards for:

- Sources and uses.
- Cash conversion cycle.
- Percent-of-sales forecasting.
- Free cash flow.
- NPV and IRR.
- Terminal value.
- Multiples.
- Enterprise value bridge.
- Expected return and volatility.
- Correlation and covariance.
- Sharpe ratio.
- Beta and cost of capital.
- Portfolio improvement rule.

### 5. Class Prep Mode

PACE should include a mode that asks one question at a time, gives no direct answer, and follows up based on the student's response. This is closest to the course's intended GenAI usage.

### 6. Exam Readiness Mode

PACE should include no-answer practice:

- Short calculation drills.
- Formula recognition.
- Model-debugging prompts.
- Explain-the-logic questions.
- Timed self-checks without AI-generated final solutions until after attempt.

## Design Boundary

PACE's core value is not "a finance chatbot." It is a constrained tutor that makes the student do the same cognitive sequence FIN1 expects:

```text
Read -> Try -> Model -> Explain -> Defend -> Reflect
```

The product should make bypassing that sequence harder, not easier.
