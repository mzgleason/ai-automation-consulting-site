import { expect, test } from "@playwright/test";

test.describe("portfolio project template", () => {
  test.describe.configure({ timeout: 60_000 });

  test("renders reusable case study sections in order across breakpoints", async ({ page }) => {
    await page.goto("/portfolio/ai-driven-linkedin-content-workflow", {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });

    const expectedOrder = [
      page.getByRole("heading", { level: 1, name: /human-guided ai linkedin publishing/i }),
      page.getByText("Project snapshot", { exact: true }),
      page.getByText("The problem", { exact: true }),
      page.getByText("The approach", { exact: true }),
      page.getByText("The system", { exact: true }),
      page.getByText("Next step", { exact: true })
    ];

    const positions = await Promise.all(
      expectedOrder.map(async (locator) => {
        await expect(locator.first()).toBeVisible();
        return locator.first().evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
      })
    );

    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    await expect(page.locator(".linkedin-hero-metric-card")).toHaveCount(2);
    await expect(page.getByRole("link", { name: /start a conversation/i })).toHaveAttribute("href", /\/contact$/);

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(pageWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
