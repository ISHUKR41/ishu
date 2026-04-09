// ============================================================================
// FILE: modules/Results/_shared/constants.ts
// PURPOSE: This file contains ALL constant data used across the Results module.
//          It defines the complete list of exam categories, all 36 Indian states
//          and Union Territories, color palettes, and API endpoint paths.
//
// WHY HERE: Constants are placed in `_shared/` so every section (HeroSection,
//           CategoryGrid, StateSelector, etc.) can import them without
//           duplicating data. This ensures consistency and makes updates easy.
//
// REAL DATA: Every category and state listed here is a real Indian governmental
//            examination body or administrative division. No fake data.
// ============================================================================

import type { ResultCategory, IndianState } from "./types";

// ============================================================================
// SECTION 1: API ENDPOINT PATHS
// All backend API routes for the Results module. Each section uses its own
// dedicated endpoint to maintain strict frontend/backend isolation.
// ============================================================================

export const RESULTS_API = {
  /** Base path for all results API endpoints */
  BASE: "/api/results",
  /** Hero section stats endpoint */
  HERO_STATS: "/api/home/sections/results-hero",
  /** Filtered results listing with pagination */
  LIST: "/api/results",
  /** Single result detail by ID */
  DETAIL: (id: string) => `/api/results/${id}`,
  /** Category-specific results */
  CATEGORY: (slug: string) => `/api/results/category/${slug}`,
  /** State-specific results */
  STATE: (slug: string) => `/api/results/states/${slug}`,
  /** Search/filter endpoint */
  SEARCH: "/api/results/search",
  /** Stats for the hero section */
  STATS: "/api/results/stats",
} as const;

// ============================================================================
// SECTION 2: EXAM CATEGORIES — ALL REAL INDIAN EXAM BODIES
// These are the actual categories of government examinations in India.
// Each one maps to a dedicated page with its own frontend/backend module.
// ============================================================================

export const RESULT_CATEGORIES: ResultCategory[] = [
  {
    id: "upsc",
    name: "UPSC",
    fullName: "Union Public Service Commission",
    slug: "upsc",
    description: "Civil Services (IAS/IPS/IFS), CDS, NDA, CAPF, Indian Forest Service, Engineering Services, and other central government examinations.",
    icon: "Landmark",
    color: "from-amber-500 to-orange-600",
    count: 0,
  },
  {
    id: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission",
    slug: "ssc",
    description: "CGL, CHSL, MTS, GD Constable, Stenographer, JE, and other Group B & C examinations under the central government.",
    icon: "FileText",
    color: "from-blue-500 to-cyan-600",
    count: 0,
  },
  {
    id: "banking",
    name: "Banking",
    fullName: "Banking & Insurance Exams (IBPS/RBI/SBI)",
    slug: "banking",
    description: "IBPS PO/Clerk/SO, SBI PO/Clerk, RBI Grade B/Assistant, NABARD, SIDBI, LIC AAO, NIACL, and other banking sector exams.",
    icon: "Building2",
    color: "from-emerald-500 to-teal-600",
    count: 0,
  },
  {
    id: "railway",
    name: "Railway",
    fullName: "Railway Recruitment Board (RRB)",
    slug: "railway",
    description: "RRB NTPC, Group D, ALP/Technician, JE, Paramedical, Ministerial, and other Indian Railways recruitment exams.",
    icon: "Train",
    color: "from-red-500 to-rose-600",
    count: 0,
  },
  {
    id: "defence",
    name: "Defence",
    fullName: "Defence Services Examinations",
    slug: "defence",
    description: "NDA, CDS, AFCAT, Indian Army TGC/TES, Indian Navy, Indian Air Force, Coast Guard, and other defence recruitment.",
    icon: "Shield",
    color: "from-slate-500 to-zinc-600",
    count: 0,
  },
  {
    id: "jee",
    name: "JEE",
    fullName: "Joint Entrance Examination",
    slug: "jee",
    description: "JEE Main, JEE Advanced for admission to IITs, NITs, IIITs, and other centrally funded technical institutions.",
    icon: "GraduationCap",
    color: "from-violet-500 to-purple-600",
    count: 0,
  },
  {
    id: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    slug: "neet",
    description: "NEET-UG for MBBS/BDS/AYUSH, NEET-PG for MD/MS/MDS admissions across all medical colleges in India.",
    icon: "Stethoscope",
    color: "from-green-500 to-emerald-600",
    count: 0,
  },
  {
    id: "state-psc",
    name: "State PSC",
    fullName: "State Public Service Commissions",
    slug: "state-psc",
    description: "BPSC, UPPSC, MPPSC, RPSC, WBPSC, TNPSC, KPSC, APPSC, GPSC, and other state-level civil service examinations.",
    icon: "Map",
    color: "from-indigo-500 to-blue-600",
    count: 0,
  },
  {
    id: "teaching",
    name: "Teaching",
    fullName: "Teaching & Education Exams",
    slug: "teaching",
    description: "CTET, State TET, UGC NET, CSIR NET, SET/SLET, KVS, NVS, DSSSB Teacher, and other education sector exams.",
    icon: "BookOpen",
    color: "from-yellow-500 to-amber-600",
    count: 0,
  },
  {
    id: "police",
    name: "Police",
    fullName: "Police & Paramilitary Forces",
    slug: "police",
    description: "State Police SI/Constable, CRPF, BSF, CISF, ITBP, SSB, Delhi Police, and other law enforcement recruitment.",
    icon: "BadgeCheck",
    color: "from-sky-500 to-blue-600",
    count: 0,
  },
  {
    id: "engineering",
    name: "Engineering",
    fullName: "Engineering Services & Technical",
    slug: "engineering",
    description: "ESE/IES, GATE, ISRO, DRDO, BARC, BHEL, ONGC, NTPC, and other engineering/technical recruitment exams.",
    icon: "Cog",
    color: "from-orange-500 to-red-600",
    count: 0,
  },
  {
    id: "judiciary",
    name: "Judiciary",
    fullName: "Judicial Services Examinations",
    slug: "judiciary",
    description: "State Judiciary exams, CLAT, AILET, AIBE for bar council, and other law/judicial service examinations.",
    icon: "Scale",
    color: "from-fuchsia-500 to-pink-600",
    count: 0,
  },
];

