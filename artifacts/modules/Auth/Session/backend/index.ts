// ============================================================================
// FILE: index.ts
// MODULE: Auth
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
/**
 * Session Backend Module
 * Manages active user sessions, retrieving current user profile, and securely logging out.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import { db, isInMemoryDatabase, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();
const SESSION_COOKIE_NAME = "ishu.sid";
const SESSION_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

router.post("/logout", (req: Request, res: Response): void => {
  // Check if session exists before destroying to avoid errors
  if (!(req as any).session) {
    res.clearCookie(SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS);
    res.json({ message: "Logged out successfully" });
    return;
  }

  // Remove auth markers immediately to reduce stale-session edge cases.
  delete (req as any).session.userId;
  delete (req as any).session.role;
  
  // Safely destroy the tracking session object from the store
  (req as any).session.destroy((err: Error | null) => {
    res.clearCookie(SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS);

    if (err) {
      console.warn("Session destroy failed during logout. Cookie cleared anyway.", err);
    }

    res.json({ message: "Logged out successfully" });
  });
});

router.get("/me", async (req: Request, res: Response): Promise<void> => {
  // Validate presence of user id in session for authenticated requests
  const userId = (req as any).session?.userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  // Retrieve securely the limited subset of user data matching the session id
  const user = isInMemoryDatabase
    ? (await db.select().from(usersTable)).find((row) => row.id === userId)
    : (await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1))[0];

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  // Supply scrubbed representation back to client
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    whatsappNumber: user.whatsappNumber,
    role: user.role,
    createdAt: user.createdAt,
  });
});

export default router;
