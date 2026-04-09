// ============================================================================
// FILE: modules/News/HeroSection/backend/index.ts
// PURPOSE: Backend API for the News HeroSection — providing breaking news
//          headlines and trending article counts.
//
// ENDPOINT: GET /api/news/hero-stats
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { newsTable } from "../../../../../lib/db/src/schema/news";
import { sql, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    // Get total news count and recent articles count
    const totalQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsTable);

    // Get latest 5 breaking news for the ticker
    const breakingNews = await db
      .select({ id: newsTable.id, title: newsTable.title })
      .from(newsTable)
      .orderBy(desc(newsTable.createdAt))
      .limit(5);

    res.json({
      totalArticles: Number(totalQuery[0]?.count ?? 0),
      breakingNews,
    });
  } catch (error) {
    console.error("[News/HeroSection/backend] Error:", error);
    res.json({ totalArticles: 0, breakingNews: [] });
  }
});

export default router;
