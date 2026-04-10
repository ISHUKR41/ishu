// ============================================================================
// FILE: api.ts
// MODULE: Core
// PURPOSE: This file provides the implementation for api.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

/**
 * Home Testimonials Section - Backend API Layer
 * Local typings only for the testimonials section.
 *
 * NOTE: Real cards are fetched from GET /api/home/sections/testimonials.
 * This file intentionally keeps no local/fallback demo array.
 * Changes here do NOT affect any other section.
 */

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating?: number;
  avatar: string;
  color: string;
}
