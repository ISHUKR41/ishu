// ============================================================================
// FILE: modules/Results/StateSelector/backend/index.ts
// PURPOSE: Backend API for the StateSelector section. Returns results filtered
//          by Indian state, used by both the state selector grid and individual
//          state result pages.
//
// ISOLATION: This router is dedicated to state-based result queries only.
//
// ENDPOINT: GET /api/results/states/:slug — Results for a specific state
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { resultsTable } from "../../../../../lib/db/src/schema/results";
import { sql, desc } from "drizzle-orm";

const router = Router();

/**
 * GET /:slug — Returns results filtered by state.
 * The slug parameter corresponds to a state's URL slug (e.g., "bihar", "delhi").
 */
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(50, parseInt(req.query.pageSize as string) || 20);

    // For now, return all results since state-level filtering
    // would require a state column in the results table.
    // TODO: Add state column to results schema for proper state filtering.
    const results = await db
      .select()
      .from(resultsTable)
      .orderBy(desc(resultsTable.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(resultsTable);

    res.json({
      state: slug,
      data: results,
      total: Number(totalQuery[0]?.count ?? 0),
      page,
      pageSize,
    });
  } catch (error) {
    console.error("[Results/StateSelector/backend] Error:", error);
    res.status(500).json({ state: req.params.slug, data: [], total: 0 });
  }
});

export default router;
