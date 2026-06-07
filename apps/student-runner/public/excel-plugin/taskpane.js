const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");
const questionEl = document.getElementById("student-question");

let officeReady = false;

function setOutput(title, body) {
  outputEl.textContent = `${title}\n\n${body}`;
}

function studentContext() {
  return questionEl.value.trim() || "No written question provided.";
}

async function getSelectionContext() {
  if (!officeReady || typeof Excel === "undefined") {
    return {
      address: "Browser preview",
      values: [["No Excel selection available"]],
      formulas: [["No Excel selection available"]],
    };
  }

  return Excel.run(async (context) => {
    const range = context.workbook.getSelectedRange();
    range.load(["address", "values", "formulas"]);
    await context.sync();
    return {
      address: range.address,
      values: range.values,
      formulas: range.formulas,
    };
  });
}

function sourceUseGuidance(selection) {
  return [
    `Selection: ${selection.address}`,
    `Your issue: ${studentContext()}`,
    "",
    "Use this sign logic:",
    "1. Asset increase = use of funds.",
    "2. Asset decrease = source of funds.",
    "3. Liability or equity increase = source of funds.",
    "4. Liability or equity decrease = use of funds.",
    "",
    "For Butler, receivables and inventory growth usually explain cash consumption. Accounts payable and bank notes usually explain financing sources.",
  ].join("\n");
}

function cccGuidance(selection) {
  return [
    `Selection: ${selection.address}`,
    `Your issue: ${studentContext()}`,
    "",
    "Check the structure, not just the arithmetic:",
    "Receivable days = accounts receivable / sales * 365.",
    "Inventory days = inventory / COGS * 365.",
    "Payable days = accounts payable / COGS * 365.",
    "Cash conversion cycle = receivable days + inventory days - payable days.",
    "",
    "Interpretation test: if CCC lengthens while sales grow, more cash is tied up in operations before customer collection.",
  ].join("\n");
}

function modelingGuidance(selection) {
  return [
    `Selection: ${selection.address}`,
    `Your issue: ${studentContext()}`,
    "",
    "A clean Butler model should separate:",
    "1. Operating performance: growth, margins, ROA, ROE.",
    "2. Working-capital investment: receivables, inventory, payables.",
    "3. Financing bridge: bank notes, trade credit, retained earnings.",
    "4. Recommendation: credit-line need and conditions.",
    "",
    "Before changing a formula, write the economic relationship in words. Then map numerator, denominator, and timing.",
  ].join("\n");
}

async function explainSelection() {
  const selection = await getSelectionContext();
  setOutput(
    "Selected Cell Context",
    [
      `Address: ${selection.address}`,
      `Values: ${JSON.stringify(selection.values)}`,
      `Formulas: ${JSON.stringify(selection.formulas)}`,
      "",
      "Ask: is this cell calculating an operating ratio, a source/use movement, or an interpretation metric? The next step depends on that classification.",
    ].join("\n"),
  );
}

async function handle(buttonId, title, builder) {
  try {
    statusEl.textContent = "Reading context...";
    const selection = await getSelectionContext();
    setOutput(title, builder(selection));
    statusEl.textContent = officeReady ? "Excel context loaded." : "Browser fallback mode.";
  } catch (error) {
    statusEl.textContent = "Could not read Excel selection.";
    setOutput("Error", String(error));
  }
}

document.getElementById("explain-selection").addEventListener("click", explainSelection);
document.getElementById("classify-source-use").addEventListener("click", () => handle("classify-source-use", "Source / Use Help", sourceUseGuidance));
document.getElementById("check-ccc").addEventListener("click", () => handle("check-ccc", "Cash Conversion Cycle Help", cccGuidance));
document.getElementById("model-guidance").addEventListener("click", () => handle("model-guidance", "Modeling Guidance", modelingGuidance));

if (window.Office) {
  Office.onReady(() => {
    officeReady = true;
    statusEl.textContent = "Connected to Excel.";
  });
} else {
  statusEl.textContent = "Browser fallback mode.";
}
