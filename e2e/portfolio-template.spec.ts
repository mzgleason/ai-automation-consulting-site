import { expect, test } from "@playwright/test";

test.describe("portfolio project template", () => {
  test.describe.configure({ timeout: 60_000 });

  test("renders reusable case study sections in order across breakpoints", async ({ page }) => {
    await page.goto("/portfolio/ai-driven-linkedin-content-workflow", {
      waitUntil: "domcontentloaded",
      timeout: 60_000
    });

    const expectedOrder = [
      "portfolio-hero",
      "project-snapshot",
      "portfolio-section-problem",
      "portfolio-section-approach",
      "portfolio-section-system",
      "workflow-diagram",
      "portfolio-section-results",
      "portfolio-section-insights",
      "portfolio-cta"
    ];

    const positions = await Promise.all(
      expectedOrder.map(async (testId) => {
        const locator = page.getByTestId(testId);
        await expect(locator).toBeVisible();
        return locator.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
      })
    );

    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    await expect(page.getByRole("heading", { name: /scaled weekly linkedin publishing/i })).toBeVisible();
    await expect(page.getByTestId("metrics-grid").first().locator(".portfolio-template-metric-card")).toHaveCount(3);
    await expect(page.getByTestId("portfolio-cta").getByRole("link", { name: /start a conversation/i })).toHaveAttribute(
      "href",
      "/contact"
    );

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(pageWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
