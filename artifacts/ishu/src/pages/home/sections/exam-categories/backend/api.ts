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
 * Home Exam Categories Section - Backend API Layer
 * Isolated API hooks for the exam categories section.
 * Changes here do NOT affect any other section.
 */

// Exam category data - real categories used in Indian government exams
export const examCategories = [
  {
    slug: "upsc",
    name: "UPSC",
    fullName: "Union Public Service Commission",
    description: "Civil Services, IAS, IPS, IFS, CDS, NDA, CAPF",
    icon: "Shield",
    color: "#3b82f6",
    activeExams: 12,
  },
  {
    slug: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission",
    description: "CGL, CHSL, MTS, GD Constable, Stenographer, JE",
    icon: "FileText",
    color: "#8b5cf6",
    activeExams: 8,
  },
  {
    slug: "banking",
    name: "Banking",
    fullName: "IBPS & Banking Exams",
    description: "IBPS PO, Clerk, SO, RRB, SBI PO, SBI Clerk, RBI",
    icon: "Building2",
    color: "#10b981",
    activeExams: 10,
  },
  {
    slug: "railway",
    name: "Railway",
    fullName: "Railway Recruitment Board",
    description: "RRB NTPC, Group D, ALP, JE, RPF, RPSF",
    icon: "Train",
    color: "#f97316",
    activeExams: 6,
  },
  {
    slug: "defence",
    name: "Defence",
    fullName: "Defence & Military Exams",
    description: "NDA, CDS, AFCAT, Indian Army, Navy, Air Force",
    icon: "Target",
    color: "#ef4444",
    activeExams: 9,
  },
  {
    slug: "jee",
    name: "JEE",
    fullName: "Joint Entrance Examination",
    description: "JEE Main, JEE Advanced, BITSAT, VITEEE, WBJEE",
    icon: "Atom",
    color: "#ca8a04",
    activeExams: 5,
  },
  {
    slug: "neet",
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    description: "NEET UG, NEET PG, AIIMS, JIPMER, FMGE",
    icon: "HeartPulse",
    color: "#0d9488",
    activeExams: 4,
  },
  {
    slug: "state-psc",
    name: "State PSC",
    fullName: "State Public Service Commissions",
    description: "BPSC, UPPSC, MPPSC, RPSC, JPSC, WBPSC & more",
    icon: "MapPin",
    color: "#6366f1",
    activeExams: 28,
  },
  {
    slug: "teaching",
    name: "Teaching",
    fullName: "Teaching & Education Exams",
    description: "CTET, State TET, UGC NET, CSIR NET, SET",
    icon: "GraduationCap",
    color: "#0891b2",
    activeExams: 7,
  },
  {
    slug: "police",
    name: "Police",
    fullName: "Police & Paramilitary",
    description: "State Police, CRPF, BSF, CISF, ITBP, SSB",
    icon: "ShieldCheck",
    color: "#dc2626",
    activeExams: 15,
  },
  {
    slug: "engineering",
    name: "Engineering",
    fullName: "Engineering & Technical Jobs",
    description: "GATE, ESE, BSNL, ISRO, DRDO, BEL, HAL",
    icon: "Wrench",
    color: "#65a30d",
    activeExams: 6,
  },
  {
    slug: "judiciary",
    name: "Judiciary",
    fullName: "Judicial Services",
    description: "State Judiciary, CLAT, AILET, DU LLB, BHU LLB",
    icon: "Scale",
    color: "#9333ea",
    activeExams: 5,
  },
] as const;

export type ExamCategory = (typeof examCategories)[number];
