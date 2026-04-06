import { motion } from "framer-motion";
import { Link } from "wouter";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Target, Users, Zap, Shield, Heart, Globe, Phone, Mail } from "lucide-react";

const TEAM = [
  { name: "Ishu Kumar", role: "Founder & CEO", bio: "Passionate about making education accessible to every student in India." },
  { name: "Priya Sharma", role: "Head of Content", bio: "Expert in government exam coaching with 10+ years of experience." },
  { name: "Rahul Verma", role: "Lead Developer", bio: "Building tools that empower millions of students across India." },
];

const VALUES = [
  { icon: Target, title: "Mission", description: "Democratize access to education resources and government exam information for every Indian student.", color: "text-blue-400", bg: "bg-blue-500/20" },
  { icon: Users, title: "Community", description: "Building a strong community of 10 million+ students, job seekers, and educators.", color: "text-green-400", bg: "bg-green-500/20" },
  { icon: Zap, title: "Innovation", description: "Continuously building new tools and features to help students excel in their goals.", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  { icon: Shield, title: "Trust", description: "Committed to providing accurate, verified information from official government sources.", color: "text-purple-400", bg: "bg-purple-500/20" },
];

const STATS = [
  { value: "10M+", label: "Students Helped" },
  { value: "100+", label: "Free Tools" },
  { value: "500+", label: "Exam Results" },
  { value: "50+", label: "Expert Authors" },
];

export default function About() {
  return (
    <>
      <PageMeta title="About Us" description="Learn about Ishu - India's Premier Education, Government Results, Tools & News Platform." />
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-950/50 to-background py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 mx-auto mb-6">
                <span className="text-2xl font-bold text-white">I</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Ishu</h1>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                India's Premier Education, Government Results, Tools & News Platform — empowering millions of students to achieve their dreams.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto" />
            </motion.div>
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="rounded-xl border border-white/10 bg-white/5 p-8 md:p-10">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Ishu was founded with a simple yet powerful vision: to make quality education resources and government job information accessible to every student in India, regardless of their background or location.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We noticed that millions of students across India were struggling to find reliable information about government exams, results, and admit cards. They were spending hours browsing multiple websites, often encountering outdated or incorrect information. Ishu was built to solve this problem.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Ishu serves over 10 million students with up-to-date exam results, 100+ free tools, expert career guidance, and breaking education news — all in one platform.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map((value, i) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 flex gap-5">
                  <div className={`h-12 w-12 rounded-xl ${value.bg} flex items-center justify-center flex-shrink-0`}>
                    <value.icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-400 mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 p-10 text-center">
            <Heart className="h-10 w-10 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Made with ❤️ in India</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions or want to partner with us? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 gap-2" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" className="border-white/20 gap-2" asChild>
                <a href="tel:8986985813">
                  <Phone className="h-4 w-4" /> +91 8986985813
                </a>
              </Button>
              <Button variant="outline" className="border-white/20 gap-2" asChild>
                <a href="mailto:ishukryk@gmail.com">
                  <Mail className="h-4 w-4" /> ishukryk@gmail.com
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
