// ============================================================================
// FILE: modules/Terms/index.tsx
// PURPOSE: Terms of Service page with comprehensive legal content.
// ISOLATION: Fully self-contained page module.
// ============================================================================

import React, { useEffect, useRef } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import gsap from "gsap";
import { FileText, AlertTriangle, CheckCircle, Scale, UserCheck } from "lucide-react";

export default function TermsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.children, {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageMeta
        title="Terms of Service | ISHU"
        description="Terms of service for ISHU platform — usage policies, disclaimers, and user responsibilities."
        canonical="https://ishu.in/terms"
      />
      <section ref={sectionRef} className="min-h-screen bg-zinc-950 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-emerald-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-zinc-400 mb-8">Last updated: April 2025</p>

          <div className="space-y-8">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Acceptance of Terms</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                By accessing and using ISHU (ishu.in), you agree to comply with these terms. 
                Our platform provides government exam results, educational news, student tools,
                and career guidance resources.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white">Permitted Use</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                You may use our platform for personal, educational, and non-commercial purposes.
                You agree not to misuse our tools, scrape our content, or engage in any activity
                that could harm the platform or other users.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Disclaimer</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                While we strive for accuracy, all exam results and news are sourced from official
                government websites. We recommend verifying critical information directly from
                official sources. ISHU is not affiliated with any government organization.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Governing Law</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                These terms are governed by the laws of India. Any disputes arising from these
                terms shall be subject to the exclusive jurisdiction of courts in India.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
