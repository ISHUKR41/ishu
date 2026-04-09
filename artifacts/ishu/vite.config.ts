import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT || "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      "@modules": path.resolve(import.meta.dirname, "..", "modules"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      plugins: [
        {
          // CRITICAL PLUGIN: Resolves bare package imports from @modules/ directory.
          // Files in @modules/ live OUTSIDE ishu/ so Rollup can't find ishu/node_modules.
          // This plugin uses Node's createRequire to resolve from ishu/node_modules.
          name: "resolve-modules-node-deps",
          async resolveId(source: string, importer: string | undefined) {
            if (
              !importer ||
              source.startsWith(".") ||
              source.startsWith("/") ||
              source.startsWith("@/") ||
              source.startsWith("@modules") ||
              source.startsWith("@assets") ||
              source.startsWith("\0") ||
              source.includes("?")
            ) {
              return null;
            }

            const normalizedImporter = importer.replace(/\\/g, "/");
            if (!normalizedImporter.includes("/modules/")) {
              return null;
            }

            // Use Node's createRequire to resolve from ishu directory context
            // This properly handles package.json "exports" maps (e.g., gsap/ScrollTrigger)
            try {
              const { createRequire } = await import("module");
              const require = createRequire(
                path.resolve(import.meta.dirname, "package.json")
              );
              const resolved = require.resolve(source);
              return { id: resolved, external: false };
            } catch {
              return null;
            }
          },
        },
      ],
    },
    commonjsOptions: {
      include: [/node_modules/, /modules/],
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      // Allow serving files from the parent directory (where @modules lives)
      strict: false,
      allow: [
        path.resolve(import.meta.dirname),
        path.resolve(import.meta.dirname, "..", "modules"),
        path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      ],
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
