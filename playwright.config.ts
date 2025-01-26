import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    globalSetup: require.resolve('./global-setup.ts'), 
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry'
    },
    reporter: [['html', { outputFolder: 'playwright-report' }]],
});
