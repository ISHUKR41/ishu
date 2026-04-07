import { Router, type IRouter } from "express";
import { db, newsTable } from "@workspace/db";
import { sql, and, or } from "drizzle-orm";

const SLUG_TO_KEYWORDS: Record<string, string[]> = {
  upsc: ["upsc", "civil services", "ias ", "ips ", "ifs "],
  ssc: ["ssc", "cgl", "chsl", "mts", "gd constable"],
  banking: ["ibps", "sbi", "bank", "rbi", "nabard"],
  railway: ["railway", "rrb", "ntpc", "loco pilot", "group d"],
  scholarships: ["scholarship", "fellowship", "stipend", "merit list"],
  "admit-cards": ["admit card", "hall ticket", "call letter"],
};

function buildKeywordCondition(categorySlug: string) {
  const keywords = SLUG_TO_KEYWORDS[categorySlug] ?? [categorySlug];
  return or(
    ...keywords.map((kw) =>
      sql`lower(${newsTable.title}) like ${`%${kw.toLowerCase()}%`}`
    )
  );
}

export function createNewsCategoryRouter(categorySlug: string): IRouter {
  const router: IRouter = Router();

  router.get("/", async (req, res): Promise<void> => {
    const { page = "1", limit = "20", search } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [buildKeywordCondition(categorySlug)];
    if (search) {
      conditions.push(sql`lower(${newsTable.title}) like ${`%${search.toLowerCase()}%`}`);
    }

    const whereClause = and(...conditions);

    const [articles, countResult] = await Promise.all([
      db.select().from(newsTable)
        .where(whereClause)
        .limit(limitNum)
        .offset(offset)
        .orderBy(sql`${newsTable.createdAt} DESC`),
      db.select({ count: sql<number>`count(*)::int` }).from(newsTable).where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;

    res.json({
      articles: articles.map(a => ({ ...a, relatedNewsIds: a.relatedNewsIds ?? [] })),
      category: categorySlug,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  return router;
}
