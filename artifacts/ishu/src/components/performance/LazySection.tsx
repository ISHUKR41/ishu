// FILE: artifacts/ishu/src/components/performance/LazySection.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { Suspense, type ReactNode, useEffect, useRef, useState } from "react";

interface SectionSkeletonProps {
  minHeight?: number;
  label?: string;
  className?: string;
}

interface LazySectionProps {
  children: ReactNode;
  minHeight?: number;
  rootMargin?: string;
  eager?: boolean;
  fallback?: ReactNode;
}

export function SectionSkeleton({
  minHeight = 200,
  label = "Loading section",
  className,
}: SectionSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={[
        "w-full animate-pulse rounded-2xl border border-border/40 bg-muted/30",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ minHeight }}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function LazySection({
  children,
  minHeight = 200,
  rootMargin = "280px 0px",
  eager = false,
  fallback,
}: LazySectionProps) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(eager);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const node = anchorRef.current;
    if (!node) {
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.01,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  const fallbackNode = fallback ?? <SectionSkeleton minHeight={minHeight} />;

  return (
    <div ref={anchorRef} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? (
        <Suspense fallback={fallbackNode}>{children}</Suspense>
      ) : (
        fallbackNode
      )}
    </div>
  );
}

export default LazySection;
