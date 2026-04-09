// @ts-nocheck
/**
 * Register Backend Module
 * Handles new user registration logic with isolated routing.
 */
import { Router, type IRouter, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
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
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
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

  // Initialize and assign session details securely
  if (!(req as any).session) (req as any).session = {};
  (req as any).session.userId = user.id;
  (req as any).session.role = user.role;

  res.status(201).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      whatsappNumber: user.whatsappNumber,
      role: user.role,
      createdAt: user.createdAt,
    },
    message: "Registration successful",
  });
});

export default router;
