// ============================================================================
// FILE: modules/Privacy/index.tsx
// PURPOSE: Privacy Policy page with comprehensive content about data handling.
// ISOLATION: Fully self-contained page module.
// ============================================================================

import React, { useEffect, useRef } from "react";
import { PageMeta } from "@/components/layout/PageMeta";
import gsap from "gsap";
import { Shield, Lock, Eye, Database, Mail } from "lucide-react";

export default function PrivacyPage() {
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
        title="Privacy Policy | ISHU"
        description="Privacy policy for ISHU platform — how we collect, use, and protect your personal data."
        canonical="https://ishu.in/privacy"
      />
      <section ref={sectionRef} className="min-h-screen bg-zinc-950 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-zinc-400 mb-8">Last updated: April 2025</p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                We collect information you provide directly, including name, email address, and
                phone number when you register for notifications or create an account. We also
                automatically collect usage data such as pages visited, tools used, and browser type.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white">How We Use Your Data</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Your data is used to: (1) Send exam result notifications via WhatsApp/SMS,
                (2) Personalize your experience with relevant exam categories, (3) Improve our
                platform through analytics, (4) Communicate important updates about exams you follow.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Data Security</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                We implement industry-standard security measures to protect your personal data.
                All data transmission is encrypted using TLS/SSL. We do not sell your personal
                information to third parties.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Contact Us</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                For privacy-related inquiries, please contact us at privacy@ishu.in or through
                our Contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
