import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4322',
    browserName: 'chromium',
    channel: 'chromium',
    viewport: { width: 1440, height: 1000 },
    locale: 'en-US',
    timezoneId: 'UTC',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'node tests/start-backend.mjs',
      cwd: fileURLToPath(new URL('.', import.meta.url)),
      url: 'http://127.0.0.1:8001/api/health',
      reuseExistingServer: false,
      timeout: 60_000,
      gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
    },
    {
      command: 'npm run build && npm start',
      cwd: fileURLToPath(new URL('.', import.meta.url)),
      url: 'http://127.0.0.1:4322',
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        BACKEND_URL: 'http://127.0.0.1:8001',
        PUBLIC_SITE_URL: 'http://127.0.0.1:4322',
        HOST: '127.0.0.1',
        PORT: '4322',
        ASTRO_TELEMETRY_DISABLED: '1',
      },
      gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
    },
  ],
});
