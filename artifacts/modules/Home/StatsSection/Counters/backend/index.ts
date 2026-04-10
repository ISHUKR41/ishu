// ============================================================================
// FILE: Home/StatsSection/Counters/backend/index.ts
// PURPOSE: Dedicated backend endpoint for stats counters using REAL DB data.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { count } from "drizzle-orm";
import { db } from "../../../../../../lib/db/src";
import {
  blogsTable,
  newsTable,
  resultsTable,
  toolsTable,
} from "../../../../../../lib/db/src/schema";

const router: IRouter = Router();

/**
 * GET /api/modules/home/stats/counters
 * Returns real aggregate counts for homepage counters.
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [resultsCountRow, newsCountRow, toolsCountRow, blogsCountRow] =
      await Promise.all([
        db.select({ value: count() }).from(resultsTable),
        db.select({ value: count() }).from(newsTable),
        db.select({ value: count() }).from(toolsTable),
        db.select({ value: count() }).from(blogsTable),
      ]);

    const counters = [
      {
        id: "results",
        label: "Results Published",
        value: resultsCountRow[0]?.value ?? 0,
        suffix: "+",
      },
      {
        id: "news",
        label: "News Articles",
        value: newsCountRow[0]?.value ?? 0,
        suffix: "+",
      },
      {
        id: "tools",
        label: "Live Tools",
        value: toolsCountRow[0]?.value ?? 0,
        suffix: "+",
      },
      {
        id: "blogs",
        label: "Guides & Blogs",
        value: blogsCountRow[0]?.value ?? 0,
        suffix: "+",
      },
    ];

    res.json({ success: true, data: counters });
  } catch (err) {
    console.error("Error fetching counters data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
