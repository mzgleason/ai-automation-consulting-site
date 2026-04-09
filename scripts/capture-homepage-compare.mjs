import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const [, , targetUrl, slug = "capture"] = process.argv;

if (!targetUrl) {
  console.error("Usage: node scripts/capture-homepage-compare.mjs <url> [slug]");
  process.exit(1);
}

const outputDir = path.resolve("artifacts", "compare", slug);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture(url, label) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 2200 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await context.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await wait(4500);

  await page.screenshot({ path: path.join(outputDir, `${label}-top.png`) });

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const midPoint = Math.max(400, Math.floor(pageHeight * 0.35));
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "auto" }), midPoint);
  await wait(1400);
  await page.screenshot({ path: path.join(outputDir, `${label}-mid.png`) });

  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const steps = 8;
    for (let i = 0; i <= steps; i += 1) {
      const top = Math.round((total * i) / steps);
      window.scrollTo({ top, behavior: "auto" });
      await new Promise((resolve) => setTimeout(resolve, 380));
    }
    for (let i = steps; i >= 0; i -= 1) {
      const top = Math.round((total * i) / steps);
      window.scrollTo({ top, behavior: "auto" });
      await new Promise((resolve) => setTimeout(resolve, 280));
    }
  });

  await page.screenshot({ path: path.join(outputDir, `${label}-bottom.png`), fullPage: true });
  await wait(400);

  await context.close();
  await browser.close();
}

await ensureDir(outputDir);

await capture(targetUrl, "page");
