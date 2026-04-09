// @ts-nocheck
// ============================================================================
// FILE: NotFound/backend/index.ts
// PURPOSE: Express 404 handler. Catches all unmatched routes and returns
//          a proper 404 JSON response for API requests.
// TECH: Express.js
// ISOLATION: Global 404 handler — does not interfere with any specific route.
// ============================================================================

import { Router } from "express";
import type { Request, Response } from "express";

const notFoundRouter = Router();

/**
 * Catch-all 404 handler for API routes.
 * This is mounted LAST in the Express middleware chain.
 * If no other route matches, this sends a 404 JSON response.
 */
notFoundRouter.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    statusCode: 404,
  });
});

export default notFoundRouter;
