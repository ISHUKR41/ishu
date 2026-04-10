// FILE: artifacts/ishu/src/components/ui/skeleton.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
