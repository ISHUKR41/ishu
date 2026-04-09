// @ts-nocheck
import { Router, type IRouter } from "express";
import { db, toolsTable } from "@workspace/db";
import { eq, sql, and, or, like } from "drizzle-orm";

const SLUG_TO_CATEGORY_PATTERNS: Record<string, string[]> = {
  pdf: ["pdf-operations", "pdf-editing", "pdf-conversion", "pdf-security"],
  ai: ["ai-tools"],
  image: ["image-tools"],
  text: ["utility"],
  conversion: ["pdf-conversion", "image-tools"],
};

function buildCategoryCondition(categorySlug: string) {
  const cats = SLUG_TO_CATEGORY_PATTERNS[categorySlug];
  if (cats && cats.length > 0) {
    if (cats.length === 1) return eq(toolsTable.category, cats[0]);
    return or(...cats.map((c) => eq(toolsTable.category, c)));
  }
  return like(toolsTable.category, `%${categorySlug}%`);
}

export function createToolsCategoryRouter(categorySlug: string): IRouter {
  const router: IRouter = Router();

  router.get("/", async (req, res): Promise<void> => {
    const { page = "1", limit = "20", search } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [buildCategoryCondition(categorySlug)];
    if (search) {
      conditions.push(sql`lower(${toolsTable.name}) like ${`%${search.toLowerCase()}%`}`);
    }

    const whereClause = and(...conditions);

    const [tools, countResult] = await Promise.all([
      db.select().from(toolsTable)
        .where(whereClause)
        .limit(limitNum)
        .offset(offset)
        .orderBy(toolsTable.name),
      db.select({ count: sql<number>`count(*)::int` }).from(toolsTable).where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;

    res.json({
      tools,
      category: categorySlug,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  return router;
}
