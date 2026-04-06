import { db, resultCategoriesTable, newsCategoriesTable, toolsTable, blogCategoriesTable, usersTable, resultsTable, newsTable, blogsTable } from "@workspace/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const RESULT_CATEGORIES = [
  { name: "JEE Mains", slug: "jee-mains" },
  { name: "NEET UG", slug: "neet-ug" },
  { name: "SSC CGL", slug: "ssc-cgl" },
  { name: "SSC CHSL", slug: "ssc-chsl" },
  { name: "Banking / IBPS", slug: "banking-ibps" },
  { name: "Railway / RRB", slug: "railway-rrb" },
  { name: "UPSC Civil Services", slug: "upsc-civil-services" },
  { name: "State PSC", slug: "state-psc" },
  { name: "Police", slug: "police" },
  { name: "Army / Defence", slug: "army-defence" },
  { name: "Teaching / TET", slug: "teaching-tet" },
  { name: "Engineering Jobs", slug: "engineering-jobs" },
];

const NEWS_CATEGORIES = [
  { name: "Education", slug: "education", color: "#3b82f6" },
  { name: "Technology", slug: "technology", color: "#8b5cf6" },
  { name: "Government Jobs", slug: "government-jobs", color: "#f97316" },
  { name: "Exams & Results", slug: "exams-results", color: "#10b981" },
  { name: "Sports", slug: "sports", color: "#ef4444" },
  { name: "Business", slug: "business", color: "#eab308" },
  { name: "Science", slug: "science", color: "#06b6d4" },
  { name: "Health", slug: "health", color: "#84cc16" },
  { name: "Politics", slug: "politics", color: "#6366f1" },
  { name: "Entertainment", slug: "entertainment", color: "#ec4899" },
  { name: "Finance", slug: "finance", color: "#14b8a6" },
  { name: "International", slug: "international", color: "#f43f5e" },
  { name: "Environment", slug: "environment", color: "#22c55e" },
  { name: "Agriculture", slug: "agriculture", color: "#a16207" },
  { name: "Defence", slug: "defence", color: "#64748b" },
];

const BLOG_CATEGORIES = [
  { name: "Exam Preparation", slug: "exam-preparation" },
  { name: "Study Tips", slug: "study-tips" },
  { name: "Career Guidance", slug: "career-guidance" },
  { name: "Government Jobs", slug: "government-jobs" },
  { name: "Technology", slug: "technology" },
  { name: "Success Stories", slug: "success-stories" },
  { name: "Syllabus & Pattern", slug: "syllabus-pattern" },
  { name: "Books & Resources", slug: "books-resources" },
];

