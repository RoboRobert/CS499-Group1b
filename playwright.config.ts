// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/lib/Tests',
  use: {
    video: 'on', // or 'retain-on-failure'
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['list'], ['html']],
});