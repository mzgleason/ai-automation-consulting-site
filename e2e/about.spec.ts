import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test("renders core sections in sequence", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { level: 1, name: /obsessed with systems/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /spend my life in science/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /reporting tool and a spreadsheet/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "How I work." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /stay close to the real world/i })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /far more adaptable than they think/i })).toBeVisible();
  });
});
