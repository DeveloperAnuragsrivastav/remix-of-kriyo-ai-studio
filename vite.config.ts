import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig(({ mode }) => {
  // Make .env secrets visible to server functions in local dev. On Netlify they come from the project settings.
  // Only VITE_-prefixed values are ever exposed to the browser bundle.
  for (const [k, v] of Object.entries(loadEnv(mode, process.cwd(), ""))) if (!process.env[k]) process.env[k] = v;
  return {
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // src/server.ts wraps the SSR handler with our error page.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // Deploys SSR and server functions (the playground backend) as Netlify Functions.
    netlify(),
    viteReact(),
  ],
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router"] },
};
});
