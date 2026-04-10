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
 * Register Backend Module
 * Handles new user registration logic with isolated routing.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { db, isInMemoryDatabase, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { RegisterUserBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const parsed = RegisterUserBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, password, whatsappNumber } = parsed.data;

  // Check if the email already exists in the database
  const existingUser = isInMemoryDatabase
    ? (await db.select().from(usersTable)).find((row) => row.email === email)
    : (await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1))[0];

  if (existingUser) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  // Hash the incoming password for secure storage
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const [user] = await db.insert(usersTable).values({
    name,
    email,
    passwordHash,
    whatsappNumber: whatsappNumber ?? null,
    role: "user",
  }).returning();

  res.status(201).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      whatsappNumber: user.whatsappNumber,
      role: user.role,
      createdAt: user.createdAt,
    },
    message: "Registration successful. Please sign in.",
  });
});

export default router;
