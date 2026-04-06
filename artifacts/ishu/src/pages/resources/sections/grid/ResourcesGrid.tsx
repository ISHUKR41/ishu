import { motion } from "framer-motion";
import { FileText, Download, BookOpen, Video, PenTool, Globe, FileCheck, Brain } from "lucide-react";
import styles from "./resources-grid.module.css";

const allResources = [
  { id: 1, title: "UPSC CSE Previous Year Question Papers (2013-2024)", desc: "Complete collection of UPSC Civil Services Prelims and Mains question papers with answer keys.", type: "previous-papers", exam: "UPSC CSE", iconColor: "#3b82f6", iconBg: "rgba(59,130,246,0.12)", Icon: FileText },
  { id: 2, title: "SSC CGL Complete Syllabus & Exam Pattern 2024", desc: "Detailed syllabus for Tier 1, 2, 3 and 4 with important topics and marking scheme.", type: "syllabus", exam: "SSC CGL", iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", Icon: FileCheck },
  { id: 3, title: "IBPS PO Free Mock Test Series (25 Full Tests)", desc: "Comprehensive mock tests covering all sections: Reasoning, Quant, English, GA.", type: "mock-tests", exam: "IBPS PO", iconColor: "#10b981", iconBg: "rgba(16,185,129,0.12)", Icon: Brain },
  { id: 4, title: "NCERT Notes for UPSC - Complete Set", desc: "Concise summary notes from NCERT Class 6-12 covering History, Geography, Polity, Economy.", type: "study-notes", exam: "UPSC CSE", iconColor: "#f97316", iconBg: "rgba(249,115,22,0.12)", Icon: BookOpen },
  { id: 5, title: "Best Books for RRB NTPC 2024 - Expert Picks", desc: "Curated list of top books for all subjects with links to buy or download legally.", type: "books", exam: "RRB NTPC", iconColor: "#eab308", iconBg: "rgba(234,179,8,0.12)", Icon: BookOpen },
  { id: 6, title: "Free Video Lectures: Mathematics for SSC", desc: "High-quality free video lectures covering all math topics with shortcuts and tricks.", type: "video-lectures", exam: "SSC CGL", iconColor: "#ef4444", iconBg: "rgba(239,68,68,0.12)", Icon: Video },
  { id: 7, title: "Monthly Current Affairs PDF - April 2025", desc: "Comprehensive monthly current affairs compilation with MCQs for practice.", type: "current-affairs", exam: "All Exams", iconColor: "#06b6d4", iconBg: "rgba(6,182,212,0.12)", Icon: Globe },
  { id: 8, title: "NEET UG Previous Year Papers (2015-2024)", desc: "Complete NEET previous year question papers with detailed solutions and analysis.", type: "previous-papers", exam: "NEET UG", iconColor: "#3b82f6", iconBg: "rgba(59,130,246,0.12)", Icon: FileText },
  { id: 9, title: "JEE Mains & Advanced Formula Sheets", desc: "Comprehensive formula sheets for Physics, Chemistry and Mathematics for JEE preparation.", type: "study-notes", exam: "JEE", iconColor: "#f97316", iconBg: "rgba(249,115,22,0.12)", Icon: PenTool },
  { id: 10, title: "SBI PO Full Mock Test with Detailed Solutions", desc: "10 full-length SBI PO Prelims mock tests with video solutions and performance analysis.", type: "mock-tests", exam: "SBI PO", iconColor: "#10b981", iconBg: "rgba(16,185,129,0.12)", Icon: Brain },
  { id: 11, title: "UPSC Geography Notes - Complete Physical Geography", desc: "Detailed handwritten-style notes covering all aspects of Physical and Human Geography.", type: "study-notes", exam: "UPSC CSE", iconColor: "#f97316", iconBg: "rgba(249,115,22,0.12)", Icon: BookOpen },
  { id: 12, title: "Indian Polity - Laxmikant Summary Notes", desc: "Concise chapter-wise summary of M. Laxmikant's Indian Polity — perfect for revision.", type: "study-notes", exam: "UPSC CSE", iconColor: "#8b5cf6", iconBg: "rgba(139,92,246,0.12)", Icon: FileCheck },
];

interface ResourcesGridProps {
  category: string;
  search: string;
}

export function ResourcesGrid({ category, search }: ResourcesGridProps) {
  const filtered = allResources.filter((r) => {
    const matchCat = category === "all" || r.type === category;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.exam.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={styles.grid}>
          {filtered.length > 0 ? (
            filtered.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <a href="#" className={styles.card} onClick={(e) => e.preventDefault()}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconBox} style={{ background: resource.iconBg }}>
                      <resource.Icon size={22} style={{ color: resource.iconColor }} />
                    </div>
                    <span className={styles.typeBadge}>{resource.type.replace("-", " ")}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{resource.title}</h3>
                  <p className={styles.cardDesc}>{resource.desc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.exam}>{resource.exam}</span>
                    <span className={styles.downloadBtn}>
                      <Download size={13} />
                      Download Free
                    </span>
                  </div>
                </a>
              </motion.div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FileText size={24} />
              </div>
              <h3 className={styles.emptyTitle}>No resources found</h3>
              <p className={styles.emptyDesc}>Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
