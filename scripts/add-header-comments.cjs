/*
 * FILE: scripts/add-header-comments.cjs
 * PURPOSE: Add simple English header comments to first-party source files
 *          that are missing a top-level comment.
 */

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const sourceRoots = [
  path.join(repoRoot, "artifacts", "ishu", "src"),
  path.join(repoRoot, "artifacts", "api-server", "src"),
  path.join(repoRoot, "artifacts", "modules"),
];

const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const ignoredPathParts = [
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}dist${path.sep}`,
  `${path.sep}build${path.sep}`,
  `${path.sep}.generated${path.sep}`,
];

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
    if (allowedExtensions.has(ext)) {
      output.push(fullPath);
    }
  }

  return output;
}

function firstMeaningfulLineIndex(lines) {
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim().length > 0) {
      return i;
    }
  }
  return -1;
}

function hasTopComment(lines, firstIndex) {
  if (firstIndex < 0) return false;
  const first = lines[firstIndex].trim();
  return first.startsWith("//") || first.startsWith("/*") || first.startsWith("*");
}

function makeHeader(relativePath, isCss) {
  if (isCss) {
    return [
      "/*",
      ` * FILE: ${relativePath}`,
      " * PURPOSE: Styling file for a dedicated ISHU module section.",
      " */",
      "",
    ];
  }

  return [
    "// FILE: " + relativePath,
    "// PURPOSE: Implementation file for a dedicated ISHU module section.",
    "",
  ];
}

function insertHeader(content, relativePath, extension) {
  const lines = content.split(/\r?\n/);
  const firstIndex = firstMeaningfulLineIndex(lines);

  if (hasTopComment(lines, firstIndex)) {
    return { changed: false, content };
  }

  const isCss = extension === ".css";
  const headerLines = makeHeader(relativePath, isCss);

  // Keep TypeScript pragma directives at top if they already exist.
  const firstLine = firstIndex >= 0 ? lines[firstIndex].trim() : "";
  if (firstLine === "// @ts-nocheck" || firstLine === "// @ts-ignore") {
    const out = [...lines];
    out.splice(firstIndex + 1, 0, "", ...headerLines.slice(0, -1));
    return { changed: true, content: out.join("\n") };
  }

  const out = [...headerLines, ...lines];
  return { changed: true, content: out.join("\n") };
}

function run() {
  const files = [];
  for (const root of sourceRoots) {
    files.push(...walkFiles(root));
  }

  let updated = 0;
  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const relativePath = path.relative(repoRoot, filePath).replace(/\\/g, "/");
    const original = fs.readFileSync(filePath, "utf8");
    const result = insertHeader(original, relativePath, ext);

    if (result.changed) {
      fs.writeFileSync(filePath, result.content, "utf8");
      updated += 1;
    }
  }

  console.log("=== Header Comment Pass ===");
  console.log(`Files scanned: ${files.length}`);
  console.log(`Files updated: ${updated}`);
}

run();
