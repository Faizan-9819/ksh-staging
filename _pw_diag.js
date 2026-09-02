const { chromium } = require("playwright");
function log(m) { console.log(`[diag] ${m}`); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto("http://localhost:3000/sustainability", { waitUntil: "networkidle" });
  const nextBtn = page.locator('button[aria-label="Next Slide"]:visible');
  await nextBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  const inspect = async (label) => {
    const info = await page.evaluate(() => {
      // Find the curtain canvas wrapper: the div with contain:paint.
      const canvas = Array.from(document.querySelectorAll("div")).find(
        (d) => getComputedStyle(d).contain === "paint" && getComputedStyle(d).position === "absolute",
      );
      if (!canvas) return { error: "canvas not found" };
      const children = Array.from(canvas.children).map((c) => ({
        tag: c.tagName,
        cls: c.className.slice(0, 60),
        clipPath: getComputedStyle(c).clipPath,
      }));
      return { childCount: children.length, children };
    });
    log(`${label}: ${JSON.stringify(info)}`);
  };

  await inspect("t=0 (before click)");
  await nextBtn.click();
  await page.waitForTimeout(30);
  await inspect("t=30ms");
  await page.waitForTimeout(70);
  await inspect("t=100ms");
  await page.waitForTimeout(150);
  await inspect("t=250ms");
  await page.waitForTimeout(250);
  await inspect("t=500ms");
  await page.waitForTimeout(450);
  await inspect("t=950ms (settled)");

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
