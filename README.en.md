<h1 align="center">Cypress Quality Engineering Lab</h1>
<p align="center">
  QA automation framework focused on UI, API, Contract, and Smoke testing.
</p>

<p align="center">
  <a href="./README.md">
    <img src="https://flagcdn.com/br.svg" width="22" alt="Brazil flag" />
    Português (Brasil)
  </a>
  &nbsp;|&nbsp;
  <a href="./README.en.md">
    <img src="https://flagcdn.com/us.svg" width="22" alt="United States flag" />
    English
  </a>
</p>

<p align="center">
  <a href="https://github.com/netcattest/cypress-quality-engineering-lab/actions/workflows/qa-ci.yml">
    <img src="https://github.com/netcattest/cypress-quality-engineering-lab/actions/workflows/qa-ci.yml/badge.svg" alt="QA Pipeline" />
  </a>
  <img src="https://img.shields.io/badge/Cypress-15.11.0-17202C?logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
</p>

<div align="center">
  <img src="https://shinobite.com/assets/svg/cypress.svg" height="140" alt="Cypress logo" />
</div>

---

## Executive Summary

This repository demonstrates a professional quality engineering approach for test automation with Cypress.
It includes scalable architecture, functional and contract validation, CI orchestration, and evidence generation.

Primary goals:

- build a robust and maintainable test framework
- separate execution strategies by risk and feedback speed
- validate business behavior and API contracts
- produce actionable reports for teams and stakeholders

Latest improvements:

- Cypress upgraded to `15.11.0`
- deterministic tests for critical API flows (no random test data generators)
- stricter contract validation (`additionalProperties: false`)
- migration applied for Cypress environment API (`Cypress.expose` + `allowCypressEnv: false`)
- stronger pull request gate with `smoke` + `api/contract` validation
- suite-level CI summaries (pass/fail/duration/flaky baseline)
- expanded critical coverage (`/auth/refresh`, expired token, UI logout, and post-login navigation)
- runtime standardization with `engines`, `.nvmrc`, and `.node-version`

## Table of Contents

- [Architecture](#architecture)
- [Test Strategy](#test-strategy)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Execution Commands](#execution-commands)
- [Reporting and Evidence](#reporting-and-evidence)
- [CI Pipeline](#ci-pipeline)
- [Engineering Standards](#engineering-standards)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

## Architecture

Core design decisions:

- **Layered test architecture**
- **Single source of truth for routes/selectors/fixtures**
- **Reusable API clients and Page Objects**
- **Contract validation through JSON Schema + Ajv**

Main technical stack:

- Cypress 15
- Node.js 20+
- Ajv (schema validation)
- Mochawesome (JSON + HTML reports)
- GitHub Actions (continuous integration)

## Test Strategy

| Suite | Purpose | Scope | Trigger |
|---|---|---|---|
| Smoke | Fast health check | Critical user/API flows | Pull Request + Push |
| API | Service behavior validation | Positive/negative auth, token expiration, and refresh scenarios | Pull Request + Push / Manual |
| Contract | Response structure validation | Strict `/auth/login` and `/auth/me` schemas | Pull Request + Push / Manual |
| UI | Front-end behavior validation | Login success/failure/required fields/locked user + post-login navigation/logout | Push / Manual |
| Regression | Broad validation gate | Full API + UI suite | Push / Manual |

## Project Structure

```text
cypress-quality-engineering-lab/
|-- .github/
|   `-- workflows/
|       `-- qa-ci.yml
|-- .nvmrc
|-- .node-version
|-- cypress/
|   |-- e2e/
|   |   |-- api/
|   |   |-- smoke/
|   |   `-- ui/
|   |-- fixtures/
|   |   `-- users/
|   |-- reports/
|   |-- scripts/
|   |   |-- clean-reports.js
|   |   |-- generate-suite-summary.js
|   |   `-- generate-html-reports.js
|   `-- support/
|       |-- api/clients/
|       |-- constants/
|       |-- pages/
|       |-- schemas/
|       `-- utils/
|-- scripts/
|   `-- cypress-cli.js
|-- cypress.config.js
|-- package.json
|-- README.md
`-- README.en.md
```

## Quick Start

Install dependencies:

```bash
npm ci
```

Validate the local Cypress binary:

```bash
npm run cy:verify
```

Use the standardized Node runtime:

```bash
nvm use
```

## Execution Commands

Interactive mode:

```bash
npm run cy:open
```

Headless suites:

```bash
npm run test:smoke
npm run test:api
npm run test:ui
npm run test:regression
npm run report:summary -- smoke
```

One-command local CI simulation:

```bash
npm run report
```

## Reporting and Evidence

Generate reports manually:

```bash
npm run report:clean
npm run test:regression
npm run report:html
npm run report:summary -- regression
```

Open HTML reports on Windows:

```powershell
Start-Process .\cypress\reports\html
```

Report outputs:

- JSON: `cypress/reports/json/*.json`
- HTML: `cypress/reports/html/*.html`
- Suite summary (Markdown): `cypress/reports/summary/*.md`
- Suite summary (JSON): `cypress/reports/summary/*.json`

## CI Pipeline

Workflow file: `.github/workflows/qa-ci.yml`

Pipeline design:

- `smoke` job on `pull_request` and `push`
- `api_contract` gate job (`test:api`) after `smoke`
- `regression` matrix job (`api`, `ui`) on `push` and `workflow_dispatch`
- suite summary published to the GitHub Actions step summary
- report artifacts uploaded for traceability

## Engineering Standards

Implemented practices:

- Page Object Model for UI flows
- API client abstraction for HTTP requests
- constants-first approach for selectors/routes/URLs
- fixture-based test data management
- contract-first validation for critical endpoints
- strict schema policy (`additionalProperties: false`)
- deterministic inputs for critical API validations
- hardened negative assertions for authentication handling
- naming conventions by test responsibility (`*.ui.cy.js`, `*.api.cy.js`, `*.contract.cy.js`)

## Troubleshooting

### Cypress fails with `bad option: --smoke-test`

This project already mitigates the issue via `scripts/cypress-cli.js`, which removes `ELECTRON_RUN_AS_NODE` before running Cypress.

If you want to fix this globally on Windows:

```powershell
[Environment]::SetEnvironmentVariable("ELECTRON_RUN_AS_NODE", $null, "User")
```

Then open a new terminal session.

### `npm` warns about the Node engine version

This project is standardized on Node 20 and defines it in `package.json` (`engines`) as well as in `.nvmrc`/`.node-version`.

Use:

```bash
nvm use
```

or install and run Node 20.x explicitly.

## Roadmap

- add test tagging strategy (`@smoke`, `@api`, `@ui`, `@contract`)
- integrate lint/format quality gates in CI
- publish a release notes and changelog process
- expand coverage for additional endpoints and UI modules
- improve test observability (duration, flake trend, pass rate)

## License

MIT
