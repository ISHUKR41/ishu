// ============================================================================
// FILE: modules/Resources/Categories/formula-sheets/backend/index.ts
// PURPOSE: Isolated backend config for "Formula Sheets" resources.
// ============================================================================

export const categoryConfig = {
  name: "Formula Sheets",
  slug: "formula-sheets",
  title: "Formula Sheets - Study Resources | Ishu",
  description: "Download free Formula Sheets for exam preparation.",
  apiEndpoint: "/api/resources/category/formula-sheets",
} as const;

export default categoryConfig;
