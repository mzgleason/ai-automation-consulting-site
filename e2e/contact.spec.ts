import { expect, test } from "@playwright/test";

test.describe("contact page", () => {
  test.describe.configure({ timeout: 60_000 });

  test("renders Calendly-first contact layout", async ({ page }, testInfo) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded", timeout: 60_000 });

    await expect(page.locator("header").first()).toHaveAttribute("data-hydrated", "true");
    await expect(page.getByRole("heading", { level: 1, name: /^start a conversation$/i })).toBeVisible();

    const primaryCta = page.getByRole("link", { name: /book on calendly/i });
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute("href", /calendly\.com/i);

    await expect(page.getByRole("link", { name: /linkedin/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /email:/i })).toHaveAttribute("href", /^mailto:/i);

    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator("footer")).toBeVisible();

    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("contact-fullpage", { body: screenshot, contentType: "image/png" });
  });
});

