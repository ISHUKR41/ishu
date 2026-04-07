/**
 * Home FAQ Section - Backend Data Layer
 * Real FAQ data for the platform.
 * Changes here do NOT affect any other section.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What is ISHU (Indian Student Hub University)?",
    answer: "ISHU is India's comprehensive education platform that provides government exam results, free PDF & AI tools, educational news, study resources, and career guidance — all in one place for students and job seekers across India."
  },
  {
    question: "Is ISHU completely free to use?",
    answer: "Yes! All features on ISHU are 100% free. This includes access to exam results, all PDF tools (merge, split, compress, convert), news updates, study resources, previous year papers, and WhatsApp notifications."
  },
  {
    question: "How do I get WhatsApp notifications for exam results?",
    answer: "Simply enter your name and WhatsApp number in the 'Never Miss an Update' section on our homepage. You can choose which exam categories you want notifications for — UPSC, SSC, Banking, Railway, JEE, NEET, and more."
  },
  {
    question: "Which government exams does ISHU cover?",
    answer: "ISHU covers all major Indian government exams including UPSC (IAS, IPS, IFS), SSC (CGL, CHSL, MTS), Banking (IBPS, SBI), Railway (RRB NTPC, Group D), Defence (NDA, CDS), JEE, NEET, State PSC, Teaching (CTET, TET), Police, Engineering, and Judiciary exams."
  },
  {
    question: "Can I access state-wise results on ISHU?",
    answer: "Yes! ISHU provides results for all 28 states and 8 union territories of India. You can navigate to the Results page and select your state to see state-specific exam results, vacancies, and notifications."
  },
  {
    question: "What PDF tools are available on ISHU?",
    answer: "ISHU offers 100+ free PDF tools including: Merge PDF, Split PDF, Compress PDF, PDF to Word, Word to PDF, PDF to JPG, JPG to PDF, Edit PDF, Sign PDF, Watermark, Rotate PDF, OCR PDF, Translate PDF, and many more conversion tools."
  },
  {
    question: "Is my data safe on ISHU?",
    answer: "Absolutely. We do not store any files you upload for processing — they are automatically deleted after processing. Your personal information is encrypted and never shared with third parties. We follow strict data protection practices."
  },
  {
    question: "How often is the news section updated?",
    answer: "Our news section is updated multiple times daily with the latest education, examination, and career news from across India. We cover central and state-level developments, new job notifications, scholarship announcements, and more."
  },
];
