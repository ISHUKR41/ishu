/**
 * Home Tools Showcase Section - Backend API Layer
 * Isolated API hooks for the tools showcase section.
 * Changes here do NOT affect any other section.
 */
export { useListTools } from "@workspace/api-client-react";

// Tool category configuration
export const toolCategories = [
  { slug: "pdf", name: "PDF Tools", icon: "FileText", color: "#ef4444", description: "Merge, split, compress, convert PDFs" },
  { slug: "ai", name: "AI Tools", icon: "Brain", color: "#8b5cf6", description: "Chat with PDF, summarize, translate" },
  { slug: "image", name: "Image Tools", icon: "Image", color: "#10b981", description: "Convert, compress, resize images" },
  { slug: "text", name: "Text Tools", icon: "Type", color: "#f97316", description: "OCR, extract text, format documents" },
  { slug: "conversion", name: "Conversion", icon: "ArrowLeftRight", color: "#3b82f6", description: "Convert between 50+ formats" },
] as const;
