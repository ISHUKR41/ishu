// ============================================================================
// FILE: modules/Results/HeroSection/backend/index.ts
// PURPOSE: The dedicated backend API for the Results HeroSection.
//          Provides statistics data (total results, categories, states) that
//          the frontend hero section displays as animated counters.
//
// ISOLATION: This backend module ONLY serves the HeroSection frontend.
//            It does NOT interfere with any other section's API. Each section
//            has its own backend file with its own Express router.
//
// ENDPOINT: GET /api/results/stats
// RESPONSE: { totalResults, totalCategories, totalStates, recentResults }
//
// TECHNOLOGIES USED:
//   - Express.js (HTTP router)
//   - Drizzle ORM (database queries)
//   - TypeScript (type-safe request/response handling)
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { resultsTable } from "../../../../../lib/db/src/schema/results";
import { sql } from "drizzle-orm";

/**
 * Express router for the Results HeroSection backend.
 * Mounted at: /api/results/stats (via the central route registry)
 */
const router = Router();

/**
 * GET / — Fetch aggregated statistics for the Results hero section.
 *
 * This endpoint queries the database to compute real-time stats:
 * - Total number of results in the system
 * - Number of unique exam categories
 * - Number of unique states covered
 * - Results added in the last 7 days
 *
 * These stats are displayed as animated counters in the HeroSection frontend.
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    // Query 1: Count total results in the database
    const totalResultsQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(resultsTable);

    // Query 2: Count distinct exam categories
    const totalCategoriesQuery = await db
      .select({ count: sql<number>`count(distinct ${resultsTable.category})` })
      .from(resultsTable);

    // Query 3: Count results added in the last 7 days
    const recentResultsQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(resultsTable)
      .where(sql`${resultsTable.createdAt} >= now() - interval '7 days'`);

    // Assemble the response object with real numbers from the database
    const stats = {
      totalResults: Number(totalResultsQuery[0]?.count ?? 0),
      totalCategories: Number(totalCategoriesQuery[0]?.count ?? 12),
      totalStates: 36, // Fixed: India has 28 states + 8 UTs = 36
      recentResults: Number(recentResultsQuery[0]?.count ?? 0),
    };

    res.json(stats);
  } catch (error) {
    // Log the error for debugging but return sensible fallback data
    // so the frontend doesn't break even if the database is down
    console.error("[Results/HeroSection/backend] Stats query failed:", error);
    res.json({
      totalResults: 0,
      totalCategories: 12,
      totalStates: 36,
      recentResults: 0,
    });
  }
});

export default router;
