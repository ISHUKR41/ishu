// ============================================================================
// FILE: Home/FeaturedResults/Detail/backend/index.ts
// PURPOSE: Dedicated backend endpoint for a single featured result detail.
// ============================================================================

import { Router, type IRouter, Request, Response } from "express";
import { desc, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db/src";
import { resultsTable } from "../../../../../../lib/db/src/schema";

const router: IRouter = Router();

/**
 * GET /api/modules/home/featured-results/detail?id=123
 * If id is not provided, returns the latest published result row.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const requestedId = Number(req.query.id);
    const hasValidId = Number.isFinite(requestedId) && requestedId > 0;

    if (hasValidId) {
      const row = await db
        .select()
        .from(resultsTable)
        .where(eq(resultsTable.id, requestedId))
        .limit(1);

      if (!row[0]) {
        res.status(404).json({ error: "Result not found" });
        return;
      }

      res.json({ success: true, data: row[0] });
      return;
    }

    const latest = await db
      .select()
      .from(resultsTable)
      .orderBy(desc(resultsTable.createdAt))
      .limit(1);

    res.json({ success: true, data: latest[0] ?? null });
  } catch (err) {
    console.error("Error fetching featured result detail:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
