// ============================================================================
// FILE: modules/Resources/Categories/syllabus/backend/index.ts
// PURPOSE: Isolated backend config for "Syllabus" resources.
// ============================================================================

export const categoryConfig = {
  name: "Syllabus",
  slug: "syllabus",
  title: "Syllabus - Study Resources | Ishu",
  description: "Download free Syllabus for exam preparation.",
  apiEndpoint: "/api/resources/category/syllabus",
} as const;

export default categoryConfig;