const TOOLS = [
  { name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple PDFs into one document easily", category: "PDF Tools", isNew: false },
  { name: "Split PDF", slug: "split-pdf", description: "Split a PDF into separate pages or page ranges", category: "PDF Tools", isNew: false },
  { name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF file size while maintaining quality", category: "PDF Tools", isNew: false },
  { name: "PDF to Word", slug: "pdf-to-word", description: "Convert PDF to editable Word documents", category: "PDF Convert", isNew: false },
  { name: "Word to PDF", slug: "word-to-pdf", description: "Convert Word documents to PDF format", category: "PDF Convert", isNew: false },
  { name: "PDF to Excel", slug: "pdf-to-excel", description: "Extract data from PDF into Excel spreadsheets", category: "PDF Convert", isNew: false },
  { name: "Excel to PDF", slug: "excel-to-pdf", description: "Convert Excel spreadsheets to PDF format", category: "PDF Convert", isNew: false },
  { name: "PDF to PowerPoint", slug: "pdf-to-ppt", description: "Convert PDF files to editable PowerPoint slides", category: "PDF Convert", isNew: false },
  { name: "PowerPoint to PDF", slug: "ppt-to-pdf", description: "Convert PowerPoint presentations to PDF", category: "PDF Convert", isNew: false },
  { name: "PDF to JPG", slug: "pdf-to-jpg", description: "Convert PDF pages to JPG images", category: "PDF Convert", isNew: false },
  { name: "JPG to PDF", slug: "jpg-to-pdf", description: "Convert JPG images to PDF format", category: "PDF Convert", isNew: false },
  { name: "Edit PDF", slug: "edit-pdf", description: "Add text, images, and annotations to PDF", category: "PDF Edit", isNew: false },
  { name: "Sign PDF", slug: "sign-pdf", description: "Electronically sign PDF documents", category: "PDF Edit", isNew: false },
  { name: "Rotate PDF", slug: "rotate-pdf", description: "Rotate PDF pages to correct orientation", category: "PDF Edit", isNew: false },
  { name: "Watermark PDF", slug: "watermark-pdf", description: "Add image or text watermark to PDF", category: "PDF Edit", isNew: false },
  { name: "OCR PDF", slug: "ocr-pdf", description: "Extract text from scanned PDFs using OCR", category: "PDF Edit", isNew: false },
  { name: "Protect PDF", slug: "protect-pdf", description: "Encrypt PDF with password protection", category: "PDF Security", isNew: false },
  { name: "Unlock PDF", slug: "unlock-pdf", description: "Remove password from protected PDF", category: "PDF Security", isNew: false },
  { name: "Translate PDF", slug: "translate-pdf", description: "Translate PDF content powered by AI", category: "PDF AI", isNew: true },
  { name: "HTML to PDF", slug: "html-to-pdf", description: "Convert web pages to PDF documents", category: "PDF Convert", isNew: false },
  { name: "PNG to PDF", slug: "png-to-pdf", description: "Convert PNG images to PDF", category: "Image Convert", isNew: false },
  { name: "PDF to PNG", slug: "pdf-to-png", description: "Convert PDF pages to PNG images", category: "Image Convert", isNew: false },
  { name: "Crop PDF", slug: "crop-pdf", description: "Crop margins and select areas of PDF", category: "PDF Edit", isNew: false },
  { name: "Organize PDF", slug: "organize-pdf", description: "Reorder, add or delete PDF pages", category: "PDF Edit", isNew: false },
  { name: "Page Numbers", slug: "page-numbers", description: "Add page numbers to your PDF", category: "PDF Edit", isNew: false },
  { name: "Repair PDF", slug: "repair-pdf", description: "Repair damaged or corrupt PDF files", category: "PDF Tools", isNew: false },
  { name: "Compare PDF", slug: "compare-pdf", description: "Side-by-side comparison of PDF versions", category: "PDF Tools", isNew: false },
  { name: "Redact PDF", slug: "redact-pdf", description: "Permanently remove sensitive information from PDF", category: "PDF Security", isNew: false },
];

export async function seedDatabase() {
  try {
    const [existingCat] = await db.select().from(resultCategoriesTable).limit(1);
    if (existingCat) {
      return;
    }

    await db.insert(resultCategoriesTable).values(RESULT_CATEGORIES).onConflictDoNothing();
    await db.insert(newsCategoriesTable).values(NEWS_CATEGORIES).onConflictDoNothing();
    await db.insert(blogCategoriesTable).values(BLOG_CATEGORIES).onConflictDoNothing();
    await db.insert(toolsTable).values(TOOLS.map(t => ({ ...t, usageCount: Math.floor(Math.random() * 10000) }))).onConflictDoNothing();

    const adminHash = await bcrypt.hash("admin123", 10);
    await db.insert(usersTable).values({
      name: "Ishu Admin",
      email: "admin@ishu.in",
      passwordHash: adminHash,
      role: "admin",
      whatsappNumber: "8986985813",
    }).onConflictDoNothing();

    await db.insert(resultsTable).values([
      {
        title: "JEE Main 2025 - January Session",
        shortDescription: "National Level Engineering Entrance Exam for admission to NITs, IIITs and GFTIs",
        category: "jee-mains",
        status: "active",
        totalPosts: null,
        lastDate: "2025-01-30",
        examDate: "2025-02-01",
        requiredDocuments: ["10th Marksheet", "12th Marksheet", "Aadhar Card", "Passport Photo"],
        eligibility: "12th pass with Physics, Chemistry, Mathematics",
        officialLink: "https://jeemain.nta.nic.in",
        fullDescription: "JEE Main is conducted by NTA for admission to B.E./B.Tech programs at NITs, IIITs, and other centrally funded technical institutions.",
      },
      {
        title: "NEET UG 2025",
        shortDescription: "National Eligibility cum Entrance Test for Medical and Dental colleges across India",
        category: "neet-ug",
        status: "upcoming",
        totalPosts: null,
        lastDate: "2025-03-15",
        examDate: "2025-05-04",
        requiredDocuments: ["10th Marksheet", "12th Marksheet", "Aadhar Card", "Passport Photo", "Class 12 Certificate"],
        eligibility: "12th pass with Physics, Chemistry, Biology",
        officialLink: "https://neet.nta.nic.in",
        fullDescription: "NEET UG is the single entrance exam for admission to MBBS, BDS, BAMS, and other medical courses.",
      },
      {
        title: "SSC CGL 2024 - Tier 1",
        shortDescription: "Staff Selection Commission Combined Graduate Level Examination",
        category: "ssc-cgl",
        status: "active",
        totalPosts: 17727,
        lastDate: "2025-01-15",
        examDate: "2025-02-10",
        requiredDocuments: ["Graduation Certificate", "Aadhar Card", "PAN Card", "Photo", "Signature"],
        eligibility: "Graduation in any discipline from a recognized university",
        officialLink: "https://ssc.nic.in",
        fullDescription: "SSC CGL is conducted for recruitment to Group B and Group C posts in various central government ministries.",
      },
      {
        title: "IBPS PO 2025 - 5000+ Posts",
        shortDescription: "Institute of Banking Personnel Selection Probationary Officer Recruitment",
        category: "banking-ibps",
        state: null,
        status: "coming_soon",
        totalPosts: 5000,
        lastDate: null,
        examDate: null,
        requiredDocuments: ["Graduation Certificate", "Aadhar Card", "PAN Card", "Photo", "Signature"],
        eligibility: "Graduation in any discipline, 20-30 years age",
        officialLink: "https://ibps.in",
        fullDescription: "IBPS conducts common recruitment for Probationary Officers in public sector banks.",
      },
      {
        title: "UP Police Constable 2025 - 60244 Posts",
        shortDescription: "Uttar Pradesh Police Constable Bharti 2025",
        category: "police",
        state: "Uttar Pradesh",
        status: "active",
        totalPosts: 60244,
        lastDate: "2025-02-28",
        examDate: "2025-04-15",
        requiredDocuments: ["10th Marksheet", "12th Marksheet", "Aadhar Card", "Domicile Certificate", "Photo", "Signature"],
        eligibility: "12th pass, Age 18-25 years, UP Domicile",
        officialLink: "https://uppbpb.gov.in",
        fullDescription: "UP Police is recruiting 60244 Constable (Civil Police) posts for male and female candidates.",
      },
      {
        title: "Railway RRB NTPC 2025",
        shortDescription: "Railway Recruitment Board Non-Technical Popular Categories recruitment",
        category: "railway-rrb",
        status: "upcoming",
        totalPosts: 11558,
        lastDate: "2025-04-30",
        examDate: "2025-06-01",
        requiredDocuments: ["12th/Graduation Certificate", "Aadhar Card", "Photo", "Signature"],
        eligibility: "12th Pass / Graduation depending on post",
        officialLink: "https://indianrailways.gov.in",
        fullDescription: "RRB NTPC recruitment for posts like Junior Clerk, Commercial Apprentice, Junior Time Keeper, etc.",
      },
    ]).onConflictDoNothing();

    await db.insert(newsTable).values([
      {
        title: "JEE Main 2025 Registration Begins: Here's How to Apply",
        shortDescription: "NTA has opened the registration window for JEE Main January 2025. Students can apply at jeemain.nta.nic.in before January 30.",
        category: "education",
        language: "en",
        author: "Ishu Education Desk",
        isTrending: true,
        viewCount: 12450,
        relatedNewsIds: [],
      },
      {
        title: "NEET UG 2025 Exam Date Announced: Check Complete Schedule",
        shortDescription: "National Testing Agency has officially announced NEET UG 2025 will be held on May 4. Registration starts March 15.",
        category: "exams-results",
        language: "en",
        author: "Ishu Education Desk",
        isTrending: true,
        viewCount: 9820,
        relatedNewsIds: [],
      },
      {
        title: "Budget 2025: Education Sector Gets Record Funding of ₹1.48 Lakh Crore",
        shortDescription: "Finance Minister announced a significant boost to education in Union Budget 2025, focusing on skill development and digital learning.",
        category: "education",
        language: "en",
        author: "Ishu News Team",
        isTrending: false,
        viewCount: 5640,
        relatedNewsIds: [],
      },
    ]).onConflictDoNothing();

    await db.insert(blogsTable).values([
      {
        title: "How to Crack SSC CGL in 3 Months: Complete Study Plan",
        slug: "how-to-crack-ssc-cgl-3-months",
        excerpt: "A comprehensive 3-month study plan for SSC CGL aspirants with day-wise schedule, important topics, and expert tips.",
        category: "exam-preparation",
        tags: ["SSC", "CGL", "Study Plan", "Tips"],
        author: "Ishu Expert Team",
        readTime: 12,
        isFeatured: true,
        viewCount: 34500,
        content: "SSC CGL is one of the most competitive exams in India. Here is a detailed 3-month preparation strategy...",
      },
      {
        title: "Top 10 Government Jobs After 12th Grade in 2025",
        slug: "top-government-jobs-after-12th-2025",
        excerpt: "Discover the best government job opportunities available for 12th pass students in 2025 with salary details.",
        category: "career-guidance",
        tags: ["Government Jobs", "12th Pass", "Career"],
        author: "Career Expert",
        readTime: 8,
        isFeatured: true,
        viewCount: 28900,
        content: "After 12th, many government jobs become accessible. Here are the top opportunities...",
      },
      {
        title: "UPSC Topper Strategy: How Rank 1 Prepared for IAS",
        slug: "upsc-topper-strategy-rank-1",
        excerpt: "Exclusive interview with UPSC topper revealing the study strategy, books, and mindset that helped achieve Rank 1.",
        category: "success-stories",
        tags: ["UPSC", "IAS", "Success Story", "Strategy"],
        author: "Ishu Editorial",
        readTime: 15,
        isFeatured: true,
        viewCount: 52300,
        content: "In this exclusive interview, UPSC 2024 Rank 1 shares their complete preparation journey...",
      },
    ]).onConflictDoNothing();

  } catch (err) {
    console.error("Seed error:", err);
  }
}
