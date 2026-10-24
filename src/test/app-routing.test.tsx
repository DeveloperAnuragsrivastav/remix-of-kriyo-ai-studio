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
    ["/ai-developer-in-bangalore", "/ai-developer-in-bangalore"],
    ["/ai-developer-in-mumbai", "/ai-developer-in-mumbai"],
    ["/freelance-web-designer-in-hyderabad", "/freelance-web-designer-in-hyderabad"],
    ["/web-designer-in-chennai", "/web-designer-in-chennai"],
    ["/ai-developer-in-delhi", "/ai-developer-in-delhi"],
    ["/freelance-web-designer-in-mumbai", "/freelance-web-designer-in-mumbai"],
    ["/freelance-web-designer-in-delhi", "/freelance-web-designer-in-delhi"],
    ["/freelance-web-developer-in-bangalore", "/freelance-web-developer-in-bangalore"],
    ["/ai-automation-services", "/ai-automation-services"],
    ["/chatbot-development-services", "/chatbot-development-services"],
    ["/crm-development-services", "/crm-development-services"],
    ["/logo-design-services", "/logo-design-services"],
    ["/react-developer-services", "/react-developer-services"],
    ["/ui-ux-design-services", "/ui-ux-design-services"],
    ["/web-design-services", "/web-design-services"],
    ["/freelance-web-designer-india", "/freelance-web-designer-india"],
    ["/wordpress-development-services", "/wordpress-development-services"],
    ["/freelance-web-developer-vs-agency-india", "/freelance-web-developer-vs-agency-india"],
    ["/best-ai-tools-for-digital-marketing-in-2026-top-picks-for-success", "/best-ai-tools-for-digital-marketing-in-2026-top-picks-for-success"],
    ["/top-web-development-frameworks-in-2026-a-complete-guide", "/top-web-development-frameworks-in-2026-a-complete-guide"],
    ["/why-you-should-hire-a-freelance-web-designer-in-india-today", "/why-you-should-hire-a-freelance-web-designer-in-india-today"],
    ["/web-designer-in-pune", "/web-designer-in-pune"],
    ["/web-designer-in-kochi", "/web-designer-in-kochi"],
    ["/web-designer-in-ahmedabad", "/web-designer-in-ahmedabad"],
    ["/web-designer-in-jaipur", "/web-designer-in-jaipur"],
    ["/web-designer-in-noida", "/web-designer-in-noida"],
    ["/web-designer-in-gurgaon", "/web-designer-in-gurgaon"],
    ["/web-designer-in-indore", "/web-designer-in-indore"],
    ["/web-designer-in-kolkata", "/web-designer-in-kolkata"],
    ["/web-designer-in-lucknow", "/web-designer-in-lucknow"],
    ["/web-designer-in-chandigarh", "/web-designer-in-chandigarh"],
    ["/web-designer-in-surat", "/web-designer-in-surat"],
    ["/web-designer-in-nagpur", "/web-designer-in-nagpur"],
    ["/n8n-automation-freelancer-india", "/n8n-automation-freelancer-india"],
    ["/whatsapp-chatbot-developer-india", "/whatsapp-chatbot-developer-india"],
  ])("matches dedicated page %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(routeId);
  });
});
