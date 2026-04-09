// ============================================================================
// FILE: modules/Blog/_shared/constants.ts
// PURPOSE: Constants for the Blog module — 4 blog categories focused on
//          helping Indian students succeed in competitive exams.
// ============================================================================

import type { BlogCategory } from "./types";

export const BLOG_API = {
  BASE: "/api/blogs",
  LIST: "/api/blogs",
  DETAIL: (slug: string) => `/api/blogs/${slug}`,
  CATEGORY: (slug: string) => `/api/blogs/category/${slug}`,
} as const;

export const BLOG_PER_PAGE = 12;

/**
 * Blog Categories — focused on student success and exam preparation.
 */
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "exam-tips",
    name: "Exam Tips",
    slug: "exam-tips",
    description: "Expert tips, tricks, and strategies for cracking government competitive exams. Time management, answer-writing techniques, and preparation hacks.",
    icon: "Lightbulb",
    color: "from-amber-500 to-yellow-600",
    count: 0,
  },
  {
    id: "career-guidance",
    name: "Career Guidance",
    slug: "career-guidance",
    description: "Complete career guidance for students after 10th, 12th, graduation. Government job profiles, salary structures, promotion policies, and career paths.",
    icon: "Compass",
    color: "from-blue-500 to-indigo-600",
    count: 0,
  },
  {
    id: "success-stories",
    name: "Success Stories",
    slug: "success-stories",
    description: "Inspiring stories of students who cracked UPSC, SSC, Banking, Railway, and other competitive exams. Their preparation strategies and motivation.",
    icon: "Trophy",
    color: "from-emerald-500 to-green-600",
    count: 0,
  },
  {
    id: "study-strategies",
    name: "Study Strategies",
    slug: "study-strategies",
    description: "Science-backed study methods, revision techniques, and learning frameworks. Pomodoro, spaced repetition, active recall, and mind mapping guides.",
    icon: "Brain",
    color: "from-purple-500 to-violet-600",
    count: 0,
  },
];
