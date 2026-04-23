import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
import path from 'path';

const environment = process.env.ENV || 'integration';

dotenv.config({ path: path.resolve(__dirname, 'tests-data', 'integration.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
