// ============================================================================
// FILE: api.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for api.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

/**
 * Tools Filters Section - Backend API Layer
 * Changes here do NOT affect any other section.
 */

import { useMemo } from "react";
import { useListTools } from "@workspace/api-client-react";

export interface ToolFilterCategory {
  value: string;
  label: string;
  count: number;
}

/**
 * Builds tool categories directly from live tool records.
 */
export function useToolFilterCategories(): {
  categories: ToolFilterCategory[];
  isLoading: boolean;
} {
  const { data, isLoading } = useListTools();
  const tools = Array.isArray(data) ? data : [];

  const categories = useMemo<ToolFilterCategory[]>(() => {
    const counts = new Map<string, number>();

    for (const tool of tools) {
      const category = typeof tool.category === "string" ? tool.category.trim() : "";
      if (!category) {
        continue;
      }
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }

    const realCategories = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([category, count]) => ({ value: category, label: category, count }));

    return [{ value: "", label: "All Tools", count: tools.length }, ...realCategories];
  }, [tools]);

  return { categories, isLoading };
}
