import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const PORT = 3002;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: path.join(__dirname, "e2e"),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    },
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 7"]
      }
    }
  ],
  webServer: {
    command: "npm run build && npm run start:test",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240000
  }
});
