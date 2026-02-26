<h1 align="center">Cypress Quality Engineering Lab</h1>
<p align="center">
  Framework de automação de QA focado em testes UI, API, Contract e Smoke.
</p>

<p align="center">
  <a href="./README.md">
    <img src="https://flagcdn.com/br.svg" width="22" alt="Bandeira do Brasil" />
    Português (Brasil)
  </a>
  &nbsp;|&nbsp;
  <a href="./README.en.md">
    <img src="https://flagcdn.com/us.svg" width="22" alt="Bandeira dos Estados Unidos" />
    English
  </a>
</p>

<p align="center">
  <a href="https://github.com/netcattest/cypress-quality-engineering-lab/actions/workflows/qa-ci.yml">
    <img src="https://github.com/netcattest/cypress-quality-engineering-lab/actions/workflows/qa-ci.yml/badge.svg" alt="QA Pipeline" />
  </a>
  <img src="https://img.shields.io/badge/Cypress-15.11.0-17202C?logo=cypress&logoColor=white" alt="Cypress" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Licença MIT" />
</p>

<div align="center">
  <img src="https://shinobite.com/assets/svg/cypress.svg" height="140" alt="Cypress logo" />
</div>

---

## Resumo Executivo

Este repositório demonstra uma abordagem profissional de engenharia de qualidade para automação de testes com Cypress.
Inclui arquitetura escalável, validação funcional e de contrato, orquestração de CI e geração de evidências.

Objetivos principais:

- construir um framework robusto e manutenível
- separar estratégias de execução por risco e velocidade de feedback
- validar comportamento de negócio e contratos de API
- gerar relatórios acionáveis para times e stakeholders

Melhorias mais recentes:

- Cypress atualizado para `15.11.0`
- testes determinísticos para fluxos críticos de API (sem geradores aleatórios)
- validação de contrato mais rigorosa (`additionalProperties: false`)
- migração aplicada para API de ambiente do Cypress (`Cypress.expose` + `allowCypressEnv: false`)
- gate de pull request reforçado com validações `smoke` + `api/contract`
- sumários de suíte no CI (pass/fail/duração/flaky baseline)
- cobertura crítica expandida (`/auth/refresh`, token expirado, logout UI e navegação pós-login)
- padronização de runtime com `engines`, `.nvmrc` e `.node-version`

## Sumário

- [Arquitetura](#arquitetura)
- [Estratégia de Testes](#estratégia-de-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Início Rápido](#início-rápido)
- [Comandos de Execução](#comandos-de-execução)
- [Relatórios e Evidências](#relatórios-e-evidências)
- [Pipeline de CI](#pipeline-de-ci)
- [Padrões de Engenharia](#padrões-de-engenharia)
- [Solução de Problemas](#solução-de-problemas)
- [Roadmap](#roadmap)
- [Licença](#licença)

## Arquitetura

Decisões principais de design:

- **Arquitetura de testes em camadas**
- **Fonte única de verdade para rotas/seletores/fixtures**
- **API Clients e Page Objects reutilizáveis**
- **Validação de contrato com JSON Schema + Ajv**

Stack técnica principal:

- Cypress 15
- Node.js 20+
- Ajv (validação de schema)
- Mochawesome (relatórios JSON + HTML)
- GitHub Actions (integração contínua)

## Estratégia de Testes

| Suite | Objetivo | Escopo | Trigger |
|---|---|---|---|
| Smoke | Checagem rápida de saúde | Fluxos críticos de usuário/API | Pull Request + Push |
| API | Validação de comportamento de serviço | Auth positivo/negativo, expiração de token e refresh | Pull Request + Push / Manual |
| Contract | Validação de estrutura de resposta | Schemas estritos de `/auth/login` e `/auth/me` | Pull Request + Push / Manual |
| UI | Validação de comportamento de front-end | Login sucesso/falha/campos obrigatórios/usuário bloqueado + navegação pós-login/logout | Push / Manual |
| Regression | Gate amplo de validação | Suíte completa API + UI | Push / Manual |

## Estrutura do Projeto

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

## Início Rápido

Instalar dependências:

```bash
npm ci
```

Validar binário local do Cypress:

```bash
npm run cy:verify
```

Usar runtime padronizado de Node:

```bash
nvm use
```

## Comandos de Execução

Modo interativo:

```bash
npm run cy:open
```

Suites headless:

```bash
npm run test:smoke
npm run test:api
npm run test:ui
npm run test:regression
npm run report:summary -- smoke
```

Simulação local de CI em um comando:

```bash
npm run report
```

## Relatórios e Evidências

Gerar relatórios manualmente:

```bash
npm run report:clean
npm run test:regression
npm run report:html
npm run report:summary -- regression
```

Abrir relatórios HTML no Windows:

```powershell
Start-Process .\cypress\reports\html
```

Saídas de relatório:

- JSON: `cypress/reports/json/*.json`
- HTML: `cypress/reports/html/*.html`
- Sumário de suíte (Markdown): `cypress/reports/summary/*.md`
- Sumário de suíte (JSON): `cypress/reports/summary/*.json`

## Pipeline de CI

Arquivo de workflow: `.github/workflows/qa-ci.yml`

Design do pipeline:

- job `smoke` em `pull_request` e `push`
- job `api_contract` de gate (`test:api`) após `smoke`
- job `regression` em matrix (`api`, `ui`) em `push` e `workflow_dispatch`
- sumário de suíte publicado no GitHub Actions step summary
- artifacts de relatório enviados para rastreabilidade

## Padrões de Engenharia

Práticas implementadas:

- Page Object Model para fluxos UI
- abstração de API Client para requisições HTTP
- abordagem constants-first para selectors/routes/URLs
- gestão de dados de teste com fixtures
- validação contract-first para endpoints críticos
- política de schemas estritos (`additionalProperties: false`)
- entradas determinísticas para validações críticas de API
- asserções negativas endurecidas para autenticação
- convenções de nomenclatura por responsabilidade (`*.ui.cy.js`, `*.api.cy.js`, `*.contract.cy.js`)

## Solução de Problemas

### Cypress falha com `bad option: --smoke-test`

Este projeto já mitiga o problema via `scripts/cypress-cli.js`, removendo `ELECTRON_RUN_AS_NODE` antes de executar Cypress.

Se quiser corrigir globalmente no Windows:

```powershell
[Environment]::SetEnvironmentVariable("ELECTRON_RUN_AS_NODE", $null, "User")
```

Depois, abra uma nova sessão de terminal.

### `npm` alerta sobre versão de Node (engine)

Este projeto está padronizado para Node 20 e define isso em `package.json` (`engines`) e também em `.nvmrc`/`.node-version`.

Use:

```bash
nvm use
```

ou instale e execute com Node 20.x.

## Roadmap

- adicionar estratégia de tags de teste (`@smoke`, `@api`, `@ui`, `@contract`)
- integrar gates de qualidade de lint/format no CI
- publicar processo de release notes e changelog
- expandir cobertura para endpoints e módulos UI adicionais
- evoluir observabilidade de testes (duração, tendência de flake, pass-rate)

## Licença

MIT
