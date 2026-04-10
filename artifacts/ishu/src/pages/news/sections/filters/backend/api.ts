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
 * News Filters Section - Backend API Layer
 * All 30 news filter categories as specified in the text file.
 * Changes here do NOT affect any other section.
 */

export const newsFilterCategories = [
  { slug: "all", label: "All News", icon: "Newspaper" },
  { slug: "education", label: "Education", icon: "GraduationCap" },
  { slug: "technology", label: "Technology", icon: "Cpu" },
  { slug: "science", label: "Science", icon: "Atom" },
  { slug: "upsc", label: "UPSC", icon: "Shield" },
  { slug: "ssc", label: "SSC", icon: "FileText" },
  { slug: "banking", label: "Banking", icon: "Building2" },
  { slug: "railway", label: "Railway", icon: "Train" },
  { slug: "defence", label: "Defence", icon: "Target" },
  { slug: "jee", label: "JEE", icon: "Calculator" },
  { slug: "neet", label: "NEET", icon: "HeartPulse" },
  { slug: "scholarships", label: "Scholarships", icon: "Award" },
  { slug: "admit-cards", label: "Admit Cards", icon: "CreditCard" },
  { slug: "results-news", label: "Results", icon: "Trophy" },
  { slug: "engineering", label: "Engineering", icon: "Wrench" },
  { slug: "teaching", label: "Teaching", icon: "BookOpen" },
  { slug: "medical", label: "Medical", icon: "Stethoscope" },
  { slug: "politics", label: "Politics", icon: "Vote" },
  { slug: "sports", label: "Sports", icon: "Trophy" },
  { slug: "business", label: "Business", icon: "Briefcase" },
  { slug: "health", label: "Health", icon: "Heart" },
  { slug: "international", label: "International", icon: "Globe" },
  { slug: "national", label: "National", icon: "Flag" },
  { slug: "state", label: "State News", icon: "MapPin" },
  { slug: "agriculture", label: "Agriculture", icon: "Leaf" },
  { slug: "environment", label: "Environment", icon: "TreePine" },
  { slug: "legal", label: "Legal", icon: "Scale" },
  { slug: "innovation", label: "Innovation", icon: "Lightbulb" },
  { slug: "startups", label: "Startups", icon: "Rocket" },
  { slug: "govt-schemes", label: "Govt Schemes", icon: "FileCheck" },
] as const;

export type NewsCategory = (typeof newsFilterCategories)[number]["slug"];
