// @ts-nocheck
// ============================================================================
// FILE: Contact/HeroSection/backend/index.ts
// PURPOSE: Express router for the Contact hero section backend API.
//          This router is mounted at /api/modules/contact/hero in the
//          main API server. It provides a single GET endpoint that returns
//          the hero section's dynamic content (headline, stats, etc.)
// TECH: Express.js Router
// ISOLATION: This router handles ONLY hero-related endpoints.
//            It is completely independent of other Contact section routers.
// ============================================================================

import { Router } from "express";
import { getHeroData } from "./controller";

// Create a new Express router instance for this section
const heroRouter = Router();

// ---------------------------------------------------------------------------
// Route: GET /api/modules/contact/hero
// Description: Returns the hero section data (headline, subheadline, stats)
// Response: { success: boolean, data: ContactHeroData }
// ---------------------------------------------------------------------------
heroRouter.get("/", getHeroData);

// Export the router for mounting in the main API server
export default heroRouter;
