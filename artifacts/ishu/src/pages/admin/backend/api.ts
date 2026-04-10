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
 * Admin Dashboard - Backend API Layer
 * Isolated API hooks for admin panel sections.
 * Changes here do NOT affect any other page.
 */

// Admin panel section definitions
export const adminSections = [
  { slug: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { slug: "results", label: "Results Manager", icon: "Trophy" },
  { slug: "news", label: "News Manager", icon: "Newspaper" },
  { slug: "tools", label: "Tools Manager", icon: "Wrench" },
  { slug: "blogs", label: "Blog Manager", icon: "BookOpen" },
  { slug: "resources", label: "Resources Manager", icon: "FolderOpen" },
  { slug: "users", label: "User Management", icon: "Users" },
  { slug: "notifications", label: "Notifications", icon: "Bell" },
  { slug: "analytics", label: "Analytics", icon: "BarChart3" },
  { slug: "settings", label: "Settings", icon: "Settings" },
] as const;

export type AdminSection = (typeof adminSections)[number]["slug"];
