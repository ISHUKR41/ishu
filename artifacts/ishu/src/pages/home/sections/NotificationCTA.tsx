import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSubscribeNotifications } from "@workspace/api-client-react";

export function NotificationCTA() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  const subscribe = useSubscribeNotifications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) {
      toast({
        title: "Error",
        description: "Please provide both name and WhatsApp number.",
        variant: "destructive"
      });
      return;
    }

    subscribe.mutate({
      data: {
        whatsappNumber: phone,
        name: name,
        categories: ["all"]
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "You'll now receive updates on WhatsApp.",
        });
        setPhone("");
        setName("");
      },
      onError: () => {
        toast({
          title: "Subscription failed",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto rounded-3xl border border-border bg-card/80 p-8 md:p-12 overflow-hidden relative backdrop-blur-md"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/15 text-green-500 mb-6">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
              <p className="text-muted-foreground mb-6">
                Get instant WhatsApp notifications for new job postings, exam results, admit cards, and important educational news directly on your phone.
              </p>

              <ul className="space-y-3 mb-8">
                {["Instant alerts for new vacancies", "Direct links to exam results", "Daily educational news digest"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border shadow-xl">
              <h3 className="text-xl font-bold mb-4">Subscribe Now</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-visible:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="WhatsApp Number (e.g. +91 9876543210)"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus-visible:ring-green-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-0 h-12 text-base"
                  disabled={subscribe.isPending}
                >
                  {subscribe.isPending ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Get WhatsApp Alerts <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
