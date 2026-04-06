import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

        {/* Subtle grid pattern — dark mode uses white lines, light mode uses dark lines */}
        <div
          className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            India's #1 Education & Government Jobs Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            Your Gateway to a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600">
              Brighter Future
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Everything you need in one place. Government exam results, 100+ PDF tools, breaking educational news, and expert career guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]" asChild>
              <Link href="/results">Browse Latest Results</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base" asChild>
              <Link href="/tools">Explore Tools</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
