import { expect, test } from "@playwright/test";

test.describe("homepage staging checks", () => {
  test.describe.configure({ timeout: 60_000 });

  test("preview route matches live homepage content and shared chrome", async ({ page }, testInfo) => {
    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60_000 });

    const header = page.locator("header").first();
    const homeHeading = page.getByRole("heading", { name: /build systems that do the work for you/i });
    await expect(header).toHaveAttribute("data-hydrated", "true");
    await expect(homeHeading).toBeVisible();
    await expect(page.getByRole("link", { name: /mark gleason home/i })).toBeVisible();
    if (testInfo.project.name === "mobile-chrome") {
      await expect(page.getByRole("button", { name: /toggle navigation menu/i })).toBeVisible();
    } else {
      await expect(page.getByLabel("Primary").getByRole("link", { name: /^case studies$/i })).toBeVisible();
    }

    await page.goto("/preview/foundry-home", { waitUntil: "domcontentloaded", timeout: 60_000 });

    await expect(header).toHaveAttribute("data-hydrated", "true");
    await expect(page.getByRole("heading", { name: /build systems that do the work for you/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /mark gleason home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /^services$/i }).first()).toBeVisible();
    await expect(page.getByText(/turn slow, manual, or inconsistent work into clearer systems/i)).toBeVisible();
  });

  test("desktop header shrinks, hides on downward scroll, and returns on upward scroll", async ({ page, browserName }, testInfo) => {
    test.skip(browserName !== "chromium" || testInfo.project.name !== "chromium", "Desktop-only header behavior is validated in Chromium.");

    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60_000 });

    const header = page.locator("header").first();
    const viewportHeight = await page.evaluate(() => window.innerHeight);

    await expect(header).toHaveAttribute("data-hydrated", "true");
    await expect(header).not.toHaveAttribute("data-scrolled", "true");

    await page.evaluate((height) => window.scrollTo({ top: Math.round(height / 3), behavior: "auto" }), viewportHeight);
    await page.waitForTimeout(200);
    await expect(header).toHaveAttribute("data-scrolled", "true");
    await expect(header).not.toHaveAttribute("data-hidden", "true");

    await page.evaluate((height) => window.scrollTo({ top: height + 120, behavior: "auto" }), viewportHeight);
    await page.waitForTimeout(450);
    await expect(header).toHaveAttribute("data-hidden", "true");

    await page.evaluate((height) => window.scrollTo({ top: Math.round(height / 2), behavior: "auto" }), viewportHeight);
    await page.waitForTimeout(450);
    await expect(header).not.toHaveAttribute("data-hidden", "true");
  });

  test("mobile menu opens as an overlay and closes after navigation", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chrome", "Mobile navigation is only checked in the mobile project.");

    await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60_000 });

    const header = page.locator("header").first();
    const toggle = page.getByRole("button", { name: /toggle navigation menu/i });
    await expect(header).toHaveAttribute("data-hydrated", "true");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator("#mobile-nav-panel");
    await expect(panel).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await panel.getByRole("link", { name: /^about$/i }).click();
    await expect(page).toHaveURL(/\/about$/, { timeout: 15_000 });
    await expect(panel).toBeHidden();
    await expect(page.locator("body")).toHaveCSS("overflow", "visible");
  });
});
