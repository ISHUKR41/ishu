// FILE: artifacts/ishu/src/lib/utils.ts
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
