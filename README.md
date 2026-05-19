# XLSmart Assessment: Web Automation (Playwright)

This project is part of the **Senior QA Engineer Assessment** for PT XLSMART Telecom Sejahtera Tbk.

## Objective
Create automation tests for **Register for Instapay** and **Create Invoice** pages based on the provided screenshots, using Playwright with TypeScript.

## 📁 Project Structure
├── pages/ # Page Object Models
│ ├── CreateInvoicePage.ts
│ └── RegisterInstapayPage.ts
├── tests/ # Test specs (20 test cases)
│ ├── api/ # API tests with Playwright
│ ├── create-invoice.spec.ts
│ └── register-instapay.spec.ts
├── postman/ # Postman collection for API tests
│ └── xlsmart-qa-api-collection.json
├── playwright.config.ts
└── tsconfig.json

## 🧪 Test Coverage
- **Register for Instapay:** 10 test cases (REG-01 to REG-10)
- **Create Invoice:** 10 test cases (INV-01 to INV-10)

## 🛠️ Tools Used
- **Playwright** + **TypeScript** (Web Automation)
- **Postman** + **CryptoJS** (API Automation)

## ⚠️ Important Notes
- The **live URL** for the web pages was **not provided** in the assessment. This code is ready to run once the URL is available.
- The **API staging endpoint** (`api-stage.tspayment.id`) is not accessible from the public internet (error `ENOTFOUND`). The signature encryption logic (HMAC-SHA256) and 30 test scenarios are fully aligned with the API specification.

## 🚀 How to Run (When Environment is Available)
```bash
npm install
npx playwright test