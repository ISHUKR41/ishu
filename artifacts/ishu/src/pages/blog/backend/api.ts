/**
 * Blog Page - Backend API Layer
 * Changes here do NOT affect any other page.
 */
export { useListBlogs } from "@workspace/api-client-react";

export const blogCategories = [
  { slug: "all", label: "All Posts", icon: "BookOpen" },
  { slug: "exam-tips", label: "Exam Tips", icon: "Lightbulb" },
  { slug: "career-guidance", label: "Career Guidance", icon: "Compass" },
  { slug: "success-stories", label: "Success Stories", icon: "Trophy" },
  { slug: "study-strategies", label: "Study Strategies", icon: "Brain" },
  { slug: "current-affairs", label: "Current Affairs", icon: "Globe" },
  { slug: "preparation-plans", label: "Preparation Plans", icon: "Calendar" },
  { slug: "book-reviews", label: "Book Reviews", icon: "Book" },
  { slug: "motivation", label: "Motivation", icon: "Flame" },
] as const;
