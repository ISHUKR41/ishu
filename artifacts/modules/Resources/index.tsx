// ============================================================================
// FILE: modules/Resources/index.tsx
// PURPOSE: Main orchestrator for the Resources page.
//          Aggregates all resource categories into one unified page.
// ============================================================================

import React from "react";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { FileText, BookOpen, ClipboardList, FlaskConical, Calculator } from "lucide-react";

const CATEGORIES = [
  { name: "Previous Papers", slug: "previous-papers", icon: FileText, color: "blue" },
  { name: "Syllabus", slug: "syllabus", icon: BookOpen, color: "green" },
  { name: "Mock Tests", slug: "mock-tests", icon: ClipboardList, color: "purple" },
  { name: "Study Notes", slug: "study-notes", icon: FlaskConical, color: "amber" },
  { name: "Formula Sheets", slug: "formula-sheets", icon: Calculator, color: "cyan" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageMeta title="Study Resources - Ishu" description="Free study materials for exam preparation." />
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-gradient-to-b from-amber-500/5 to-background py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Study Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Free study materials to help you ace your exams.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/resources/category/${cat.slug}`}>
                <div className="group bg-card border border-border rounded-xl p-8 hover:border-amber-500/30 hover:shadow-lg transition-all cursor-pointer text-center">
                  <div className="h-14 w-14 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <cat.icon className="h-7 w-7 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-amber-400 transition-colors">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
