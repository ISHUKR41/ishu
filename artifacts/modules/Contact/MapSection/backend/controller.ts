// @ts-nocheck
// ============================================================================
// FILE: Contact/MapSection/backend/controller.ts
// PURPOSE: Returns geographic location data for the interactive map.
// TECH: Express.js
// ISOLATION: Only serves map location data.
// ============================================================================
import type { Request, Response } from "express";
import { MAP_LOCATIONS, MAP_CENTER, MAP_ZOOM } from "../../_shared/constants";

export async function getMapData(req: Request, res: Response) {
  try {
    res.json({ success: true, data: { center: MAP_CENTER, zoom: MAP_ZOOM, locations: MAP_LOCATIONS } });
  } catch (error) {
    console.error("[Contact/Map] Error:", error);
    res.status(500).json({ success: false, message: "Failed to load map data." });
  }
}
