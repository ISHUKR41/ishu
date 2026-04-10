// FILE: artifacts/ishu/src/components/layout/Footer.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import { Link } from "wouter";
import { Twitter, Youtube, Instagram, Send } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500">
                <span className="font-display font-bold text-white text-sm">I</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">Ishu</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed">
              India's Premier Education, Government Results, Tools & News Platform. Empowering students and job seekers across India.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Send, href: "#", label: "Telegram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-md border border-border bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/8 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4">Government Jobs</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/results?category=upsc" className="hover:text-blue-500 transition-colors">UPSC Results</Link></li>
              <li><Link href="/results?category=ssc" className="hover:text-blue-500 transition-colors">SSC Exams</Link></li>
              <li><Link href="/results?category=banking" className="hover:text-blue-500 transition-colors">Banking & IBPS</Link></li>
              <li><Link href="/results?category=railway" className="hover:text-blue-500 transition-colors">Railway RRB</Link></li>
              <li><Link href="/results?category=defense" className="hover:text-blue-500 transition-colors">Defense & Army</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4">Education</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/results?category=jee" className="hover:text-blue-500 transition-colors">JEE Mains & Adv</Link></li>
              <li><Link href="/results?category=neet" className="hover:text-blue-500 transition-colors">NEET UG/PG</Link></li>
              <li><Link href="/resources" className="hover:text-blue-500 transition-colors">Study Resources</Link></li>
              <li><Link href="/tools" className="hover:text-blue-500 transition-colors">Student Tools</Link></li>
              <li><Link href="/news?category=education" className="hover:text-blue-500 transition-colors">Education News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Ishu Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <span className="text-orange-500 mx-1">♥</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
