import { Router, type IRouter } from "express";
import { db, blogsTable } from "@workspace/db";
import { eq, sql, and, or, like } from "drizzle-orm";

const SLUG_TO_CATEGORY_PATTERNS: Record<string, string[]> = {
  "exam-tips": ["exam-analysis", "study-strategy"],
  "career-guidance": ["career-guidance", "government-jobs"],
  "success-stories": ["success-stories"],
  "study-strategies": ["study-strategy", "exam-preparation"],
};

function buildCategoryCondition(categorySlug: string) {
  const patterns = SLUG_TO_CATEGORY_PATTERNS[categorySlug];
  if (patterns && patterns.length > 0) {
    if (patterns.length === 1) return eq(blogsTable.category, patterns[0]);
    return or(...patterns.map((p) => eq(blogsTable.category, p)));
  }
  return like(blogsTable.category, `%${categorySlug}%`);
}

export function createBlogsCategoryRouter(categorySlug: string): IRouter {
  const router: IRouter = Router();

  router.get("/", async (req, res): Promise<void> => {
    const { page = "1", limit = "12", search } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [buildCategoryCondition(categorySlug)];
    if (search) {
      conditions.push(sql`lower(${blogsTable.title}) like ${`%${search.toLowerCase()}%`}`);
    }

    const whereClause = and(...conditions);

    const [posts, countResult] = await Promise.all([
      db.select().from(blogsTable)
        .where(whereClause)
        .limit(limitNum)
        .offset(offset)
        .orderBy(sql`${blogsTable.createdAt} DESC`),
      db.select({ count: sql<number>`count(*)::int` }).from(blogsTable).where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;

    res.json({
      posts: posts.map(p => ({ ...p, tags: p.tags ?? [] })),
      category: categorySlug,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  return router;
}
