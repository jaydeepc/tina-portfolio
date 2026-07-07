/**
 * Visual QA harness — captures the experience at key scroll offsets using
 * the locally installed Chrome. Usage:
 *   node scripts/shoot.mjs [outDir] [name:y ...]
 * Defaults to a full sweep of every section.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const W = Number(process.env.W || 1600);
const H = Number(process.env.H || 900);
const BY_SECTION = process.env.SECTIONS === "1";

const outDir = process.argv[2] || "shots";
const custom = process.argv.slice(3).map((s) => {
  const [name, y] = s.split(":");
  return [name, Number(y)];
});

const TARGETS = custom.length
  ? custom
  : [
      ["hero-0", 0],
      ["hero-early", 700],
      ["hero-mid", 1400],
      ["hero-late", 2200],
      ["hero-end", 2760],
      ["about", 4300],
      ["focus-start", 5400],
      ["focus-mid", 6600],
      ["phil-red", 8900],
      ["phil-green", 9500],
      ["phil-quote", 10900],
      ["phil-beliefs", 11500],
      ["pillars-1", 12800],
      ["pillars-2", 13700],
      ["pillars-3", 14500],
      ["toolbox", 15950],
      ["oss-ccf", 17000],
      ["oss-talisman", 17900],
      ["speaking", 18650],
      ["certs", 20050],
      ["impact-start", 21000],
      ["impact-mid", 21900],
      ["impact-end", 22800],
      ["stats", 23900],
      ["finale", 24500],
    ];

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required", "--mute-audio"],
  defaultViewport: { width: W, height: H },
});

const page = await browser.newPage();
page.on("pageerror", (e) => console.error("PAGE ERROR:", e.message));

let targets = TARGETS;
if (BY_SECTION) {
  // Measure section offsets at this viewport, then shoot each.
  await page.goto(`${BASE}/?at=0`, { waitUntil: "load", timeout: 90000 });
  await page.waitForFunction("!document.querySelector('.loader')", { timeout: 60000 });
  const map = await page.evaluate(() => {
    const ids = ["#about", "#focus", "#philosophy", "#pillars", "#toolbox", "#opensource", "#speaking", "#certs", "#impact", ".stats", "#finale"];
    const out = {};
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) out[id.replace(/[#.]/, "")] = Math.round(el.getBoundingClientRect().top + window.scrollY);
    });
    return out;
  });
  targets = [["hero-0", 0], ...Object.entries(map)];
}

for (const [name, y] of targets) {
  await page.goto(`${BASE}/?at=${y}`, { waitUntil: "load", timeout: 90000 });
  await page.waitForFunction("!document.querySelector('.loader')", {
    timeout: 60000,
  });
  // let entrance/scrub/videos settle
  await new Promise((r) => setTimeout(r, 2600));
  await page.screenshot({ path: `${outDir}/s-${name}.png` });
  console.log(`✓ ${name} @${y}`);
}

await browser.close();
console.log("done");
