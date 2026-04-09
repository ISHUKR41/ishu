// ============================================================================
// FILE: modules/Resources/Categories/study-notes/backend/index.ts
// PURPOSE: Isolated backend config for "Study Notes" resources.
// ============================================================================

export const categoryConfig = {
  name: "Study Notes",
  slug: "study-notes",
  title: "Study Notes - Study Resources | Ishu",
  description: "Download free Study Notes for exam preparation.",
  apiEndpoint: "/api/resources/category/study-notes",
} as const;

export default categoryConfig;
