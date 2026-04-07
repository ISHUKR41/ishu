/**
 * Results Filters Section - Backend API Layer
 * Changes here do NOT affect any other section.
 */
export { useListResults } from "@workspace/api-client-react";

export const resultFilterCategories = [
  { slug: "all", label: "All Results" },
  { slug: "upsc", label: "UPSC" },
  { slug: "ssc", label: "SSC" },
  { slug: "banking", label: "Banking" },
  { slug: "railway", label: "Railway" },
  { slug: "defence", label: "Defence" },
  { slug: "jee", label: "JEE" },
  { slug: "neet", label: "NEET" },
  { slug: "state-psc", label: "State PSC" },
  { slug: "teaching", label: "Teaching" },
  { slug: "police", label: "Police" },
  { slug: "engineering", label: "Engineering" },
  { slug: "judiciary", label: "Judiciary" },
] as const;

export const resultStatusFilters = [
  { slug: "all", label: "All Status" },
  { slug: "active", label: "Active" },
  { slug: "upcoming", label: "Upcoming" },
  { slug: "result", label: "Result Out" },
  { slug: "expired", label: "Expired" },
] as const;
