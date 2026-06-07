from pathlib import Path
from textwrap import wrap


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "deliverables" / "PACE_MVP_Executive_Summary.pdf"


SECTIONS = [
    (
        "Problem",
        [
            "FIN1 students often struggle to convert case materials, exhibits, tools, and Excel work into a class-ready point of view. Generic AI chat can make this worse by giving polished answers too early. PACE solves a narrower problem: force preparation evidence, scaffold the hard concepts, and surface where students are stuck before class.",
        ],
    ),
    (
        "MVP Features",
        [
            "Canvas-style student flow with five gated stages: tools, tutorial, assignment, reflection, and submit.",
            "Butler Lumber Day 1 content loaded into the app: tools PDF, Excel template, tutorial checks, and assignment prompts.",
            "Excel-required questions ask students to complete the model first, then enter an answer and reasoning.",
            "Student report download captures preparation evidence and pre-class reflection.",
            "Instructor dashboard shows submissions by hour, average completion time, and most common stuck points.",
            "Local Excel taskpane helper gives process guidance for selected cells, sources and uses, cash conversion cycle, and modeling workflow.",
        ],
    ),
    (
        "What Is Working Locally",
        [
            "Student App: working local Vite app at http://127.0.0.1:5173/ with gated Butler workflow.",
            "Instructor View: working local dashboard backed by browser localStorage and demo-data seeding.",
            "Excel Plugin: working taskpane served at /excel-plugin/taskpane.html with Office.js hooks and browser fallback.",
            "Artifacts: executive summary PDF and Professor Baker feedback email generated in /deliverables.",
        ],
    ),
    (
        "Pending to Scale",
        [
            "Replace localStorage with authenticated persistence tied to Canvas roster and assignment IDs.",
            "Add a professor authoring workflow for cases, tool PDFs, tutorial videos, rubrics, and Excel template mappings.",
            "Connect AI responses to a guarded retrieval layer over approved FIN1 materials and case-specific rubrics.",
            "Instrument learning outcomes: completion quality, misconception clusters, class participation, and performance deltas.",
            "Harden the Excel add-in for production with HTTPS hosting, Microsoft 365 deployment, telemetry, and cell-level rubric checks.",
            "Run a controlled pilot with Professor Baker to validate whether the flow improves preparation without answer leakage.",
        ],
    ),
    (
        "Immediate Ask",
        [
            "Use Butler Lumber as a live feedback pilot: review the student flow, identify where the prompts should be stricter or more helpful, and decide which FIN1 case should be the second build-out.",
        ],
    ),
]


def esc(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def add_line(commands, text, x, y, size=10, font="F1"):
    commands.append(f"BT /{font} {size} Tf {x} {y} Td ({esc(text)}) Tj ET")


def build_page(page_num, page_lines):
    commands = []
    add_line(commands, "PACE MVP Executive Summary", 54, 742, 22, "F2")
    add_line(commands, "Pilot case: FIN1 Butler Lumber Day 1", 54, 718, 10, "F1")
    y = 690
    for kind, text in page_lines:
      if kind == "h2":
          y -= 8
          add_line(commands, text, 54, y, 13, "F2")
          y -= 18
      elif kind == "bullet":
          for idx, line in enumerate(wrap(text, 92)):
              prefix = "- " if idx == 0 else "  "
              add_line(commands, prefix + line, 72, y, 9.5, "F1")
              y -= 14
          y -= 2
      else:
          for line in wrap(text, 96):
              add_line(commands, line, 54, y, 10, "F1")
              y -= 14
          y -= 5
    add_line(commands, f"Page {page_num}", 524, 36, 8, "F1")
    return "\n".join(commands).encode("latin-1", "replace")


def paginate():
    logical = []
    for title, items in SECTIONS:
        logical.append(("h2", title))
        bullet_mode = title not in {"Problem", "Immediate Ask"}
        for item in items:
            logical.append(("bullet" if bullet_mode else "p", item))

    pages = []
    current = []
    used = 0
    for kind, text in logical:
        estimated = 2 if kind == "h2" else max(1, len(wrap(text, 92))) + 1
        if used + estimated > 38 and current:
            pages.append(current)
            current = []
            used = 0
        current.append((kind, text))
        used += estimated
    if current:
        pages.append(current)
    return pages


def write_pdf(pages):
    objects = []
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    kids = " ".join(f"{3 + i * 2} 0 R" for i in range(len(pages)))
    objects.append(f"<< /Type /Pages /Kids [{kids}] /Count {len(pages)} >>".encode())
    for i, content in enumerate(pages):
        page_obj = 3 + i * 2
        content_obj = page_obj + 1
        objects.append(
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents {content_obj} 0 R >>".encode()
        )
        objects.append(b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("wb") as f:
        f.write(b"%PDF-1.4\n")
        offsets = [0]
        for idx, obj in enumerate(objects, start=1):
            offsets.append(f.tell())
            f.write(f"{idx} 0 obj\n".encode())
            f.write(obj)
            f.write(b"\nendobj\n")
        xref = f.tell()
        f.write(f"xref\n0 {len(objects) + 1}\n".encode())
        f.write(b"0000000000 65535 f \n")
        for offset in offsets[1:]:
            f.write(f"{offset:010d} 00000 n \n".encode())
        f.write(f"trailer << /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode())


def main():
    pages = [build_page(i + 1, lines) for i, lines in enumerate(paginate())]
    write_pdf(pages)
    print(OUT)


if __name__ == "__main__":
    main()
