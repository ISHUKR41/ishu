/**
 * Home Hero Section - Backend API Layer
 * Isolated API hooks and data fetching for the hero section.
 * Changes here do NOT affect any other section.
 */
export { useGetResultStats, useListTools } from "@workspace/api-client-react";

// Re-export types used by the hero section
export type { ResultStats } from "@workspace/api-client-react";
