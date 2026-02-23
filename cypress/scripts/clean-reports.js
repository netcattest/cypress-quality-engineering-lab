const fs = require("node:fs");
const path = require("node:path");

const reportsDir = path.join(process.cwd(), "cypress", "reports");

fs.rmSync(reportsDir, { recursive: true, force: true });
fs.mkdirSync(reportsDir, { recursive: true });
