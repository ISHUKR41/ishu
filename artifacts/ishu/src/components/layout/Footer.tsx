import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12 md:py-16 lg:py-20 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400">
                <span className="font-display font-bold text-white">I</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Ishu
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              India's Premier Education, Government Results, Tools & News Platform. Empowering students and job seekers.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Government Jobs</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/results?category=upsc" className="hover:text-blue-400 transition-colors">UPSC Results</Link></li>
              <li><Link href="/results?category=ssc" className="hover:text-blue-400 transition-colors">SSC Exams</Link></li>
              <li><Link href="/results?category=banking" className="hover:text-blue-400 transition-colors">Banking & IBPS</Link></li>
              <li><Link href="/results?category=railway" className="hover:text-blue-400 transition-colors">Railway RRB</Link></li>
              <li><Link href="/results?category=defense" className="hover:text-blue-400 transition-colors">Defense & Army</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Education</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/results?category=jee" className="hover:text-blue-400 transition-colors">JEE Mains & Adv</Link></li>
              <li><Link href="/results?category=neet" className="hover:text-blue-400 transition-colors">NEET UG/PG</Link></li>
              <li><Link href="/results?category=state-cet" className="hover:text-blue-400 transition-colors">State CETs</Link></li>
              <li><Link href="/tools" className="hover:text-blue-400 transition-colors">Student Tools</Link></li>
              <li><Link href="/news?category=education" className="hover:text-blue-400 transition-colors">Education News</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/test" className="hover:text-blue-400 transition-colors">Upcoming Features</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ishu Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <span className="text-orange-500">♥</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
