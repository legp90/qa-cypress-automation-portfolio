# QA Automation Showcase | Cypress & E2E Testing Suite

Framework de pruebas automatizadas End-to-End (E2E) y documentación de calidad de software sobre la plataforma de comercio electrónico **SauceDemo**, implementando el patrón de diseño **Page Object Model (POM)** y buenas prácticas de testing.

---

## 🛠️ Stack Tecnológico

* **Core Test Framework:** [Cypress.io](https://www.cypress.io/) (v13+)
* **Lenguaje:** JavaScript (ES6+)
* **Patrón de Arquitectura:** Page Object Model (POM)
* **Gestión & Documentación:** Jira Guidelines, Markdown Test Matrices, BVA & Equivalence Partitioning
* **Control de Versiones:** Git / GitHub

---

## 📁 Arquitectura del Proyecto

```text
├── cypress/
│   ├── e2e/
│   │   ├── pages/          # Encapsulación de selectores y acciones (POM)
│   │   │   └── LoginPage.js
│   │   └── tests/          # Especificaciones y casos de prueba ejecutables
│   │       └── login.cy.js
│   ├── fixtures/           # Mock data y fixtures de prueba
│   └── support/            # Comandos globales y configuraciones
├── docs/
│   ├── test-matrix.md      # Matriz funcional RTM, BVA y consultas SQL
│   └── bug-report-sample.md# Plantilla y ejemplo de reporte de defectos estilo Jira
├── cypress.config.js       # Configuración global de Cypress
└── package.json            # Scripts de ejecución y dependencias