/*
 * FILE: scripts/sync-page-isolation.cjs
 * PURPOSE: Enforce strict frontend/backend folder symmetry for page-level units.
 *
 * Why this script exists:
 * - Large teams need isolated edit surfaces per page section.
 * - Some page and section folders still missed dedicated frontend/backend entries.
 * - This script adds missing non-breaking wrappers and backend metadata stubs.
 *
 * Safety guarantees:
 * - Never overwrites existing files.
 * - Creates only missing files/folders.
 * - Keeps existing architecture untouched.
 */

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const pagesRoot = path.join(repoRoot, "artifacts", "ishu", "src", "pages");

const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const entryExtensions = [".tsx", ".ts", ".jsx", ".js"];
const ignoredDirNames = new Set([
  "frontend",
  "backend",
  "_shared",
  "types",
  "node_modules",
  "dist",
  "build",
]);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    return false;
  }

  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function walkDirs(rootDir, output = []) {
  if (!fs.existsSync(rootDir)) return output;

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (ignoredDirNames.has(entry.name)) continue;

    const fullPath = path.join(rootDir, entry.name);
    output.push(fullPath);
    walkDirs(fullPath, output);
  }

  return output;
}

function listFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
}

function hasCodeFiles(dirPath) {
  const files = listFiles(dirPath);
  return files.some((fileName) => codeExtensions.has(path.extname(fileName).toLowerCase()));
}

function getEntryCandidates(dirPath) {
  const files = listFiles(dirPath);
  return files.filter((fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    if (!entryExtensions.includes(ext)) return false;
    if (fileName.endsWith(".d.ts")) return false;
    return true;
  });
}

function chooseEntryFile(dirPath) {
  const candidates = getEntryCandidates(dirPath);
  if (!candidates.length) return null;

  const priority = ["index.tsx", "index.ts", "index.jsx", "index.js"];
  for (const preferred of priority) {
    if (candidates.includes(preferred)) {
      return preferred;
    }
  }

  // Prefer component-like files over utility hooks where possible.
  const componentLike = candidates.find((fileName) => /^[A-Z]/.test(fileName));
  if (componentLike) {
    return componentLike;
  }

  return candidates[0];
}

function toImportPath(entryFileName) {
  const ext = path.extname(entryFileName);
  const base = entryFileName.slice(0, -ext.length);
  return `../${base}`;
}

function toPascalCase(text) {
  return text
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toFrontendComponentName(unitDir) {
  const relativePath = path
    .relative(pagesRoot, unitDir)
    .replace(/\\/g, "/");
  const safe = relativePath.length ? relativePath : "root";
  return `${toPascalCase(safe)}FrontendEntry`;
}

function toBackendConfigName(unitDir) {
  const relativePath = path
    .relative(pagesRoot, unitDir)
    .replace(/\\/g, "/");
  const safe = relativePath.length ? relativePath : "root";
  return `${toPascalCase(safe)}BackendConfig`;
}

function toApiEndpoint(unitDir) {
  const relativePath = path
    .relative(pagesRoot, unitDir)
    .replace(/\\/g, "/");

  if (!relativePath) {
    return "/api/pages/home";
  }

  return `/api/pages/${relativePath.toLowerCase()}`;
}

function frontendWrapperTemplate(unitDir, entryFileName) {
  const componentName = toFrontendComponentName(unitDir);

  if (!entryFileName) {
    return `// ============================================================================
// FILE: pages/${path.relative(pagesRoot, unitDir).replace(/\\/g, "/")}/frontend/index.tsx
// PURPOSE: Dedicated frontend boundary for this unit.
// NOTE: No direct UI entry file exists in parent folder yet.
// ============================================================================

/**
 * Frontend boundary placeholder.
 * Keep future UI logic for this isolated unit inside this folder.
 */
export default function ${componentName}() {
  return null;
}
`;
  }

  const importPath = toImportPath(entryFileName);
  return `// ============================================================================
// FILE: pages/${path.relative(pagesRoot, unitDir).replace(/\\/g, "/")}/frontend/index.tsx
// PURPOSE: Dedicated frontend boundary wrapper for this unit.
// ============================================================================

import * as ExistingUnitModule from "${importPath}";
import type { ComponentType } from "react";

/**
 * Frontend boundary wrapper for strict page-level isolation.
 */
export default function ${componentName}() {
  const moduleRecord = ExistingUnitModule as Record<string, unknown>;
  const ExistingUnitComponent =
    (moduleRecord.default ??
      Object.values(moduleRecord).find((candidate) => typeof candidate === "function")) as
      | ComponentType
      | undefined;

  if (!ExistingUnitComponent) {
    return null;
  }

  return <ExistingUnitComponent />;
}
`;
}

function backendTemplate(unitDir) {
  const configName = toBackendConfigName(unitDir);
  const relativePath = path
    .relative(pagesRoot, unitDir)
    .replace(/\\/g, "/");

  return `// ============================================================================
// FILE: pages/${relativePath}/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this unit.
// ============================================================================

/**
 * Backend boundary metadata used by isolated page and section modules.
 */
export const ${configName} = {
  unit: "${relativePath}",
  apiEndpoint: "${toApiEndpoint(unitDir)}",
} as const;

export default ${configName};
`;
}

function run() {
  if (!fs.existsSync(pagesRoot)) {
    console.log("Pages root not found. Nothing to sync.");
    return;
  }

  const created = [];
  const skipped = [];
  const units = [pagesRoot, ...walkDirs(pagesRoot)];

  for (const unitDir of units) {
    const unitName = path.basename(unitDir);
    if (ignoredDirNames.has(unitName)) continue;
    if (!hasCodeFiles(unitDir)) continue;

    const frontendDir = path.join(unitDir, "frontend");
    const backendDir = path.join(unitDir, "backend");

    if (!fs.existsSync(frontendDir)) {
      const frontendFile = path.join(frontendDir, "index.tsx");
      const entryFile = chooseEntryFile(unitDir);
      const content = frontendWrapperTemplate(unitDir, entryFile);
      const createdNow = writeIfMissing(frontendFile, content);
      const relPath = path.relative(repoRoot, frontendFile).replace(/\\/g, "/");
      (createdNow ? created : skipped).push(relPath);
    }

    if (!fs.existsSync(backendDir)) {
      const backendFile = path.join(backendDir, "index.ts");
      const content = backendTemplate(unitDir);
      const createdNow = writeIfMissing(backendFile, content);
      const relPath = path.relative(repoRoot, backendFile).replace(/\\/g, "/");
      (createdNow ? created : skipped).push(relPath);
    }
  }

  console.log("=== Page Isolation Sync Report ===");
  console.log(`Created: ${created.length}`);
  console.log(`Skipped: ${skipped.length}`);

  if (created.length) {
    console.log("-- Created files --");
    for (const filePath of created) {
      console.log(` + ${filePath}`);
    }
  }
}

run();