// ============================================================================
// SECTION 3: ALL 36 INDIAN STATES AND UNION TERRITORIES — REAL DATA
// Every single state and UT of the Republic of India. Each one has its own
// dedicated results page showing state-level government exam results.
// ============================================================================

export const INDIAN_STATES: IndianState[] = [
  // --- 28 STATES ---
  { id: "ap", name: "Andhra Pradesh", slug: "andhra-pradesh", code: "AP", capital: "Amaravati", pscName: "APPSC", isActive: true },
  { id: "ar", name: "Arunachal Pradesh", slug: "arunachal-pradesh", code: "AR", capital: "Itanagar", pscName: "APPSC", isActive: true },
  { id: "as", name: "Assam", slug: "assam", code: "AS", capital: "Dispur", pscName: "APSC", isActive: true },
  { id: "br", name: "Bihar", slug: "bihar", code: "BR", capital: "Patna", pscName: "BPSC", isActive: true },
  { id: "cg", name: "Chhattisgarh", slug: "chhattisgarh", code: "CG", capital: "Raipur", pscName: "CGPSC", isActive: true },
  { id: "ga", name: "Goa", slug: "goa", code: "GA", capital: "Panaji", pscName: "GPSC", isActive: true },
  { id: "gj", name: "Gujarat", slug: "gujarat", code: "GJ", capital: "Gandhinagar", pscName: "GPSC", isActive: true },
  { id: "hr", name: "Haryana", slug: "haryana", code: "HR", capital: "Chandigarh", pscName: "HPSC", isActive: true },
  { id: "hp", name: "Himachal Pradesh", slug: "himachal-pradesh", code: "HP", capital: "Shimla", pscName: "HPPSC", isActive: true },
  { id: "jh", name: "Jharkhand", slug: "jharkhand", code: "JH", capital: "Ranchi", pscName: "JPSC", isActive: true },
  { id: "ka", name: "Karnataka", slug: "karnataka", code: "KA", capital: "Bengaluru", pscName: "KPSC", isActive: true },
  { id: "kl", name: "Kerala", slug: "kerala", code: "KL", capital: "Thiruvananthapuram", pscName: "KPSC", isActive: true },
  { id: "mp", name: "Madhya Pradesh", slug: "madhya-pradesh", code: "MP", capital: "Bhopal", pscName: "MPPSC", isActive: true },
  { id: "mh", name: "Maharashtra", slug: "maharashtra", code: "MH", capital: "Mumbai", pscName: "MPSC", isActive: true },
  { id: "mn", name: "Manipur", slug: "manipur", code: "MN", capital: "Imphal", pscName: "MPSC", isActive: true },
  { id: "ml", name: "Meghalaya", slug: "meghalaya", code: "ML", capital: "Shillong", pscName: "MPSC", isActive: true },
  { id: "mz", name: "Mizoram", slug: "mizoram", code: "MZ", capital: "Aizawl", pscName: "MPSC", isActive: true },
  { id: "nl", name: "Nagaland", slug: "nagaland", code: "NL", capital: "Kohima", pscName: "NPSC", isActive: true },
  { id: "od", name: "Odisha", slug: "odisha", code: "OD", capital: "Bhubaneswar", pscName: "OPSC", isActive: true },
  { id: "pb", name: "Punjab", slug: "punjab", code: "PB", capital: "Chandigarh", pscName: "PPSC", isActive: true },
  { id: "rj", name: "Rajasthan", slug: "rajasthan", code: "RJ", capital: "Jaipur", pscName: "RPSC", isActive: true },
  { id: "sk", name: "Sikkim", slug: "sikkim", code: "SK", capital: "Gangtok", pscName: "SPSC", isActive: true },
  { id: "tn", name: "Tamil Nadu", slug: "tamil-nadu", code: "TN", capital: "Chennai", pscName: "TNPSC", isActive: true },
  { id: "ts", name: "Telangana", slug: "telangana", code: "TS", capital: "Hyderabad", pscName: "TSPSC", isActive: true },
  { id: "tr", name: "Tripura", slug: "tripura", code: "TR", capital: "Agartala", pscName: "TPSC", isActive: true },
  { id: "up", name: "Uttar Pradesh", slug: "uttar-pradesh", code: "UP", capital: "Lucknow", pscName: "UPPSC", isActive: true },
  { id: "uk", name: "Uttarakhand", slug: "uttarakhand", code: "UK", capital: "Dehradun", pscName: "UKPSC", isActive: true },
  { id: "wb", name: "West Bengal", slug: "west-bengal", code: "WB", capital: "Kolkata", pscName: "WBPSC", isActive: true },

  // --- 8 UNION TERRITORIES ---
  { id: "an", name: "Andaman & Nicobar", slug: "andaman-nicobar", code: "AN", capital: "Port Blair", pscName: "UPSC (Central)", isActive: true },
  { id: "ch", name: "Chandigarh", slug: "chandigarh", code: "CH", capital: "Chandigarh", pscName: "UPSC (Central)", isActive: true },
  { id: "dn", name: "Dadra & Nagar Haveli and Daman & Diu", slug: "dadra-nagar-haveli-daman-diu", code: "DN", capital: "Daman", pscName: "UPSC (Central)", isActive: true },
  { id: "dl", name: "Delhi", slug: "delhi", code: "DL", capital: "New Delhi", pscName: "DSSSB", isActive: true },
  { id: "jk", name: "Jammu & Kashmir", slug: "jammu-kashmir", code: "JK", capital: "Srinagar", pscName: "JKPSC", isActive: true },
  { id: "la", name: "Ladakh", slug: "ladakh", code: "LA", capital: "Leh", pscName: "UPSC (Central)", isActive: true },
  { id: "ld", name: "Lakshadweep", slug: "lakshadweep", code: "LD", capital: "Kavaratti", pscName: "UPSC (Central)", isActive: true },
  { id: "py", name: "Puducherry", slug: "puducherry", code: "PY", capital: "Puducherry", pscName: "UPSC (Central)", isActive: true },
];

// ============================================================================
// SECTION 4: UI CONSTANTS
// Colors, gradients, and visual configuration for the Results module.
// ============================================================================

/** Number of results shown per page in the paginated listing */
export const RESULTS_PER_PAGE = 20;

/** Animation duration in seconds for GSAP-powered section reveals */
export const ANIMATION_DURATION = 0.8;

/** Stagger delay between items in animated lists (seconds) */
export const STAGGER_DELAY = 0.1;

/** Gradient presets for category cards */
export const CATEGORY_GRADIENTS = {
  primary: "from-blue-600 via-indigo-600 to-purple-700",
  secondary: "from-emerald-500 via-teal-500 to-cyan-600",
  accent: "from-amber-500 via-orange-500 to-red-600",
  neutral: "from-zinc-700 via-zinc-800 to-zinc-900",
} as const;
