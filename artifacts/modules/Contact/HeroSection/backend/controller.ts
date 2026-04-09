// @ts-nocheck
// ============================================================================
// FILE: Contact/HeroSection/backend/controller.ts
// PURPOSE: Business logic controller for the Contact hero section.
//          Returns the hero section data (headline, stats) from the server.
//          In production, this could be connected to a CMS or database
//          so that marketing can update hero copy without code deployments.
// TECH: Express.js, TypeScript
// ISOLATION: This controller is ONLY mounted under /api/modules/contact/hero.
// ============================================================================

import type { Request, Response } from "express";
import { HERO_DATA } from "../../_shared/constants";

/**
 * GET /api/modules/contact/hero
 *
 * Returns the hero section data for the Contact page.
 * Currently serves data from the constants file, but this
 * architecture makes it trivial to swap to a database source later.
 */
export async function getHeroData(req: Request, res: Response) {
  try {
    // Return the real hero data from our constants module
    // In the future, this could query a CMS or database table
    res.json({
      success: true,
      data: HERO_DATA,
    });
  } catch (error) {
    // Log the error for debugging (Pino logger would catch this in production)
    console.error("[Contact/HeroSection] Failed to fetch hero data:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load hero section data. Please try again.",
    });
  }
}
