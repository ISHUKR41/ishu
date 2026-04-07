import { useQuery } from "@tanstack/react-query";

export interface FeaturedResource {
  id: number;
  title: string;
  type: string;
  exam: string;
  iconColor: string;
  iconBg: string;
  downloadUrl: string;
  sourceUrl: string;
  downloads: number;
}

interface FeaturedResourcesResponse {
  resources: FeaturedResource[];
}

export function useFeaturedResources(limit = 6) {
  return useQuery({
    queryKey: ["resources-featured", limit],
    queryFn: async (): Promise<FeaturedResource[]> => {
      const params = new URLSearchParams({
        featured: "true",
        limit: String(limit),
      });
      const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${baseUrl}/api/resources?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch featured resources");
      }

      const payload = (await response.json()) as FeaturedResourcesResponse;
      return payload.resources ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });
}
