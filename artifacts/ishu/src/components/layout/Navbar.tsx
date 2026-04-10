// FILE: artifacts/ishu/src/components/layout/Navbar.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Menu, Search, X, Moon, Sun, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ProfessionalIcon } from "@/components/icons/ProfessionalIcon";

const RESULTS_CATEGORIES = [
  { href: "/results/category/upsc", label: "UPSC Civil Services", icon: "Building" },
  { href: "/results/category/ssc", label: "SSC Exams", icon: "Document" },
  { href: "/results/category/banking", label: "Banking & IBPS", icon: "Building" },
  { href: "/results/category/railway", label: "Railway / RRB", icon: "Rocket" },
  { href: "/results/category/defence", label: "Army & Defence", icon: "Shield" },
  { href: "/results/category/jee", label: "JEE Engineering", icon: "Settings" },
  { href: "/results/category/neet", label: "NEET Medical", icon: "Academic" },
  { href: "/results/category/state-psc", label: "State PSC", icon: "Location" },
  { href: "/results/category/teaching", label: "Teaching & TET", icon: "BookOpen" },
  { href: "/results/category/police", label: "Police Exams", icon: "Shield" },
  { href: "/results/category/engineering", label: "Engineering Jobs", icon: "Tools" },
  { href: "/results/category/judiciary", label: "High Court & Judiciary", icon: "Security" },
];

const TOOLS_CATEGORIES = [
  { href: "/tools/category/pdf", label: "PDF Tools", icon: "Document" },
  { href: "/tools/category/ai", label: "AI Tools", icon: "AI" },
  { href: "/tools/category/image", label: "Image Tools", icon: "Image" },
  { href: "/tools/category/text", label: "Text Tools", icon: "Document" },
  { href: "/tools/category/conversion", label: "Conversion Tools", icon: "Loading" },
];

const NEWS_CATEGORIES = [
  { href: "/news/category/upsc", label: "UPSC News", icon: "Building" },
  { href: "/news/category/ssc", label: "SSC News", icon: "Document" },
  { href: "/news/category/banking", label: "Banking News", icon: "Building" },
  { href: "/news/category/railway", label: "Railway News", icon: "Rocket" },
  { href: "/news/category/scholarships", label: "Scholarships", icon: "Graduation" },
  { href: "/news/category/admit-cards", label: "Admit Cards", icon: "CreditCard" },
];

const BLOG_CATEGORIES = [
  { href: "/blog/category/exam-tips", label: "Exam Tips & Tricks", icon: "Sparkles" },
  { href: "/blog/category/career-guidance", label: "Career Guidance", icon: "TrendingUp" },
  { href: "/blog/category/success-stories", label: "Success Stories", icon: "Trophy" },
  { href: "/blog/category/study-strategies", label: "Study Strategies", icon: "BookOpen" },
];

const RESOURCES_CATEGORIES = [
  { href: "/resources/category/previous-papers", label: "Previous Year Papers", icon: "Document" },
  { href: "/resources/category/syllabus", label: "Syllabus & Pattern", icon: "Document" },
  { href: "/resources/category/mock-tests", label: "Mock Tests", icon: "Edit" },
  { href: "/resources/category/study-notes", label: "Study Notes", icon: "BookOpen" },
  { href: "/resources/category/formula-sheets", label: "Formula Sheets", icon: "ChartBar" },
];

interface MegaMenuProps {
  items: { href: string; label: string; icon: string }[];
  viewAllHref: string;
  onClose: () => void;
}

