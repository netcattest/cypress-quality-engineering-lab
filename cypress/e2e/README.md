# Test Execution Conventions

## Naming

- UI specs: `*.ui.cy.js`
- API specs: `*.api.cy.js`
- Contract specs: `*.contract.cy.js`
- Smoke specs: `*.smoke.<type>.cy.js`

## Folders

- `cypress/e2e/ui`: UI regression tests
- `cypress/e2e/api`: API + contract regression tests
- `cypress/e2e/smoke`: fast critical-path tests

## NPM Scripts

- `npm run test:smoke`
- `npm run test:api`
- `npm run test:ui`
- `npm run test:regression`
