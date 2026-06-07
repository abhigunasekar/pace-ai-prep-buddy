# PACE Butler Lumber Prototype Instructions

Professor Baker,

This repository contains a local MVP of PACE, an AI-enabled preparation tool for FIN1 case learning. The current pilot is built around Butler Lumber Day 1.

## What the Prototype Does

PACE is designed to improve case preparation without replacing student thinking.

The student flow is gated:

1. **Tools**: student reviews the relevant Butler tools and identifies the most important tool.
2. **Tutorials**: student answers concept checks after a placeholder tutorial video.
3. **Assignment**: student answers the Butler assignment questions. Excel-required questions ask the student to complete the Excel work first, then enter an answer and reasoning.
4. **Reflection**: student records one pre-class takeaway.
5. **Submit**: student submits locally and can download an activity report.

The instructor view shows:

1. Submissions by hour.
2. Average time to completion.
3. Questions where students reported getting stuck.

The Excel helper is a local Office taskpane prototype. It provides process guidance for:

- selected-cell context,
- sources and uses logic,
- cash conversion cycle setup,
- modeling workflow.

It intentionally does not complete the Butler model for the student.

## How to Run Locally

Prerequisites:

- Node.js installed.
- Access to the Butler Day 1 tools PDF and Excel template.

From the repository root:

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

## Local Butler Files

For public-source-control reasons, the raw Butler course files are not included in the GitHub repository.

To run the full Butler prototype locally, place these files here:

```text
apps/student-runner/public/butler/Butler_Day_1_Tools.pdf
apps/student-runner/public/butler/Butler_Lumber_Day_1_Template.xlsx
```

The app will then show the tools PDF and allow the Excel template download.

## Instructor Dashboard

In the app, use the top toggle to switch from **Student** to **Instructor**.

The dashboard reads local prototype submissions from the browser. If there are no submissions yet, click **Seed demo data** to preview the charts.

## Excel Helper

The taskpane prototype is served at:

```text
http://127.0.0.1:5173/excel-plugin/taskpane.html
```

The Excel manifest is:

```text
apps/excel-plugin/manifest.xml
```

For a local demo, start the dev server, then sideload the manifest in Excel. The current add-in is a prototype and should be treated as a local demonstration, not a production Microsoft 365 deployment.

## Suggested Feedback Questions

The most useful feedback would be on:

1. Whether the staged student flow matches the way FIN1 students should prepare.
2. Which Butler questions need stricter guidance, better hints, or different evidence requirements.
3. Which instructor metrics would be most valuable before class.
4. Whether the Excel helper should focus more on formulas, conceptual interpretation, or diagnosing common modeling mistakes.
5. What would be required to pilot this with one real FIN1 assignment.
