// ============================================================================
// FILE: modules/News/_shared/constants.ts
// PURPOSE: Constants for the News module — all 30 news categories covering
//          government exams, education, technology, and more. These are REAL
//          news categories that Indian students and aspirants follow.
//
// ARCHITECTURE: Imported by all News sections for consistent category data.
// ============================================================================

import type { NewsCategory } from "./types";

export const NEWS_API = {
  BASE: "/api/news",
  LIST: "/api/news",
  DETAIL: (slug: string) => `/api/news/${slug}`,
  CATEGORY: (slug: string) => `/api/news/category/${slug}`,
  BREAKING: "/api/news/breaking",
  TRENDING: "/api/news/trending",
} as const;

export const NEWS_PER_PAGE = 15;

/**
 * All 30 News Categories — covering every major area that Indian students
 * and government job aspirants need to stay updated on.
 */
export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "upsc", name: "UPSC", slug: "upsc", description: "UPSC exam notifications, schedule changes, syllabus updates, and official announcements.", icon: "Landmark", color: "from-amber-500 to-orange-600", count: 0 },
  { id: "ssc", name: "SSC", slug: "ssc", description: "SSC CGL, CHSL, MTS, GD exam notifications and recruitment updates.", icon: "FileText", color: "from-blue-500 to-cyan-600", count: 0 },
  { id: "banking", name: "Banking", slug: "banking", description: "IBPS, SBI, RBI banking exam notifications and recruitment news.", icon: "Building2", color: "from-emerald-500 to-teal-600", count: 0 },
  { id: "railway", name: "Railway", slug: "railway", description: "RRB NTPC, Group D, ALP recruitment and railway exam updates.", icon: "Train", color: "from-red-500 to-rose-600", count: 0 },
  { id: "jee", name: "JEE", slug: "jee", description: "JEE Main & Advanced exam dates, cutoff predictions, and NTA updates.", icon: "GraduationCap", color: "from-violet-500 to-purple-600", count: 0 },
  { id: "neet", name: "NEET", slug: "neet", description: "NEET UG & PG exam updates, NMC regulations, and medical admissions news.", icon: "Stethoscope", color: "from-green-500 to-emerald-600", count: 0 },
  { id: "defence", name: "Defence", slug: "defence", description: "NDA, CDS, AFCAT, military recruitment and defence exam updates.", icon: "Shield", color: "from-slate-500 to-zinc-600", count: 0 },
  { id: "police", name: "Police", slug: "police", description: "State police SI/Constable, CAPF, and paramilitary recruitment news.", icon: "BadgeCheck", color: "from-sky-500 to-blue-600", count: 0 },
  { id: "scholarships", name: "Scholarships", slug: "scholarships", description: "Central and state government scholarships for students across India.", icon: "Award", color: "from-yellow-500 to-amber-600", count: 0 },
  { id: "admit-cards", name: "Admit Cards", slug: "admit-cards", description: "Download links and release dates for government exam admit cards.", icon: "CreditCard", color: "from-indigo-500 to-violet-600", count: 0 },
  { id: "education", name: "Education", slug: "education", description: "Higher education policy, NEP updates, university news, and academic developments.", icon: "BookOpen", color: "from-teal-500 to-cyan-600", count: 0 },
  { id: "technology", name: "Technology", slug: "technology", description: "EdTech innovations, digital learning tools, and technology in education.", icon: "Monitor", color: "from-blue-600 to-indigo-700", count: 0 },
  { id: "science", name: "Science", slug: "science", description: "Scientific discoveries, ISRO updates, and research breakthroughs in India.", icon: "Atom", color: "from-purple-500 to-pink-600", count: 0 },
  { id: "teaching", name: "Teaching", slug: "teaching", description: "CTET, State TET, UGC NET results and teaching recruitment updates.", icon: "Users", color: "from-yellow-400 to-orange-500", count: 0 },
  { id: "medical", name: "Medical", slug: "medical", description: "Medical education policies, AIIMS updates, and healthcare recruitment.", icon: "Heart", color: "from-rose-500 to-red-600", count: 0 },
  { id: "engineering", name: "Engineering", slug: "engineering", description: "GATE, ESE/IES, and engineering recruitment across PSUs and government.", icon: "Cog", color: "from-orange-500 to-red-600", count: 0 },
  { id: "results-news", name: "Results", slug: "results-news", description: "Latest exam result announcements and score card release updates.", icon: "ListChecks", color: "from-emerald-400 to-green-600", count: 0 },
  { id: "politics", name: "Politics", slug: "politics", description: "Government policy changes affecting education and recruitment.", icon: "Building", color: "from-zinc-500 to-slate-600", count: 0 },
  { id: "sports", name: "Sports", slug: "sports", description: "Sports quota recruitment, SAI updates, and sports in education.", icon: "Trophy", color: "from-amber-400 to-yellow-600", count: 0 },
  { id: "business", name: "Business", slug: "business", description: "Economic policy, employment trends, and business education news.", icon: "Briefcase", color: "from-green-600 to-teal-700", count: 0 },
  { id: "health", name: "Health", slug: "health", description: "Public health policies, wellness in education, and student health.", icon: "HeartPulse", color: "from-pink-500 to-rose-600", count: 0 },
  { id: "international", name: "International", slug: "international", description: "Global education trends, study abroad updates, and international exams.", icon: "Globe", color: "from-cyan-500 to-blue-600", count: 0 },
  { id: "national", name: "National", slug: "national", description: "National-level education and policy news affecting students across India.", icon: "Flag", color: "from-orange-400 to-amber-500", count: 0 },
  { id: "state", name: "State", slug: "state", description: "State-level education policies, board exam updates, and local news.", icon: "MapPin", color: "from-indigo-400 to-blue-500", count: 0 },
  { id: "agriculture", name: "Agriculture", slug: "agriculture", description: "ICAR, agricultural university, and farming sector recruitment news.", icon: "Leaf", color: "from-green-500 to-lime-600", count: 0 },
  { id: "environment", name: "Environment", slug: "environment", description: "Environmental science, forest service, and sustainability education news.", icon: "TreePine", color: "from-emerald-600 to-green-700", count: 0 },
  { id: "legal", name: "Legal", slug: "legal", description: "Judiciary exam updates, CLAT news, and legal education developments.", icon: "Scale", color: "from-fuchsia-500 to-purple-600", count: 0 },
  { id: "innovation", name: "Innovation", slug: "innovation", description: "Startup India, innovation in education, and emerging technology trends.", icon: "Lightbulb", color: "from-yellow-400 to-orange-500", count: 0 },
  { id: "startups", name: "Startups", slug: "startups", description: "EdTech startups, student entrepreneurship, and startup ecosystem news.", icon: "Rocket", color: "from-violet-500 to-indigo-600", count: 0 },
  { id: "govt-schemes", name: "Govt Schemes", slug: "govt-schemes", description: "Government schemes for students — Mudra, Startup India, skill development.", icon: "Banknote", color: "from-teal-400 to-emerald-500", count: 0 },
];
