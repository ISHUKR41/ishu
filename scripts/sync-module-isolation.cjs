/*
 * FILE: scripts/sync-module-isolation.cjs
 * PURPOSE: Enforce strict frontend/backend folder symmetry for module units.
 *
 * Why this script exists:
 * - Large teams need strict isolation boundaries.
 * - Some module units had only frontend or only backend folders.
 * - This script creates the missing counterpart entries with documented stubs.
 *
 * Safety guarantees:
 * - Never overwrites existing files.
 * - Creates only missing files/folders.
 * - Uses clear English comments in generated files.
 */

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const modulesRoot = path.join(repoRoot, "artifacts", "modules");

const missingFrontendUnits = [
  {
    unitPath: "Contact",
    mode: "wrapper",
    wrapperImport: "../index",
    componentName: "ContactFrontendEntry",
    note: "Wrapper around the existing Contact module root component.",
  },
  {
    unitPath: "Auth/Session",
    mode: "session-stub",
    componentName: "AuthSessionFrontendEntry",
    note: "Frontend entry point for session-related UI or hydration hooks.",
  },
];

const missingBackendUnits = [
  {
    unitPath: "About/HeroSection",
    exportName: "moduleConfig",
    title: "About Hero Section",
    description: "Configuration for the About page hero section backend boundary.",
    apiEndpoint: "/api/modules/about/hero",
  },
  {
    unitPath: "Contact/SEO",
    exportName: "moduleConfig",
    title: "Contact SEO",
    description: "Configuration for Contact page SEO metadata backend boundary.",
    apiEndpoint: "/api/modules/contact/seo",
  },
  {
    unitPath: "News/CategoryFilter",
    exportName: "moduleConfig",
    title: "News Category Filter",
    description: "Configuration for centralized news category filter metadata.",
    apiEndpoint: "/api/news/categories",
  },
  {
    unitPath: "Results/Categories/_template",
    exportName: "categoryConfig",
    title: "Results Category Template",
    description: "Template backend configuration for creating new results categories.",
    apiEndpoint: "/api/results/category/template",
  },
  {
    unitPath: "Results/Categories/Banking",
    exportName: "categoryConfig",
    title: "Banking Results",
    description: "Configuration for Banking results category.",
    apiEndpoint: "/api/results?category=Banking",
  },
  {
    unitPath: "Results/Categories/Defence",
    exportName: "categoryConfig",
    title: "Defence Results",
    description: "Configuration for Defence results category.",
    apiEndpoint: "/api/results?category=Defence",
  },
  {
    unitPath: "Results/Categories/Engineering",
    exportName: "categoryConfig",
    title: "Engineering Results",
    description: "Configuration for Engineering results category.",
    apiEndpoint: "/api/results?category=Engineering",
  },
  {
    unitPath: "Results/Categories/JEE",
    exportName: "categoryConfig",
    title: "JEE Results",
    description: "Configuration for JEE results category.",
    apiEndpoint: "/api/results?category=JEE",
  },
  {
    unitPath: "Results/Categories/Judiciary",
    exportName: "categoryConfig",
    title: "Judiciary Results",
    description: "Configuration for Judiciary results category.",
    apiEndpoint: "/api/results?category=Judiciary",
  },
  {
    unitPath: "Results/Categories/NEET",
    exportName: "categoryConfig",
    title: "NEET Results",
    description: "Configuration for NEET results category.",
    apiEndpoint: "/api/results?category=NEET",
  },
  {
    unitPath: "Results/Categories/Police",
    exportName: "categoryConfig",
    title: "Police Results",
    description: "Configuration for Police results category.",
    apiEndpoint: "/api/results?category=Police",
  },
  {
    unitPath: "Results/Categories/Railway",
    exportName: "categoryConfig",
    title: "Railway Results",
    description: "Configuration for Railway results category.",
    apiEndpoint: "/api/results?category=Railway",
  },
  {
    unitPath: "Results/Categories/SSC",
    exportName: "categoryConfig",
    title: "SSC Results",
    description: "Configuration for SSC results category.",
    apiEndpoint: "/api/results?category=SSC",
  },
  {
    unitPath: "Results/Categories/StatePSC",
    exportName: "categoryConfig",
    title: "State PSC Results",
    description: "Configuration for State PSC results category.",
    apiEndpoint: "/api/results?category=StatePSC",
  },
  {
    unitPath: "Results/Categories/Teaching",
    exportName: "categoryConfig",
    title: "Teaching Results",
    description: "Configuration for Teaching results category.",
    apiEndpoint: "/api/results?category=Teaching",
  },
  {
    unitPath: "Results/Categories/UPSC",
    exportName: "categoryConfig",
    title: "UPSC Results",
    description: "Configuration for UPSC results category.",
    apiEndpoint: "/api/results?category=UPSC",
  },
];

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

