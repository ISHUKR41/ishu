// ============================================================================
// FILE: Home/StatsSection/Chart/frontend/index.tsx
// PURPOSE: Status distribution bar chart powered by live backend aggregates.
// ============================================================================

import { useEffect, useMemo, useState } from "react";

type ChartPoint = {
  label: string;
  value: number;
};

export default function ChartFrontend() {
  const [points, setPoints] = useState<ChartPoint[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/modules/home/stats/chart");
        const json = await response.json();
        setPoints(json?.data ?? []);
      } catch (error) {
        console.error("Failed to load chart data:", error);
      }
    }

    void load();
  }, []);

  const maxValue = useMemo(
    () => Math.max(1, ...points.map((point) => point.value)),
    [points],
  );

  if (!points.length) {
    return <div className="text-sm text-zinc-400">No chart data available.</div>;
  }

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
      {points.map((point) => {
        const width = Math.max(6, Math.round((point.value / maxValue) * 100));
        return (
          <div key={point.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="uppercase tracking-wide">{point.label}</span>
              <span>{point.value.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded bg-zinc-800/80">
              <div
                className="h-2 rounded bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
