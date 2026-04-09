// ============================================================================
// FILE: modules/Tools/HeroSection/backend/index.ts
// PURPOSE: Backend API for Tools HeroSection — tool stats and metadata.
// ENDPOINT: GET /api/tools/hero-stats
// ============================================================================

import { Router, type Request, type Response } from "express";
import { db } from "../../../../../lib/db/src";
import { toolsTable } from "../../../../../lib/db/src/schema/tools";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const totalQuery = await db.select({ count: sql<number>`count(*)` }).from(toolsTable);
    res.json({ totalTools: Number(totalQuery[0]?.count ?? 0) });
  } catch (error) {
    console.error("[Tools/HeroSection/backend] Error:", error);
    res.json({ totalTools: 0 });
  }
});

export default router;
