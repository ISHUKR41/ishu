// ============================================================================
// FILE: modules/Resources/Categories/mock-tests/backend/index.ts
// PURPOSE: Isolated backend config for "Mock Tests" resources.
// ============================================================================

export const categoryConfig = {
  name: "Mock Tests",
  slug: "mock-tests",
  title: "Mock Tests - Study Resources | Ishu",
  description: "Download free Mock Tests for exam preparation.",
  apiEndpoint: "/api/resources/category/mock-tests",
} as const;

export default categoryConfig;
