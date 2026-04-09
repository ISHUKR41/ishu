// ============================================================================
// FILE: modules/Blog/HeroSection/backend/index.ts
// PURPOSE: Backend API for Blog HeroSection — provides featured post and stats.
// ENDPOINT: GET /api/blogs/hero-stats
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { blogsTable } from "../../../../../lib/db/src/schema/blogs";
import { sql, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const totalQuery = await db.select({ count: sql<number>`count(*)` }).from(blogsTable);
    const featuredPost = await db.select().from(blogsTable).orderBy(desc(blogsTable.createdAt)).limit(1);

    res.json({
      totalPosts: Number(totalQuery[0]?.count ?? 0),
      featuredPost: featuredPost[0] ?? null,
    });
  } catch (error) {
    console.error("[Blog/HeroSection/backend] Error:", error);
    res.json({ totalPosts: 0, featuredPost: null });
  }
});

export default router;
