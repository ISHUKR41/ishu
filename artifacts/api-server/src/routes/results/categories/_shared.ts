import { Router, type IRouter } from "express";
import { db, resultsTable } from "@workspace/db";
import { eq, sql, and, or, like } from "drizzle-orm";

const SLUG_TO_CATEGORY_PREFIX: Record<string, string[]> = {
  upsc: ["upsc"],
  ssc: ["ssc"],
  banking: ["banking"],
  railway: ["railway"],
  defence: ["army-defence"],
  jee: ["jee"],
  neet: ["neet"],
  "state-psc": ["state-psc"],
  teaching: ["teaching"],
  police: ["police"],
  engineering: ["engineering"],
  judiciary: ["judiciary"],
  nursing: ["nursing"],
};

function buildCategoryCondition(categorySlug: string) {
  const prefixes = SLUG_TO_CATEGORY_PREFIX[categorySlug] ?? [categorySlug];
  if (prefixes.length === 1) {
    return like(resultsTable.category, `${prefixes[0]}%`);
  }
  return or(...prefixes.map((p) => like(resultsTable.category, `${p}%`)));
}

export function createCategoryRouter(categorySlug: string): IRouter {
  const router: IRouter = Router();

  router.get("/", async (req, res): Promise<void> => {
    const { state, status, page = "1", limit = "20", search } = req.query as Record<string, string>;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [buildCategoryCondition(categorySlug)];
    if (state) conditions.push(eq(resultsTable.state, state));
    if (status) conditions.push(eq(resultsTable.status, status));
    if (search) {
      const q = `%${search.toLowerCase()}%`;
      conditions.push(sql`lower(${resultsTable.title}) like ${q}`);
    }

    const whereClause = and(...conditions);

    const [results, countResult] = await Promise.all([
      db.select().from(resultsTable)
        .where(whereClause)
        .limit(limitNum)
        .offset(offset)
        .orderBy(sql`${resultsTable.createdAt} DESC`),
      db.select({ count: sql<number>`count(*)::int` }).from(resultsTable).where(whereClause),
    ]);

    const total = countResult[0]?.count ?? 0;

    res.json({
      results: results.map(r => ({ ...r, requiredDocuments: r.requiredDocuments ?? [] })),
      category: categorySlug,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  });

  router.get("/stats", async (_req, res): Promise<void> => {
    const catCond = buildCategoryCondition(categorySlug);

    const [active, upcoming, expired] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(resultsTable)
        .where(and(catCond, eq(resultsTable.status, "active"))),
      db.select({ count: sql<number>`count(*)::int` }).from(resultsTable)
        .where(and(catCond, eq(resultsTable.status, "upcoming"))),
      db.select({ count: sql<number>`count(*)::int` }).from(resultsTable)
        .where(and(catCond, eq(resultsTable.status, "expired"))),
    ]);

    res.json({
      category: categorySlug,
      totalActive: active[0]?.count ?? 0,
      totalUpcoming: upcoming[0]?.count ?? 0,
      totalExpired: expired[0]?.count ?? 0,
    });
  });

  return router;
}
