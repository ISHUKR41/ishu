import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center max-w-lg"
      >
        <div className="text-[10rem] font-bold font-display leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground/20 to-foreground/5 select-none mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 text-base">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 hover:from-blue-700 hover:to-indigo-700">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/results" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Results
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
