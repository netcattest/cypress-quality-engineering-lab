/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const marge = require("mochawesome-report-generator");

const jsonDir = path.join(process.cwd(), "cypress", "reports", "json");
const htmlDir = path.join(process.cwd(), "cypress", "reports", "html");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function safeName(name) {
  return name
    .replace(/cypress[\\/]+e2e[\\/]+/i, "") // remove prefixo
    .replace(/[/\\]/g, "-")                // separador vira '-'
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

// tenta achar o path do spec dentro do JSON do mochawesome
function getSpecNameFromMochawesome(json) {
  // mochawesome geralmente traz: results[0].fullFile
  const candidate =
    json?.results?.[0]?.fullFile ||
    json?.results?.[0]?.file ||
    json?.stats?.filename;

  if (!candidate) return null;

  return safeName(candidate);
}

async function run() {
  ensureDir(htmlDir);

  if (!fs.existsSync(jsonDir)) {
    console.error("Pasta de JSON não existe:", jsonDir);
    process.exit(1);
  }

  const files = fs.readdirSync(jsonDir).filter((f) => f.endsWith(".json"));

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
      reportFilename: reportName,  // <<< nome do HTML
      inlineAssets: true,
      charts: true,
    });

    console.log("✅ HTML gerado:", path.join(htmlDir, `${reportName}.html`));
  }

  console.log("✅ Todos os HTMLs em:", htmlDir);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
