// FILE: artifacts/ishu/src/pages/test/backend/useSystemHealth.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { useQuery } from "@tanstack/react-query";

interface HealthResponse {
  status: string;
}

export function useSystemHealth() {
  return useQuery<HealthResponse>({
    queryKey: ["test-page-health"],
    queryFn: async () => {
      const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${baseUrl}/api/healthz`);
      if (!response.ok) {
        throw new Error("Health endpoint failed");
      }
      return response.json();
    },
    refetchInterval: 30000,
  });
}
