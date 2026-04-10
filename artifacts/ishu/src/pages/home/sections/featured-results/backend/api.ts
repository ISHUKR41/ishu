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
 * Home Featured Results Section - Backend API Layer
 * Isolated API hooks for the featured results section.
 * Changes here do NOT affect any other section.
 */
export { useListResults } from "@workspace/api-client-react";

// Result status helpers
export const categoryColors: Record<string, { bg: string; text: string }> = {
  "upsc-civil-services": { bg: "rgba(59,130,246,0.12)", text: "#3b82f6" },
  "ssc-cgl": { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6" },
  "ssc-chsl": { bg: "rgba(124,58,237,0.12)", text: "#7c3aed" },
  "banking-ibps": { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
  "railway-rrb": { bg: "rgba(249,115,22,0.12)", text: "#f97316" },
  "army-defence": { bg: "rgba(239,68,68,0.12)", text: "#ef4444" },
  "jee-mains": { bg: "rgba(234,179,8,0.12)", text: "#ca8a04" },
  "neet-ug": { bg: "rgba(20,184,166,0.12)", text: "#0d9488" },
  "state-psc": { bg: "rgba(99,102,241,0.12)", text: "#6366f1" },
  police: { bg: "rgba(220,38,38,0.12)", text: "#dc2626" },
  "teaching-tet": { bg: "rgba(6,182,212,0.12)", text: "#0891b2" },
  "engineering-jobs": { bg: "rgba(132,204,22,0.12)", text: "#65a30d" },
  judiciary: { bg: "rgba(168,85,247,0.12)", text: "#9333ea" },
  nursing: { bg: "rgba(236,72,153,0.12)", text: "#db2777" },
  default: { bg: "rgba(99,102,241,0.12)", text: "#6366f1" },
};

export function getStatusStyle(status: string) {
  const s = (status ?? "").toLowerCase();
  if (s === "active") return { bg: "rgba(16,185,129,0.15)", text: "#059669", label: "Active" };
  if (s === "upcoming") return { bg: "rgba(59,130,246,0.15)", text: "#2563eb", label: "Upcoming" };
  if (s === "result") return { bg: "rgba(139,92,246,0.15)", text: "#7c3aed", label: "Result Out" };
  if (s === "expired") return { bg: "rgba(107,114,128,0.12)", text: "#6b7280", label: "Expired" };
  return { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))", label: status };
}
