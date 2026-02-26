const fs = require("node:fs");
const path = require("node:path");

const suiteName = process.argv[2] || "suite";
const jsonDir = path.join(process.cwd(), "cypress", "reports", "json");
const summaryDir = path.join(process.cwd(), "cypress", "reports", "summary");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function formatSpecName(value) {
  return String(value || "unknown").replace(/\\/g, "/");
}

function collectTests(suite, acc = []) {
  if (!suite || typeof suite !== "object") {
    return acc;
  }

  if (Array.isArray(suite.tests)) {
    acc.push(...suite.tests);
  }

  if (Array.isArray(suite.suites)) {
    suite.suites.forEach((child) => collectTests(child, acc));
  }

  return acc;
}

function toSeconds(valueMs) {
  return Number((valueMs / 1000).toFixed(2));
}

function buildSpecSummary(result, fallbackName) {
  const tests = collectTests(result);
  const passing = tests.filter((test) => test?.state === "passed").length;
  const failing = tests.filter((test) => test?.state === "failed").length;
  const pending = tests.filter((test) => test?.state === "pending").length;
  const skipped = tests.filter((test) => test?.skipped === true).length;
  const durationMs = tests.reduce((sum, test) => sum + Number(test?.duration || 0), 0);

  return {
    spec: formatSpecName(result?.fullFile || result?.file || fallbackName),
    tests: tests.length,
    passing,
    failing,
    pending,
    skipped,
    durationMs,
  };
}

function buildMarkdown(summary) {
  const lines = [];
  lines.push(`## Suite Summary: ${summary.suite}`);
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("| --- | ---: |");
  lines.push(`| Total tests | ${summary.totals.tests} |`);
  lines.push(`| Passing | ${summary.totals.passing} |`);
  lines.push(`| Failing | ${summary.totals.failing} |`);
  lines.push(`| Pending | ${summary.totals.pending} |`);
  lines.push(`| Skipped | ${summary.totals.skipped} |`);
  lines.push(`| Pass rate | ${summary.totals.passRatePercent}% |`);
  lines.push(`| Duration (s) | ${summary.totals.durationSeconds} |`);
  lines.push(`| Flaky trend | ${summary.totals.flakyTrend} |`);
  lines.push("");
  lines.push("| Spec | Tests | Passing | Failing | Pending | Skipped | Duration (s) |");
  lines.push("| --- | ---: | ---: | ---: | ---: | ---: | ---: |");
  summary.specs.forEach((item) => {
    lines.push(
      `| ${item.spec} | ${item.tests} | ${item.passing} | ${item.failing} | ${item.pending} | ${item.skipped} | ${toSeconds(item.durationMs)} |`,
    );
  });
  lines.push("");
  return lines.join("\n");
}

function run() {
  if (!fs.existsSync(jsonDir)) {
    console.error("Pasta de JSON nao existe:", jsonDir);
    process.exit(1);
  }

  const files = fs.readdirSync(jsonDir).filter((file) => file.endsWith(".json"));

  if (!files.length) {
    console.error("Nenhum JSON encontrado em:", jsonDir);
    process.exit(1);
  }

  const specs = [];

  files.forEach((file) => {
    const filePath = path.join(jsonDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const results = Array.isArray(content?.results) ? content.results : [];

    results.forEach((result) => {
      specs.push(buildSpecSummary(result, path.parse(file).name));
    });
  });

  const totals = specs.reduce(
    (acc, item) => {
      acc.tests += item.tests;
      acc.passing += item.passing;
      acc.failing += item.failing;
      acc.pending += item.pending;
      acc.skipped += item.skipped;
      acc.durationMs += item.durationMs;
      return acc;
    },
    { tests: 0, passing: 0, failing: 0, pending: 0, skipped: 0, durationMs: 0 },
  );

  const passRatePercent = totals.tests
    ? Number(((totals.passing / totals.tests) * 100).toFixed(2))
    : 0;

  const summary = {
    suite: suiteName,
    generatedAt: new Date().toISOString(),
    totals: {
      tests: totals.tests,
      passing: totals.passing,
      failing: totals.failing,
      pending: totals.pending,
      skipped: totals.skipped,
      passRatePercent,
      durationSeconds: toSeconds(totals.durationMs),
      flakyTrend: "baseline (single run)",
    },
    specs: specs
      .sort((a, b) => a.spec.localeCompare(b.spec))
      .map((item) => ({
        ...item,
        durationSeconds: toSeconds(item.durationMs),
      })),
  };

  ensureDir(summaryDir);

  const summaryJsonPath = path.join(summaryDir, `${suiteName}-summary.json`);
  const summaryMdPath = path.join(summaryDir, `${suiteName}-summary.md`);

  fs.writeFileSync(summaryJsonPath, JSON.stringify(summary, null, 2), "utf8");
  fs.writeFileSync(summaryMdPath, buildMarkdown(summary), "utf8");

  console.log("Resumo JSON:", summaryJsonPath);
  console.log("Resumo Markdown:", summaryMdPath);
}

run();
