// ============================================================================
// FILE: Home/FeaturedResults/Detail/frontend/index.tsx
// PURPOSE: Real-data detail card for a single featured result item.
// ============================================================================

import { useEffect, useState } from "react";

type ResultDetail = {
  id: number;
  title: string;
  shortDescription: string;
  status?: string;
  officialLink?: string | null;
};

export default function DetailFrontend() {
  const [item, setItem] = useState<ResultDetail | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/modules/home/featured-results/detail");
        const json = await response.json();
        setItem(json?.data ?? null);
      } catch (error) {
        console.error("Failed to load featured result detail:", error);
      }
    }

    void load();
  }, []);

  if (!item) {
    return <div className="text-sm text-zinc-400">No published result is available right now.</div>;
  }

  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="mb-2 text-xs uppercase tracking-wide text-zinc-400">Featured Result</p>
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm text-zinc-300">{item.shortDescription}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
        <span>Status:</span>
        <span className="rounded bg-zinc-800 px-2 py-1 text-zinc-200">
          {item.status ?? "unknown"}
        </span>
      </div>
      {item.officialLink ? (
        <a
          href={item.officialLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
        >
          Open official link
        </a>
      ) : null}
    </article>
  );
}
