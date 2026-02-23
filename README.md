<h1 align="center">Cypress Quality Engineering Lab</h1>
<p align="center">
  QA automation framework focused on UI, API, Contract, and Smoke testing.
</p>

<p align="center">
  <a href="https://github.com/netcattest/cypress-quality-engineering-lab/actions/workflows/qa-ci.yml">
    <img src="https://github.com/netcattest/cypress-quality-engineering-lab/actions/workflows/qa-ci.yml/badge.svg" alt="QA Pipeline" />
  </a>
  <img src="https://img.shields.io/badge/Cypress-15.10.0-17202C?logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT" />
</p>

<div align="center">
  <img src="https://shinobite.com/assets/svg/cypress.svg" height="140" alt="Cypress logo" />
</div>

---

## Executive Summary

This repository demonstrates a professional QA engineering approach for test automation with Cypress.
It includes scalable test architecture, functional and contract validation, CI orchestration, and test evidence generation.

Primary goals:

- build a robust and maintainable test framework
- separate execution strategies by risk and feedback speed
- validate business behavior and API contracts
- produce actionable reports for teams and stakeholders

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
| API | Service behavior validation | Positive and negative auth scenarios | Push / Manual |
| Contract | Response structure validation | `/auth/login` and `/auth/me` schemas | Push / Manual |
| UI | Front-end behavior validation | Login success/failure/required fields/locked user | Push / Manual |
| Regression | Broad validation gate | API + UI full suite | Push / Manual |

## Project Structure

```text
cypress-quality-engineering-lab/
|-- .github/
|   `-- workflows/
|       `-- qa-ci.yml
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
`-- README.md
```

## Quick Start

Install dependencies:

```bash
npm ci
```

Validate local Cypress binary:

```bash
npm run cy:verify
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
```

Open HTML reports on Windows:

```powershell
Start-Process .\cypress\reports\html
```

Report outputs:

- JSON: `cypress/reports/json/*.json`
- HTML: `cypress/reports/html/*.html`

## CI Pipeline

Workflow file: `.github/workflows/qa-ci.yml`

Pipeline design:

- `smoke` job on `pull_request` and `push`
- `regression` matrix job (`api`, `ui`) on `push` and `workflow_dispatch`
- report artifacts uploaded for traceability

## Engineering Standards

Implemented practices:

- Page Object Model for UI flows
- API Client abstraction for HTTP requests
- Constants-first approach for selectors/routes/URLs
- Fixture-based test data management
- Contract-first validation for critical endpoints
- Naming conventions by test responsibility (`*.ui.cy.js`, `*.api.cy.js`, `*.contract.cy.js`)

## Troubleshooting

### Cypress fails with `bad option: --smoke-test`

This project already mitigates the issue through `scripts/cypress-cli.js`, which removes `ELECTRON_RUN_AS_NODE` before running Cypress.

If you want to fix this globally on Windows:

```powershell
[Environment]::SetEnvironmentVariable("ELECTRON_RUN_AS_NODE", $null, "User")
```

Then open a new terminal session.

## Roadmap

- add test tagging strategy (`@smoke`, `@api`, `@ui`, `@contract`)
- integrate linting/format quality gates in CI
- publish release notes and changelog process
- expand coverage to additional endpoints and UI modules
- add test observability metrics (duration, flake trend, pass-rate)

## License

MIT
