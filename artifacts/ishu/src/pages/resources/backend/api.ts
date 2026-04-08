/**
 * Resources Page - Backend API Layer
 * Custom hook for fetching resources from the /resources endpoint.
 * The resources endpoint is not in the generated OpenAPI spec, so we
 * define a custom React Query hook here instead.
 * Changes here do NOT affect any other page.
 */
import { useQuery } from "@tanstack/react-query";

/** Shape of a single resource returned by the API */
export interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  exam: string;
  url: string;
  featured?: boolean;
  tags: string[];
}

/** Shape of the paginated resources response from the API */
export interface ResourcesListResponse {
  resources: Resource[];
  total: number;
  page: number;
  totalPages: number;
}

/** Parameters accepted by the useListResources hook */
export interface UseListResourcesParams {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Custom React Query hook to fetch resources from the /api/resources endpoint.
 * Mirrors the API contract defined in the api-server routes/resources/index.ts.
 */
export function useListResources(params?: UseListResourcesParams) {
  const { category, search, featured, page = 1, limit = 20 } = params ?? {};

  return useQuery<ResourcesListResponse>({
    queryKey: ["resources", { category, search, featured, page, limit }],
    queryFn: async () => {
      const url = new URL("/api/resources", window.location.origin);
      if (category && category !== "all") url.searchParams.set("category", category);
      if (search) url.searchParams.set("search", search);
      if (featured) url.searchParams.set("featured", "true");
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch resources");
      return res.json();
    },
  });
}

/**
 * Resource category filter options used across the resources page sections.
 * Each category has a slug for URL routing, a human-readable label,
 * and an icon name referencing the centralized icon system.
 */
export const resourceCategories = [
  { slug: "all", label: "All Resources", icon: "FolderOpen" },
  { slug: "previous-papers", label: "Previous Year Papers", icon: "FileText" },
  { slug: "syllabus", label: "Syllabus", icon: "BookOpen" },
  { slug: "mock-tests", label: "Mock Tests", icon: "ClipboardCheck" },
  { slug: "study-notes", label: "Study Notes", icon: "PenTool" },
  { slug: "formula-sheets", label: "Formula Sheets", icon: "Calculator" },
  { slug: "ncert-solutions", label: "NCERT Solutions", icon: "Book" },
  { slug: "video-lectures", label: "Video Lectures", icon: "Play" },
  { slug: "current-affairs", label: "Current Affairs", icon: "Globe" },
] as const;
