// ============================================================================
// FILE: Home/StatsSection/Counters/frontend/index.tsx
// PURPOSE: Real-data counters card group for isolated Stats/Counters module.
// ============================================================================

import { useEffect, useState } from "react";

type CounterItem = {
  id: string;
  label: string;
  value: number;
  suffix: string;
};

export default function CountersFrontend() {
  const [items, setItems] = useState<CounterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/modules/home/stats/counters");
        const json = await response.json();
        setItems(json?.data ?? []);
      } catch (error) {
        console.error("Failed to load counters:", error);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  if (loading) {
    return <div className="text-sm text-zinc-400">Loading live counters...</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm"
        >
          <div className="text-2xl font-bold text-white">
            {item.value.toLocaleString()}
            <span className="text-blue-400">{item.suffix}</span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-wide text-zinc-400">{item.label}</p>
        </article>
      ))}
    </div>
  );
}
