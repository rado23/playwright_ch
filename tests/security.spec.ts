import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Security Test - No Mixed Content (HTTP on HTTPS)', async ({ page }) => {
    await page.goto('https://automationintesting.online/');

    const requests = page.request;
    
    // Capture all network requests
    page.on('request', request => {
        const url = request.url();
        if (url.startsWith('http://')) {
            console.warn(`🚨 Mixed content detected: ${url}`);
            expect(url.startsWith('http://')).toBe(false);
        }
    });
});

test('Security Test - No JavaScript Errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', error => {
        errors.push(error.message);
    });

    await page.goto('https://automationintesting.online/');
    
    console.log(`🚨 JavaScript Errors: ${errors}`);

    expect(errors.length).toBe(0);
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        const reportDir = 'bug-reports';
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir);
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const bugReportFile = path.join(reportDir, `bug-report-${timestamp}.txt`);
        const screenshotPath = path.join(reportDir, `screenshot-${timestamp}.png`);

        await page.screenshot({ path: screenshotPath, fullPage: true });

        const bugReportContent = `
### Bug Report
- **Test Name:** ${testInfo.title}
- **Test File:** ${testInfo.file}
- **Status:** ${testInfo.status}
- **Error Message:** ${testInfo.error?.message || 'No error message'}
- **Timestamp:** ${timestamp}
- **Screenshot:** ${screenshotPath}

#### Steps to Reproduce:
1. Run the test: \`${testInfo.title}\`
2. Observe the failure in the logs.

#### Expected Behavior:
- The test should pass.

#### Actual Behavior:
- The test failed with the above error.

#### Additional Notes:
- Refer to the attached screenshot.
`;

        fs.writeFileSync(bugReportFile, bugReportContent.trim());
        console.log(`🚨 Bug report generated: ${bugReportFile}`);
    }
});