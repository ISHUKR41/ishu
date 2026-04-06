import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, FileType, Image as ImageIcon, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  { id: 1, title: "Merge PDF", description: "Combine multiple PDFs into a single document easily.", icon: FileType, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, title: "Split PDF", description: "Extract pages from your PDF or save each page as a separate PDF.", icon: FileType, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: 3, title: "Compress PDF", description: "Reduce file size while optimizing for maximal PDF quality.", icon: Settings, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: 4, title: "PDF to Word", description: "Easily convert your PDF files into easy to edit DOC and DOCX documents.", icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
  { id: 5, title: "PDF to Excel", description: "Pull data straight from PDFs into Excel spreadsheets.", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 6, title: "Word to PDF", description: "Make DOC and DOCX files easy to read by converting them to PDF.", icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: 7, title: "JPG to PDF", description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.", icon: ImageIcon, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: 8, title: "PDF to JPG", description: "Convert each PDF page into a JPG or extract all images contained in a PDF.", icon: ImageIcon, color: "text-red-500", bg: "bg-red-500/10" },
];

export function ToolsShowcase() {
  return (
    <section className="py-20 md:py-32 bg-white/5 relative border-y border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Student Tool You Need</h2>
          <p className="text-muted-foreground text-lg">
            Stop searching for different tools across the web. We've compiled 100+ free, fast, and secure tools to help you prepare documents for your applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/tools/${tool.title.toLowerCase().replace(/ /g, '-')}`}>
                <div className="group rounded-xl border border-white/10 bg-background hover:bg-white/5 transition-all p-6 flex flex-col items-center text-center cursor-pointer h-full">
                  <div className={`w-16 h-16 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 border-0 rounded-full px-8" asChild>
            <Link href="/tools" className="flex items-center gap-2">
              Explore All 100+ Tools <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
