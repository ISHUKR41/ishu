// FILE: artifacts/ishu/src/pages/test/frontend/index.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { PageMeta } from "@/components/layout/PageMeta";
import { useSystemHealth } from "../backend/useSystemHealth";

export default function TestPage() {
  const { data, isLoading, isError } = useSystemHealth();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <PageMeta
        title="System Test & Status | Ishu"
        description="Live health and routing test page for Ishu platform."
        canonical="https://ishu.in/test"
      />

      <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">System Test Page</h1>
      <p className="text-muted-foreground mb-8">This page validates frontend routing and backend connectivity using live health API data.</p>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-medium mb-4">API Health</h2>
        {isLoading && <p className="text-muted-foreground">Checking backend status...</p>}
        {isError && <p className="text-red-400">Backend health check failed.</p>}
        {!isLoading && !isError && (
          <p className="text-green-400 font-medium">
            Status: {data?.status ?? "unknown"}
          </p>
        )}
      </div>
    </div>
  );
}
