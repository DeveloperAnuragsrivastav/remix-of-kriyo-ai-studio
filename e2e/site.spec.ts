import { expect, test, type Page } from "@playwright/test";

const WHATSAPP = "https://wa.me/918604050596";
const KEY_PAGES = ["/", "/services", "/services/wordpress-php-development", "/portfolio", "/portfolio/koca-restaurant-website", "/case-studies", "/case-studies/bmrc-hospital", "/blog", "/blog/n8n-vs-python-ai-automation", "/about", "/estimate", "/contact"];

/** Scroll the whole page so lazy images and scroll-triggered sections load. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(800);
}

/** Capture what window.open is called with, so WhatsApp links can be checked without leaving the page. */
async function captureOpen(page: Page) {
  // An init script survives reloads (the dev server may reload once while it prepares code).
  await page.addInitScript(() => { (window as unknown as { opened: string[] }).opened = []; window.open = (u?: string | URL) => { (window as unknown as { opened: string[] }).opened.push(String(u)); return null; }; });
}
const opened = (page: Page) => page.evaluate(() => (window as unknown as { opened: string[] }).opened);

test.describe("every page", () => {
  for (const path of KEY_PAGES) {
    test(`${path} renders cleanly`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", e => errors.push(e.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await scrollThrough(page);

      // Every image actually loads.
      const broken = await page.$$eval("img", imgs => imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute("src")));
      expect(broken, "broken images").toEqual([]);

      // Nothing sticks out sideways (marquees and clipped containers excepted).
      const overflow = await page.evaluate(() => [...document.querySelectorAll("main *, section *, article *")]
        .filter(e => e.getBoundingClientRect().right > window.innerWidth + 1 && !e.closest("[aria-hidden],.overflow-hidden,.overflow-x-auto")).length);
      expect(overflow, "elements overflowing the viewport").toBe(0);

      // Pills and chips keep their natural height (regression: stretched CMS chips).
      const stretched = await page.$$eval("dd span, .flex-wrap > span", els => els.filter(e => e.getBoundingClientRect().height > 48).length);
      expect(stretched, "stretched chips").toBe(0);

      // No section is left invisible by the scroll animation.
      await expect.poll(() => page.locator(".reveal:not(.is-in)").count(), { message: "hidden sections", timeout: 5000 }).toBe(0);

      // Every WhatsApp link uses the current number.
      const wa = await page.$$eval('a[href*="wa.me"]', as => as.map(a => (a as HTMLAnchorElement).href.split("?")[0]));
      for (const href of wa) expect(href).toBe(WHATSAPP);

      expect(errors, "page errors").toEqual([]);
    });
  }
});

test("all internal links resolve and none jump to home-page sections", async ({ request }) => {
  const seen = new Set(["/"]), queue = ["/"], bad: string[] = [], anchors: string[] = [];
  while (queue.length) {
    const url = queue.shift()!;
    const res = await request.get(url);
    if (res.status() !== 200) { bad.push(`${url} ${res.status()}`); continue; }
    const html = await res.text();
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (!href) continue;
      if (/^\/[^/]*#|^#/.test(href) && !href.startsWith("#section") && href !== "#estimate") anchors.push(`${url} -> ${href}`);
      if (href.startsWith("/") && !href.startsWith("//") && !/\.(css|js|png|webp|ico|svg|txt)(\?|$)/.test(href)) {
        const path = href.split("#")[0]!.split("?")[0]!;
        if (path && !seen.has(path)) { seen.add(path); queue.push(path); }
      }
    }
  }
  expect(bad, "broken links").toEqual([]);
  expect(anchors, "links into home-page sections").toEqual([]);
  expect(seen.size).toBeGreaterThan(40);
});

test("unknown pages show the branded 404", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { name: "This page took a wrong turn." })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Helpful links" }).getByRole("link", { name: "Portfolio" })).toBeVisible();
});

test("contact page form sends the brief to WhatsApp", async ({ page }) => {
  await captureOpen(page);
  await page.goto("/contact");
  await page.waitForLoadState("networkidle");
  await page.locator("#name").fill("Test Client");
  await page.locator("#service").selectOption("AI chatbot for my website");
  await page.locator("#brief").fill("Chatbot please");
  await page.locator("form button[type=submit]").click();
  const text = new URL((await opened(page))[0]!).searchParams.get("text")!;
  expect(text).toContain("Project type: AI chatbot for my website");
});

test("estimator builds a brief and sends it to WhatsApp", async ({ page }) => {
  await captureOpen(page);
  await page.goto("/estimate");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "WhatsApp bot" }).click();
  await page.getByRole("button", { name: "Lead qualification" }).click();
  await page.getByRole("button", { name: "CRM tagging" }).click();
  await page.getByRole("button", { name: "Within a month" }).click();
  await page.getByRole("button", { name: "₹30K–60K" }).click();
  await page.locator("#planner-name").fill("Asha");
  await expect(page.getByRole("region", { name: "Your brief" }).locator("dl")).toContainText("Lead qualification, CRM tagging");
  await page.getByRole("button", { name: "Get my estimate on WhatsApp" }).click();
  const text = new URL((await opened(page))[0]!).searchParams.get("text")!;
  expect(text).toContain("I'm Asha");
  expect(text).toContain("Service: WhatsApp bot");
  expect(text).toContain("Features: Lead qualification, CRM tagging");
  expect(text).toContain("Timeline: Within a month");
  expect(text).toContain("Budget: ₹30K–60K");
});

test("mobile menu opens with every main link", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  await page.goto("/portfolio");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  // Retry the tap until the page has hydrated and the menu responds.
  await expect(async () => { await page.getByRole("button", { name: "Open menu" }).click(); await expect(nav).toBeVisible({ timeout: 1000 }); }).toPass({ timeout: 15000 });
  for (const name of ["Services", "Pricing", "Portfolio", "Case studies", "About", "Blog"]) await expect(nav.getByRole("link", { name })).toBeVisible();
});

test("blog articles each have their own cover image", async ({ page }) => {
  await page.goto("/blog");
  await scrollThrough(page);
  const covers = await page.$$eval("main img, section img", imgs => imgs.map(i => (i as HTMLImageElement).currentSrc).filter(s => !s.includes("kriyvo-mark")));
  expect(new Set(covers).size).toBe(covers.length);
});

test("outreach playground rejects bad input without calling Apify", async ({ page }) => {
  await page.goto("/portfolio/aurum-conventions-outreach");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /Try it now/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "See the outreach pipeline write to you" })).toBeVisible();
  // The submit button stays disabled until consent is given.
  await expect(dialog.getByRole("button", { name: "Write my invite" })).toBeDisabled();
  // A non-LinkedIn URL is rejected by the server before any scrape starts.
  await page.locator("#pg-linkedin").fill("https://example.com/not-linkedin");
  await page.locator("#pg-email").fill("someone@example.com");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "Write my invite" }).click();
  await expect(dialog.getByRole("alert")).toContainText("LinkedIn profile URL");
});
