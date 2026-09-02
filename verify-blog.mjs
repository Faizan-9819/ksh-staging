import { chromium } from "playwright";

const scratchDir = "C:/Users/admin/AppData/Local/Temp/claude/c--Users-admin-Desktop-work-ksh23july/398572ea-d7a4-4118-9703-1df313863f17/scratchpad";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const relevant = [];
page.on("requestfinished", (req) => {
  if (req.url().includes("wordpress-819107")) {
    relevant.push(`FINISHED ${req.url()} status=${req.response()?.then ? "" : ""}`);
  }
});
page.on("requestfailed", (req) => {
  if (req.url().includes("wordpress-819107")) {
    relevant.push(`FAILED ${req.url()} — ${req.failure()?.errorText}`);
  }
});
page.on("response", async (res) => {
  if (res.url().includes("wordpress-819107")) {
    relevant.push(`RESPONSE ${res.status()} ${res.url()}`);
  }
});

await page.goto("http://localhost:3000/news", { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForTimeout(8000);
await page.screenshot({ path: `${scratchDir}/news-debug2.png` });

const bodyText = await page.locator("body").innerText();
console.log("=== BODY SNIPPET ===");
console.log(bodyText.slice(0, 400));

console.log("=== WORDPRESS REQUESTS ===");
console.log(relevant.join("\n") || "(none captured)");

await browser.close();
