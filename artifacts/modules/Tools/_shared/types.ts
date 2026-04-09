// ============================================================================
// FILE: modules/Tools/_shared/types.ts
// PURPOSE: TypeScript types for the Tools module — tool definitions, categories.
// ============================================================================

export interface Tool {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  type: string;
  iconUrl: string | null;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}
