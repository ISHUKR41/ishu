// ============================================================================
// FILE: modules/News/NewsFeed/backend/index.ts
// PURPOSE: Backend API for the NewsFeed section — paginated news articles
//          with category and search filtering support.
//
// ENDPOINT: GET /api/news (with query params: page, pageSize, category, search)
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { newsTable } from "../../../../../lib/db/src/schema/news";
import { desc, asc, sql, eq, ilike, and } from "drizzle-orm";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string) || 15));
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;

    const conditions = [];
    if (category) conditions.push(eq(newsTable.category, category));
    if (search) conditions.push(ilike(newsTable.title, `%${search}%`));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const totalQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(newsTable)
      .where(whereClause);

    const total = Number(totalQuery[0]?.count ?? 0);
    const totalPages = Math.ceil(total / pageSize);

    const articles = await db
      .select()
      .from(newsTable)
      .where(whereClause)
      .orderBy(desc(newsTable.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    res.json({ data: articles, total, page, pageSize, totalPages });
  } catch (error) {
    console.error("[News/NewsFeed/backend] Error:", error);
    res.status(500).json({ data: [], total: 0, page: 1, pageSize: 15, totalPages: 0 });
  }
});

export default router;
