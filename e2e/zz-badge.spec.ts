import { test } from "@playwright/test";
for (const path of ["/", "/portfolio/aurum-conventions-outreach"]) {
  test(`badge ${path}`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(`https://kriyvo-ai.netlify.app${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    const r = await page.evaluate(() => {
      const hits: string[] = [];
      const walk = (root: Document | ShadowRoot) => root.querySelectorAll("*").forEach(el => {
        if (/powered by netlify/i.test((el as HTMLElement).innerText || "")) hits.push(el.tagName);
        if ((el as HTMLElement).shadowRoot) walk((el as HTMLElement).shadowRoot!);
      });
      walk(document);
      return { url: location.href, badge: hits.length > 0, netlifyScripts: [...document.scripts].map(s => s.src).filter(s => /netlify/i.test(s)) };
    });
    console.log("RESULT", JSON.stringify(r));
    if (path === "/") await page.screenshot({ path: process.env.SHOT_DIR + "/live-anon2.png" });
  });
}
