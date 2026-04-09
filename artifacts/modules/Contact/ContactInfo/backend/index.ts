// @ts-nocheck
// ============================================================================
// FILE: Contact/ContactInfo/backend/index.ts
// PURPOSE: Express router for contact info API. Mounted at /api/modules/contact/info.
// TECH: Express.js Router
// ISOLATION: Handles ONLY contact info data routes.
// ============================================================================

import { Router } from "express";
import { getContactInfo } from "./controller";

const infoRouter = Router();
infoRouter.get("/", getContactInfo);
export default infoRouter;
