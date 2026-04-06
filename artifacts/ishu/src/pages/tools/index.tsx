import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListTools as useGetTools } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ArrowRight, Star, Zap } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "All Tools" },
  { value: "PDF Tools", label: "PDF Tools" },
  { value: "PDF Convert", label: "Convert" },
  { value: "PDF Edit", label: "Edit" },
  { value: "PDF Security", label: "Security" },
  { value: "Image Convert", label: "Images" },
  { value: "PDF AI", label: "AI Tools" },
];

const ICON_MAP: Record<string, string> = {
  "PDF Tools": "📄",
  "PDF Convert": "🔄",
  "PDF Edit": "✏️",
  "PDF Security": "🔒",
  "Image Convert": "🖼️",
  "PDF AI": "🤖",
};

export default function Tools() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data, isLoading } = useGetTools({
    search: search || undefined,
    category: category || undefined,
    limit: 50,
  });

  const tools = (Array.isArray(data) ? data : (data as any)?.tools) ?? [];

  return (
    <>
      <PageMeta title="Free Online Tools" description="100+ free PDF tools, image editors, text utilities and calculators for students and professionals." />
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-indigo-950/50 to-background py-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted-foreground mb-4">
                <Zap className="h-3.5 w-3.5 text-yellow-400" /> 100+ Free Tools
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Online Tools</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Free PDF tools, image utilities, text processors and calculators — all in one place.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                className="pl-10 bg-white/5 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  category === c.value
                    ? "bg-blue-600 text-white"
                    : "border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>No tools found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool: any, i: number) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link href={`/tools/${tool.slug}`}>
                    <div className="group h-full rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                      <div className="text-3xl mb-3">{ICON_MAP[tool.category] ?? "🔧"}</div>
                      <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors mb-1 line-clamp-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs capitalize rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-muted-foreground">
                          {tool.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-yellow-400">
                          <Star className="h-3 w-3 fill-yellow-400" />
                          {tool.usageCount > 0 ? `${(tool.usageCount / 1000).toFixed(1)}k` : "New"}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
