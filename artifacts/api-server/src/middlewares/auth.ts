// ============================================================================
// FILE: auth.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for auth.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import { type Request, type Response, type NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const userId = (req as any).session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const role = (req as any).session?.role;
  if (!role || role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }
  next();
}
