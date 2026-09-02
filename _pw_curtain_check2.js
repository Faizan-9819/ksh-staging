const { chromium } = require("playwright");
const path = require("path");
function log(m) { console.log(`[test] ${m}`); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("http://localhost:3000/sustainability", { waitUntil: "networkidle" });
  const nextBtn = page.locator('button[aria-label="Next Slide"]:visible');
  const prevBtn = page.locator('button[aria-label="Previous Slide"]:visible');

  // Scroll the button itself into view FIRST and settle, so Playwright's
  // click-time auto-scroll doesn't move the page between measurements.
  await nextBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const scrollYBefore = await page.evaluate(() => window.scrollY);

  const navBoxBefore = await nextBtn.boundingBox();
  log(`scrollY before: ${scrollYBefore}`);
  log(`next button box before click: ${JSON.stringify(navBoxBefore)}`);

  await page.screenshot({ path: path.resolve(__dirname, "curtain_0_before.png") });

  await nextBtn.click();
  const frames = [80, 160, 240, 320, 400, 500, 650, 800, 950];
  let lastTime = 0;
  for (const t of frames) {
    await page.waitForTimeout(t - lastTime);
    lastTime = t;
    const scrollYNow = await page.evaluate(() => window.scrollY);
    if (scrollYNow !== scrollYBefore) log(`WARNING: page scrolled during transition at t=${t}: scrollY=${scrollYNow}`);
    await page.screenshot({ path: path.resolve(__dirname, `curtain_1_next_${String(t).padStart(4, "0")}ms.png`) });
  }

  const scrollYAfter = await page.evaluate(() => window.scrollY);
  const navBoxAfter = await nextBtn.boundingBox();
  log(`scrollY after: ${scrollYAfter}`);
  log(`next button box after transition: ${JSON.stringify(navBoxAfter)}`);
  log(`nav button box identical: ${JSON.stringify(navBoxBefore) === JSON.stringify(navBoxAfter)}`);

  // Prev direction
  await prevBtn.click();
  let lastTime2 = 0;
  for (const t of frames) {
    await page.waitForTimeout(t - lastTime2);
    lastTime2 = t;
    await page.screenshot({ path: path.resolve(__dirname, `curtain_2_prev_${String(t).padStart(4, "0")}ms.png`) });
  }
  const navBoxPrev = await prevBtn.boundingBox();
  log(`prev button box after prev transition: ${JSON.stringify(navBoxPrev)}`);

  log(`page errors: ${JSON.stringify(errors)}`);
  await browser.close();
  log("done");
})().catch((e) => { console.error(e); process.exit(1); });
