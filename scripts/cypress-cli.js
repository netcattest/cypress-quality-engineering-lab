#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const args = process.argv.slice(2);
const env = { ...process.env };

// Some local setups export ELECTRON_RUN_AS_NODE=1 globally.
// That forces Cypress/Electron to boot as Node and breaks verify/run.
delete env.ELECTRON_RUN_AS_NODE;

const cypressPackagePath = require.resolve("cypress/package.json");
const cypressBin = path.join(path.dirname(cypressPackagePath), "bin", "cypress");
const result = spawnSync(process.execPath, [cypressBin, ...args], {
  stdio: "inherit",
  env,
});

if (result.error) {
  // eslint-disable-next-line no-console
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
