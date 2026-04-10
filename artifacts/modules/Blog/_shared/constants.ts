export const MODULE_NAME = "Blog";

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "1", name: "Preparation Strategy", slug: "preparation", icon: "BookOpen", color: "from-blue-500 to-cyan-500" },
  { id: "2", name: "Topper Interviews", slug: "interviews", icon: "Award", color: "from-amber-500 to-orange-500" },
  { id: "3", name: "Career Guidance", slug: "career", icon: "Compass", color: "from-purple-500 to-pink-500" },
  { id: "4", name: "Syllabus Breakdown", slug: "syllabus", icon: "FileText", color: "from-emerald-500 to-teal-500" },
];

export const BLOG_PER_PAGE = 9;
