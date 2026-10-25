import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { BUSINESS } from "../lib/business";
import displayFont from "@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2?url";
import bodyFont from "@fontsource-variable/host-grotesk/files/host-grotesk-latin-wght-normal.woff2?url";
import { AgencyLayout } from "../components/AgencyLayout";

function NotFoundComponent() {
  const links = [["Home", "/"], ["Services", "/services"], ["Portfolio", "/portfolio"], ["Blog", "/blog"], ["Contact", "/contact"]] as const;
  return (
    <AgencyLayout>
      <section className="mx-auto max-w-[1240px] px-4 sm:px-6 py-24 md:py-32">
        <p className="font-display text-[7rem] leading-none text-foreground/15 md:text-[11rem]" aria-hidden>404</p>
        <h1 className="mt-4 max-w-2xl text-[2.6rem] md:text-6xl">This page took a wrong turn.</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">The link may be old or mistyped. Here are the places people usually look for:</p>
        <nav aria-label="Helpful links" className="mt-10 flex flex-wrap gap-3">
          {links.map(([label, to], i) => (
            <Link key={to} to={to} className={`btn ${i === 0 ? "btn-dark" : "btn-light"}`}>{label}</Link>
          ))}
        </nav>
      </section>
    </AgencyLayout>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl">
          This page didn't load
        </h1>
        <p className="mt-3 text-[16px] text-foreground/70">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-dark"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn btn-light"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      logo: `${BUSINESS.url}/favicon.png`,
      image: `${BUSINESS.url}/og-image.jpg`,
      description: BUSINESS.description,
      email: BUSINESS.email,
      telephone: BUSINESS.phoneE164,
      priceRange: "₹999+",
      address: { "@type": "PostalAddress", addressLocality: `${BUSINESS.locality}, ${BUSINESS.city}`, addressRegion: BUSINESS.region, postalCode: BUSINESS.postalCode, addressCountry: BUSINESS.country },
      areaServed: [{ "@type": "City", name: "New Delhi" }, { "@type": "AdministrativeArea", name: "Delhi NCR" }, { "@type": "Country", name: "India" }],
      sameAs: [BUSINESS.instagram, BUSINESS.linkedin],
      knowsAbout: ["Website development", "WordPress", "AI chatbots", "WhatsApp Business API", "Voice AI agents", "n8n workflow automation", "LLM applications"],
    },
    { "@type": "WebSite", "@id": `${BUSINESS.url}/#website`, url: BUSINESS.url, name: BUSINESS.name, publisher: { "@id": `${BUSINESS.url}/#business` } },
  ],
};

/**
 * Security headers on every server-rendered page (netlify.toml sets the same ones for static files).
 * The CSP is report-only: browsers log what it would block without blocking anything. Keep it in sync
 * with netlify.toml, and switch both to an enforced Content-Security-Policy once the live site shows no violations.
 */
const SECURITY_HEADERS = {
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Permissions-Policy": "camera=(), geolocation=(), payment=(), usb=(), microphone=(self)",
  "Content-Security-Policy-Report-Only": "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://api.producthunt.com https://media.licdn.com https://launchigniter.com; media-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  headers: () => SECURITY_HEADERS,
  head: ({ matches }) => {
    const path = matches[matches.length - 1]?.pathname ?? "/";
    const canonical = `${BUSINESS.url}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kriyvo AI" },
      { name: "description", content: "Kriyvo AI — freelance web development, AI chatbots and automation in Delhi NCR." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BUSINESS.name },
      { property: "og:url", content: canonical },
      { property: "og:image", content: `${BUSINESS.url}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${BUSINESS.url}/og-image.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: displayFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: bodyFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "canonical", href: canonical },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(businessSchema) }],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
