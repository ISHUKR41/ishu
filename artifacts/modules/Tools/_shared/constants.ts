// ============================================================================
// FILE: modules/Tools/_shared/constants.ts
// PURPOSE: Constants for the Tools module — 5 tool categories covering
//          PDF, AI, Image, Text, and Conversion utilities for students.
// ============================================================================

import type { ToolCategory } from "./types";

export const TOOLS_API = {
  BASE: "/api/tools",
  LIST: "/api/tools",
  DETAIL: (slug: string) => `/api/tools/${slug}`,
  CATEGORY: (slug: string) => `/api/tools/category/${slug}`,
} as const;

/**
 * Tool Categories — practical utilities that Indian students need daily.
 */
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "pdf",
    name: "PDF Tools",
    slug: "pdf",
    description: "Merge, split, compress, convert, and edit PDF files. Essential for students handling admit cards, syllabus PDFs, and study notes.",
    icon: "FileText",
    color: "from-red-500 to-rose-600",
    count: 0,
  },
  {
    id: "ai",
    name: "AI Tools",
    slug: "ai",
    description: "AI-powered study assistants, question generators, essay evaluators, and smart summarization tools for exam preparation.",
    icon: "Brain",
    color: "from-violet-500 to-purple-600",
    count: 0,
  },
  {
    id: "image",
    name: "Image Tools",
    slug: "image",
    description: "Resize, compress, convert images for application forms. Photo editor for passport-size photos required in government exam forms.",
    icon: "Image",
    color: "from-emerald-500 to-teal-600",
    count: 0,
  },
  {
    id: "text",
    name: "Text Tools",
    slug: "text",
    description: "Word counter, case converter, text comparator, and formatting tools for answering writing practice and essay preparation.",
    icon: "Type",
    color: "from-blue-500 to-cyan-600",
    count: 0,
  },
  {
    id: "conversion",
    name: "Conversion Tools",
    slug: "conversion",
    description: "File format converters — Word to PDF, Excel to PDF, image format conversion, and other utility converters.",
    icon: "RefreshCcw",
    color: "from-amber-500 to-orange-600",
    count: 0,
  },
];
