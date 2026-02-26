const fs = require("node:fs");
const path = require("node:path");
const marge = require("mochawesome-report-generator");

const jsonDir = path.join(process.cwd(), "cypress", "reports", "json");
const htmlDir = path.join(process.cwd(), "cypress", "reports", "html");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function safeName(name) {
  return name
    .replace(/cypress[\\/]+e2e[\\/]+/i, "")
    .replace(/[/\\]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

function getSpecNameFromMochawesome(json) {
  const candidate =
    json?.results?.[0]?.fullFile ||
    json?.results?.[0]?.file ||
    json?.stats?.filename;

  if (!candidate) {
    return null;
  }

  return safeName(candidate);
}

async function run() {
  ensureDir(htmlDir);

  if (!fs.existsSync(jsonDir)) {
    console.error("Pasta de JSON nao existe:", jsonDir);
    process.exit(1);
  }

  const files = fs.readdirSync(jsonDir).filter((file) => file.endsWith(".json"));

  if (!files.length) {
    console.error("Nenhum JSON encontrado em:", jsonDir);
    process.exit(1);
  }

  for (const file of files) {
    const fullJsonPath = path.join(jsonDir, file);
    const content = JSON.parse(fs.readFileSync(fullJsonPath, "utf8"));

    if (!Array.isArray(content?.results) || content.results.length === 0) {
      console.warn("Ignorando JSON sem results:", fullJsonPath);
      continue;
    }

    const specName = getSpecNameFromMochawesome(content);
    const fallbackName = safeName(path.parse(file).name);
    const reportName = specName || fallbackName;

    await marge.create(content, {
      reportDir: htmlDir,
      reportFilename: reportName,
      inlineAssets: true,
      charts: true,
    });

    console.log("HTML gerado:", path.join(htmlDir, `${reportName}.html`));
  }

  console.log("Todos os HTMLs em:", htmlDir);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
