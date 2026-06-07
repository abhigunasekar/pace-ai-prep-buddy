# PACE Butler Excel Helper

Local Office add-in prototype for the Butler Lumber Day 1 workbook.

## Run Locally

1. Start the app server from the repo root:
   `npm run dev`
2. Confirm the taskpane loads:
   `http://127.0.0.1:5173/excel-plugin/taskpane.html`
3. Sideload `apps/excel-plugin/manifest.xml` in Excel.

The current taskpane gives process guidance for selected cells, sources and uses logic, cash conversion cycle setup, and modeling workflow. It intentionally avoids completing the Butler model for the student.
