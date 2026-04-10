// ============================================================================
// FILE: index.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import { Router, type IRouter } from "express";
import { db, newsTable, resultsTable, toolsTable } from "@workspace/db";
import { count, desc, eq } from "drizzle-orm";

const router: IRouter = Router();

const toCountNumber = (value: unknown): number => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};

// Backend for Home Hero Section
// Returns real-world notification ticker data and hero content.
router.get("/", async (_req, res): Promise<void> => {
  const [latestNews, totalNewsRows, totalToolsRows, activeResultsRows] = await Promise.all([
    db
      .select()
      .from(newsTable)
      .orderBy(desc(newsTable.id))
      .limit(3),
    db.select({ value: count() }).from(newsTable),
    db.select({ value: count() }).from(toolsTable),
    db
      .select({ value: count() })
      .from(resultsTable)
      .where(eq(resultsTable.status, "active")),
  ]);

  const totalNews = toCountNumber(totalNewsRows[0]?.value);
  const totalTools = toCountNumber(totalToolsRows[0]?.value);
  const activeResults = toCountNumber(activeResultsRows[0]?.value);

  const dynamicSubtitle =
    activeResults > 0 || totalTools > 0 || totalNews > 0
      ? `${activeResults}+ active exams, ${totalTools}+ tools, and ${totalNews}+ verified updates.`
      : "Real-time updates, verified results, and expert study materials.";

  const notifications = latestNews.map((item) => ({
    id: item.id,
    text: item.title,
    tag: item.isTrending ? "TRENDING" : "UPDATE",
    link: `/news/${item.id}`,
  }));

  res.json({
    title: "India's Premier Exam Prep Portal",
    subtitle: dynamicSubtitle,
    notifications,
  });
});

export default router;
