import { db, resultsTable, resultCategoriesTable, newsTable, newsCategoriesTable, blogsTable, blogCategoriesTable, toolsTable } from "@workspace/db";

async function seed() {
  console.log("🌱 Starting seed...");

  // ─── RESULT CATEGORIES ─────────────────────────────────────────────────────
  console.log("Seeding result categories...");
  await db.delete(resultCategoriesTable);
  await db.insert(resultCategoriesTable).values([
    { name: "UPSC Civil Services", slug: "upsc-civil-services" },
    { name: "SSC CGL", slug: "ssc-cgl" },
    { name: "SSC CHSL", slug: "ssc-chsl" },
    { name: "Banking / IBPS", slug: "banking-ibps" },
    { name: "Railway / RRB", slug: "railway-rrb" },
    { name: "Army / Defence", slug: "army-defence" },
    { name: "JEE Mains", slug: "jee-mains" },
    { name: "NEET UG", slug: "neet-ug" },
    { name: "Police", slug: "police" },
    { name: "Teaching / TET", slug: "teaching-tet" },
    { name: "State PSC", slug: "state-psc" },
    { name: "Engineering Jobs", slug: "engineering-jobs" },
    { name: "High Court / Judiciary", slug: "judiciary" },
    { name: "Nursing / Paramedical", slug: "nursing" },
  ]);

  // ─── RESULTS ───────────────────────────────────────────────────────────────
  console.log("Seeding results...");
  await db.delete(resultsTable);
  await db.insert(resultsTable).values([
    {
      title: "UPSC Civil Services Prelims 2025 – Result Declared",
      shortDescription: "UPSC has declared the Civil Services (Preliminary) Examination 2025 result. Candidates who appeared in IAS Prelims 2025 can check their result on upsc.gov.in.",
      fullDescription: "The Union Public Service Commission (UPSC) has officially declared the Civil Services Preliminary Examination 2025 result. A total of 14,624 candidates have qualified for the Civil Services (Main) Examination 2025. The merit list and result PDF are available on the official UPSC website upsc.gov.in. Candidates are advised to check their roll numbers in the PDF. The Main examination is scheduled for September 2025.",
      category: "upsc-civil-services",
      state: null,
      status: "active",
      totalPosts: 1056,
      lastDate: "2025-04-20",
      examDate: "2025-05-25",
      requiredDocuments: ["Admit Card", "Aadhar Card", "10th Marksheet", "Graduation Certificate", "Category Certificate (if applicable)"],
      eligibility: "Age: 21-32 years (relaxation for reserved categories). Educational Qualification: Any Graduate from a recognized University.",
      officialLink: "https://upsc.gov.in",
    },
    {
      title: "SSC CGL 2024-25 Tier-1 Result – Final Answer Key Released",
      shortDescription: "Staff Selection Commission (SSC) has released the CGL Tier-1 2024-25 result. Around 1.4 lakh candidates have qualified for Tier-2 examination.",
      fullDescription: "SSC has announced the Combined Graduate Level (CGL) Tier-I Examination 2024 result. Approximately 1,40,000 candidates have qualified for the Tier-II examination. The exam was held from 9 to 26 September 2024 across various centres in India. Candidates can check their result at ssc.gov.in. The CGL Tier-II exam is scheduled for December 2025.",
      category: "ssc-cgl",
      state: null,
      status: "active",
      totalPosts: 17727,
      lastDate: "2025-05-10",
      examDate: "2025-12-10",
      requiredDocuments: ["Admit Card", "Identity Proof", "Marksheets", "Category Certificate"],
      eligibility: "Age: 18-32 years. Education: Bachelor's Degree from any recognized University.",
      officialLink: "https://ssc.gov.in",
    },
    {
      title: "IBPS PO 2024-25 Main Exam Result Declared",
      shortDescription: "IBPS has declared the Probationary Officer Main Exam 2024-25 result. Qualified candidates will be called for Interview & Document Verification.",
      fullDescription: "The Institute of Banking Personnel Selection (IBPS) has declared the result of PO Main Exam 2024-25. Candidates who appeared in IBPS PO Main Exam held in November 2024 can now check their result at ibps.in. The shortlisted candidates will be called for interview/document verification. Final allotment will be done based on merit in the interview.",
      category: "banking-ibps",
      state: null,
      status: "active",
      totalPosts: 4455,
      lastDate: "2025-04-30",
      examDate: "2025-02-15",
      requiredDocuments: ["IBPS Score Card", "10th / 12th Marksheet", "Graduation Certificate", "ID Proof", "Passport Photo", "Category Certificate"],
      eligibility: "Age: 20-30 years. Education: Graduation from recognized University. Proficiency in computer is required.",
      officialLink: "https://ibps.in",
    },
    {
      title: "RRB NTPC 2024 CBT-1 Result – Zone-wise Merit List Out",
      shortDescription: "Railway Recruitment Board has published NTPC CBT-1 result zone-wise. Candidates can check their roll numbers on respective RRB regional websites.",
      fullDescription: "Railway Recruitment Board (RRB) has released the NTPC (Non-Technical Popular Categories) CBT Stage-1 Result 2024 on respective RRB zonal websites. Candidates who qualified CBT-1 will be called for CBT-2. The results are available region-wise – candidates should visit their applied RRB zone's website. RRB NTPC CBT-2 is scheduled for 2025.",
      category: "railway-rrb",
      state: null,
      status: "active",
      totalPosts: 11558,
      lastDate: "2025-03-31",
      examDate: "2025-04-20",
      requiredDocuments: ["RRB Admit Card", "Aadhar Card", "PAN Card", "10th / 12th Certificate", "Caste Certificate (if applicable)"],
      eligibility: "Age: 18-36 years (relaxation as per rules). Education: 12th Pass / Graduation depending on post.",
      officialLink: "https://indianrailways.gov.in",
    },
    {
      title: "NEET UG 2025 – Application Form Correction Window Open",
      shortDescription: "National Testing Agency (NTA) has opened the correction window for NEET UG 2025 application forms. Candidates can make changes till April 30, 2025.",
      fullDescription: "NTA has opened the application form correction window for NEET UG 2025. Eligible candidates can log in to neet.nta.nic.in and correct their details including photo, signature, category, and other fields. NEET UG 2025 exam is scheduled for May 4, 2025. Results are expected in June 2025.",
      category: "neet-ug",
      state: null,
      status: "upcoming",
      totalPosts: 100000,
      lastDate: "2025-04-30",
      examDate: "2025-05-04",
      requiredDocuments: ["Aadhar Card", "Class 10 Certificate", "Class 12 Certificate", "Passport Photo", "Caste Certificate (if applicable)"],
      eligibility: "Age: 17-25 years. Education: 12th with Physics, Chemistry, Biology/Biotechnology with min. 50% marks (45% for OBC/SC/ST).",
      officialLink: "https://neet.nta.nic.in",
    },
    {
      title: "JEE Mains 2025 Session 2 – Result Announced",
      shortDescription: "NTA has declared the JEE Mains 2025 Session 2 result. Candidates can check their scorecard and percentile scores on the official JEE website.",
      fullDescription: "National Testing Agency (NTA) has declared the Joint Entrance Examination (JEE) Mains 2025 Session 2 result. Candidates who appeared in the April 2025 session can check their scorecard on jeemain.nta.nic.in. Based on the best of two sessions, JEE Advanced eligible candidates list will be released. JEE Advanced 2025 registration will begin from April 26, 2025.",
      category: "jee-mains",
      state: null,
      status: "active",
      totalPosts: null,
      lastDate: "2025-04-26",
      examDate: "2025-04-02",
      requiredDocuments: ["JEE Admit Card", "10th Marksheet", "12th Marksheet", "Aadhar / ID Proof", "Category Certificate"],
      eligibility: "Age: No upper age limit. Education: 12th Pass or Appearing with Physics, Chemistry, Math.",
      officialLink: "https://jeemain.nta.nic.in",
    },
    {
      title: "CRPF Head Constable (Min) 2025 – Written Exam Result Out",
      shortDescription: "CRPF has declared Head Constable (Ministerial) 2025 written exam result. Shortlisted candidates will be called for Skill Test & Document Verification.",
      fullDescription: "Central Reserve Police Force (CRPF) has declared the Head Constable Ministerial (Min) written examination 2025 result. Candidates can check their result on crpf.gov.in. The skill test (typing test) for shortlisted candidates will be held at respective CRPF Group Centers. The final merit list will be prepared based on written exam and skill test performance.",
      category: "police",
      state: null,
      status: "active",
      totalPosts: 249,
      lastDate: "2025-05-15",
      examDate: "2025-03-20",
      requiredDocuments: ["Admit Card", "10th Certificate", "12th Certificate", "PAN Card", "Aadhar Card", "Category Certificate", "Domicile Certificate"],
      eligibility: "Age: 18-25 years. Education: 12th Pass with 50% marks in Maths & English.",
      officialLink: "https://crpf.gov.in",
    },
    {
      title: "CTET February 2025 – Admit Card Released",
      shortDescription: "Central Board of Secondary Education (CBSE) has released CTET February 2025 Admit Card. Exam is scheduled on 20th & 21st April 2025.",
      fullDescription: "CBSE has released the CTET (Central Teacher Eligibility Test) February 2025 Admit Card on ctet.nic.in. Candidates who have applied for Paper 1 (Classes 1-5) or Paper 2 (Classes 6-8) can download their hall ticket by logging in with their application number and date of birth. The exam will be held on April 20 & 21, 2025 at various examination centres across India.",
      category: "teaching-tet",
      state: null,
      status: "upcoming",
      totalPosts: null,
      lastDate: "2025-04-15",
      examDate: "2025-04-20",
      requiredDocuments: ["CTET Admit Card", "ID Proof", "Passport Photo"],
      eligibility: "Paper 1: Senior Secondary (12th) + 2-year D.El.Ed. OR B.Ed. Paper 2: Graduation + B.Ed.",
      officialLink: "https://ctet.nic.in",
    },
    {
      title: "BPSC 70th Integrated Combined Main Exam 2025 Result",
      shortDescription: "Bihar Public Service Commission has declared 70th BPSC Integrated Combined Main Exam 2025 result. 1,949 candidates qualified for interview.",
      fullDescription: "Bihar Public Service Commission (BPSC) has declared the 70th Integrated Combined (Preliminary) Examination 2025 result. A total of 1,949 candidates have been selected for the next stage. The list of qualified candidates along with their roll numbers is available on bpsc.bih.nic.in. Mains exam will be scheduled shortly.",
      category: "state-psc",
      state: "Bihar",
      status: "active",
      totalPosts: 1957,
      lastDate: "2025-05-30",
      examDate: "2025-04-10",
      requiredDocuments: ["BPSC Admit Card", "Aadhar Card", "10th Marksheet", "Graduation Certificate", "Bihar Domicile Certificate"],
      eligibility: "Age: 20-37 years (additional relaxation for SC/ST/OBC). Education: Graduation from recognized University.",
      officialLink: "https://bpsc.bih.nic.in",
    },
    {
      title: "Allahabad High Court RO / ARO 2025 – Application Open",
      shortDescription: "Allahabad High Court has invited applications for Review Officer (RO) and Assistant Review Officer (ARO) posts 2025. Last date to apply is May 15, 2025.",
      fullDescription: "Allahabad High Court, Uttar Pradesh has issued notification for Review Officer (RO) and Assistant Review Officer (ARO) Recruitment 2025. A total of 411 posts are to be filled. Candidates holding graduation degree can apply online through the official website. The written examination will be followed by computer proficiency test and interview.",
      category: "judiciary",
      state: "Uttar Pradesh",
      status: "upcoming",
      totalPosts: 411,
      lastDate: "2025-05-15",
      examDate: null,
      requiredDocuments: ["Educational Certificates", "Aadhar Card", "Photo", "Category Certificate", "UP Domicile"],
      eligibility: "Age: 21-40 years. Education: Graduation from recognized University. Proficiency in Hindi typing required.",
      officialLink: "https://allahabadhighcourt.in",
    },
    {
      title: "Army Agniveer 2025 – Registration Open for 02/2025 Batch",
      shortDescription: "Indian Army has started online registration for Agniveer 02/2025 batch. Eligible candidates can apply on joinindianarmy.nic.in before June 10, 2025.",
      fullDescription: "The Indian Army has opened the online registration window for the Agniveer (02/2025) batch recruitment. Interested and eligible candidates can register at joinindianarmy.nic.in. Rally-based examination and Physical Fitness Test will be conducted after shortlisting. Different branches of Agniveer scheme include Agniveer General Duty (All Arms), Agniveer Technical, Agniveer Clerk/Store Keeper Technical, and Agniveer Tradesman.",
      category: "army-defence",
      state: null,
      status: "upcoming",
      totalPosts: 45000,
      lastDate: "2025-06-10",
      examDate: "2025-07-15",
      requiredDocuments: ["10th Certificate", "12th Certificate", "Aadhar Card", "Domicile Certificate", "Passport Photo", "Category Certificate"],
      eligibility: "Age: 17.5 to 21 years. Education: 10th / 12th depending on trade. Medical fitness required.",
      officialLink: "https://joinindianarmy.nic.in",
    },
    {
      title: "AIIMS Nursing Officer 2025 – 3420 Posts Notification",
      shortDescription: "AIIMS has released notification for 3420 Nursing Officer (Staff Nurse) posts 2025. Online applications open from April 15 on aiimsexams.ac.in.",
      fullDescription: "All India Institute of Medical Sciences (AIIMS), New Delhi has released recruitment notification for 3420 Nursing Officer (Staff Nurse Grade-II) posts 2025. The vacancies are across multiple AIIMS institutions in India. Candidates with GNM or B.Sc. Nursing qualification can apply online. The computer-based test will be conducted by NTA.",
      category: "nursing",
      state: null,
      status: "upcoming",
      totalPosts: 3420,
      lastDate: "2025-05-05",
      examDate: "2025-06-20",
      requiredDocuments: ["GNM / BSc Nursing Certificate", "State Nursing Council Registration", "Aadhar Card", "Graduation Certificate"],
      eligibility: "Age: 18-30 years. Education: B.Sc. Nursing (4 year) OR GNM (3 year) from recognized institution. Must have valid Nursing Council registration.",
      officialLink: "https://aiimsexams.ac.in",
    },
    {
      title: "UPSSSC PET 2025 – Preliminary Eligibility Test Notification",
      shortDescription: "UPSSSC has released notification for PET 2025. Candidates must qualify PET to be eligible for Group-C recruitment in Uttar Pradesh.",
      fullDescription: "Uttar Pradesh Subordinate Services Selection Commission (UPSSSC) has released the Preliminary Eligibility Test (PET) 2025 notification. PET is mandatory for all Group-C posts under UPSSSC. The exam will test candidates on General Hindi, General Knowledge, Elementary Math, General English, Logic & Reasoning, and other subjects. Scorecard valid for 1 year.",
      category: "state-psc",
      state: "Uttar Pradesh",
      status: "upcoming",
      totalPosts: null,
      lastDate: "2025-05-20",
      examDate: "2025-08-10",
      requiredDocuments: ["10th Certificate", "12th Certificate", "UP Domicile Certificate", "Aadhar Card", "Category Certificate"],
      eligibility: "Age: 18-40 years. Education: 10th Pass or above. UP domicile required for most posts.",
      officialLink: "https://upsssc.gov.in",
    },
    {
      title: "SSC MTS 2025 – Havaldar & Multi Tasking Staff Result",
      shortDescription: "SSC has released Multi Tasking Staff (MTS) and Havaldar (CBIC & CBN) Exam 2025 result. Qualified candidates will be called for document verification.",
      fullDescription: "Staff Selection Commission has declared the result of Multi Tasking (Non-Technical) Staff and Havaldar (CBIC & CBN) Examination 2025. The exam was conducted in October-November 2024. Qualified candidates will be called for Document Verification and Physical Efficiency Test (PET) / Physical Standard Test (PST) for Havaldar posts. Final selection list will be published after verification.",
      category: "ssc-cgl",
      state: null,
      status: "active",
      totalPosts: 9583,
      lastDate: "2025-04-25",
      examDate: "2025-03-10",
      requiredDocuments: ["SSC Scorecard", "10th Certificate", "Aadhar Card", "Category Certificate", "Domicile Certificate"],
      eligibility: "Age: 18-25 years (MTS), 18-27 years (Havaldar). Education: 10th Pass from recognized Board.",
      officialLink: "https://ssc.gov.in",
    },
    {
      title: "IBPS RRB Clerk (Office Assistant) 2025 – Notification Out",
      shortDescription: "IBPS has released RRB Office Assistant (Multipurpose) 2025 notification. Applications open from June 2025. Vacancies across rural banks across India.",
      fullDescription: "Institute of Banking Personnel Selection (IBPS) has released the official notification for RRB Office Assistant (Multipurpose) / Clerk 2025. This is for vacancies in Regional Rural Banks (RRBs) across India. Candidates with graduation from recognized university are eligible. The selection process includes Preliminary Exam, Main Exam, and Language Proficiency Test.",
      category: "banking-ibps",
      state: null,
      status: "upcoming",
      totalPosts: 5585,
      lastDate: "2025-07-01",
      examDate: "2025-08-25",
      requiredDocuments: ["Graduation Certificate", "12th Certificate", "Aadhar Card", "Photo", "Category Certificate"],
      eligibility: "Age: 18-28 years. Education: Graduation from recognized University. Local language knowledge preferred.",
      officialLink: "https://ibps.in",
    },
    {
      title: "Rajasthan Police Constable 2025 – 9617 Posts Recruitment",
      shortDescription: "Rajasthan Police has released notification for 9617 Constable posts. Applications open for General Duty, Driver, and Band/Mounted posts.",
      fullDescription: "Rajasthan Police has issued a large-scale recruitment notification for 9617 Constable posts in 2025. Posts include Constable General Duty (Male/Female), Constable Driver, Constable Band, and Constable Mounted. Selection will be through Written Examination, Physical Efficiency Test (PET), Physical Standard Test (PST), and Medical Test. Applications to be submitted on police.rajasthan.gov.in.",
      category: "police",
      state: "Rajasthan",
      status: "upcoming",
      totalPosts: 9617,
      lastDate: "2025-05-31",
      examDate: "2025-09-01",
      requiredDocuments: ["10th / 12th Certificate", "Aadhar Card", "Domicile Certificate", "Character Certificate", "Medical Certificate"],
      eligibility: "Age: 18-24 years (5 yrs relaxation for SC/ST). Education: 12th Pass. Physical standards: Height and Chest measurement required.",
      officialLink: "https://police.rajasthan.gov.in",
    },
    {
      title: "SBI PO 2025 – Probationary Officer Recruitment Notification",
      shortDescription: "State Bank of India has released SBI PO 2025 notification for 600 posts. Apply online on sbi.co.in from April 20 to May 10, 2025.",
      fullDescription: "State Bank of India (SBI) has released the official notification for Probationary Officer (PO) 2025 recruitment. A total of 600 vacancies are to be filled across various branches in India. The selection process comprises of Preliminary Exam, Main Exam, and Group Exercise & Interview. Candidates with graduation from recognized university are eligible to apply.",
      category: "banking-ibps",
      state: null,
      status: "upcoming",
      totalPosts: 600,
      lastDate: "2025-05-10",
      examDate: "2025-06-15",
      requiredDocuments: ["Graduation Certificate", "Identity Proof", "Aadhar Card", "Photo", "Signature"],
      eligibility: "Age: 21-30 years. Education: Graduation in any discipline from recognized University.",
      officialLink: "https://sbi.co.in",
    },
    {
      title: "MPPSC State Service Examination 2024 – Prelims Result",
      shortDescription: "Madhya Pradesh Public Service Commission has declared Prelims result for State Service Exam 2024. 16,000 candidates qualified for Mains.",
      fullDescription: "Madhya Pradesh Public Service Commission (MPPSC) has declared the State Service Exam (SSE) 2024 Preliminary result. Around 16,000 candidates have qualified for the State Service Main Examination 2024. The result is available on mppsc.mp.gov.in. The Main examination will be conducted in the second half of 2025.",
      category: "state-psc",
      state: "Madhya Pradesh",
      status: "active",
      totalPosts: 227,
      lastDate: "2025-06-15",
      examDate: "2025-03-23",
      requiredDocuments: ["MPPSC Admit Card", "Graduation Certificate", "MP Domicile Certificate", "Category Certificate", "Aadhar Card"],
      eligibility: "Age: 21-40 years. Education: Graduation from recognized University. MP domicile required.",
      officialLink: "https://mppsc.mp.gov.in",
    },
    {
      title: "NDA & NA (I) 2025 – Written Exam Result Declared",
      shortDescription: "UPSC has declared NDA & NA (I) 2025 written exam result. Qualified candidates will be called for SSB (Services Selection Board) interview.",
      fullDescription: "Union Public Service Commission (UPSC) has declared the NDA & NA (I) 2025 written examination result. Qualified candidates will be called for Services Selection Board (SSB) for Army, Navy, and Air Force branches. The written exam was conducted on April 13, 2025. Candidates who passed will receive call letters for SSB from respective services.",
      category: "army-defence",
      state: null,
      status: "active",
      totalPosts: 406,
      lastDate: "2025-05-20",
      examDate: "2025-04-13",
      requiredDocuments: ["NDA Admit Card", "10th / 12th Certificate", "Aadhar Card", "Medical Certificate"],
      eligibility: "Age: 16.5-19.5 years. Education: 12th Pass for Army; 12th with Physics & Math for Navy/Air Force.",
      officialLink: "https://upsc.gov.in",
    },
    {
      title: "DSSSB TGT/PGT 2024-25 – Delhi Teacher Recruitment Result",
      shortDescription: "Delhi Subordinate Services Selection Board has declared TGT and PGT 2024-25 result. Over 500 teacher vacancies in Delhi government schools.",
      fullDescription: "Delhi Subordinate Services Selection Board (DSSSB) has published the result of Trained Graduate Teacher (TGT) and Post Graduate Teacher (PGT) 2024-25 examination. Shortlisted candidates will be called for Document Verification. Final appointment will be for teaching positions in Delhi Government Schools under DoE.",
      category: "teaching-tet",
      state: "Delhi",
      status: "active",
      totalPosts: 524,
      lastDate: "2025-05-05",
      examDate: "2025-02-20",
      requiredDocuments: ["Graduation / PG Certificate", "B.Ed. Certificate", "CTET / DSSSB TET Score", "Aadhar Card", "Delhi Domicile"],
      eligibility: "TGT: Graduation + B.Ed. + CTET Paper-II. PGT: Post Graduation + B.Ed. + CTET/DSSSB TET",
      officialLink: "https://dsssb.delhi.gov.in",
    },
  ]);

  // ─── NEWS CATEGORIES ────────────────────────────────────────────────────────
  console.log("Seeding news categories...");
  await db.delete(newsCategoriesTable);
  await db.insert(newsCategoriesTable).values([
    { name: "Exam Notification", slug: "exam-notification", color: "#3b82f6" },
    { name: "Result Update", slug: "result-update", color: "#22c55e" },
    { name: "Education Policy", slug: "education-policy", color: "#8b5cf6" },
    { name: "Admit Card", slug: "admit-card", color: "#f59e0b" },
    { name: "Syllabus & Pattern", slug: "syllabus-pattern", color: "#ef4444" },
    { name: "Interview Tips", slug: "interview-tips", color: "#06b6d4" },
    { name: "Technology in Education", slug: "ed-tech", color: "#84cc16" },
  ]);

  // ─── NEWS ARTICLES ──────────────────────────────────────────────────────────
  console.log("Seeding news articles...");
  await db.delete(newsTable);
  await db.insert(newsTable).values([
    {
      title: "UPSC CSE 2025 Prelims: 3 Lakh+ Students Register, Exam on June 1",
      shortDescription: "Over 3 lakh candidates have registered for UPSC Civil Services Preliminary Examination 2025. The exam is scheduled for June 1, 2025 at centres across India.",
      content: `<p>The Union Public Service Commission (UPSC) has received over 3 lakh applications for the Civil Services (Preliminary) Examination 2025 – making it one of the most competitive IAS exams in recent years.</p>
<h2>Key Dates</h2>
<ul>
<li>Exam Date: June 1, 2025</li>
<li>Admit Card Release: May 15, 2025</li>
<li>Result (Expected): July 2025</li>
</ul>
<h2>Exam Pattern</h2>
<p>UPSC Prelims consists of two papers: General Studies Paper I and CSAT Paper II. Both are objective type, each carrying 200 marks. Paper II (CSAT) is qualifying in nature requiring minimum 33% marks.</p>
<h2>Preparation Tips</h2>
<p>Candidates should focus on NCERT books from Class 6-12, followed by standard reference books for History, Geography, Polity, Economy, and Science. Current affairs from last 12 months are crucial.</p>`,
      category: "exam-notification",
      language: "en",
      author: "Ishu News Desk",
      isTrending: true,
      imageUrl: null,
    },
    {
      title: "JEE Advanced 2025: IIT Kanpur to Host Exam on May 18 – Registration Open",
      shortDescription: "IIT Kanpur will conduct JEE Advanced 2025 on May 18, 2025. Registration begins April 26. Only top 2.5 lakh JEE Mains qualifiers are eligible.",
      content: `<p>Indian Institute of Technology (IIT) Kanpur has been assigned to conduct JEE Advanced 2025. The examination will be held on May 18, 2025. Registration for eligible candidates starts on April 26, 2025.</p>
<h2>Eligibility Criteria</h2>
<p>Only candidates who qualify JEE Main 2025 and fall within the top 2,50,000 across all categories are eligible. First or second attempt criterion also applies.</p>
<h2>Exam Structure</h2>
<p>JEE Advanced consists of two papers (Paper 1 and Paper 2), each 3 hours long. The exam tests candidates on Physics, Chemistry, and Mathematics with both MCQ and numerical types.</p>
<h2>How to Register</h2>
<p>Eligible candidates can register at jeeadv.ac.in using their JEE Main 2025 roll number. Application fee is ₹3,500 for General category.</p>`,
      category: "exam-notification",
      language: "en",
      author: "Ishu Education Team",
      isTrending: true,
      imageUrl: null,
    },
    {
      title: "CBSE Board Exam 2025 Results: Class 10 & 12 Results to be Declared by May 13",
      shortDescription: "CBSE is expected to declare Class 10 and Class 12 board exam results by May 13, 2025. Students can check results on cbseresults.nic.in and DigiLocker.",
      content: `<p>Central Board of Secondary Education (CBSE) is set to announce the Class 10 and Class 12 board examination results 2025 by May 13, 2025. This is based on the official CBSE schedule and marking completion timeline.</p>
<h2>How to Check CBSE Result 2025</h2>
<ol>
<li>Visit cbseresults.nic.in</li>
<li>Click on "Class 10 Result 2025" or "Class 12 Result 2025"</li>
<li>Enter your Roll Number and Date of Birth</li>
<li>Click Submit to view your result</li>
</ol>
<h2>DigiLocker Marksheet</h2>
<p>Students can download their digital marksheet from DigiLocker (digilocker.gov.in) which is accepted as an official document. This eliminates the need for physical marksheets in many situations.</p>
<h2>Compartment Exam</h2>
<p>Students who fail in one subject will get a chance to appear in the Compartment Examination, scheduled for July 2025.</p>`,
      category: "result-update",
      language: "en",
      author: "Ishu News Desk",
      isTrending: true,
      imageUrl: null,
    },
    {
      title: "New Education Policy 2020: 5+3+3+4 System to be Fully Implemented by 2026",
      shortDescription: "The Government of India confirms full implementation of NEP 2020's 5+3+3+4 school structure by 2026. This will replace the current 10+2 system.",
      content: `<p>The Ministry of Education has confirmed that the National Education Policy (NEP) 2020's new school structure – the 5+3+3+4 framework – will be fully operational across all central schools by 2026, and state schools are encouraged to adopt it by the same year.</p>
<h2>What is the 5+3+3+4 Structure?</h2>
<ul>
<li><strong>Foundational Stage (5 years):</strong> Anganwadi + Classes 1-2 (Ages 3-8)</li>
<li><strong>Preparatory Stage (3 years):</strong> Classes 3-5 (Ages 8-11)</li>
<li><strong>Middle Stage (3 years):</strong> Classes 6-8 (Ages 11-14)</li>
<li><strong>Secondary Stage (4 years):</strong> Classes 9-12 (Ages 14-18)</li>
</ul>
<h2>Key Changes Under NEP 2020</h2>
<p>The new policy emphasizes mother tongue / regional language instruction until at least Grade 5, introduces vocational education from Grade 6, and focuses on holistic development over rote learning.</p>`,
      category: "education-policy",
      language: "en",
      author: "Ishu Policy Desk",
      isTrending: false,
      imageUrl: null,
    },
    {
      title: "SSC CGL 2024 Tier-2 Admit Card Released – Exam on December 18-19",
      shortDescription: "Staff Selection Commission has released SSC CGL Tier-2 2024 admit card on ssc.gov.in. The exam will be held on December 18-19, 2025. Download before the exam.",
      content: `<p>The Staff Selection Commission (SSC) has released the Admit Card for CGL (Combined Graduate Level) Tier-II Examination 2024. The exam is scheduled for December 18-19, 2025 at CBT (Computer Based Test) centres across India.</p>
<h2>How to Download SSC CGL Tier-2 Admit Card</h2>
<ol>
<li>Visit ssc.gov.in and click on "Admit Card" link</li>
<li>Select your Regional SSC website</li>
<li>Enter Registration Number and Date of Birth</li>
<li>Download and print the admit card</li>
</ol>
<h2>Exam Centers</h2>
<p>The exam will be held at various cities across all states. Candidates can check their assigned centre on their admit card. No change of centre requests will be entertained.</p>
<h2>Important Instructions</h2>
<p>Candidates must carry the printed admit card along with one original photo ID. Mobile phones and electronic devices are strictly prohibited inside exam halls.</p>`,
      category: "admit-card",
      language: "en",
      author: "Ishu News Desk",
      isTrending: false,
      imageUrl: null,
    },
    {
      title: "NEET UG 2025: NTA Introduces New Rules – No Extra Time for Dress Code Checking",
      shortDescription: "NTA has revised NEET UG 2025 exam day guidelines. New rules include biometric verification, strict dress code enforcement, and revised reporting time.",
      content: `<p>The National Testing Agency (NTA) has updated the exam day guidelines for NEET UG 2025. The changes come after controversies in the previous year and aim to make the examination process more transparent and cheat-free.</p>
<h2>Key Changes in NEET UG 2025 Guidelines</h2>
<ul>
<li>Biometric verification mandatory for all students</li>
<li>Gate closes 15 minutes before exam start (instead of 30 minutes)</li>
<li>AI-based CCTV surveillance at all exam centres</li>
<li>Strict dress code: No full sleeves, no heavy jewellery, sandals/slippers only</li>
<li>Exam centre allotment based on home district to reduce travel stress</li>
</ul>
<h2>Reporting Time</h2>
<p>Candidates must report to the exam hall by 12:30 PM. Exam starts at 2:00 PM. Candidates arriving after 1:30 PM will not be allowed entry.</p>`,
      category: "exam-notification",
      language: "en",
      author: "Ishu Education Team",
      isTrending: true,
      imageUrl: null,
    },
    {
      title: "IBPS RRB 2025: Calendar Released – Prelims in August, Main in October",
      shortDescription: "IBPS has released the official exam calendar for RRB 2025. Officer Scale & Office Assistant Prelims scheduled for August, Main exams in October 2025.",
      content: `<p>The Institute of Banking Personnel Selection (IBPS) has released the official exam calendar for Regional Rural Bank (RRB) recruitment 2025. The annual recruitment covers Officer Scale I, II, III posts and Office Assistant (Multipurpose) posts across all Regional Rural Banks in India.</p>
<h2>IBPS RRB 2025 Calendar</h2>
<table>
<tr><th>Event</th><th>Tentative Date</th></tr>
<tr><td>Notification Release</td><td>June 2025</td></tr>
<tr><td>Online Application</td><td>June-July 2025</td></tr>
<tr><td>Officer Scale Prelims</td><td>August 2025</td></tr>
<tr><td>Office Assistant Prelims</td><td>August 2025</td></tr>
<tr><td>Main Exam (Both)</td><td>October 2025</td></tr>
<tr><td>Interview (Officers only)</td><td>November-December 2025</td></tr>
</table>
<h2>Expected Vacancies</h2>
<p>Based on previous year trends, IBPS RRB 2025 is expected to notify over 9,000 vacancies for Officer and Office Assistant posts combined across 43 Regional Rural Banks.</p>`,
      category: "exam-notification",
      language: "en",
      author: "Ishu Banking Desk",
      isTrending: false,
      imageUrl: null,
    },
    {
      title: "UP Board 2025 Class 10 & 12 Result: Expected Date, How to Check",
      shortDescription: "UP Board (UPMSP) is expected to declare Class 10 and Class 12 results for 2025 in April. Over 55 lakh students appeared for the exams this year.",
      content: `<p>The Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP), commonly known as UP Board, is expected to declare the Class 10 and Class 12 results for 2025 in April. This year, approximately 55 lakh students appeared for the board examinations.</p>
<h2>How to Check UP Board Result 2025</h2>
<ol>
<li>Visit upmsp.edu.in or upresults.nic.in</li>
<li>Click on "UP Board Result 2025"</li>
<li>Enter your Roll Number</li>
<li>View and download your marksheet</li>
</ol>
<h2>Pass Percentage Trend</h2>
<p>In 2024, the UP Board Class 10 pass percentage was 89.55% and Class 12 was 82.60%. The 2025 results are expected to show a similar or improved trend based on examination difficulty level reported by students.</p>`,
      category: "result-update",
      language: "en",
      author: "Ishu State Desk",
      isTrending: false,
      imageUrl: null,
    },
    {
      title: "RRB ALP 2025: 18,799 Vacancies Notified – Biggest Railway Tech Recruitment",
      shortDescription: "Railway Recruitment Board has notified 18,799 Apprentice Loco Pilot (ALP) vacancies for 2025. This is the biggest ALP recruitment drive in recent years.",
      content: `<p>Railway Recruitment Board (RRB) has notified a massive 18,799 vacancies for Assistant Loco Pilot (ALP) in 2025 – one of the largest technical recruitment drives by Indian Railways in recent times. Applications are being accepted online on rrbapply.gov.in.</p>
<h2>Post Details</h2>
<ul>
<li>Post Name: Assistant Loco Pilot (ALP)</li>
<li>Total Vacancies: 18,799</li>
<li>Pay Scale: Level-2 (₹19,900 – ₹63,200)</li>
</ul>
<h2>Eligibility</h2>
<p>Age: 18-28 years. Education: 10th + ITI in relevant trades (Electrician, Fitter, Electronics, etc.) OR Diploma in Mechanical/Electrical Engineering.</p>
<h2>Selection Process</h2>
<p>CBT Stage-1 → CBT Stage-2 → CBAT (Computer Based Aptitude Test) → Document Verification → Medical Examination.</p>`,
      category: "exam-notification",
      language: "en",
      author: "Ishu Railway Desk",
      isTrending: true,
      imageUrl: null,
    },
    {
      title: "GATE 2025 Results Declared: IIT Roorkee Announces Topper, Cut-off Scores",
      shortDescription: "IIT Roorkee has declared GATE 2025 results. The exam was held in February 2025 across 29 papers. Scorecard valid for PSU recruitment and M.Tech admissions.",
      content: `<p>Indian Institute of Technology (IIT) Roorkee has declared the GATE (Graduate Aptitude Test in Engineering) 2025 results on gate.iitr.ac.in. The exam was conducted in February 2025 and saw over 7.5 lakh registrations across 29 papers.</p>
<h2>How to Download GATE 2025 Scorecard</h2>
<ol>
<li>Visit gate.iitr.ac.in</li>
<li>Login with Enrollment ID and password</li>
<li>Click on Scorecard Download</li>
<li>Print the scorecard for future use</li>
</ol>
<h2>GATE 2025 Scores for PSU Recruitment</h2>
<p>Over 60 Public Sector Undertakings (PSUs) including BHEL, GAIL, NTPC, ONGC, IOCL, and BPCL use GATE scores for direct recruitment. Candidates with valid GATE 2025 scores can apply to these PSUs as and when they release notifications.</p>`,
      category: "result-update",
      language: "en",
      author: "Ishu Education Team",
      isTrending: false,
      imageUrl: null,
    },
    {
      title: "CTET July 2025 Notification Out – Online Applications Start May 15",
      shortDescription: "CBSE has released CTET July 2025 notification. Applications open May 15 on ctet.nic.in. Exam on July 20, 2025. Qualify to teach in KVS, NVS, and government schools.",
      content: `<p>Central Board of Secondary Education (CBSE) has released the official notification for CTET (Central Teacher Eligibility Test) July 2025. The exam will be conducted on July 20, 2025 at examination centres across India.</p>
<h2>CTET July 2025 Important Dates</h2>
<ul>
<li>Notification Date: April 15, 2025</li>
<li>Application Start: May 15, 2025</li>
<li>Last Date to Apply: June 14, 2025</li>
<li>Admit Card: July 5, 2025</li>
<li>Exam Date: July 20, 2025</li>
</ul>
<h2>Validity of CTET Certificate</h2>
<p>As per recent CBSE rules, the CTET qualification certificate is now valid for lifetime. Earlier it was valid for only 7 years. This is a major relief for all CTET qualified candidates.</p>`,
      category: "exam-notification",
      language: "en",
      author: "Ishu Teaching Desk",
      isTrending: false,
      imageUrl: null,
    },
    {
      title: "PM eVidya Portal Adds 5 New DTH Channels for Rural Students: Classes 1-12",
      shortDescription: "Ministry of Education has launched 5 new PM eVidya DTH channels targeting rural students without internet access. Content covers Classes 1-12 in Hindi and regional languages.",
      content: `<p>The Ministry of Education under the PM eVidya initiative has launched 5 additional DTH (Direct-to-Home) television channels dedicated to school education for students in rural areas with limited or no internet connectivity.</p>
<h2>New Channels Overview</h2>
<p>The new channels are part of the "One Class One Channel" initiative under PM eVidya and now cover Classes 1 through 12 comprehensively. Content is available in Hindi as well as 12 major regional languages.</p>
<h2>How to Access</h2>
<p>Channels are available on Doordarshan Free DTH (DD Free Dish) platform. Students in rural areas can access them with a standard set-top box and dish antenna – no internet connection required.</p>
<h2>Impact</h2>
<p>The initiative aims to reach over 25 crore students across India, particularly those in rural areas where digital infrastructure is still being developed.</p>`,
      category: "education-policy",
      language: "en",
      author: "Ishu Policy Desk",
      isTrending: false,
      imageUrl: null,
    },
  ]);

  // ─── BLOG CATEGORIES ────────────────────────────────────────────────────────
  console.log("Seeding blog categories...");
  await db.delete(blogCategoriesTable);
  await db.insert(blogCategoriesTable).values([
    { name: "Study Strategy", slug: "study-strategy" },
    { name: "Career Guidance", slug: "career-guidance" },
    { name: "Exam Analysis", slug: "exam-analysis" },
    { name: "Government Jobs", slug: "government-jobs" },
    { name: "PDF & Tools Tips", slug: "tools-tips" },
    { name: "Success Stories", slug: "success-stories" },
  ]);

  // ─── BLOGS ──────────────────────────────────────────────────────────────────
  console.log("Seeding blogs...");
  await db.delete(blogsTable);
  await db.insert(blogsTable).values([
    {
      title: "How to Crack UPSC CSE 2025 in Your First Attempt: The Complete Roadmap",
      slug: "upsc-cse-2025-first-attempt-roadmap",
      excerpt: "A structured, practical guide to UPSC Civil Services preparation from scratch. Learn how toppers plan their study, manage time, and choose optional subjects wisely.",
      content: `<h2>Introduction</h2>
<p>Cracking UPSC in the first attempt is possible – but it requires a smart, structured approach. This guide breaks down the preparation strategy used by successful IAS officers.</p>
<h2>Step 1: Understand the Exam Structure</h2>
<p>UPSC CSE has three stages: Prelims (Objective), Mains (Descriptive), and Interview. The Prelims acts as a filter; the Mains decides your final rank. The Interview carries 275 marks.</p>
<h2>Step 2: The NCERT Foundation</h2>
<p>Start with NCERT books from Class 6-12 across subjects: History, Geography, Political Science, Economics, and Science. These form the base for both GS and optional subjects.</p>
<h2>Step 3: Standard Reference Books</h2>
<ul>
<li>History: Bipin Chandra, Spectrum Modern History</li>
<li>Geography: G.C. Leong, NCERT Atlas</li>
<li>Polity: M Laxmikant</li>
<li>Economy: Ramesh Singh</li>
<li>Environment: Shankar IAS</li>
<li>Current Affairs: The Hindu, PIB, Vision IAS monthly</li>
</ul>
<h2>Step 4: Revision is Key</h2>
<p>Make short notes for every topic. Revise at least 3-4 times before the exam. Most successful candidates credit rigorous revision over reading new material before the exam.</p>
<h2>Step 5: Answer Writing Practice</h2>
<p>For Mains, practice answer writing from Day 1. Join a test series. Aim to write at least 2 answers per day. Focus on structure, keywords, and value addition.</p>
<h2>Timeline Suggestion</h2>
<p>If you're starting from scratch with 12 months to go, allocate 6 months for basics (NCERT + standard books), 4 months for answer writing + current affairs, and 2 months for revision and mock tests.</p>`,
      category: "study-strategy",
      tags: ["UPSC", "IAS", "Civil Services", "Exam Preparation", "Study Tips"],
      author: "Rajendra Mishra",
      readTime: 12,
      isFeatured: true,
    },
    {
      title: "SSC CGL vs IBPS PO: Which is Better for You in 2025?",
      slug: "ssc-cgl-vs-ibps-po-2025-comparison",
      excerpt: "Confused between SSC CGL and IBPS PO? This detailed comparison covers salary, job profile, work-life balance, career growth, and preparation strategy.",
      content: `<h2>Overview</h2>
<p>Two of India's most popular government job exams – SSC CGL and IBPS PO – attract millions of aspirants every year. But which one should you target? This analysis will help you decide.</p>
<h2>Salary Comparison (2025)</h2>
<table>
<tr><th>Parameter</th><th>SSC CGL (Group B)</th><th>IBPS PO</th></tr>
<tr><td>Basic Pay</td><td>₹47,600</td><td>₹36,000 - ₹63,840</td></tr>
<tr><td>Gross Salary</td><td>₹55,000 - ₹65,000</td><td>₹52,000 - ₹58,000</td></tr>
<tr><td>HRA + DA</td><td>High (metro cities)</td><td>High (varies by posting)</td></tr>
</table>
<h2>Job Profile</h2>
<p><strong>SSC CGL:</strong> Mostly desk/office work in Central Government ministries/departments. Audit Officer, Inspector (Income Tax/Customs), Examiner, Statistical Investigator are popular posts.</p>
<p><strong>IBPS PO:</strong> Banking operations, loan processing, customer interaction, branch management, field visits. More dynamic but also more demanding.</p>
<h2>Career Growth</h2>
<p>IBPS PO: Faster promotions through banking ladder (Manager → Senior Manager → Chief Manager → AGM). SSC CGL: Promotion depends on department, usually slower but stable.</p>
<h2>Exam Difficulty</h2>
<p>Both are tough. IBPS PO selection ratio is approximately 1:500 in recent years. SSC CGL Tier-1 cutoff hovers around 140/200 for General category. Both require serious preparation of 6-12 months.</p>
<h2>Our Recommendation</h2>
<p>If you enjoy numbers, communication, and a dynamic environment – go for IBPS PO. If you prefer stability, fixed hours, and are strong in reasoning and GK – SSC CGL is better.</p>`,
      category: "career-guidance",
      tags: ["SSC CGL", "IBPS PO", "Government Jobs", "Career Comparison", "Banking"],
      author: "Neha Gupta",
      readTime: 10,
      isFeatured: true,
    },
    {
      title: "How I Cleared SSC CGL in 6 Months While Working Full-Time",
      slug: "ssc-cgl-6-months-working-professional",
      excerpt: "True story of a working professional who cracked SSC CGL 2024 in just 6 months of preparation. Daily routine, study plan, and the resources that made the difference.",
      content: `<h2>My Background</h2>
<p>My name is Arjun Verma and I work as a software engineer in Pune. I decided to prepare for SSC CGL in January 2024 and cleared Tier-2 in July 2024. Here's my honest account of how I did it.</p>
<h2>Daily Routine (Weekdays)</h2>
<ul>
<li>5:30 AM – 7:00 AM: Quant and Reasoning (1.5 hours)</li>
<li>9:00 PM – 11:00 PM: English and GK (2 hours)</li>
</ul>
<h2>Weekends</h2>
<p>4-5 hours of focused study on Saturday, 3-4 hours on Sunday plus one full mock test.</p>
<h2>Resources I Used</h2>
<ul>
<li>Quantitative Aptitude: R.S. Aggarwal + KD Campus</li>
<li>Reasoning: Arihant Publication</li>
<li>English: Neetu Singh, Norman Lewis Word Power</li>
<li>GK / Current Affairs: Lucent's + monthly GK capsule PDFs</li>
<li>Mock Tests: Testbook, BYJU's Exam Prep</li>
</ul>
<h2>Key Lessons Learned</h2>
<p>Consistency beats intensity. Don't try to cover everything – focus on high-weightage topics. Revise mock test mistakes rather than attempting new tests. Sleep well – 7 hours minimum.</p>`,
      category: "success-stories",
      tags: ["SSC CGL", "Working Professional", "Success Story", "Study Plan"],
      author: "Arjun Verma",
      readTime: 8,
      isFeatured: false,
    },
    {
      title: "NEET UG 2025 Syllabus Analysis: Topics with Highest Weightage",
      slug: "neet-ug-2025-syllabus-weightage-analysis",
      excerpt: "Chapter-wise analysis of NEET UG syllabus based on past 10 years data. Find out which topics in Physics, Chemistry, and Biology have maximum questions.",
      content: `<h2>Introduction</h2>
<p>Understanding the weightage of topics in NEET UG is crucial for smart preparation. This analysis is based on questions asked from 2015 to 2024 to help you prioritize effectively.</p>
<h2>Biology (360 marks | 90 questions)</h2>
<p>Biology carries the maximum weight (50%) in NEET. High-priority topics:</p>
<ul>
<li>Genetics & Evolution (12-14 questions)</li>
<li>Human Physiology (10-12 questions)</li>
<li>Plant Physiology (8-9 questions)</li>
<li>Biotechnology (6-8 questions)</li>
<li>Ecology & Environment (8-10 questions)</li>
</ul>
<h2>Chemistry (180 marks | 45 questions)</h2>
<ul>
<li>Organic Chemistry: Carbonyl Compounds, Amines (10-12 questions)</li>
<li>Physical Chemistry: Equilibrium, Thermodynamics (8-10 questions)</li>
<li>Coordination Compounds (4-5 questions)</li>
</ul>
<h2>Physics (180 marks | 45 questions)</h2>
<ul>
<li>Modern Physics: Dual Nature, Atoms, Nuclei (7-9 questions)</li>
<li>Mechanics: Laws of Motion, Work-Energy (6-8 questions)</li>
<li>Optics (5-6 questions)</li>
<li>Electrostatics & Current Electricity (6-7 questions)</li>
</ul>
<h2>Strategy Based on This Analysis</h2>
<p>Start with high-weightage Biology chapters. For Chemistry, focus on Organic – it's consistent. For Physics, Modern Physics topics are increasingly important.</p>`,
      category: "exam-analysis",
      tags: ["NEET UG", "Syllabus", "Medical Entrance", "Biology", "Physics", "Chemistry"],
      author: "Dr. Priya Sharma",
      readTime: 9,
      isFeatured: true,
    },
    {
      title: "10 Best Free PDF Tools Every Student Should Know About in 2025",
      slug: "best-free-pdf-tools-students-2025",
      excerpt: "A comprehensive guide to free PDF tools that help students merge, compress, convert, and annotate PDFs for academic work – no subscription required.",
      content: `<h2>Why PDF Tools Matter for Students</h2>
<p>Students deal with PDFs daily – lecture notes, admit cards, application forms, study materials. The right PDF tools can save hours. Here are the most useful ones, all free.</p>
<h2>1. PDF Merge Tool</h2>
<p>Combine multiple PDF files into one. Ideal for merging chapter-wise notes, combining admit cards with mark sheets for applications, or consolidating research papers.</p>
<h2>2. PDF Compressor</h2>
<p>Reduce PDF file size without losing quality. Most government portals have upload size limits (usually 100-500 KB). A compressor helps you meet these requirements.</p>
<h2>3. PDF to Word Converter</h2>
<p>Convert PDF study material to editable Word format for making notes or highlighting important parts. Also useful for typing out answers from PDF question papers.</p>
<h2>4. Image to PDF</h2>
<p>Convert JPG, PNG, or JPEG images to PDF. Useful when you need to upload handwritten documents or photos of certificates as PDF for online applications.</p>
<h2>5. PDF Page Extractor</h2>
<p>Extract specific pages from a large PDF document. Get only the chapter you need without downloading the entire book PDF.</p>
<h2>How to Use Ishu PDF Tools</h2>
<p>All these tools are available for free on Ishu.in's Tools section. No registration required, no watermarks, no file size limits up to 100MB. Works on mobile and desktop.</p>`,
      category: "tools-tips",
      tags: ["PDF Tools", "Student Tools", "Free Tools", "Productivity"],
      author: "Ishu Tech Team",
      readTime: 6,
      isFeatured: false,
    },
    {
      title: "State PSC vs Central Government Jobs: The Ultimate Comparison 2025",
      slug: "state-psc-vs-central-government-jobs-2025",
      excerpt: "Should you target State PSC or Central Government exams? This guide compares salary, job security, posting preferences, transfer policies, and career growth.",
      content: `<h2>Introduction</h2>
<p>Millions of Indian graduates face this dilemma every year: prepare for State PSC exams (like BPSC, MPPSC, UPPSC) or go for Central Government jobs (UPSC, SSC, IBPS)? This guide breaks it down objectively.</p>
<h2>Salary Comparison</h2>
<p>Central Government jobs generally offer higher pay due to 7th Pay Commission. However, state governments have also revised their scales. Post-2024, many state PSC officers earn ₹60,000-₹1,00,000+ per month including HRA and DA.</p>
<h2>Posting & Transfer</h2>
<p><strong>State PSC:</strong> Generally posted within your home state. Most officers can stay near their hometown. Transfers within state are manageable. <strong>Central Govt:</strong> Pan-India posting. SSC CGL, IBPS officers can be posted anywhere in India. UPSC IAS officers can negotiate cadre to some extent.</p>
<h2>Number of Vacancies</h2>
<p>State PSC vacancies vary by state but are generally higher in populous states (UP, Bihar, Rajasthan, MP) with thousands of posts annually. Central Govt exams like SSC CGL also have 10,000+ vacancies annually.</p>
<h2>Exam Difficulty</h2>
<p>UPSC CSE is the hardest exam in India. State PSC exams are easier by comparison but still competitive. SSC and IBPS are moderately difficult with standardized patterns.</p>`,
      category: "government-jobs",
      tags: ["State PSC", "Central Government", "Government Jobs", "Career Planning"],
      author: "Vikram Singh",
      readTime: 11,
      isFeatured: false,
    },
  ]);

  // ─── TOOLS ──────────────────────────────────────────────────────────────────
  console.log("Seeding tools...");
  await db.delete(toolsTable);
  await db.insert(toolsTable).values([
    // PDF Operations
    { name: "Merge PDF", slug: "merge-pdf", description: "Combine multiple PDF files into a single document. Drag, reorder, and merge. No file size limit.", category: "pdf-operations", icon: "FileStack", isNew: false },
    { name: "Split PDF", slug: "split-pdf", description: "Split a PDF into multiple files. Extract specific pages or split by page ranges.", category: "pdf-operations", icon: "Scissors", isNew: false },
    { name: "Compress PDF", slug: "compress-pdf", description: "Reduce PDF file size while maintaining quality. Perfect for email attachments and portal uploads.", category: "pdf-operations", icon: "Archive", isNew: false },
    { name: "Rotate PDF", slug: "rotate-pdf", description: "Rotate PDF pages by 90, 180, or 270 degrees. Fix orientation of scanned documents.", category: "pdf-operations", icon: "RotateCcw", isNew: false },
    { name: "Reorder PDF Pages", slug: "reorder-pdf", description: "Rearrange pages within a PDF document. Drag and drop pages to any position.", category: "pdf-operations", icon: "ArrowUpDown", isNew: false },
    { name: "Delete PDF Pages", slug: "delete-pdf-pages", description: "Remove unwanted pages from a PDF document quickly and easily.", category: "pdf-operations", icon: "Trash2", isNew: false },
    { name: "Extract PDF Pages", slug: "extract-pdf-pages", description: "Extract specific pages from a PDF and save as a new file.", category: "pdf-operations", icon: "FileOutput", isNew: false },
    { name: "Add Page Numbers", slug: "add-page-numbers", description: "Add page numbers to PDF documents. Choose position, format, and starting number.", category: "pdf-operations", icon: "Hash", isNew: true },
    { name: "Add Watermark", slug: "add-watermark", description: "Add text or image watermark to PDF files. Set transparency, position, and rotation.", category: "pdf-operations", icon: "Stamp", isNew: false },
    { name: "Crop PDF", slug: "crop-pdf", description: "Crop PDF pages to remove margins or unwanted content areas.", category: "pdf-operations", icon: "Crop", isNew: false },
    // PDF Conversion - To PDF
    { name: "Word to PDF", slug: "word-to-pdf", description: "Convert DOCX / DOC files to PDF format. Preserves formatting, fonts, and layout.", category: "pdf-conversion", icon: "FileText", isNew: false },
    { name: "Excel to PDF", slug: "excel-to-pdf", description: "Convert Excel spreadsheets (XLSX, XLS) to PDF. Maintains tables and formatting.", category: "pdf-conversion", icon: "Sheet", isNew: false },
    { name: "PowerPoint to PDF", slug: "ppt-to-pdf", description: "Convert PPT/PPTX presentations to PDF format. All slides, animations converted.", category: "pdf-conversion", icon: "Presentation", isNew: false },
    { name: "Image to PDF", slug: "image-to-pdf", description: "Convert JPG, PNG, BMP, or TIFF images to PDF. Supports multiple image upload.", category: "pdf-conversion", icon: "Image", isNew: false },
    { name: "HTML to PDF", slug: "html-to-pdf", description: "Convert HTML web pages or code to PDF documents. Preserve styling and layout.", category: "pdf-conversion", icon: "Globe", isNew: false },
    { name: "TXT to PDF", slug: "txt-to-pdf", description: "Convert plain text (.txt) files to properly formatted PDF documents.", category: "pdf-conversion", icon: "AlignLeft", isNew: false },
    // PDF Conversion - From PDF
    { name: "PDF to Word", slug: "pdf-to-word", description: "Convert PDF to editable Word document (DOCX). Accurate text and formatting extraction.", category: "pdf-conversion", icon: "FileText", isNew: false },
    { name: "PDF to Excel", slug: "pdf-to-excel", description: "Extract tables from PDF and convert to Excel format for data analysis.", category: "pdf-conversion", icon: "Sheet", isNew: false },
    { name: "PDF to PowerPoint", slug: "pdf-to-ppt", description: "Convert PDF slides back to editable PowerPoint presentation.", category: "pdf-conversion", icon: "Presentation", isNew: false },
    { name: "PDF to JPG", slug: "pdf-to-jpg", description: "Convert PDF pages to high-quality JPG images. Choose resolution and quality.", category: "pdf-conversion", icon: "Image", isNew: false },
    { name: "PDF to PNG", slug: "pdf-to-png", description: "Convert PDF pages to PNG format with transparency support.", category: "pdf-conversion", icon: "Image", isNew: false },
    { name: "PDF to HTML", slug: "pdf-to-html", description: "Convert PDF documents to HTML format for web publishing.", category: "pdf-conversion", icon: "Code", isNew: false },
    { name: "PDF to Text", slug: "pdf-to-text", description: "Extract all text content from a PDF file. Supports multi-language PDFs.", category: "pdf-conversion", icon: "AlignLeft", isNew: false },
    // PDF Security
    { name: "Protect PDF", slug: "protect-pdf", description: "Add password protection to PDF files. Set permissions for printing, editing, copying.", category: "pdf-security", icon: "Lock", isNew: false },
    { name: "Unlock PDF", slug: "unlock-pdf", description: "Remove password from PDF files. Unlock PDFs that you have access credentials for.", category: "pdf-security", icon: "Unlock", isNew: false },
    { name: "Sign PDF", slug: "sign-pdf", description: "Add digital signature or draw signature on PDF documents. Create signed copies.", category: "pdf-security", icon: "Pen", isNew: false },
    { name: "Redact PDF", slug: "redact-pdf", description: "Permanently redact (blackout) sensitive information from PDF documents.", category: "pdf-security", icon: "EyeOff", isNew: true },
    // PDF Editing
    { name: "Edit PDF Text", slug: "edit-pdf", description: "Edit text directly in PDF documents. Change fonts, sizes, and colors.", category: "pdf-editing", icon: "Edit", isNew: false },
    { name: "Annotate PDF", slug: "annotate-pdf", description: "Add comments, highlights, sticky notes, and drawings to PDF files.", category: "pdf-editing", icon: "MessageSquare", isNew: false },
    { name: "Fill PDF Forms", slug: "fill-pdf-forms", description: "Fill interactive PDF forms online. No software installation required.", category: "pdf-editing", icon: "FormInput", isNew: false },
    { name: "Flatten PDF", slug: "flatten-pdf", description: "Flatten fillable PDF forms to make them non-editable and secure.", category: "pdf-editing", icon: "Layers", isNew: false },
    // Image Tools
    { name: "Compress Image", slug: "compress-image", description: "Reduce image file size while maintaining visual quality. Supports JPG, PNG, WebP.", category: "image-tools", icon: "ZoomOut", isNew: false },
    { name: "Resize Image", slug: "resize-image", description: "Resize images to any dimension. Maintain aspect ratio or set custom dimensions.", category: "image-tools", icon: "Maximize2", isNew: false },
    { name: "Crop Image", slug: "crop-image", description: "Crop images to any shape or size. Free crop or preset aspect ratios.", category: "image-tools", icon: "CropIcon", isNew: false },
    { name: "Convert Image Format", slug: "convert-image", description: "Convert between JPG, PNG, WebP, BMP, GIF, and TIFF formats.", category: "image-tools", icon: "RefreshCw", isNew: false },
    { name: "Remove Background", slug: "remove-background", description: "Remove image background automatically using AI. Get transparent PNG output.", category: "image-tools", icon: "Layers", isNew: true },
    { name: "Add Text to Image", slug: "add-text-image", description: "Add text overlays to images. Choose font, size, color, and position.", category: "image-tools", icon: "Type", isNew: false },
    // AI Tools
    { name: "AI PDF Summarizer", slug: "ai-pdf-summarizer", description: "Upload a PDF and get an AI-generated summary. Understand long documents in seconds.", category: "ai-tools", icon: "Brain", isNew: true },
    { name: "AI Chat with PDF", slug: "ai-chat-pdf", description: "Ask questions about your PDF document and get instant AI-powered answers.", category: "ai-tools", icon: "MessageCircle", isNew: true },
    { name: "AI Text Extractor", slug: "ai-text-extractor", description: "Use AI to extract and clean text from scanned PDFs (OCR). Supports Hindi, English.", category: "ai-tools", icon: "ScanText", isNew: true },
    { name: "AI Document Translator", slug: "ai-translate", description: "Translate PDF documents between English, Hindi, and 50+ languages using AI.", category: "ai-tools", icon: "Languages", isNew: true },
    // Utility Tools
    { name: "QR Code Generator", slug: "qr-generator", description: "Generate QR codes for URLs, text, phone numbers, emails. Download as PNG/SVG.", category: "utility", icon: "QrCode", isNew: false },
    { name: "Barcode Generator", slug: "barcode-generator", description: "Create barcodes in multiple formats (EAN, UPC, Code 128, QR). High resolution output.", category: "utility", icon: "BarChart2", isNew: false },
    { name: "Word Counter", slug: "word-counter", description: "Count words, characters, paragraphs, and sentences. Estimate reading time.", category: "utility", icon: "AlignLeft", isNew: false },
    { name: "Password Generator", slug: "password-generator", description: "Generate strong, secure passwords. Set length, complexity, and character types.", category: "utility", icon: "KeyRound", isNew: false },
    { name: "Unit Converter", slug: "unit-converter", description: "Convert between units of length, weight, temperature, area, volume, and more.", category: "utility", icon: "Scale", isNew: false },
    { name: "Color Picker", slug: "color-picker", description: "Pick colors and get HEX, RGB, HSL values. Generate color palettes.", category: "utility", icon: "Palette", isNew: false },
  ]);

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
