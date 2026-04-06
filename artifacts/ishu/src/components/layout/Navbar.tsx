import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Menu, Search, X, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/results", label: "Results" },
    { href: "/tools", label: "Tools" },
    { href: "/news", label: "News" },
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  if (isAdmin) {
    navLinks.push({ href: "/admin", label: "Admin" });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/25">
                <span className="font-display font-bold text-white text-sm">I</span>
              </div>
              <span className="hidden font-display text-xl font-bold tracking-tight text-white sm:inline-block">
                Ishu
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
                    location === link.href
                      ? "text-blue-400 bg-blue-500/8"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden xl:flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors focus-within:border-blue-500/30">
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
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={currentLanguage === lang.code ? "bg-accent" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 rounded-md relative"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-md border-white/15">
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
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

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
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
            className="lg:hidden border-t border-white/8 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-foreground outline-none w-full"
                />
              </div>

              <nav className="grid grid-cols-2 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location === link.href ? "bg-blue-500/10 text-blue-400" : "text-foreground/70 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-2 pt-3 border-t border-white/8">
                {user ? (
                  <Button variant="outline" className="w-full justify-start" onClick={() => logout()}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0" asChild>
                      <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
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
