// ============================================================================
// FILE: Home/StatsSection/Chart/backend/index.ts
// PURPOSE: Dedicated backend endpoint for chart data using REAL DB aggregates.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { count } from "drizzle-orm";
import { db } from "../../../../../../lib/db/src";
import { resultsTable } from "../../../../../../lib/db/src/schema";

const router: IRouter = Router();

/**
 * GET /api/modules/home/stats/chart
 * Returns grouped result counts by status for charts.
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const grouped = await db
      .select({ status: resultsTable.status, value: count() })
      .from(resultsTable)
      .groupBy(resultsTable.status);

    const data = grouped.map((item) => ({
      label: item.status ?? "unknown",
      value: item.value,
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching chart data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