function frontendWrapperTemplate(unitPath, componentName, wrapperImport, note) {
  return `// ============================================================================
// FILE: modules/${unitPath}/frontend/index.tsx
// PURPOSE: Dedicated frontend entry for this module unit.
// NOTE: ${note}
// ============================================================================

import ExistingUnitComponent from "${wrapperImport}";

/**
 * Frontend entry wrapper for strict frontend/backend folder symmetry.
 */
export default function ${componentName}() {
  return <ExistingUnitComponent />;
}
`;
}

function frontendSessionTemplate(unitPath, componentName, note) {
  return `// ============================================================================
// FILE: modules/${unitPath}/frontend/index.tsx
// PURPOSE: Dedicated frontend entry for auth session concerns.
// NOTE: ${note}
// ============================================================================

/**
 * Session frontend boundary.
 * Keep session-related UI and client-side orchestration isolated here.
 */
export default function ${componentName}() {
  return null;
}
`;
}

function backendTemplate(unitPath, exportName, title, description, apiEndpoint) {
  return `// ============================================================================
// FILE: modules/${unitPath}/backend/index.ts
// PURPOSE: Dedicated backend metadata boundary for this module unit.
// ============================================================================

/**
 * Module-level backend metadata for safe, isolated integration.
 */
export const ${exportName} = {
  title: "${title}",
  description: "${description}",
  apiEndpoint: "${apiEndpoint}",
} as const;

export default ${exportName};
`;
}

function run() {
  const created = [];
  const skipped = [];

  for (const unit of missingFrontendUnits) {
    const filePath = path.join(modulesRoot, unit.unitPath, "frontend", "index.tsx");
    const content =
      unit.mode === "wrapper"
        ? frontendWrapperTemplate(unit.unitPath, unit.componentName, unit.wrapperImport, unit.note)
        : frontendSessionTemplate(unit.unitPath, unit.componentName, unit.note);

    if (writeIfMissing(filePath, content)) {
      created.push(path.relative(repoRoot, filePath).replace(/\\/g, "/"));
    } else {
      skipped.push(path.relative(repoRoot, filePath).replace(/\\/g, "/"));
    }
  }

  for (const unit of missingBackendUnits) {
    const filePath = path.join(modulesRoot, unit.unitPath, "backend", "index.ts");
    const content = backendTemplate(
      unit.unitPath,
      unit.exportName,
      unit.title,
      unit.description,
      unit.apiEndpoint,
    );

    if (writeIfMissing(filePath, content)) {
      created.push(path.relative(repoRoot, filePath).replace(/\\/g, "/"));
    } else {
      skipped.push(path.relative(repoRoot, filePath).replace(/\\/g, "/"));
    }
  }

  console.log("=== Module Isolation Sync Report ===");
  console.log(`Created: ${created.length}`);
  console.log(`Skipped (already exists): ${skipped.length}`);
  if (created.length) {
    console.log("-- Created files --");
    for (const f of created) {
      console.log(` + ${f}`);
    }
  }
}

run();
