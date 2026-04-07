export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "Is Ishu completely free to use?",
    answer:
      "Yes, core sections of Ishu are free for students. You can access exam results, use available PDF tools, download study resources, and read the latest news without subscription fees.",
  },
  {
    id: 2,
    question: "How quickly are government exam results updated?",
    answer:
      "Result updates are published as soon as verified data is available in our system. We prioritize official board updates including UPSC, SSC, IBPS, RRB, NTA, and state-level recruitment boards.",
  },
  {
    id: 3,
    question: "Are the PDF tools safe for my documents?",
    answer:
      "Your files are processed securely and are not stored permanently after processing. Uploads are deleted after processing is complete.",
  },
  {
    id: 4,
    question: "Which exams does Ishu cover?",
    answer:
      "Ishu covers major central and state-level exams including UPSC, SSC, IBPS, RRB, NDA, CDS, NEET, JEE, GATE, UGC NET, and state PSC exams.",
  },
  {
    id: 5,
    question: "Can I get notifications for specific exams?",
    answer:
      "Yes. You can subscribe for updates and receive alerts for result declarations, admit card releases, new vacancies, and important date changes.",
  },
  {
    id: 6,
    question: "Are study resources sourced from official references?",
    answer:
      "Resources are curated from official portals and recognized sources. Whenever possible, direct source links are provided for verification.",
  },
  {
    id: 7,
    question: "How can I report missing or incorrect information?",
    answer:
      "Use the Contact page to report inaccuracies or missing information. Reports are reviewed and updated by the team.",
  },
  {
    id: 8,
    question: "Does Ishu support Indian regional languages?",
    answer:
      "Yes. Ishu supports multiple Indian languages, and language support is expanded over time across sections.",
  },
];

export function useFaqItems(): FaqItem[] {
  return FAQ_ITEMS;
}
