// @ts-nocheck
// ============================================================================
// FILE: Contact/MapSection/backend/index.ts
// PURPOSE: Express router for map data. Mounted at /api/modules/contact/map.
// TECH: Express.js Router
// ISOLATION: Handles ONLY map data routes.
// ============================================================================
import { Router } from "express";
import { getMapData } from "./controller";
const mapRouter = Router();
mapRouter.get("/", getMapData);
export default mapRouter;