function MegaMenuDropdown({ items, viewAllHref, onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "0.75rem",
        padding: "0.75rem",
        minWidth: 240,
        boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
        zIndex: 100,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: items.length > 6 ? "1fr 1fr" : "1fr", gap: "0.125rem" }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.625rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              color: "hsl(var(--foreground))",
              fontSize: "0.82rem",
              fontWeight: 500,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "hsl(var(--accent))"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <ProfessionalIcon icon={item.icon} size={14} style={{ color: "currentColor" }} />
            {item.label}
          </Link>
        ))}
      </div>
      <div style={{ borderTop: "1px solid hsl(var(--border))", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
        <Link
          href={viewAllHref}
          onClick={onClose}
          style={{ display: "block", padding: "0.5rem 0.625rem", borderRadius: "0.5rem", textDecoration: "none", color: "#3b82f6", fontSize: "0.82rem", fontWeight: 600, transition: "background 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          View All →
        </Link>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (key: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  useEffect(() => () => { if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current); }, []);

  const megaMenus: Record<string, { href: string; items: { href: string; label: string; icon: string }[] }> = {
    Results: { href: "/results", items: RESULTS_CATEGORIES },
    Tools: { href: "/tools", items: TOOLS_CATEGORIES },
    News: { href: "/news", items: NEWS_CATEGORIES },
    Blog: { href: "/blog", items: BLOG_CATEGORIES },
    Resources: { href: "/resources", items: RESOURCES_CATEGORIES },
  };

  const simpleLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActivePath = (href: string) => location === href || location.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/25">
                <span className="font-display font-bold text-white text-sm">I</span>
              </div>
              <span className="hidden font-display text-xl font-bold tracking-tight text-foreground sm:inline-block">
                Ishu
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-md transition-all duration-200 ${location === "/" ? "text-blue-600 dark:text-blue-400 bg-blue-500/10" : "text-foreground/70 hover:text-foreground hover:bg-accent"}`}
              >
                Home
              </Link>

              {Object.entries(megaMenus).map(([label, { href, items }]) => (
                <div
                  key={label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={href}
                    className={`flex items-center gap-0.5 px-3 py-1.5 rounded-md transition-all duration-200 ${isActivePath(href) ? "text-blue-600 dark:text-blue-400 bg-blue-500/10" : "text-foreground/70 hover:text-foreground hover:bg-accent"}`}
                  >
                    {label}
                    <ChevronDown size={12} style={{ marginLeft: 1, opacity: 0.7, transform: activeDropdown === label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                  </Link>
                  <AnimatePresence>
                    {activeDropdown === label && (
                      <MegaMenuDropdown
                        items={items}
                        viewAllHref={href}
                        onClose={() => setActiveDropdown(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                href="/about"
                className={`px-3 py-1.5 rounded-md transition-all duration-200 ${location === "/about" ? "text-blue-600 dark:text-blue-400 bg-blue-500/10" : "text-foreground/70 hover:text-foreground hover:bg-accent"}`}
              >
                About
              </Link>

              {isAdmin && (
                <Link href="/admin" className={`px-3 py-1.5 rounded-md transition-all duration-200 ${location.startsWith("/admin") ? "text-blue-600 dark:text-blue-400 bg-blue-500/10" : "text-foreground/70 hover:text-foreground hover:bg-accent"}`}>
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden xl:flex items-center rounded-lg border border-border bg-muted/50 px-3 py-1.5 transition-colors focus-within:border-blue-500/50">
              <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search exams, tools..."
                className="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground w-36"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-xs font-medium uppercase text-muted-foreground">
                  {currentLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className={currentLanguage === lang.code ? "bg-accent" : ""}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-8 w-8 rounded-md relative">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-md">{user.name}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="text-foreground/80" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg shadow-blue-500/20" asChild>
                    <Link href="/auth/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 rounded-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center rounded-lg border border-border bg-muted/50 px-3 py-2">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Search..." className="bg-transparent text-sm text-foreground outline-none w-full" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.05em", padding: "0 0.75rem" }}>Main</p>
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location === "/" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-foreground/70 hover:bg-accent"}`}>
                  <span className="inline-flex items-center gap-2"><ProfessionalIcon icon="Home" size={14} /> Home</span>
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location === "/about" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-foreground/70 hover:bg-accent"}`}>
                  <span className="inline-flex items-center gap-2"><ProfessionalIcon icon="Info" size={14} /> About</span>
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location === "/contact" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-foreground/70 hover:bg-accent"}`}>
                  <span className="inline-flex items-center gap-2"><ProfessionalIcon icon="Mail" size={14} /> Contact</span>
                </Link>
              </div>

              {Object.entries(megaMenus).map(([label, { href, items }]) => (
                <div key={label}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.05em", padding: "0 0.75rem", marginBottom: "0.25rem" }}>{label}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.125rem" }}>
                    <Link href={href} onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-sm font-semibold rounded-md text-blue-600 dark:text-blue-400 hover:bg-accent transition-colors">All {label} →</Link>
                    {items.slice(0, 5).map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 text-sm rounded-md text-foreground/70 hover:bg-accent hover:text-foreground transition-colors">
                        <span className="inline-flex items-center gap-2"><ProfessionalIcon icon={item.icon} size={14} /> {item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-2 pt-3 border-t border-border">
                {user ? (
                  <Button variant="outline" className="w-full justify-start" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Logout</Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild><Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link></Button>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0" asChild><Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link></Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
