// ============================================================================
// FILE: _shared.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for _shared.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
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
  education: ["education", "school", "college", "university", "exam", "board"],
  technology: ["technology", "tech", "digital", "software", "ai ", "computer"],
  science: ["science", "research", "isro", "space", "physics", "chemistry"],
  engineering: ["engineering", "gate", "ese", "bsnl", "isro", "drdo", "technical"],
  "results-news": ["result", "merit list", "cutoff", "scorecard", "marks"],
  teaching: ["teaching", "ctet", "tet", "ugc net", "csir net", "teacher", "education board"],
  medical: ["medical", "neet", "aiims", "nursing", "health", "doctor", "mbbs"],
  politics: ["politics", "election", "parliament", "government", "ministry", "lok sabha"],
  sports: ["sports", "cricket", "olympics", "football", "hockey", "ipl"],
  business: ["business", "economy", "market", "trade", "gdp", "rbi", "budget"],
  health: ["health", "covid", "pandemic", "vaccine", "medicine", "hospital"],
  international: ["international", "global", "world", "foreign", "un ", "g20"],
  national: ["national", "india", "central", "union", "delhi", "modi"],
  state: ["state", "cm ", "governor", "assembly", "municipal"],
  agriculture: ["agriculture", "farming", "crop", "msp", "kisan", "rural"],
  environment: ["environment", "climate", "pollution", "green", "forest", "wildlife"],
  legal: ["legal", "court", "supreme court", "high court", "judiciary", "law"],
  innovation: ["innovation", "startup", "inventor", "patent", "research"],
  startups: ["startup", "unicorn", "funding", "venture", "entrepreneur"],
  "govt-schemes": ["scheme", "yojana", "pradhan mantri", "subsidy", "welfare"],
  jee: ["jee", "jee main", "jee advanced", "iit ", "nit ", "engineering entrance"],
  neet: ["neet", "medical entrance", "neet ug", "neet pg", "aiims"],
  defence: ["defence", "nda", "cds", "afcat", "army", "navy", "air force"],
  police: ["police", "constable", "si ", "crpf", "bsf", "cisf", "itbp", "ssb"],
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
