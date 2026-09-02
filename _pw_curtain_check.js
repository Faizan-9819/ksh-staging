const { chromium } = require("playwright");
const path = require("path");
function log(m) { console.log(`[test] ${m}`); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("http://localhost:3000/sustainability", { waitUntil: "networkidle" });
  await page.waitForSelector("text=Driving Sustainable Impact", { timeout: 20000 });
  await page.locator("text=Driving Sustainable Impact").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const nextBtn = page.locator('button[aria-label="Next Slide"]:visible');
  const prevBtn = page.locator('button[aria-label="Previous Slide"]:visible');

  // Sample a point inside the curtain canvas (over the background image area,
  // away from the green card / text) throughout the transition. If the old
  // slide is ever destroyed before the new one covers that point, this pixel
  // will flash toward white/#F8F8F8 instead of smoothly changing between the
  // two photo backgrounds.
  const samplePoint = { x: 1550, y: 200 };

  const navBoxBefore = await nextBtn.boundingBox();
  log(`next button box before click: ${JSON.stringify(navBoxBefore)}`);

  const getPixel = async (x, y) => {
    return page.evaluate(({ x, y }) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      // Can't read cross-origin image pixels via canvas easily without CORS;
      // instead sample via elementFromPoint + computed background, and also
      // just take screenshots for visual truth. Fallback: report the topmost
      // element's tag/class at that point so we can confirm which slide DOM
      // node is painting there.
      const el = document.elementFromPoint(x, y);
      return el ? { tag: el.tagName, cls: el.className.slice(0, 80) } : null;
    }, { x, y });
  };

  await page.screenshot({ path: path.resolve(__dirname, "curtain_0_before.png") });

  // Fire the click, then rapid-fire screenshots across the ~850ms transition.
  await nextBtn.click();
  const frames = [0, 80, 160, 240, 320, 400, 500, 650, 800, 950];
  let lastTime = 0;
  for (const t of frames) {
    await page.waitForTimeout(t - lastTime);
    lastTime = t;
    await page.screenshot({ path: path.resolve(__dirname, `curtain_1_next_${String(t).padStart(4, "0")}ms.png`) });
  }

  const navBoxDuring = await nextBtn.boundingBox();
  log(`next button box after transition: ${JSON.stringify(navBoxDuring)}`);
  log(`nav button moved: ${JSON.stringify(navBoxBefore) !== JSON.stringify(navBoxDuring)}`);

  // Now test Prev direction similarly.
  await prevBtn.click();
  let lastTime2 = 0;
  for (const t of frames) {
    await page.waitForTimeout(t - lastTime2);
    lastTime2 = t;
    await page.screenshot({ path: path.resolve(__dirname, `curtain_2_prev_${String(t).padStart(4, "0")}ms.png`) });
  }

  log(`page errors: ${JSON.stringify(errors)}`);
  await browser.close();
  log("done");
})().catch((e) => { console.error(e); process.exit(1); });
