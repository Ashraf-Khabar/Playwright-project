import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.ENV ? `${process.env.ENV}.env` : 'integration.env';
dotenv.config({ path: path.resolve(__dirname, 'tests-data', envFile) });

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['html'],
    ['./utils/influx-reporter.ts']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});