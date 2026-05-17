import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test("renders core sections in sequence", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { level: 1, name: "I’ve always been obsessed with systems." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "I thought I was going to spend my life in science." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "My career started with a reporting tool and a spreadsheet." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "How I work." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Outside of work, I try to stay close to the real world." })).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "What I care about most now is helping people realize they can reinvent themselves."
      })
    ).toBeVisible();
  });
});
