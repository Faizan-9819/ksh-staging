const { chromium } = require("playwright");
const path = require("path");
function log(m) { console.log(`[test] ${m}`); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("text=Our Portfolio by the Numbers", { timeout: 20000 });
  await page.mouse.move(800, 450);

  const getInfo = () => page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll("h2")).find(
      (el) => el.textContent?.includes("Our Portfolio by the Numbers"),
    );
    const section = h2?.closest("section");
    const rect = section?.getBoundingClientRect();
    const wrapper = section ? Array.from(section.children).find((c) => c.tagName === "DIV") : null;
    // Text of whatever heading is currently near the top of the viewport,
    // so we can tell which section we actually ended up looking at.
    const headingsInView = Array.from(document.querySelectorAll("h1,h2")).filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= -50 && r.top < window.innerHeight;
    }).map((el) => el.textContent?.trim().slice(0, 60));
    return {
      scrollY: window.scrollY,
      sectionHeight: rect ? rect.height : null,
      sectionTopViewport: rect ? rect.top : null,
      wrapperPosition: wrapper ? getComputedStyle(wrapper).position : null,
      headingsInView,
    };
  });

  log(`START: ${JSON.stringify(await getInfo())}`);

  // Real wheel events, in chunks, with small waits so Lenis's momentum can
  // catch up between each — this is what actually exercises Lenis's own
  // rAF-driven scroll, unlike a raw window.scrollTo teleport.
  let settledAt = null;
  for (let i = 0; i < 40; i++) {
    await page.mouse.wheel(0, 250);
    await page.waitForTimeout(120);
    const info = await getInfo();
    if (info.wrapperPosition !== "sticky" && settledAt === null) {
      settledAt = i;
      log(`SETTLED at wheel-step ${i}: ${JSON.stringify(info)}`);
    }
  }

  // Let any residual Lenis momentum/inertia fully finish.
  await page.waitForTimeout(1500);
  const finalInfo = await getInfo();
  log(`FINAL (after settle + 1.5s settle-time for momentum): ${JSON.stringify(finalInfo)}`);
  await page.screenshot({ path: path.resolve(__dirname, "sf_wheel_final.png") });

  // A couple more small wheel nudges post-settle — should behave like a
  // totally normal page from here, no further jump.
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(400);
  const afterExtraScroll = await getInfo();
  log(`AFTER one more small wheel nudge post-settle: ${JSON.stringify(afterExtraScroll)}`);

  log(`page errors: ${JSON.stringify(errors)}`);
  await browser.close();
  log("done");
})().catch((e) => { console.error(e); process.exit(1); });
