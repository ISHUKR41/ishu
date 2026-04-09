// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactInfo/backend/controller.ts
// PURPOSE: Returns real contact information data for the ContactInfo section.
// TECH: Express.js
// ISOLATION: Only serves contact info data routes.
// ============================================================================

import type { Request, Response } from "express";
import { CONTACT_INFO_CARDS } from "../../_shared/constants";

/** GET /api/modules/contact/info — Returns contact info cards data */
export async function getContactInfo(req: Request, res: Response) {
  try {
    res.json({ success: true, data: CONTACT_INFO_CARDS });
  } catch (error) {
    console.error("[Contact/Info] Error:", error);
    res.status(500).json({ success: false, message: "Failed to load contact info." });
  }
}
