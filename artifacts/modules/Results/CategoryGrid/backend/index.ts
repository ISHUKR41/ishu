// ============================================================================
// FILE: modules/Results/CategoryGrid/backend/index.ts
// PURPOSE: Backend API for the CategoryGrid section. Returns the list of
//          exam categories with their real result counts from the database.
//
// ISOLATION: This router is exclusively used by the CategoryGrid frontend.
//            It has its own Express router instance and does not share any
//            state or middleware with other backend modules.
//
// ENDPOINT: GET /api/results/categories
// RESPONSE: Array of { slug, name, count } objects
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { resultsTable } from "../../../../../lib/db/src/schema/results";
import { sql } from "drizzle-orm";

const router = Router();

/**
 * GET / — Returns all exam categories with their result counts.
 * The frontend uses this to display accurate numbers on each category card.
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    // Query the database to count results per exam category
    const categoryCounts = await db
      .select({
        examCategory: resultsTable.category,
        count: sql<number>`count(*)`,
      })
      .from(resultsTable)
      .groupBy(resultsTable.category);

    // Return the raw category counts
    res.json(categoryCounts);
  } catch (error) {
    console.error("[Results/CategoryGrid/backend] Error:", error);
    res.json([]);
  }
});

export default router;
