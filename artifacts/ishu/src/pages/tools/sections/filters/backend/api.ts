/**
 * Tools Filters Section - Backend API Layer
 * Changes here do NOT affect any other section.
 */

export const toolFilterCategories = [
  { slug: "all", label: "All Tools", icon: "Grid3X3" },
  { slug: "pdf", label: "PDF Tools", icon: "FileText" },
  { slug: "ai", label: "AI Tools", icon: "Brain" },
  { slug: "image", label: "Image Tools", icon: "Image" },
  { slug: "text", label: "Text Tools", icon: "Type" },
  { slug: "conversion", label: "Conversion", icon: "ArrowLeftRight" },
] as const;
