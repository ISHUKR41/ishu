// Shared types and constants for Tools
export const MODULE_NAME = "Tools";

export type ToolCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  { id: "1", name: "PDF Tools", slug: "pdf-tools", icon: "FileText", color: "from-red-500 to-rose-500" },
  { id: "2", name: "Image Tools", slug: "image-tools", icon: "Image", color: "from-blue-500 to-cyan-500" },
  { id: "3", name: "Writing AI", slug: "writing-ai", icon: "Type", color: "from-purple-500 to-fuchsia-500" },
  { id: "4", name: "Study AI", slug: "study-ai", icon: "Brain", color: "from-amber-500 to-orange-500" },
  { id: "5", name: "Converters", slug: "converters", icon: "RefreshCcw", color: "from-emerald-500 to-green-500" },
];
