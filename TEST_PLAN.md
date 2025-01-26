# Test Plan: Playwright Automation Suite

## Overview
This test plan outlines the **strategy, scope, and objectives** for the Playwright-based automation test suite for **https://automationintesting.online/**. The project involves migrating existing Java/Selenium tests to **Playwright with TypeScript**.

## Objectives
- **Verify core functionality** of the website using functional tests.
- **Ensure non-functional requirements** such as accessibility, security, performance, and responsiveness are met.
- **Provide clear documentation** for executing and maintaining the test suite.

---

## Test Scope

### **In-Scope**
**Functional Tests:**
- Homepage accessibility and loading
- Contact Us form submission

**Non-Functional Tests:**
- **Performance:** Ensure page load time is within acceptable limits
- **Accessibility:** Detect violations using `axe-core`
- **Security:** Check for mixed-content issues and JavaScript errors
- **Responsive UI:** Verify layout on different screen sizes

### **Out-of-Scope**
**External API Testing** (e.g., third-party integrations)
**End-to-End Payment Processing** (not part of this assessment)

---

## Test Approach
The test suite follows the **UI Automation Testing approach** with Playwright.

- **Test Runner:** Playwright Test
- **Programming Language:** TypeScript
- **Assertions Library:** Playwright built-in `expect`
- **Execution Mode:** Headless and Headed options
- **Reporting Mechanism:** Playwright HTML reports and bug reports
- **Test Execution Environments:** Local execution with Chromium

---

## Test Scenarios

### **1️⃣ Functional Tests**
| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| TC-001 | Homepage loads successfully | The page title and key elements are displayed |
| TC-002 | Contact Us form submission | A success message appears after submitting valid data |

### **2️⃣ Non-Functional Tests**
| Test Case ID | Scenario | Expected Result |
|-------------|----------|----------------|
| TC-005 | Page Load Performance | Page loads within 3 seconds |
| TC-006 | Accessibility Compliance | No critical violations detected |
| TC-007 | Security - Mixed Content | No HTTP requests on HTTPS pages |
| TC-008 | Responsive UI | Website adapts correctly to mobile, tablet, and desktop views |

---

## Test Execution Strategy

- **Automated tests** will be run locally using Playwright.
- Tests will be executed in **multiple browsers**: Chromium, WebKit, and Firefox.
- A **bug report** will be automatically generated for failed test cases.

---

## Test Reporting & Bug Tracking

### **1️⃣ HTML Test Report**
After execution, generate a detailed test report:
```sh
npx playwright test --reporter=html
```
To view the report:
```sh
npx playwright show-report
```

### **2️⃣ Auto-Generated Bug Reports**
- Failed tests generate a **bug report** with details and screenshots.
- Files are stored in `bug-reports/`.

---

## Test Schedule & Deliverables
| Activity | Timeline |
|----------|-----------|
| Test Suite Development | Week 1 |
| Functional Tests Implementation | Week 1 |
| Non-Functional Tests Implementation | Week 1 |
| Documentation (README, Test Plan) | Week 1 |
| Final Execution & Submission | End of Week 1 |

---

## Conclusion
This test plan ensures a structured approach to testing **https://automationintesting.online/**. The combination of **functional and non-functional testing** with Playwright enables comprehensive validation of the system’s quality. 

