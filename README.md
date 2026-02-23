# Cypress Quality Engineering Lab

Framework de automacao QA com Cypress para testes **UI**, **API**, **Contract** e **Smoke**, com foco em organizacao profissional, escalabilidade e execucao em CI.

## Objetivo

Este projeto foi estruturado para demonstrar habilidades de Quality Engineering em um contexto real de portfolio:

- arquitetura limpa para testes
- suites separadas por tipo e criticidade
- validacao de contrato com JSON Schema (Ajv)
- relatorios HTML por spec
- pipeline CI com upload de artifacts

## Stack

- Node.js 20+
- Cypress 15
- Ajv
- Mochawesome + Mochawesome Report Generator
- GitHub Actions

## Estrutura do projeto

```text
cypress/
  e2e/
    api/
    ui/
    smoke/
  fixtures/
    users/
  support/
    api/clients/
    constants/
    pages/
    schemas/
    utils/
  scripts/
scripts/
.github/workflows/
```

## Convencoes de naming

- `*.ui.cy.js` -> testes UI
- `*.api.cy.js` -> testes API
- `*.contract.cy.js` -> testes de contrato
- `*.smoke.<tipo>.cy.js` -> smoke tests

## Setup local

```bash
npm ci
```

## Comandos para ver os testes rodando

### 1) Verificar Cypress local

```bash
npm run cy:verify
```

### 2) Rodar no modo visual (interativo)

```bash
npm run cy:open
```

### 3) Rodar suites no terminal (headless)

Smoke:

```bash
npm run test:smoke
```

API + Contract:

```bash
npm run test:api
```

UI:

```bash
npm run test:ui
```

Regression completa (API + UI):

```bash
npm run test:regression
```

### 4) Gerar e abrir relatorios HTML

```bash
npm run report:clean
npm run test:regression
npm run report:html
```

Windows (abrir pasta de reports):

```powershell
Start-Process .\cypress\reports\html
```

## Pipeline CI

Workflow: `.github/workflows/qa-ci.yml`

- `smoke` em `pull_request` e `push`
- `regression` (matrix `api` e `ui`) em `push` e `workflow_dispatch`
- upload de artifacts em `cypress/reports`

## Cobertura atual

- smoke: fluxo critico de login UI + login API
- api: autenticacao positiva e negativa
- contract: schema de `/auth/login` e `/auth/me`
- ui: login valido, login invalido, validacoes de campo obrigatorio e usuario bloqueado

## Boas praticas aplicadas

- Page Object Model para UI
- API Client layer para chamadas HTTP
- constants centralizados (rotas/selectors/urls)
- fixtures versionadas para massa de dados
- validacao de contrato desacoplada com utilitario de schema

## Troubleshooting

### Cypress falha com `bad option: --smoke-test`

Este projeto ja protege os scripts contra isso (wrapper `scripts/cypress-cli.js` remove `ELECTRON_RUN_AS_NODE` da execucao).

Se quiser corrigir globalmente no Windows:

```powershell
[Environment]::SetEnvironmentVariable("ELECTRON_RUN_AS_NODE", $null, "User")
```

Abra um novo terminal apos esse comando.

## Roadmap recomendado

- adicionar tags por suite (`@smoke`, `@api`, `@ui`)
- incluir quality gates (ex.: limite de falhas)
- publicar badge de status do workflow no topo do README
- integrar analise estatica (lint/format) no CI

## Licenca

ISC
