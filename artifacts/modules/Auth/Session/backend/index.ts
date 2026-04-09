// @ts-nocheck
/**
 * Session Backend Module
 * Manages active user sessions, retrieving current user profile, and securely logging out.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/logout", (req: Request, res: Response): void => {
  // Check if session exists before destroying to avoid errors
  if (!(req as any).session) {
    res.json({ message: "Logged out successfully" });
    return;
  }
  
  // Safely destroy the tracking session object from the store
  (req as any).session.destroy((err: Error | null) => {
    if (err) {
      res.status(500).json({ error: "Failed to logout" });
      return;
    }
    res.clearCookie("connect.sid"); // Explicitly clear the session cookie across the application
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
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
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
