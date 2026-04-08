/**
 * Blog Page - Backend API Layer
 * Shared backend utilities for the blog page and its sections.
 * Changes here do NOT affect any other page.
 */
export { useListBlogs, useListBlogCategories } from "@workspace/api-client-react";

/**
 * Blog category filter options used across the blog page sections.
 * Each category has a slug for URL routing, a human-readable label,
 * and an icon name referencing the centralized icon system.
 */
export const blogCategories = [
  { slug: "all", label: "All Posts", icon: "List" },
  { slug: "career-guidance", label: "Career Guidance", icon: "Briefcase" },
  { slug: "exam-tips", label: "Exam Tips", icon: "Academic" },
  { slug: "study-strategies", label: "Study Strategies", icon: "BookOpen" },
  { slug: "success-stories", label: "Success Stories", icon: "Trophy" },
] as const;
