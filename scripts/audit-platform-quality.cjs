/*
 * FILE: scripts/audit-platform-quality.cjs
 * PURPOSE: Audit modular isolation, comment coverage, and fake-data markers.
 *
 * This script gives a fast quality report for large-team development:
 * - Enforces frontend/backend folder symmetry in artifacts/modules
 * - Flags source files without a top-level explanatory comment
 * - Flags placeholder/fake/demo markers in first-party source files
 */

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const modulesRoot = path.join(repoRoot, "artifacts", "modules");
const pagesRoot = path.join(repoRoot, "artifacts", "ishu", "src", "pages");
const sourceRoots = [
  path.join(repoRoot, "artifacts", "ishu", "src"),
  path.join(repoRoot, "artifacts", "api-server", "src"),
  path.join(repoRoot, "artifacts", "modules"),
];

const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const ignoredPathParts = [
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}dist${path.sep}`,
  `${path.sep}build${path.sep}`,
  `${path.sep}.generated${path.sep}`,
];

const fakeDataPattern = /\b(realDataPlaceholder|mock\s+data|fake\s+data|demo\s+data|coming\s+soon|placeholder\s+for|this\s+is\s+a\s+placeholder|dummy\s+data|lorem\s+ipsum)\b/i;

function isIgnored(filePath) {
  return ignoredPathParts.some((part) => filePath.includes(part));
}

function walkFiles(rootDir, output = []) {
  if (!fs.existsSync(rootDir)) return output;

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (isIgnored(fullPath)) continue;

    if (entry.isDirectory()) {
      walkFiles(fullPath, output);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (codeExtensions.has(ext)) {
      output.push(fullPath);
    }
  }

  return output;
}

function firstMeaningfulLine(content) {
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) return trimmed;
  }
  return "";
}

function hasHeaderComment(content) {
  const first = firstMeaningfulLine(content);
  return first.startsWith("//") || first.startsWith("/*") || first.startsWith("*");
}

function collectSourceFiles() {
  const files = [];
  for (const root of sourceRoots) {
    files.push(...walkFiles(root));
  }
  return files;
}

function analyzeFiles(files) {
  const missingHeader = [];
  const fakeMarkers = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8");

    if (!hasHeaderComment(content)) {
      missingHeader.push(filePath);
    }

    if (fakeDataPattern.test(content)) {
      fakeMarkers.push(filePath);
    }
  }

  return { missingHeader, fakeMarkers };
}

function auditModuleSymmetry() {
  const missingFrontend = [];
  const missingBackend = [];

  if (!fs.existsSync(modulesRoot)) {
    return { missingFrontend, missingBackend };
  }

  const allDirs = [];
  walkDirs(modulesRoot, allDirs);

  for (const dir of allDirs) {
    const baseName = path.basename(dir);
    if (["frontend", "backend", "_shared", "types"].includes(baseName)) {
      continue;
    }

    const hasFrontend = fs.existsSync(path.join(dir, "frontend"));
    const hasBackend = fs.existsSync(path.join(dir, "backend"));

    if (hasFrontend && !hasBackend) {
      missingBackend.push(dir);
    } else if (hasBackend && !hasFrontend) {
      missingFrontend.push(dir);
    }
  }

  return { missingFrontend, missingBackend };
}

function hasCodeFilesInDir(dirPath) {
  if (!fs.existsSync(dirPath)) return false;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (codeExtensions.has(ext)) {
      return true;
    }
  }

  return false;
}

function auditPageSymmetry() {
  const missingFrontend = [];
  const missingBackend = [];

  if (!fs.existsSync(pagesRoot)) {
    return { missingFrontend, missingBackend };
  }

  const allDirs = [];
  walkDirs(pagesRoot, allDirs);

  for (const dir of allDirs) {
    const baseName = path.basename(dir);
    if (["frontend", "backend", "_shared", "types"].includes(baseName)) {
      continue;
    }

    if (!hasCodeFilesInDir(dir)) {
      continue;
    }

    const hasFrontend = fs.existsSync(path.join(dir, "frontend"));
    const hasBackend = fs.existsSync(path.join(dir, "backend"));

    if (hasFrontend && !hasBackend) {
      missingBackend.push(dir);
    } else if (hasBackend && !hasFrontend) {
      missingFrontend.push(dir);
    }
  }

  return { missingFrontend, missingBackend };
}

function walkDirs(rootDir, output = []) {
  if (!fs.existsSync(rootDir)) return output;

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const fullPath = path.join(rootDir, entry.name);
    if (isIgnored(fullPath)) continue;

    output.push(fullPath);
    walkDirs(fullPath, output);
  }

  return output;
}

function rel(p) {
  return path.relative(repoRoot, p).replace(/\\/g, "/");
}

function run() {
  const files = collectSourceFiles();
  const { missingHeader, fakeMarkers } = analyzeFiles(files);
  const { missingFrontend, missingBackend } = auditModuleSymmetry();
  const { missingFrontend: missingPageFrontend, missingBackend: missingPageBackend } =
    auditPageSymmetry();

  console.log("=== ISHU Platform Quality Audit ===");
  console.log(`Files scanned: ${files.length}`);
  console.log(`Missing header comments: ${missingHeader.length}`);
  console.log(`Files with fake/placeholder markers: ${fakeMarkers.length}`);
  console.log(`Modules missing frontend folder: ${missingFrontend.length}`);
  console.log(`Modules missing backend folder: ${missingBackend.length}`);
  console.log(`Pages missing frontend folder: ${missingPageFrontend.length}`);
  console.log(`Pages missing backend folder: ${missingPageBackend.length}`);

  if (missingFrontend.length > 0) {
    console.log("-- Missing frontend folder (sample) --");
    for (const p of missingFrontend.slice(0, 20)) {
      console.log(` - ${rel(p)}`);
    }
  }

  if (missingBackend.length > 0) {
    console.log("-- Missing backend folder (sample) --");
    for (const p of missingBackend.slice(0, 20)) {
      console.log(` - ${rel(p)}`);
    }
  }

  if (missingPageFrontend.length > 0) {
    console.log("-- Pages missing frontend folder (sample) --");
    for (const p of missingPageFrontend.slice(0, 20)) {
      console.log(` - ${rel(p)}`);
    }
  }

  if (missingPageBackend.length > 0) {
    console.log("-- Pages missing backend folder (sample) --");
    for (const p of missingPageBackend.slice(0, 20)) {
      console.log(` - ${rel(p)}`);
    }
  }

  if (missingHeader.length > 0) {
    console.log("-- Missing header comments (sample) --");
    for (const p of missingHeader.slice(0, 20)) {
      console.log(` - ${rel(p)}`);
    }
  }

  if (fakeMarkers.length > 0) {
    console.log("-- Fake/placeholder markers (sample) --");
    for (const p of fakeMarkers.slice(0, 20)) {
      console.log(` - ${rel(p)}`);
    }
  }

  const hasBlockingIssues =
    missingFrontend.length > 0 ||
    missingBackend.length > 0 ||
    missingPageFrontend.length > 0 ||
    missingPageBackend.length > 0;
  process.exit(hasBlockingIssues ? 1 : 0);
}

run();
