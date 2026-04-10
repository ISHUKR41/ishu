// FILE: artifacts/ishu/src/pages/about/sections/stats/backend/useAboutStatsData.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import {
  useGetResultStats,
  useListTools,
  useListNews,
  useListBlogs,
} from "@workspace/api-client-react";

interface AboutStatItem {
  value: string;
  label: string;
}

function toCount(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function withSuffix(count: number): string {
  return count > 0 ? `${count}+` : "0";
}

export function useAboutStatsData(): AboutStatItem[] {
  const { data: resultStats } = useGetResultStats();
  const { data: toolsData } = useListTools();
  const { data: newsData } = useListNews({ limit: 1 });
  const { data: blogsData } = useListBlogs({ limit: 1 });

  const totalResults = resultStats
    ? toCount(resultStats.totalActive) + toCount(resultStats.totalUpcoming) + toCount(resultStats.totalExpired)
    : 0;
  const toolCount = Array.isArray(toolsData) ? toolsData.length : 0;
  const newsTotal = toCount((newsData as { total?: number } | undefined)?.total);
  const blogsTotal = toCount((blogsData as { total?: number } | undefined)?.total);

  return [
    { value: withSuffix(toolCount), label: "Free PDF & AI Tools" },
    { value: withSuffix(totalResults), label: "Exam Results Tracked" },
    { value: withSuffix(newsTotal), label: "News Articles" },
    { value: withSuffix(blogsTotal), label: "Blog Posts" },
  ];
}
