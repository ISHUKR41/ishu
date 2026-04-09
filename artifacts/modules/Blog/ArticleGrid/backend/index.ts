// ============================================================================
// FILE: modules/Blog/ArticleGrid/backend/index.ts
// PURPOSE: Backend API for the ArticleGrid — paginated blog posts listing.
// ENDPOINT: GET /api/blogs (with query params: page, pageSize, category)
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { blogsTable } from "../../../../../lib/db/src/schema/blogs";
import { desc, sql, eq, and } from "drizzle-orm";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(50, parseInt(req.query.pageSize as string) || 12);
    const category = req.query.category as string | undefined;

    const conditions = category ? [eq(blogsTable.category, category)] : [];
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const totalQuery = await db.select({ count: sql<number>`count(*)` }).from(blogsTable).where(whereClause);
    const total = Number(totalQuery[0]?.count ?? 0);

    const posts = await db.select().from(blogsTable).where(whereClause)
      .orderBy(desc(blogsTable.createdAt)).limit(pageSize).offset((page - 1) * pageSize);

    res.json({ data: posts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    console.error("[Blog/ArticleGrid/backend] Error:", error);
    res.status(500).json({ data: [], total: 0, page: 1, pageSize: 12, totalPages: 0 });
  }
});

export default router;
