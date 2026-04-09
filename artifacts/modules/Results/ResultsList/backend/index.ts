// ============================================================================
// FILE: modules/Results/ResultsList/backend/index.ts
// PURPOSE: Backend API for the paginated results listing. Supports filtering
//          by category, state, search query, and sorting. Returns paginated
//          results with total count for frontend pagination controls.
//
// ISOLATION: This router ONLY serves the ResultsList frontend section.
//            Each section has its own router with zero shared state.
//
// ENDPOINTS:
//   GET /api/results       — Paginated listing with filters
//   GET /api/results/:slug — Single result by slug
//
// QUERY PARAMS:
//   - page (number): Current page number, default 1
//   - pageSize (number): Results per page, default 20
//   - category (string): Filter by exam category slug
//   - search (string): Free-text search in title and examName
//   - sortBy (string): "latest" | "oldest" | "name"
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { resultsTable } from "../../../../../lib/db/src/schema/results";
import { desc, asc, sql, eq, ilike, and } from "drizzle-orm";

const router = Router();

/**
 * GET / — Returns a paginated list of results with optional filters.
 *
 * This is the main endpoint used by the ResultsList frontend component.
 * It supports pagination, category filtering, text search, and sorting.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    // Parse query parameters with safe defaults
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize as string) || 20));
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const sortBy = (req.query.sortBy as string) || "latest";

    // Build WHERE conditions dynamically based on filters
    const conditions = [];

    // Filter by category if provided (uses `category` column from schema)
    if (category) {
      conditions.push(eq(resultsTable.category, category));
    }

    // Search in title if search query provided
    if (search) {
      conditions.push(ilike(resultsTable.title, `%${search}%`));
    }

    // Determine the WHERE clause (combine conditions with AND)
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Determine sort order
    const orderClause =
      sortBy === "oldest"
        ? asc(resultsTable.createdAt)
        : sortBy === "name"
        ? asc(resultsTable.title)
        : desc(resultsTable.createdAt); // Default: latest first

    // Query 1: Get total count for pagination
    const totalQuery = await db
      .select({ count: sql<number>`count(*)` })
      .from(resultsTable)
      .where(whereClause);

    const total = Number(totalQuery[0]?.count ?? 0);
    const totalPages = Math.ceil(total / pageSize);

    // Query 2: Get paginated results
    const results = await db
      .select()
      .from(resultsTable)
      .where(whereClause)
      .orderBy(orderClause)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    // Return the paginated response
    res.json({
      data: results,
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error("[Results/ResultsList/backend] Error:", error);
    res.status(500).json({
      data: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0,
    });
  }
});

/**
 * GET /:id — Returns a single result by its ID.
 * Used by the Result Detail page to show full information about one result.
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id));
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid result ID" });
      return;
    }

    const result = await db
      .select()
      .from(resultsTable)
      .where(eq(resultsTable.id, id))
      .limit(1);

    if (result.length === 0) {
      res.status(404).json({ error: "Result not found" });
      return;
    }

    res.json(result[0]);
  } catch (error) {
    console.error("[Results/ResultsList/backend] Detail error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
