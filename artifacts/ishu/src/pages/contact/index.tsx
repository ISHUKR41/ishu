import { useState } from "react";
import { motion } from "framer-motion";
import { useSubmitContact } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const mutation = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Required fields missing", description: "Please fill in name, email and message.", variant: "destructive" });
      return;
    }
    try {
      await mutation.mutateAsync({ data: form });
      setSubmitted(true);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    } catch {
      toast({ title: "Failed to send", description: "Please try again or contact us directly.", variant: "destructive" });
    }
  };

  const CONTACT_INFO = [
    { icon: Phone, label: "Phone / WhatsApp", value: "+91 8986985813", href: "tel:8986985813", color: "text-green-400", bg: "bg-green-500/20" },
    { icon: MessageCircle, label: "WhatsApp", value: "wa.me/918986985813", href: "https://wa.me/918986985813", color: "text-green-400", bg: "bg-green-500/20" },
    { icon: Mail, label: "Email", value: "ishukryk@gmail.com", href: "mailto:ishukryk@gmail.com", color: "text-blue-400", bg: "bg-blue-500/20" },
    { icon: MapPin, label: "Location", value: "India", href: null, color: "text-orange-400", bg: "bg-orange-500/20" },
  ];

  return (
    <>
      <PageMeta title="Contact Us" description="Get in touch with Ishu - contact us via WhatsApp, phone, or email for support and inquiries." />
      <div className="min-h-screen bg-background">
        <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-orange-950/30 to-background py-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions? We're here to help. Reach out via WhatsApp, email, or use the form below.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h2>
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 mb-5">
                    <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          className={`font-medium ${item.color} hover:underline`}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
                <MessageCircle className="h-6 w-6 text-green-400 mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Quick Support on WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-4">Get instant support via WhatsApp — typically reply within 1 hour.</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 border-0 gap-2" asChild>
                  <a href="https://wa.me/918986985813" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-3">Message Sent!</h2>
                    <p className="text-muted-foreground mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" placeholder="Your full name" className="bg-white/5 border-white/10"
                          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="bg-white/5 border-white/10"
                          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+91 XXXXXXXXXX" className="bg-white/5 border-white/10"
                          value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="What's this about?" className="bg-white/5 border-white/10"
                          value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea id="message" placeholder="Tell us how we can help you..." rows={5} className="bg-white/5 border-white/10 resize-none"
                        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 gap-2"
                      disabled={mutation.isPending}>
                      <Send className="h-4 w-4" />
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
