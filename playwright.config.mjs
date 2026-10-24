import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 300_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'docs/e2e-artifacts/playwright-report' }]],
  use: {
    baseURL: process.env.FAUCON_BASE || 'http://localhost:4200',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROME_PATH ||
        '/tmp/cursor-sandbox-cache/4f2e1f2cf745b611ab05ecd2920e620b/playwright/chromium-1248/chrome-linux64/chrome',
    },
  },
});
