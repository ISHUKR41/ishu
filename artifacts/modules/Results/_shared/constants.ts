// ============================================================================
// FILE: artifacts/modules/Results/_shared/constants.ts
// MODULE: Results
// PURPOSE: Shared constants for Results module APIs, categories, and geography.
//          This file supports frontend/backend section isolation by providing
//          one stable source of shared metadata.
// ============================================================================

export const MODULE_NAME = "Results";

export const RESULTS_PER_PAGE = 20;

export const RESULTS_API = {
  getResults: "/api/modules/results",
  getCategoryResults: (category: string) => `/api/modules/results/category/${category}`,
  getStateResults: (state: string) => `/api/modules/results/state/${state}`,
  STATS: "/api/modules/results/stats",
};

export type IndianState = {
  id: string;
  name: string;
  code: string;
  slug: string;
  pscName: string;
};

export const INDIAN_STATES: IndianState[] = [
  { id: "AP", name: "Andhra Pradesh", code: "AP", slug: "andhra-pradesh", pscName: "APPSC" },
  { id: "AR", name: "Arunachal Pradesh", code: "AR", slug: "arunachal-pradesh", pscName: "APPSC" },
  { id: "AS", name: "Assam", code: "AS", slug: "assam", pscName: "APSC" },
  { id: "BR", name: "Bihar", code: "BR", slug: "bihar", pscName: "BPSC" },
  { id: "CG", name: "Chhattisgarh", code: "CG", slug: "chhattisgarh", pscName: "CGPSC" },
  { id: "GA", name: "Goa", code: "GA", slug: "goa", pscName: "GPSC" },
  { id: "GJ", name: "Gujarat", code: "GJ", slug: "gujarat", pscName: "GPSC" },
  { id: "HR", name: "Haryana", code: "HR", slug: "haryana", pscName: "HPSC" },
  { id: "HP", name: "Himachal Pradesh", code: "HP", slug: "himachal-pradesh", pscName: "HPPSC" },
  { id: "JH", name: "Jharkhand", code: "JH", slug: "jharkhand", pscName: "JPSC" },
  { id: "KA", name: "Karnataka", code: "KA", slug: "karnataka", pscName: "KPSC" },
  { id: "KL", name: "Kerala", code: "KL", slug: "kerala", pscName: "KPSC" },
  { id: "MP", name: "Madhya Pradesh", code: "MP", slug: "madhya-pradesh", pscName: "MPPSC" },
  { id: "MH", name: "Maharashtra", code: "MH", slug: "maharashtra", pscName: "MPSC" },
  { id: "MN", name: "Manipur", code: "MN", slug: "manipur", pscName: "MPSC" },
  { id: "ML", name: "Meghalaya", code: "ML", slug: "meghalaya", pscName: "MPSC" },
  { id: "MZ", name: "Mizoram", code: "MZ", slug: "mizoram", pscName: "MPSC" },
  { id: "NL", name: "Nagaland", code: "NL", slug: "nagaland", pscName: "NPSC" },
  { id: "OR", name: "Odisha", code: "OR", slug: "odisha", pscName: "OPSC" },
  { id: "PB", name: "Punjab", code: "PB", slug: "punjab", pscName: "PPSC" },
  { id: "RJ", name: "Rajasthan", code: "RJ", slug: "rajasthan", pscName: "RPSC" },
  { id: "SK", name: "Sikkim", code: "SK", slug: "sikkim", pscName: "SPSC" },
  { id: "TN", name: "Tamil Nadu", code: "TN", slug: "tamil-nadu", pscName: "TNPSC" },
  { id: "TG", name: "Telangana", code: "TG", slug: "telangana", pscName: "TSPSC" },
  { id: "TR", name: "Tripura", code: "TR", slug: "tripura", pscName: "TPSC" },
  { id: "UP", name: "Uttar Pradesh", code: "UP", slug: "uttar-pradesh", pscName: "UPPSC" },
  { id: "UK", name: "Uttarakhand", code: "UK", slug: "uttarakhand", pscName: "UKPSC" },
  { id: "WB", name: "West Bengal", code: "WB", slug: "west-bengal", pscName: "WBPSC" },
  
  // UTs
  { id: "AN", name: "Andaman and Nicobar", code: "AN", slug: "andaman-and-nicobar", pscName: "Admin" },
  { id: "CH", name: "Chandigarh", code: "CH", slug: "chandigarh", pscName: "Admin" },
  { id: "DN", name: "Dadra and Nagar Haveli", code: "DN", slug: "dadra-and-nagar-haveli", pscName: "Admin" },
  { id: "DL", name: "Delhi", code: "DL", slug: "delhi", pscName: "DSSSB" },
  { id: "JK", name: "Jammu and Kashmir", code: "JK", slug: "jammu-and-kashmir", pscName: "JKPSC" },
  { id: "LA", name: "Ladakh", code: "LA", slug: "ladakh", pscName: "LAHDSSB" },
  { id: "LD", name: "Lakshadweep", code: "LD", slug: "lakshadweep", pscName: "Admin" },
  { id: "PY", name: "Puducherry", code: "PY", slug: "puducherry", pscName: "Admin" },
];

export const RESULT_CATEGORIES = [
  { id: "upsc", name: "UPSC", description: "Union Public Service Commission Results", icon: "Landmark", color: "blue", fullName: "Union Public Service Commission", slug: "upsc" },
  { id: "ssc", name: "SSC", description: "Staff Selection Commission Results", icon: "Files", color: "green", fullName: "Staff Selection Commission", slug: "ssc" },
  { id: "banking", name: "Banking", description: "IBPS, SBI & RBI Results", icon: "Building2", color: "purple", fullName: "Banking Exams", slug: "banking" },
  { id: "defence", name: "Defence", description: "NDA, CDS & AFCAT Results", icon: "Shield", color: "amber", fullName: "Defence Services", slug: "defence" },
  { id: "railway", name: "Railway", description: "RRB NTPC, Group D Results", icon: "Train", color: "red", fullName: "Indian Railways", slug: "railway" },
  { id: "teaching", name: "Teaching", description: "CTET, TGT, PGT Results", icon: "BookOpen", color: "yellow", fullName: "Teaching", slug: "teaching" },
  { id: "engineering", name: "Engineering", description: "GATE, JEE Results", icon: "Wrench", color: "indigo", fullName: "Engineering", slug: "engineering" },
  { id: "medical", name: "Medical", description: "NEET & AIIMS Results", icon: "Stethoscope", color: "cyan", fullName: "Medical", slug: "medical" },
];
