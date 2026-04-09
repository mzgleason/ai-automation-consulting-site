import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const [, , targetUrl, slug = "section-capture", sectionSelector] = process.argv;

if (!targetUrl || !sectionSelector) {
  console.error("Usage: node scripts/capture-section-compare.mjs <url> <slug> <section-selector>");
  process.exit(1);
}

const outputDir = path.resolve("artifacts", "compare", slug);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await ensureDir(outputDir);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1400 },
  recordVideo: {
    dir: outputDir,
    size: { width: 1440, height: 900 }
  }
});

const page = await context.newPage();
await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.emulateMedia({ reducedMotion: "no-preference" });
await wait(4500);

const section = page.locator(sectionSelector).first();
await section.scrollIntoViewIfNeeded();
await wait(1200);
await section.screenshot({ path: path.join(outputDir, "section-start.png") });

const links = section.locator("a");
const linkCount = await links.count();
for (let index = 0; index < Math.min(linkCount, 3); index += 1) {
  await links.nth(index).hover({ force: true });
  await wait(500);
}

await page.mouse.move(20, 20);
await wait(300);

await page.evaluate((selector) => {
  const element = document.querySelector(selector);
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const start = window.scrollY + rect.top - 120;
  const end = start + Math.max(240, rect.height - window.innerHeight * 0.35);
  window.scrollTo({ top: Math.max(0, start), behavior: "auto" });
  return new Promise((resolve) => {
    let step = 0;
    const totalSteps = 8;
    const tick = () => {
      const nextY = start + ((end - start) * step) / totalSteps;
      window.scrollTo({ top: Math.max(0, nextY), behavior: "auto" });
      step += 1;
      if (step <= totalSteps) {
        setTimeout(tick, 260);
      } else {
        resolve(null);
      }
    };
    tick();
  });
}, sectionSelector);

await wait(700);
await section.screenshot({ path: path.join(outputDir, "section-end.png") });

await context.close();
await browser.close();
