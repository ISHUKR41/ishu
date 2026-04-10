// ============================================================================
// FILE: components/performance/AppErrorBoundary.tsx
// PURPOSE: Global React error boundary for route/module crash containment.
//          If any isolated page section throws, the app shows a safe fallback
//          instead of blanking the entire UI.
// ============================================================================

import React from "react";
import { Button } from "@/components/ui/button";

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Keep logs in console for local debugging and QA triage.
    console.error("AppErrorBoundary caught an error", error, errorInfo);
  }

  private reloadPage = () => {
    window.location.reload();
  };

  private goHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="max-w-xl w-full rounded-xl border border-border bg-card p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              We hit an unexpected runtime issue in this section. Your data is safe.
              You can retry or return to the homepage.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="outline" onClick={this.goHome}>
                Go Home
              </Button>
              <Button onClick={this.reloadPage}>Retry</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
