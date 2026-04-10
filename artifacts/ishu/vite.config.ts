import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { createRequire } from "node:module";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT || "5173";
const port = Number(rawPort);
const apiProxyTarget = process.env.API_PROXY_TARGET || "http://127.0.0.1:5000";

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";
const useSyncExternalStoreShimAlias = path.resolve(
  import.meta.dirname,
  "src",
  "shims",
  "use-sync-external-store-shim.ts",
);

/**
 * Resolve bare package imports for files living in ../modules.
 *
 * Why this is needed:
 * - Module files are outside artifacts/ishu.
 * - Their nearest ancestor does not contain the app's node_modules.
 * - Dev server import analysis can fail for imports like "gsap".
 *
 * This plugin forces Node-style resolution from artifacts/ishu/package.json,
 * so both dev and build can resolve package dependencies consistently.
 */
function resolveModulesNodeDepsPlugin() {
  const requireFromApp = createRequire(
    path.resolve(import.meta.dirname, "package.json"),
  );
  const appEntryForResolution = path.resolve(
    import.meta.dirname,
    "src",
    "main.tsx",
  );

  return {
    name: "resolve-modules-node-deps",
    enforce: "pre" as const,
    async resolveId(this: { resolve: Function }, source: string, importer: string | undefined) {
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

      // Resolve as if import originated from app src so Vite can pick
      // ESM/browser-friendly entries before we fall back to Node require resolution.
      const viteResolved = await this.resolve(source, appEntryForResolution, {
        skipSelf: true,
      });
      if (viteResolved?.id) {
        return viteResolved.id;
      }

      try {
        return requireFromApp.resolve(source);
      } catch {
        return null;
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    resolveModulesNodeDepsPlugin(),
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
      // Some module files (outside app root) import wouter source directly.
      // Wouter re-exports a named symbol from a CJS shim path that is not
      // valid under strict ESM. This alias points that exact path to an ESM bridge.
      "use-sync-external-store/shim/index.js": useSyncExternalStoreShimAlias,
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {},
    commonjsOptions: {
      include: [/node_modules/, /modules/],
    },
  },
  server: {
    port,
    // Fail fast on port conflicts so developers do not unknowingly use stale app instances.
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
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
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
