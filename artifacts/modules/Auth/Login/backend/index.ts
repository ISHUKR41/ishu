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
 * Login Backend Module
 * Handles existing user authentication and session instantiation.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { db, isInMemoryDatabase, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { LoginUserBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const parsed = LoginUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;

  // Retrieve the user record from the database based on email
  const user = isInMemoryDatabase
    ? (await db.select().from(usersTable)).find((row) => row.email === email)
    : (await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1))[0];

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Compare the hashed password with the provided credentials
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Assign session details safely preventing prototype destruction
  if (!(req as any).session) (req as any).session = {};
  (req as any).session.userId = user.id;
  (req as any).session.role = user.role;

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      whatsappNumber: user.whatsappNumber,
      role: user.role,
      createdAt: user.createdAt,
    },
    message: "Login successful",
  });
});

export default router;
