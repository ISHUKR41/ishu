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
  rating: number;
  avatar: string;
  color: string;
}
