import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    ["/services", "/services/"],
    ["/services/ai-automation", "/services/$slug"],
    ["/deliverables", "/deliverables"],
    ["/working-together", "/working-together"],
    ["/case-studies", "/case-studies/"],
    ["/case-studies/bmrc-hospital", "/case-studies/$slug"],
    ["/blog", "/blog/"],
    ["/blog/multilingual-feedback-routing-workflow", "/blog/$slug"],
    ["/contact", "/contact"],
    ["/pricing", "/pricing"],
    ["/about", "/about"],
    ["/estimate", "/estimate"],
    ["/portfolio", "/portfolio/"],
    ["/portfolio/koca-restaurant-website", "/portfolio/$slug"],
    ["/website-developer-east-delhi", "/website-developer-east-delhi"],
    ["/web-developer-delhi-ncr", "/web-developer-delhi-ncr"],
  ])("matches dedicated page %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(routeId);
  });
});
