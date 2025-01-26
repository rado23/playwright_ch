# Playwright Test Suite

## Overview
This project is an automated test suite using **Playwright** with **TypeScript**. It includes functional and non-functional tests for the website **https://automationintesting.online/**, covering:
- **Functional tests** (Homepage, Contact Us form, etc.)
- **Non-functional tests** (Accessibility, Security, Performance, and Responsive UI checks)

## Folder Structure
```
playwright-ch/
├── tests/                   # Contains all test files
│   ├── homepage.spec.ts      # Functional test for homepage
│   ├── accessibility.spec.ts # Accessibility checks using axe-core
│   ├── security.spec.ts      # Security tests (mixed content, JS errors)
│   ├── performance.spec.ts   # Page load performance tests
│   ├── responsive_ui.spec.ts # Responsive UI tests across devices
├── bug-reports/              # Auto-generated bug reports and screenshots
├── playwright.config.ts      # Playwright configuration file
├── global-setup.ts           # Global setup file
├── tsconfig.json             # TypeScript configuration
├── TEST_PLAN.md              # Detailed test plan for the suite
├── package.json              # Dependencies and scripts
├── README.md                 # This documentation file
```

---
## **Test Plan**
The test plan is documented in **TEST_PLAN.md** and outlines:
- **Objectives & Scope** (Functional & Non-Functional Testing)
- **Test Approach & Tools**
- **Test Scenarios & Expected Results**
- **Execution Strategy** (How to run tests)
- **Reporting & Bug Tracking**
- **Test Schedule & Deliverables**

For detailed information, refer to **[TEST_PLAN.md](TEST_PLAN.md)**.

---

## **Installation & Setup**

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Visual Studio Code](https://code.visualstudio.com/) (or any editor of choice)
- [Git](https://git-scm.com/)

### **2️⃣ Install Dependencies**
Run the following command inside the project folder:
```sh
npm install
```

### **3️⃣ Install Playwright Browsers**
```sh
npx playwright install
```
This ensures that required browsers (Chromium, Firefox, and WebKit) are installed.

---
## **Running the Test Suite**

### **1️⃣ Run All Tests**
```sh
npx playwright test
```

### **2️⃣ Run a Specific Test File**
Example:
```sh
npx playwright test tests/accessibility.spec.ts
```

### **3️⃣ Run a Specific Test Case**
Example:
```sh
npx playwright test -g "Accessibility Test - Detect Issues"
```

### **4️⃣ Run Tests in Headed Mode (For Debugging)**
```sh
npx playwright test --headed
```
This runs tests with the browser UI visible.

### **5️⃣ Debug Tests Using Playwright Inspector**
```sh
npx playwright test --debug
```
This opens Playwright's **debugging tool**, allowing step-by-step execution.

---
## **Test Reporting**
### **1️⃣ HTML Report (Built-in Playwright Reporting)**
After running the tests, generate an HTML report:
```sh
npx playwright test --reporter=html
```
To open the report:
```sh
npx playwright show-report
```
This will launch a browser with a **detailed test report**, including test results, errors, and screenshots.

### **2️⃣ Bug Reports (Auto-Generated on Failures)**
When a test fails, a **bug report** is generated inside the `bug-reports/` folder.
- Each failed test generates a **bug-report-TIMESTAMP.txt** file.
- Screenshots of failures are also stored in this folder.

Example:
```sh
bug-reports/
├── bug-report-2025-01-25-18-45-30.txt
├── screenshot-2025-01-25-18-45-30.png
```

---
## **Additional Features**

### **1️⃣ Environment Setup (Global Config)**
Global setup is handled in `global-setup.ts`, which ensures a clean test state before execution.

### **2️⃣ TypeScript Compilation**
If you see duplicate `.js` files, clean up the compiled files:
```sh
find . -name "*.js" -not -path "./node_modules/*" -delete
find . -name "*.js.map" -not -path "./node_modules/*" -delete
```

To explicitly build TypeScript files:
```sh
npx tsc --build
```

---
## **Contributors**
Developer: Rado


